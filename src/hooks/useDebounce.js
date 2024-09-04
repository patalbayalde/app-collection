import React, { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedText, setDebouncedText] = useState('');

  const handleSetTimeout = () => {
    setDebouncedText(value);
  };

  useEffect(() => {
    const timer = setTimeout(handleSetTimeout, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedText;
}
