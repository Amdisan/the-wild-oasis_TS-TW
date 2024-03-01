import { format, isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useDeleteBooking } from './useDeleteBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';

import { Tables } from '../../types/supabase_types';

interface Booking
  extends Omit<
    Tables<'bookings'>,
    | 'cabinId'
    | 'cabinPrice'
    | 'extrasPrice'
    | 'guestId'
    | 'hasBreakfast'
    | 'isPaid'
    | 'observations'
  > {
  guests: Pick<Tables<'guests'>, 'fullName' | 'email'> | null;
  cabins: Pick<Tables<'cabins'>, 'name'> | null;
}

type BookingRowProps = {
  booking: Booking;
};

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}: BookingRowProps) {
  const guestName = guests?.fullName;
  const email = guests?.email;
  const cabinName = cabins?.name;
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <div className="font-sono text-2xl font-semibold text-text_color">
        {cabinName}
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-medium">{guestName}</span>
        <span className="text-xl text-text_gray_color">{email}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {startDate && isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span className="text-xl text-text_gray_color">
          {startDate && format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {endDate && format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </div>

      <span
        className={`w-fit rounded-full px-5 py-2 text-xl font-semibold uppercase
        ${status === 'unconfirmed' && 'bg-unconfirmed_bg_color text-unconfirmed_text_color'}
        ${status === 'checked-in' && 'bg-checked_in_bg_color text-checked_in_text_color'}
        ${status === 'checked-out' && 'bg-checked_out_bg_color text-checked_out_text_color'}`}
      >
        {status?.replace('-', ' ')}
      </span>

      <div className="font-sono font-medium">{formatCurrency(totalPrice)}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye className="h-7 w-7" />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare className="h-7 w-7" />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare className="h-7 w-7" />}
                onClick={() => checkout(bookingId)}
                isDisabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash className="h-7 w-7" />}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
