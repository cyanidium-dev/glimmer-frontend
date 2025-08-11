interface MinusIconProps {
  iconColor: string;
  bgColor: string;
  className?: string;
}

export default function MinusIcon({
  iconColor,
  bgColor,
  className,
}: MinusIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      aria-label="Minus icon"
      className={className}
    >
      <circle
        cx="19.9997"
        cy="20.2586"
        r="16.6667"
        fill={bgColor}
        stroke="#494949"
      />
      <path d="M25 20.2585H15" stroke={iconColor} strokeLinecap="round" />
    </svg>
  );
}
