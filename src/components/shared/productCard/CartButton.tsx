import CartIcon from "../icons/CartIcon";

interface CartButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  status: "inStock" | "preOrder";
}

export default function CartButton({
  onClick,
  className,
  disabled,
  status,
}: CartButtonProps) {
  return (
    <div className="group relative w-fit">
      <button
        disabled={disabled}
        id="cart-button"
        onClick={onClick}
        className={`group relative z-10 w-full lg:w-auto enabled:cursor-pointer flex items-center justify-center h-9 rounded-[6.4px] 
            ${status === "inStock" ? "px-3 bg-main disabled:bg-main/50 text-black enabled:xl:hover:brightness-110 enabled:focus-visible:brightness-110" : "px-2 bg-black text-white disabled:bg-black/50 enabled:xl:hover:brightness-125 enabled:focus-visible:brightness-125"}
        xl:hover:-translate-y-0.5 xl:hover:translate-x-0.5 enabled:active:scale-[98%] will-change-transform transition duration-300 ease-in-out ${className}`}
      >
        <CartIcon
          className={`group-active:scale-[98%] transition duration-300 ease-in-out ${status === "inStock" ? "mr-2 lg:mr-0" : "hidden"}`}
        />

        <span
          className={`text-[10px] lg:text-[12px] font-medium leading-[120%] ${status === "inStock" ? "lg:hidden" : ""}`}
        >
          {status === "inStock" ? "Купити" : "Передзамовлення"}
        </span>
      </button>
      <div
        className={`absolute top-0 left-0 -z-10 w-full h-full rounded-[6.4px] blur-xs xl:group-hover:translate-y-0.5 
      xl:group-hover:-translate-x-0.5 transition duration-300 ease-in-out ${status === "inStock" ? "bg-main/60" : "bg-black/40"}`}
      ></div>
    </div>
  );
}
