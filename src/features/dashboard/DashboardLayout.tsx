import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';
import { WithoutNullableKeys } from '../../types/WithoutNullableKeys';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';
import Spinner from '../../ui/Spinner';

function DashboardLayout() {
  const { isLoading: isLoadingRB, bookings } = useRecentBookings();
  const { isLoading: isLoadingRS, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingC } = useCabins();

  if (isLoadingRB || isLoadingRS || isLoadingC) return <Spinner />;

  const stays = confirmedStays!.map((stay) => {
    const { id, cabinId, numNights } = stay as WithoutNullableKeys<typeof stay>;
    return { id, cabinId, numNights };
  });

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_34rem_auto] gap-10">
      <Stats
        bookings={bookings!}
        confirmedStays={confirmedStays!}
        numDays={numDays}
        cabinCount={cabins!?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={stays} />
      <SalesChart bookings={bookings!} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
