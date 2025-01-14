"use client";

import Image from "next/image";
import ninjaLogo from "../assets/images/ninja.png";
import stanleyLogo from "../assets/images/Stanley1.png";
import ferrari_white from "../assets/images/ferrari.png"
import { motion } from "framer-motion";

const images = [
  { src: ninjaLogo, alt: "ninja Logo" },
  { src: stanleyLogo, alt: "stanley Logo" },
  { src: ferrari_white, alt: "ferrari Logo" },
];

export const LogoTicker = () => {
  return (
    <div className="bg-black text-white py-[72px]">
      <div className="container mx-auto px-4">
        <h2 className="text-xl text-center text-white">
          The best data, from the top sites
        </h2>
        <div className="flex overflow-hidden mt-9 relative">
          <motion.div 
            animate={{ 
              x: [0, -1035]  // Adjust this value based on the total width of your logos
            }} 
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            className="flex gap-16 flex-nowrap"
          >
            {/* First set of logos */}
            {images.map(({ src, alt }) => (
              <Image 
                key={`${alt}-1`}
                alt={alt}
                src={src}
                width={100}
                height={100}
                className="object-contain"
              />
            ))}
            {/* Second set of logos */}
            {images.map(({ src, alt }) => (
              <Image 
                key={`${alt}-2`}
                alt={alt}
                src={src}
                width={100}
                height={100}
                className="object-contain"
              />
            ))}
            {/* Third set of logos */}
            {images.map(({ src, alt }) => (
              <Image 
                key={`${alt}-3`}
                alt={alt}
                src={src}
                width={100}
                height={100}
                className="object-contain"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};