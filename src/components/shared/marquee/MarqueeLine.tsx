"use client";
import Marquee from "react-fast-marquee";

interface MarqueeLineProps {
  className?: string;
}

export default function MarqueeLine({className=''}: MarqueeLineProps) {
  return (
    <Marquee
      autoFill={true}
      speed={100}
      className={`text-white bg-main h-[25px] lg:h-[35px] ${className}`}
    >
      <span className="inline-block mx-[7.5px] text-[12px] lg:text-[15px] leading-none uppercase">
        Glimmer
      </span>
      <span className="inline-block mx-[7.5px] text-[12px] lg:text-[15px] leading-none uppercase">
        Glimmer
      </span>
      <span className="inline-block mx-[7.5px] text-[12px] lg:text-[15px] leading-none uppercase">
        Glimmer
      </span>
    </Marquee>
  );
}
