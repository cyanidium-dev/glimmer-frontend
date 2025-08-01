import CartIcon from "../icons/CartIcon";

interface CartButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function CartButton({ onClick, className }: CartButtonProps) {
  return (
    <>
      <button
        id="cart-button"
        onClick={onClick}
        className={`enabled:cursor-pointer relative flex items-center justify-center size-6 text-white
        enabled:xl:hover:text-main enabled:focus-visible:text-main enabled:active:text-main enabled:active:scale-95 transition duration-300 ease-in-out ${className}`}
      >
        <CartIcon />
      </button>
    </>
  );
}
