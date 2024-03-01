import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLDivElement | HTMLUListElement>(
  handler: () => void,
  listenCapturing = true,
) {
  const ref = useRef<T>(null!);

  useEffect(
    function () {
      function handleClick(e: globalThis.MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
          handler();
        }
      }
      // use "true". need to catch only in capturing faze (not bubbling), because modal will close immediately
      document.addEventListener('click', handleClick, listenCapturing);
      return () => document.removeEventListener('click', handleClick);
    },
    [handler, listenCapturing],
  );

  return ref;
}
