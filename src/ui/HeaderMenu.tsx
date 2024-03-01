import { useNavigate } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi2';
import DarkModeToggle from './DarkModeToggle';
import Logout from '../features/authentication/Logout';

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex gap-2">
      <li>
        <button
          className="rounded-md bg-none p-2 transition duration-300 hover:bg-secondary_color "
          onClick={() => navigate('/account')}
        >
          <HiOutlineUser className="h-9 w-9 text-brand_bg_color" />
        </button>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
