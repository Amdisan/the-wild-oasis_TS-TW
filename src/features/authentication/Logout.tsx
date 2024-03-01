import { useLogout } from './useLogout';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <button
      className="rounded-md bg-none p-2 transition duration-300 hover:bg-secondary_color "
      disabled={isLoading}
      onClick={() => logout()}
    >
      {!isLoading ? (
        <HiArrowRightOnRectangle className="h-9 w-9 text-brand_bg_color" />
      ) : (
        <SpinnerMini />
      )}
    </button>
  );
}

export default Logout;
