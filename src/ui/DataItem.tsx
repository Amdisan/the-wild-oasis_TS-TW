import { ReactElement, ReactNode } from 'react';

type DataItemProps = {
  icon: ReactElement;
  label: string;
  children: ReactNode;
};

function DataItem({ icon, label, children }: DataItemProps) {
  return (
    <div className="flex items-center gap-6 py-3 text-text_color">
      <span className="flex items-center gap-3 font-medium">
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
