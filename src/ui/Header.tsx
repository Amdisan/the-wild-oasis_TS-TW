import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

function Header() {
  return (
    <header className="flex items-center justify-end gap-10 bg-primary_color px-20 py-5">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
