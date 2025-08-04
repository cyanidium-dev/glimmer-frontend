import { ReactNode } from "react";

interface PageTitleProps {
  children?: ReactNode;
  className?: string;
}

export default function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={`text-[20px] lg:text-[32px] leading-[120%] font-semibold uppercase text-main ${className}`}
    >
      {children}
    </h1>
  );
}
