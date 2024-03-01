import { PropsWithChildren, ReactElement } from 'react';

interface FormRowType extends PropsWithChildren {
  label?: string;
  error?: string | undefined;
  children: ReactElement;
}

function FormRow({ label, error, children }: FormRowType) {
  return (
    <div className="grid grid-cols-form_row_cols items-center gap-10 py-5 first:pt-0 last:pb-0">
      {/*children = Input component has id as props which can be used as htmlFor for the label */}
      {label && (
        <label
          className="font-medium text-text_color"
          htmlFor={children?.props?.id}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-2xl text-danger_primary_color">{error}</span>
      )}
    </div>
  );
}

export default FormRow;
