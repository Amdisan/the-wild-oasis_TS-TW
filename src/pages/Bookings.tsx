import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useBookingsPath } from '../context/BookingsPathContext';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

function Bookings() {
  const { pathname, search } = useLocation();
  const { setPath } = useBookingsPath();

  useEffect(
    function () {
      setPath({ pathname, search });
    },
    [pathname, search],
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="h1">All bookings</h1>
        <BookingTableOperations />
      </div>
      <BookingTable />
    </>
  );
}

export default Bookings;
