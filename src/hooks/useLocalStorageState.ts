import { useState, useEffect } from 'react';

export function useLocalStorageState(initialValue: any, key: string) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, value);
    },
    [value, key],
  );

  return [value, setValue];
}
