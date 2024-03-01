import {
  Dispatch,
  MouseEvent,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

type PositionType = {
  x: number;
  y: number;
} | null;

type MenusContextTypes = {
  openId: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
  position: PositionType;
  setPosition: Dispatch<SetStateAction<PositionType>>;
};

const MenusContext = createContext<MenusContextTypes>(null!);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState<PositionType>(null);
  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ id }: { id: number }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    const rect = target.closest('button')?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    }

    openId === '' || openId !== String(id) ? open(String(id)) : close();
  }

  return (
    <button
      className="rounded-md  border border-border_color p-2 text-text_color transition duration-300 hover:border-border_second_color hover:bg-secondary_color"
      onClick={handleClick}
    >
      <HiEllipsisVertical className="h-10 w-10" />
    </button>
  );
}

function List({ id, children }: { id: number; children: ReactNode }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(close, false);
  if (openId !== String(id)) return null;

  return createPortal(
    <ul
      className={`fixed rounded-lg border border-border_color bg-primary_color text-text_gray_color shadow-md`}
      style={{
        right: `${Math.round(position!.x)}px`,
        top: `${Math.round(position!.y)}px`,
      }}
      ref={ref}
    >
      {children}
    </ul>,
    document.body,
  );
}

type ButtonProps = {
  isDisabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  icon: ReactElement;
};

function Button({ children, icon, onClick, isDisabled }: ButtonProps) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        disabled={isDisabled}
        className="flex w-full items-center  gap-6 rounded-lg  px-10 py-5 text-left text-2xl transition duration-300 hover:bg-secondary_color hover:text-text_color"
        onClick={handleClick}
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
