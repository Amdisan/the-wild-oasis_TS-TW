import Button from '../../ui/Button';
import CheckoutButton from './CheckoutButton';

type TodayItemProps = {
  activity: {
    id: number;
    status: string;
    guests: {
      fullName: string;
      nationality: string;
      countryFlag: string;
    };
    numNights: number;
  };
};

function TodayItem({ activity }: TodayItemProps) {
  const {
    id,
    status,
    guests: { nationality: country, fullName, countryFlag },
    numNights,
  } = activity;
  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_7rem_9rem] items-center gap-5 border-b border-border_color py-3 text-2xl first:border-t first:border-t-border_color">
      {status === 'checked-in' && (
        <span
          className={`rounded-full px-4 py-1 text-center text-[1.1rem] font-semibold uppercase
        ${status === ('unconfirmed' as string) && 'bg-unconfirmed_bg_color text-unconfirmed_text_color'}
        ${status === ('checked-in' as string) && 'bg-checked_in_bg_color text-checked_in_text_color'}
        ${status === ('checked-out' as string) && 'bg-checked_out_bg_color text-checked_out_text_color'}`}
        >
          Arriving
        </span>
      )}
      {status === 'unconfirmed' && (
        <span
          className={`rounded-full px-4 py-1 text-center text-[1.1rem] font-semibold uppercase
        ${status === ('unconfirmed' as string) && 'bg-unconfirmed_bg_color text-unconfirmed_text_color'}
        ${status === ('checked-in' as string) && 'bg-checked_in_bg_color text-checked_in_text_color'}
        ${status === ('checked-out' as string) && 'bg-checked_out_bg_color text-checked_out_text_color'}`}
        >
          Departing
        </span>
      )}
      <img
        className="block max-w-8 rounded-sm border border-border_color"
        src={countryFlag}
        alt={`Flag of ${country}`}
      />
      <div className="text-[1.3rem] font-medium">{fullName}</div>
      <div className="text-[1.4rem]">{numNights} nights</div>
      {status === 'unconfirmed' && (
        <Button as="link" to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </li>
  );
}

export default TodayItem;
