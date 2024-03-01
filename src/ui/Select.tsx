import { ChangeEvent } from 'react';

type SelectProps = {
  options: { value: string; label: string }[];
  value: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function Select({ options, value, onChange, ...props }: SelectProps) {
  return (
    <div>
      <select
        className="rounded-md border border-border_color bg-primary_color px-5 py-3 text-2xl font-medium text-text_gray_color shadow-sm hover:border-border_second_color hover:bg-secondary_color hover:text-text_color"
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
