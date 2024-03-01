import { format, isToday } from 'date-fns';
import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import { Tables } from '../../types/supabase_types';
import DataItem from '../../ui/DataItem';

interface Booking extends Omit<Tables<'bookings'>, 'cabinId' | 'guestId'> {
  guests: Omit<Tables<'guests'>, 'id' | 'createdAt'> | null;
  cabins: Pick<Tables<'cabins'>, 'name'> | null;
}

type BookingDataBoxProps = {
  booking: Booking;
};

// A purely presentational component
function BookingDataBox({ booking }: BookingDataBoxProps) {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests,
    cabins,
  } = booking;
  const guestName = guests?.fullName;
  const email = guests?.email;
  const country = guests?.nationality;
  const countryFlag = guests?.countryFlag;
  const nationalID = guests?.nationalID;
  const cabinName = cabins?.name;

  return (
    <section className="borde overflow-hidden rounded-lg border-border_color bg-primary_color">
      <header className="flex items-center justify-between bg-brand_bg_color px-16 py-8 text-3xl font-medium text-brand_text_color">
        <div className="flex items-center gap-7 text-3xl font-semibold">
          <HiOutlineHomeModern className="h-14 w-14" />
          <p>
            {numNights} nights in Cabin{' '}
            <span className="ml-1 font-sono text-4xl">{cabinName}</span>
          </p>
        </div>

        <p>
          {startDate && format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {startDate && isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate as string)}
          ) &mdash; {endDate && format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </header>

      <section className="px-16 pb-5 pt-14">
        <div className="mb-6 flex items-center gap-5 text-text_gray_color">
          {countryFlag && (
            <img
              className="block max-w-8 rounded-sm border border-border_color "
              src={countryFlag}
              alt={`Flag of ${country}`}
            />
          )}
          <p className="font-medium text-text_color">
            {guestName} {numGuests! > 1 ? `+ ${numGuests! - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={
              <HiOutlineChatBubbleBottomCenterText className="h-8 w-8 text-brand_bg_color" />
            }
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem
          icon={
            <HiOutlineCheckCircle className="h-8 w-8 text-brand_bg_color" />
          }
          label="Breakfast included?"
        >
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <div
          className={`mt-10 flex items-center justify-between rounded-md  px-14 py-6 ${isPaid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100' : 'bg-yellow-100 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100'}`}
        >
          <DataItem
            icon={<HiOutlineCurrencyDollar className="h-10 w-10" />}
            label={`Total price`}
          >
            {formatCurrency(totalPrice as number)}
np
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice as number)} cabin + ${formatCurrency(
                extrasPrice as number,
              )} breakfast)`}
          </DataItem>

          <p className="text-2xl font-semibold uppercase">
            {isPaid ? 'Paid' : 'Will pay at property'}
          </p>
        </div>
      </section>

      <footer className="px-16 py-6 text-center text-xl text-text_gray_color">
        <p>Booked {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
