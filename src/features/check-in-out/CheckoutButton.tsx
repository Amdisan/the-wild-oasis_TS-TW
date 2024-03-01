import { useCheckout } from './useCheckout';

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <button
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
      className={`duration-300'px-3 rounded-xl border border-brand_bg_color bg-brand_bg_color py-1 text-center text-[1.15rem] font-semibold uppercase text-brand_text_color shadow-sm transition hover:border-brand_bg_hover_color hover:bg-brand_bg_hover_color`}
    >
      Check out
    </button>
  );
}

export default CheckoutButton;
