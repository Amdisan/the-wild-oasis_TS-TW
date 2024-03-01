import { useTodayActivity } from './useTodayActivity';
import { WithoutNullableKeys } from '../../types/WithoutNullableKeys';
import Spinner from '../../ui/Spinner';
import TodayItem from './TodayItem';

function TodayActivity() {
  //to make this work  need to upload bookings again to make date -> todays's date or there will be empty array
  const { isLoading, activities } = useTodayActivity();

  return (
    <div className="col-span-2 col-start-1 flex flex-col gap-10 rounded-lg bg-primary_color px-14 pb-14 pt-10 text-text_color">
      <div className="flex items-center justify-between">
        <h2 className="h2">Today</h2>
      </div>
      {isLoading ? (
        <Spinner />
      ) : activities && activities?.length > 0 ? (
        <ul className="scrollbar-hide overflow-scroll overflow-x-hidden">
          {activities.map((activity) => {
            const { id, status, guests, numNights } =
              activity as WithoutNullableKeys<typeof activity>;

            return (
              <TodayItem
                activity={{ id, status, guests, numNights }}
                key={activity.id}
              />
            );
          })}
        </ul>
      ) : (
        <p className=" mt-3 text-center text-3xl font-medium">
          No Activity today...
        </p>
      )}
    </div>
  );
}

export default TodayActivity;
