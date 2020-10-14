import { useRef, useEffect } from 'react';

const usePrevious: (value: unknown) => unknown = (value) => {
  const ref = useRef<unknown>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
