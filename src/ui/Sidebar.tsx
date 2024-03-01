import Logo from './Logo';
import MainNav from './MainNav';
import Uploader from '../data/Uploader';

function Sidebar() {
  return (
    <aside className="row-span-full flex flex-col gap-14 bg-primary_color px-10 py-12">
      <Logo />
      <MainNav />
      <Uploader />
    </aside>
  );
}

export default Sidebar;
