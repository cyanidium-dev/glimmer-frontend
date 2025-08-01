import { ReactNode } from "react";

interface SectionTitleProps {
  children?: ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <h2
      className={`text-[20px] lg:text-[32px] leading-[120%] font-semibold uppercase text-main ${className}`}
    >
      {children}
    </h2>
  );
}
