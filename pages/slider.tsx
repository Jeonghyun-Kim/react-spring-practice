import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useSprings } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { useWindowSize } from 'react-use';

import { clamp } from '../lib/utils';

const Root = styled.div`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  & > div {
    position: absolute;
    width: 100vw;
    height: 100vh;
    & > div {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 100%;
      box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
        0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
    }
  }
`;

const pages = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
];

const SliderPage: React.FC = () => {
  const { width: innerWidth } = useWindowSize();
  const index = React.useRef(0);
  const [springs, setSprings] = useSprings(
    pages.length,
    (i: number) => ({
      x: i * innerWidth,
      scale: 1,
      display: 'block',
    }),
    [innerWidth],
  );

  const bind = useDrag(({ down, offset: [x], lastOffset: [lastX], cancel }) => {
    if (down && Math.abs(x - lastX) > innerWidth / 2) {
      index.current = clamp(
        index.current + (x - lastX > 0 ? -1 : 1),
        0,
        pages.length - 1,
      );
      if (cancel) cancel();
    }
    setSprings((i: number) => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: 'none' };
      const xT = (i - index.current) * innerWidth + (down ? x - lastX : 0);
      const scaleT = down ? 1 - Math.abs(x - lastX) / innerWidth / 2 : 1;
      return { x: xT, scale: scaleT, display: 'block' };
    });
  });

  return (
    <>
      <Head>
        <title>react-spring slider example</title>
      </Head>
      <Root>
        {typeof window !== 'undefined' &&
          springs.map(({ x, display, scale }, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <a.div {...bind()} key={i} style={{ display: display as never, x }}>
              <a.div
                style={{ scale, backgroundImage: `url(${pages[i]})` as never }}
              />
            </a.div>
          ))}
      </Root>
    </>
  );
};

export default SliderPage;
