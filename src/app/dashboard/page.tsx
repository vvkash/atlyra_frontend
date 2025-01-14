"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../assets/images/Atlyra_logo_processed.png';
import { MonitoringConfig } from '@/types/config';

export default function Dashboard() {
  const [configurations, setConfigurations] = useState<MonitoringConfig[]>([]);

  useEffect(() => {
    try {
      const savedConfigs = JSON.parse(localStorage.getItem('monitoringConfigs') || '[]');
      setConfigurations(savedConfigs);
    } catch (error) {
      console.error('Error loading configurations:', error);
      setConfigurations([]);
    }
  }, []);

  const handleDelete = (index: number) => {
    const newConfigs = configurations.filter((_, i) => i !== index);
    setConfigurations(newConfigs);
    localStorage.setItem('monitoringConfigs', JSON.stringify(newConfigs));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="w-full bg-black border-b border-white/10">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link href="/" className="relative">
            <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#4B0082,#FFFFFF,rgba(173,216,230,0.1))] blur-md"></div>
            <Image 
              src={logoImage}
              alt="Atlyra logo" 
              className="h-12 w-12 relative"
              width={48}
              height={48}
            />
          </Link>
          <Link 
            href="/service" 
            className="bg-[#ADD8E6] text-black px-4 py-2 rounded-lg hover:bg-[#8CC0D0] transition"
          >
            Add New Monitor
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Monitored Items</h1>
        
        {configurations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No items being monitored yet.</p>
            <Link 
              href="/service"
              className="inline-block mt-4 bg-[#ADD8E6] text-black px-6 py-3 rounded-lg hover:bg-[#8CC0D0] transition"
            >
              Add Your First Monitor
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {configurations.map((config, index) => (
              <div 
                key={index} 
                className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {config.inputType === "url" ? "URL Monitor" : "Keyword Monitor"}
                    </h2>
                    <p className="text-[#ADD8E6]">
                      {config.inputType === "url" ? (
                        <a href={config.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {config.url}
                        </a>
                      ) : (
                        `Keywords: ${config.keywords}`
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-gray-400">Monitoring Type</p>
                    <p className="font-medium">{config.monitoringType}</p>
                  </div>
                  {config.monitoringType === "price" && (
                    <div>
                      <p className="text-gray-400">Price Threshold</p>
                      <p className="font-medium">${config.priceThreshold}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-400">Notification Via</p>
                    <p className="font-medium">{config.notificationType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <p className="text-green-500 font-medium">Active</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 