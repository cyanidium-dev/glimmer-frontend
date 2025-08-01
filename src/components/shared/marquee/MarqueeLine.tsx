"use client";
import Marquee from "react-fast-marquee";

export default function MarqueeLine() {
  return (
    <Marquee autoFill={true} speed={100} className="text-white bg-main">
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
