import { PropsWithChildren, ReactElement } from 'react';

interface FormRowVerticalProps extends PropsWithChildren {
  label?: string;
  error?: string | undefined;
  children: ReactElement;
}

function FormRowVertical({ label, error, children }: FormRowVerticalProps) {
  return (
    <div className="flex flex-col gap-3 py-5">
      {label && (
        <label className="font-medium" htmlFor={children?.props?.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-2xl text-red-700">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
