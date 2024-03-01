import { useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

function DarkModeToggle() {
  const { mode, toggleMode } = useDarkMode();

  useEffect(
    function () {
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    },
    [mode],
  );

  return (
    <button
      className="rounded-md bg-none p-2 transition duration-300 hover:bg-secondary_color "
      onClick={toggleMode}
    >
      {mode === 'dark' ? (
        <HiOutlineMoon className="h-9 w-9 text-brand_bg_color" />
      ) : (
        <HiOutlineSun className="h-9 w-9 text-brand_bg_color" />
      )}
    </button>
  );
}

export default DarkModeToggle;
