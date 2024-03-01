import { useDarkMode } from '../context/DarkModeContext';

function Logo() {
  const { mode } = useDarkMode();

  const src = mode === 'dark' ? '/logo-dark.png' : '/logo-light.png';

  return (
    <div className="flex items-center justify-center text-center">
      <img className="block h-40 w-auto" src={src} alt="Logo" />
    </div>
  );
}

export default Logo;
