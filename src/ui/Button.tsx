import { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  icon?: ReactElement | null;
  variation?: string;
  as?: string;
  to?: string;
  size?: string;
  isDisabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  children: ReactNode;
};

function Button({
  variation = 'primary',
  size = 'medium',
  as = '',
  to = '',
  icon,
  isDisabled,
  type = 'button',
  onClick,
  children,
}: ButtonProps) {
  if (as) {
    return (
      <>
        <Link
          to={to}
          className={`rounded-xl border border-brand_bg_color bg-brand_bg_color px-3 py-1 text-center text-[1.15rem] font-semibold uppercase text-brand_text_color shadow-sm transition duration-300 hover:border-brand_bg_hover_color hover:bg-brand_bg_hover_color`}
        >
          {children}
        </Link>
      </>
    );
  }

  return (
    <>
      <button
        disabled={isDisabled}
        type={type}
        onClick={onClick}
        className={`rounded-md border shadow-sm transition duration-300
        ${
          size === 'small' &&
          'px-3 py-2 text-center text-xl font-semibold uppercase'
        }
        ${size === 'medium' && 'px-6 py-5 text-[1.4rem] font-medium '}
        ${size === 'large' && 'px-10 py-5 text-[1.6rem] font-medium '}
        ${variation === 'primary' && 'border-brand_bg_color bg-brand_bg_color text-brand_text_color hover:border-brand_bg_hover_color hover:bg-brand_bg_hover_color'}
        ${variation === 'secondary' && 'border-border_color bg-primary_color text-text_gray_color hover:border-border_second_color hover:bg-secondary_color hover:text-text_color'}
        ${variation === 'danger' && 'border-danger_primary_color bg-danger_primary_color text-danger_text_prime_color hover:border-danger_secondary_color hover:bg-danger_secondary_color hover:text-danger_text_second_color '}`}
      >
        <div className="flex items-center justify-center gap-2">
          {icon}
          {children}
        </div>
      </button>
    </>
  );
}

export default Button;
