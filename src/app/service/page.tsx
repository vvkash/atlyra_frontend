"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logoImage from '../../assets/images/Atlyra_logo_processed.png';
import StanleyLogo from "../../assets/images/Stanley1.png";
import { MonitoringConfig } from '@/types/config';
import { NotificationSelect } from '@/components/NotificationSelect';
import { PriceSlider } from '@/components/PriceSlider';

export default function ServicePage() {
  const router = useRouter();
  const [inputType, setInputType] = useState<"url" | "keywords">("url");
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [monitoringType, setMonitoringType] = useState<MonitoringConfig["monitoringType"] | undefined>(undefined);
  const [priceThreshold, setPriceThreshold] = useState<number>();
  const [notificationType, setNotificationType] = useState<MonitoringConfig["notificationType"] | undefined>(undefined);
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Validate required fields
      if (!monitoringType || !notificationType) {
        throw new Error("Missing required fields");
      }

      const config: MonitoringConfig = {
        inputType,
        url: inputType === "url" ? url : undefined,
        keywords: inputType === "keywords" ? keywords : undefined,
        monitoringType,
        priceThreshold: monitoringType === "price" ? priceThreshold : undefined,
        notificationType,
        contactInfo,
        dateAdded: new Date().toISOString(),
        status: "active" as const
      };
      
      const existingConfigs = JSON.parse(localStorage.getItem('monitoringConfigs') || '[]');
      localStorage.setItem('monitoringConfigs', JSON.stringify([...existingConfigs, config]));
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving configuration:', error);
    } finally {
      setIsSubmitting(false);
    }
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
            href="/#faq" 
            className="text-white hover:text-[#ADD8E6] transition"
          >
            FAQ
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-2xl py-8">
        <div className="flex justify-center mb-12">
          <Image src={StanleyLogo} alt="Stanley Logo" width={200} height={100} />
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">How would you like to monitor?</h2>
          <div className="flex gap-4 justify-center">
            <button
              className={`px-6 py-3 rounded-lg ${
                inputType === "url" ? "bg-[#ADD8E6] text-black" : "bg-[#333]"
              }`}
              onClick={() => setInputType("url")}
            >
              URL
            </button>
            <button
              className={`px-6 py-3 rounded-lg ${
                inputType === "keywords" ? "bg-[#ADD8E6] text-black" : "bg-[#333]"
              }`}
              onClick={() => setInputType("keywords")}
            >
              Keywords
            </button>
          </div>
        </div>

        <div className="mb-12">
          {inputType === "url" ? (
            <input
              type="url"
              placeholder="Enter product URL"
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-center"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter keywords (comma separated)"
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-center"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          )}
        </div>

        {(url || keywords) && (
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold mb-6">What would you like to monitor?</h3>
            <div className="flex gap-4 justify-center">
              <button
                className={`px-6 py-3 rounded-lg ${
                  monitoringType === "price" ? "bg-[#ADD8E6] text-black" : "bg-[#333]"
                }`}
                onClick={() => setMonitoringType("price")}
              >
                Price
              </button>
              <button
                className={`px-6 py-3 rounded-lg ${
                  monitoringType === "availability" ? "bg-[#ADD8E6] text-black" : "bg-[#333]"
                }`}
                onClick={() => setMonitoringType("availability")}
              >
                Availability
              </button>
            </div>
          </div>
        )}

        {monitoringType === "price" && (
          <div className="mb-12">
            <PriceSlider
              value={priceThreshold || 0}
              onChange={(value) => setPriceThreshold(value)}
              min={0}
              max={1000}
            />
          </div>
        )}

        {monitoringType && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">How would you like to be notified?</h3>
            <NotificationSelect
              value={notificationType || ''}
              onChange={setNotificationType}
            />
          </div>
        )}

        {notificationType && (
          <div className="mb-12">
            <input
              type="text"
              placeholder={`Enter your ${notificationType}`}
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-center"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
        )}

        {notificationType && contactInfo && (
          <div className="flex justify-center">
            <button
              className="bg-[#ADD8E6] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#8CC0D0] disabled:opacity-50"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 