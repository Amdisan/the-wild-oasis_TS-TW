import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useNavigate } from 'react-router-dom';
import { useDeleteBooking } from './useDeleteBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import {
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
  HiTrash,
} from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';
import BookingDataBox from './BookingDataBox';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';

function BookingDetail() {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { booking, isLoading } = useBooking();
  const status = booking?.status;
  const bookingId = booking?.id;
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking?.id) return <Empty resource="booking" />;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h1 className="h1">Booking #{bookingId}</h1>
          <span
            className={`rounded-full px-5 py-2 text-xl font-semibold uppercase
             ${status === 'unconfirmed' && 'bg-unconfirmed_bg_color text-unconfirmed_text_color'}
             ${status === 'checked-in' && 'bg-checked_in_bg_color text-checked_in_text_color'}
             ${status === 'checked-out' && 'bg-checked_out_bg_color text-checked_out_text_color'}`}
          >
            {status?.replace('-', ' ')}
          </span>
        </div>
        <button
          className="rounded-md text-center font-medium text-brand_bg_color transition duration-300 hover:text-brand_bg_hover_color active:text-brand_bg_hover_color "
          onClick={moveBack}
        >
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex justify-end gap-5">
        {status === 'unconfirmed' && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() =>
              checkout(bookingId!, { onSettled: () => navigate(-1) })
            }
            isDisabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" icon={<HiTrash />}>
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId!, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
}

export default BookingDetail;
