import { ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface SectionDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export default function SectionDescription({
  children,
  className,
}: SectionDescriptionProps) {
  return (
    <p
      className={twMerge(
        clsx(
          `lg:max-w-[338px] text-[12px] lg:text-[15px] leading-[120%] font-light`
        ),
        className
      )}
    >
      {children}
    </p>
  );
}
