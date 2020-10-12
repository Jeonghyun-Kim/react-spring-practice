import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface Bound {
  top: number;
  left: number;
  width: number;
  height: number;
}

const defaultBound: Bound = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

const useMeasure: () => [
  {
    ref: React.MutableRefObject<HTMLDivElement | null>;
  },
  Bound,
] = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [bounds, set] = React.useState<Bound>(defaultBound);
  const [ro] = React.useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  );

  React.useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ro]);

  return [{ ref }, bounds];
};

export default useMeasure;
