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
    <>
      <button
        disabled={disabled}
        id="cart-button"
        onClick={onClick}
        className={`w-full lg:w-auto px-3 enabled:cursor-pointer relative flex items-center justify-center h-9 rounded-[6.4px] ${status === "inStock" ? "bg-main disabled:bg-main/50 text-black enabled:xl:hover:brightness-110 enabled:focus-visible:brightness-110" : "bg-black text-white disabled:bg-black/50 enabled:xl:hover:brightness-125 enabled:focus-visible:brightness-125"}
         enabled:active:scale-95 transition duration-300 ease-in-out ${className}`}
      >
        <CartIcon
          className={status === "inStock" ? "mr-2 lg:mr-0" : "hidden"}
        />

        <span
          className={`text-[10px] lg:text-[12px] font-medium leading-[120%] ${status === "inStock" ? "lg:hidden" : ""}`}
        >
          {status === "inStock" ? "Купити" : "Передзамовлення"}
        </span>
      </button>
    </>
  );
}
