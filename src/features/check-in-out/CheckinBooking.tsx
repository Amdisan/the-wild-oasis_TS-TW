import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBookingsPath } from '../../context/BookingsPathContext';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';
import { HiArrowDownOnSquare } from 'react-icons/hi2';
import Button from '../../ui/Button';
import BookingDataBox from '../bookings/BookingDataBox';
import Checkbox from '../../ui/Checkbox';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { path } = useBookingsPath();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

  function navigateBookings() {
    if (!path?.search && path?.pathname) {
      navigate(path?.pathname);
    }
    if (path?.search && path?.pathname) {
      navigate(`${path.pathname}${path.search}`);
    }
    if (!path?.search && !path?.pathname) {
      navigate('/');
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking?.id || !settings?.breakfastPrice)
    return <Empty resource="checkin booking" />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numNights && numGuests && settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (
      addBreakfast &&
      typeof optionalBreakfastPrice === 'number' &&
      typeof totalPrice === 'number'
    ) {
      checkin(
        {
          bookingId,
          breakfast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          },
        },
        {
          onSettled: navigateBookings,
        },
      );
    } else {
      checkin(
        { bookingId, breakfast: {} },
        {
          onSettled: navigateBookings,
        },
      );
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="h1">Check in booking #{bookingId}</h1>
        <button
          className="rounded-md text-center font-medium text-brand_bg_color transition duration-300 hover:text-brand_bg_hover_color active:text-brand_bg_hover_color "
          onClick={moveBack}
        >
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div className="rounded-lg bg-primary_color px-16 py-10 text-text_color">
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmPaid((confirmPaid) => !confirmPaid);
            }}
            id="breakfast"
          >
            Want to add breakfast for{' '}
            {formatCurrency(optionalBreakfastPrice as number)}?
          </Checkbox>
        </div>
      )}

      <div className="rounded-lg bg-primary_color px-16 py-10 text-text_color">
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests?.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice as number)
            : `${formatCurrency(
                totalPrice! + optionalBreakfastPrice!,
              )} (${formatCurrency(totalPrice as number)} + ${formatCurrency(
                optionalBreakfastPrice as number,
              )})`}
        </Checkbox>
      </div>

      <div className="flex justify-end gap-5">
        <Button
          icon={<HiArrowDownOnSquare />}
          onClick={handleCheckin}
          isDisabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
}

export default CheckinBooking;
