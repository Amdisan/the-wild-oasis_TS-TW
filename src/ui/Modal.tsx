import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
} from 'react';
import { cloneElement, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

type ModalContextType = {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
};

const ModalContext = createContext<ModalContextType>(null!);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement;
  opens: string;
}) {
  const { open } = useContext<ModalContextType>(ModalContext);
  //need clone to add new props
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

//react portal allows to render component anywhere in the DOM
function Window({ children, name }: { children: ReactElement; name: string }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 h-dvh w-full bg-secondary_color backdrop-blur-sm transition duration-500">
      <div
        className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-primary_color px-16 py-14 shadow-lg transition duration-500"
        ref={ref}
      >
        <button
          className="absolute right-8 top-5 translate-x-3 rounded-md border border-primary_color p-2 text-text_color transition duration-300 hover:border-border_second_color hover:bg-secondary_color"
          onClick={close}
        >
          <HiXMark className="h-10 w-10" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
