/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      serif: 'Poppins, san-serif',
      sono: 'Sono, monospace',
    },
    extend: {
      animation: {
        spin_slow: 'spin 2s linear infinite',
      },
      height: {
        //for proper work on mobile device
        screen: '100dvh',
      },
      gridTemplateColumns: {
        layout_cols: '26rem 1fr',
        form_row_cols: '24rem 1fr 1.2fr',
      },
      gridTemplateRows: {
        layout_rows: 'auto 1fr',
      },
      colors: {
        primary_color: 'var(--primary-color)',
        secondary_color: 'var(--secondary-color)',
        brand_bg_color: 'var(--brand-bg-color)',
        brand_bg_hover_color: 'var(--brand-bg-hover-color)',
        brand_text_color: 'var(--brand-text-color)',
        unconfirmed_text_color: 'var(--unconfirmed-text-color)',
        unconfirmed_bg_color: 'var(--unconfirmed-bg-color)',
        checked_in_text_color: 'var(--checked_in-text-color)',
        checked_in_bg_color: 'var(--checked_in-bg-color)',
        checked_out_text_color: 'var(--checked_out-text-color)',
        checked_out_bg_color: 'var(--checked_out-bg-color)',
        border_color: 'var(--border-color)',
        border_second_color: 'var(--border-second-color)',
        text_color: 'var(--text-color)',
        text_gray_color: 'var(--text-gray-color)',
        danger_primary_color: 'var(--danger-primary-color)',
        danger_secondary_color: 'var(--danger-secondary-color)',
        danger_text_prime_color: 'var(--danger-text-prime-color)',
        danger_text_second_color: 'var(--danger-text-second-color)',
      },
    },
  },
  plugins: [],
};

