import Image from "next/image";
import ArrowIcon from "../assets/icons/arrow-w.svg";
import cursorImage from "../assets/images/cursor.png";
import messageImage from "../assets/images/message.png";
import queen from "../assets/images/queen.png";
import horse from "../assets/images/horse.png";
import peice from "../assets/images/peice.png";
import Link from "next/link";


export const Hero = () => {
  return (
    <div className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#4B0082_60%,#ADD8E6)] py-[72px] relative overflow-hidden">
      <div className="flex justify-center mt-8"></div>
      <div className="flex justify-center relative w-full">
        <div className="relative inline-flex">
          <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter text-center">
            A step ahead, always
          </h1>
          <Image 
            src={horse} 
            height="200" 
            width="200" 
            alt="" 
            className="absolute top-[56px] right-[-20%] hidden lg:inline"
          />
          <Image 
            src={peice} 
            height="200" 
            width="200" 
            alt="" 
            className="absolute top-[108px] left-[-20%] hidden lg:inline"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-center text-xl mt-8 max-w-md">
          Discover, track, and secure the best deals effortlessly—your favorite products, always within reach, redefining how you shop online.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/auth">
          <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
            Let&apos;s Go!
          </button>
        </Link>
      </div>
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-[radial-gradient(closest-side,#000_80%,#ADD8E6)]"></div>
    </div>
  );
};
