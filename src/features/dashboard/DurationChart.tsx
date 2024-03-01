import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#c2410c',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#a16207',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#4d7c0f',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#15803d',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#1d4ed8',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
];

type StartDataType = typeof startDataDark;

function prepareData(startData: StartDataType, stays: ConfirmedStaysType) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(acc: StartDataType, field: string) {
    return acc.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((acc, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(acc, '1 night');
      if (num === 2) return incArrayValue(acc, '2 nights');
      if (num === 3) return incArrayValue(acc, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(acc, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(acc, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(acc, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(acc, '15-21 nights');
      if (num >= 21) return incArrayValue(acc, '21+ nights');
      return acc;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

type ConfirmedStaysType = {
  id: number;
  cabinId: number;
  numNights: number;
}[];

type DurationChartProps = {
  confirmedStays: ConfirmedStaysType;
};

function DurationChart({ confirmedStays }: DurationChartProps) {
  const { mode } = useDarkMode();

  const startData = mode === 'dark' ? startDataDark : startDataLight;

  const data = prepareData(startData, confirmedStays);

  return (
    <div className="col-span-2 col-start-3 rounded-lg bg-primary_color px-14 py-10">
      <h2 className="h2 mb-6">Stay duration summary</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart className="font-semibold">
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={80}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            // @ts-ignore
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;
