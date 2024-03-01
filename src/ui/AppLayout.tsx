import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-layout_cols grid-rows-layout_rows">
      <Header />
      <Sidebar />
      <main className="bg-secondary_color overflow-y-scroll py-16 pl-20 pr-24">
        <div className="mx-auto flex max-w-[120rem] flex-col gap-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
