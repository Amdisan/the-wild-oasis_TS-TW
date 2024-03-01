import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { useDarkMode } from '../../context/DarkModeContext';

type SalesChartProps = {
  bookings: {
    createdAt: string;
    totalPrice: number | null;
    extrasPrice: number | null;
  }[];
  numDays: number;
};

function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { mode } = useDarkMode();
  
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => {
          if (cur.totalPrice) {
            return acc + cur.totalPrice;
          }

          return acc;
        }, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => {
          if (cur.extrasPrice) {
            return acc + cur.extrasPrice;
          }
          return acc;
        }, 0),
    };
  });

  const colors =
    mode === 'dark'
      ? {
          totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
          extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
          text: '#e5e7eb',
          background: '#18212f',
        }
      : {
          totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
          extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
          text: '#374151',
          background: '#fff',
        };

  return (
    <div className="col-span-full flex flex-col gap-10 rounded-lg bg-primary_color p-14">
      <h2 className="h2">
        Sales from {format(allDates.at(0) as Date, 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1) as Date, 'MMM dd yyyy')}
      </h2>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" className="stroke-border_color" />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              color: colors.text,
            }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
