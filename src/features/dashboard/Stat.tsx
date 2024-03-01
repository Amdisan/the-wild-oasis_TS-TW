import { ReactElement } from 'react';

type StatProps = {
  icon: ReactElement;
  title: string;
  value: number | string;
  color: string;
  bgColor: string;
};

function Stat({ icon, title, value, color, bgColor }: StatProps) {
  return (
    <div className="grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-6 gap-y-2 rounded-xl bg-primary_color p-6 text-text_color">
      <div
        className={`row-span-full flex aspect-square items-center justify-center rounded-full ${color} ${bgColor}`}
      >
        {icon}
      </div>
      <h5 className="self-end text-xl font-semibold uppercase tracking-wider text-text_gray_color">
        {title}
      </h5>
      <p className="text-4xl font-medium">{value}</p>
    </div>
  );
}

export default Stat;
