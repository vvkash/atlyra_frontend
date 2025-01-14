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
        <div className="flex overflow-hidden mt-9 before:content-[''] after:content-[''] before:absolute after:absolute before:h-full after:h-full before:w-5 after:w-20 relative after:right-0 before:left-0 before:top-0 after:top-0 before:bg-[linear-gradient(to_right,#000,rgba(0,0,0,0))] after:bg-[linear-gradient(to_left,#000,rgba(0,0,0,0))] ">
          <motion.div transition={{ duration: 20, ease: "linear", repeat: Infinity, }} initial={{ translateX: 0 }} animate={{ translateX: "-50%"}} className="flex gap-16 flex-none pr-16">
            {images.map(({ src, alt }) => (
              <Image 
                key={alt}
                alt={alt}
                src={src}
                width={100}
                height={100}
                className="object-contain"
              />
            ))}
            {images.map(({ src, alt }) => (
              <Image 
                key={alt}
                alt={alt}
                src={src}
                width={100}
                height={100}
                className="object-contain"
              />
            ))}
            {images.map(({ src, alt }) => (
              <Image 
                key={alt}
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