import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';

type BreakfastType = {
  hasBreakfast?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
};

export function useCheckin() {
  const queryClient = useQueryClient();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: BreakfastType;
    }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    //data is the same as returned data from mutationFn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ type: 'active' }); //invalidates all queries active on the page
    },

    onError: () => toast.error('There was an error while checking in'),
  });
  return { checkin, isCheckingIn };
}
