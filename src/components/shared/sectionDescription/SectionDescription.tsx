import { ReactNode } from "react";

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
      className={`lg:max-w-[338px] text-[12px] lg:text-[15px] leading-[120%] font-light  ${className}`}
    >
      {children}
    </p>
  );
}
