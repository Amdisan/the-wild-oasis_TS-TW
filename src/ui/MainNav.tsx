import { NavLink } from 'react-router-dom';
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3 text-text_gray_color">
        <li className="group">
          <NavLink
            className="flex items-center gap-3 px-10 py-5 text-[1.6rem] font-medium transition duration-300 group-hover:rounded-lg group-hover:bg-secondary_color group-hover:text-text_color [&.active]:rounded-lg [&.active]:bg-secondary_color [&.active]:text-text_color"
            to="/dashboard"
          >
            <span>
              <HiOutlineHome className="h-10 w-10 text-text_gray_color transition duration-300 group-hover:text-brand_bg_color group-[&>.active]:text-brand_bg_color" />
            </span>
            <span>Home</span>
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            className="flex items-center gap-3 px-10 py-5 text-[1.6rem] font-medium transition duration-300 group-hover:rounded-lg group-hover:bg-secondary_color group-hover:text-text_color [&.active]:rounded-lg [&.active]:bg-secondary_color [&.active]:text-text_color"
            to="/bookings"
          >
            <HiOutlineCalendarDays className="h-10 w-10 text-text_gray_color transition duration-300 group-hover:text-brand_bg_color group-[&>.active]:text-brand_bg_color" />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            className="flex items-center gap-3 px-10 py-5 text-[1.6rem] font-medium transition duration-300 group-hover:rounded-lg group-hover:bg-secondary_color group-hover:text-text_color [&.active]:rounded-lg [&.active]:bg-secondary_color [&.active]:text-text_color"
            to="/cabins"
          >
            <HiOutlineHomeModern className="h-10 w-10 text-text_gray_color transition duration-300 group-hover:text-brand_bg_color group-[&>.active]:text-brand_bg_color" />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            className="flex items-center gap-3 px-10 py-5 text-[1.6rem] font-medium transition duration-300 group-hover:rounded-lg group-hover:bg-secondary_color group-hover:text-text_color [&.active]:rounded-lg [&.active]:bg-secondary_color [&.active]:text-text_color"
            to="/users"
          >
            <HiOutlineUsers className="h-10 w-10 text-text_gray_color transition duration-300 group-hover:text-brand_bg_color group-[&>.active]:text-brand_bg_color" />
            <span>Users</span>
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            className="flex items-center gap-3 px-10 py-5 text-[1.6rem] font-medium transition duration-300 group-hover:rounded-lg group-hover:bg-secondary_color group-hover:text-text_color [&.active]:rounded-lg [&.active]:bg-secondary_color [&.active]:text-text_color"
            to="/settings"
          >
            <HiOutlineCog6Tooth className="h-10 w-10 text-text_gray_color transition duration-300 group-hover:text-brand_bg_color group-[&>.active]:text-brand_bg_color" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
