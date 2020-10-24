/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
// import { useSprings } from '@react-spring/core';
// import { a } from '@react-spring/web';
import { useSprings, animated } from 'react-spring';
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
    width: 100%;
    height: 100%;
    & > div {
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 100%;
      box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
        0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
      .box {
        position: absolute;
        width: 300px;
        height: 200px;
        background-color: rebeccapurple;
        border-radius: 15px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

const pages = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
];

const SliderPage = () => {
  const { width: innerWidth } = useWindowSize();
  const index = React.useRef(0);
  const [springs, setSprings] = useSprings(pages.length, (i) => ({
    x: (i - index.current) * innerWidth,
    scale: 1,
    display: 'block',
  }));

  const bind = useDrag(({ down, offset: [x], lastOffset: [lastX], cancel }) => {
    if (down && Math.abs(x - lastX) > innerWidth / 3) {
      index.current = clamp(
        index.current + (x - lastX > 0 ? -1 : 1),
        0,
        pages.length - 1,
      );
      if (cancel) cancel();
    }
    setSprings((i) => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: 'none' };
      const xT = (i - index.current) * innerWidth + (down ? x - lastX : 0);
      const scaleT = down ? 1 - Math.abs(x - lastX) / innerWidth / 4 : 1;
      return { x: xT, scale: scaleT, display: 'block' };
    });
  });

  const moveSprings = React.useCallback(() => {
    setSprings((i) => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: 'none' };
      const xT = (i - index.current) * innerWidth;
      return { x: xT, display: 'block' };
    });
  }, [innerWidth, setSprings]);

  const handleRight = React.useCallback(() => {
    index.current = clamp(index.current + 1, 0, pages.length - 1);
    moveSprings();
  }, [moveSprings]);

  const handleLeft = React.useCallback(() => {
    index.current = clamp(index.current - 1, 0, pages.length - 1);
    moveSprings();
  }, [moveSprings]);

  const handleGoTo = React.useCallback(
    (i) => {
      index.current = i;
      moveSprings();
    },
    [moveSprings],
  );

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') handleRight();
      if (e.key === 'ArrowLeft') handleLeft();
      if (e.key === '1') handleGoTo(0);
      if (e.key === '2') handleGoTo(1);
      if (e.key === '3') handleGoTo(2);
      if (e.key === '4') handleGoTo(3);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleLeft, handleRight, handleGoTo]);

  return (
    <>
      <Head>
        <title>react-spring slider example</title>
      </Head>
      <Root>
        {typeof window !== 'undefined' &&
          springs.map(({ x, display, scale }, i) => (
            <animated.div
              {...bind()}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              style={{
                display,
                transform: x.interpolate((xT) => `translate3d(${xT}px,0,0)`),
              }}>
              <animated.div
                style={{
                  transform: scale.interpolate((s) => `scale(${s})`),
                  backgroundImage: `url(${pages[i]})`,
                }}>
                <div className="box" />
              </animated.div>
            </animated.div>
          ))}
      </Root>
    </>
  );
};

export default SliderPage;
