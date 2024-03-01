import { ReactNode } from 'react';

type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  id: string;
  children: ReactNode;
};

function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: CheckBoxProps) {
  return (
    <div className="flex gap-6">
      <input
        className="h-10 w-10 accent-brand_bg_color outline-offset-2 disabled:accent-brand_bg_color"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        className="flex flex-1 items-center gap-3"
        htmlFor={!disabled ? id : ' '}
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
