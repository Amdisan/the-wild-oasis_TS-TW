import { formatCurrency } from '../../utils/helpers';
import { Tables } from '../../types/supabase_types';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';

type StatsProps = {
  bookings: {
    createdAt: string;
    totalPrice: number | null;
    extrasPrice: number | null;
  }[];
  confirmedStays: Tables<'bookings'>[];
  numDays: number;
  cabinCount: number;
};

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  //1
  const numBookings = bookings.length;

  //2
  const sales = bookings.reduce((acc, cur) => {
    if (cur.totalPrice) {
      return acc + cur.totalPrice;
    }
    return acc;
  }, 0);

  //3
  const checkins = confirmedStays.length;

  //4
  const occupation =
    confirmedStays.reduce((acc, cur) => {
      if (cur.numNights) {
        return acc + cur.numNights;
      }
      return acc;
    }, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="text-sky-700 dark:text-sky-200"
        bgColor="bg-sky-200 dark:bg-sky-700"
        icon={<HiOutlineBriefcase className="h-14 w-14" />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="text-emerald-700 dark:text-emerald-200"
        bgColor="bg-emerald-200 dark:bg-emerald-700"
        icon={<HiOutlineBanknotes className="h-14 w-14" />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="text-indigo-700 dark:text-indigo-200"
        bgColor="bg-indigo-200 dark:bg-indigo-700"
        icon={<HiOutlineCalendarDays className="h-14 w-14" />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="text-yellow-700 dark:text-yellow-200"
        bgColor="bg-yellow-200 dark:bg-yellow-700"
        icon={<HiOutlineChartBar className="h-14 w-14" />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

export default Stats;
