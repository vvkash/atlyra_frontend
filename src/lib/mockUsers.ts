import { hash } from "bcrypt";

export const mockUsers = [
  {
    id: 1,
    email: "demo@example.com",
    password: await hash("demo123", 10),
    name: "Demo User",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    email: "test@example.com",
    password: await hash("test123", 10),
    name: "Test User",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]; 