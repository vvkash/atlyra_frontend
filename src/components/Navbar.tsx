"use client";
import Image from 'next/image';
import logoImage from '../assets/images/Atlyra_logo_processed.png';
import MenuIcon from '../assets/icons/menu.svg';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export const Navbar = () => {
  const router = useRouter();
  
  return (
    <nav className="w-full bg-black">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="relative">
          <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right, #4B0082, #FFFFFF, rgba(173, 216, 230, 0.1))] blur-md"></div> {/* Updated gradient */}
          <Image 
            src={logoImage} 
            alt="Atlyra logo" 
            className="h-12 w-12 relative" 
          />
        </div>
        <div className="gap-6 items-center hidden sm:flex">
          <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">FAQ</a>
          <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Future</a>
          <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Contact</a>
          <Link href="/auth">
            <button className="bg-white py-2 px-4 rounded-lg">Sign Up</button>
          </Link>
        </div>
        <div className="flex sm:hidden border border-white border-opacity-30 h-10 w-10 justify-center items-center rounded-lg">
          <MenuIcon className="text-white" />
        </div>
      </div>
    </nav>
  );
};
