import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type PathType = {
  pathname?: string;
  search?: string;
};

type BookingsPathContextType = {
  path: PathType | undefined;
  setPath: Dispatch<SetStateAction<PathType | undefined>>;
};

const BookingsPathContext = createContext<BookingsPathContextType>(null!);

function BookingsPathProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<PathType>();

  return (
    <BookingsPathContext.Provider value={{ path, setPath }}>
      {children}
    </BookingsPathContext.Provider>
  );
}

function useBookingsPath() {
  const context = useContext<BookingsPathContextType>(BookingsPathContext);
  if (context === undefined)
    throw new Error(
      'BookingsPathContext was used outside of BookingsPathProvider',
    );
  return context;
}

export { BookingsPathProvider, useBookingsPath };
