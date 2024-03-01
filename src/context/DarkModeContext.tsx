import { ReactNode, createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

type DarkModeContextType = {
  mode: 'dark' | 'light';
  toggleMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType>(null!);

function DarkModeProvider({ children }: { children: ReactNode }) {
  const InitialMode =
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';

  const [mode, setMode] = useLocalStorageState(InitialMode, 'color-theme');

  function toggleMode() {
    setMode((mode: 'dark' | 'light') => (mode === 'dark' ? 'light' : 'dark'));
  }

  return (
    <DarkModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext<DarkModeContextType>(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}

export { DarkModeProvider, useDarkMode };
