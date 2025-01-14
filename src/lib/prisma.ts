import { PrismaClient } from '@prisma/client'
import { mockUsers } from './mockUsers'

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

  // If in production, seed with mock data
  if (process.env.NODE_ENV === 'production') {
    client.$use(async (params, next) => {
      if (params.model === 'User') {
        if (params.action === 'findUnique') {
          const user = mockUsers.find(u => u.email === params.args.where.email)
          return user || null
        }
        if (params.action === 'create') {
          return {
            ...params.args.data,
            id: mockUsers.length + 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      }
      return next(params)
    })
  }

  return client
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export { prisma } 