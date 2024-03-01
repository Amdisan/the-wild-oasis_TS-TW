import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const { bookingId } = useParams();
  if (bookingId) {
    const {
      isLoading,
      data: booking,
      error,
    } = useQuery({
      queryKey: ['booking', bookingId],
      queryFn: () => getBooking(bookingId),
      retry: false, // react query will not try 3 times to fetch data, only one time
    });
    return { isLoading, booking, error };
  }
  return {
    isLoading: false,
    booking: { status: undefined, id: undefined, isPaid: undefined },
    error: {},
  };
}
