import React from "react";
import Socials from "./Socials";

export default function Info() {
  return (
    <div>
      <a
        href="tel:0800550130"
        className="block text-main text-[16px] lg:text-[18px] font-semibold mb-2 active:brightness-125 xl:hover:brightness-125 focus-visible:brightness-125 transition duration-300 ease-in-out"
      >
        0 800 550 130
      </a>
      <p className="mb-8 text-white text-[14px] lg:text-[15px] font-normal">
        Безкоштовно
      </p>
      <p className="mb-8 text-white text-[16px] lg:text-[18px] font-semibold">
        Пн-Сб: 10:00-18:00
      </p>
      <Socials />
    </div>
  );
}
