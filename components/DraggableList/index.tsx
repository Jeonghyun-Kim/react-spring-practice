import React from 'react';
import swap from 'lodash-move';
import { useDrag } from 'react-use-gesture';
import { useSprings } from '@react-spring/core';
import { a } from '@react-spring/web';

import { clamp } from '../../lib/utils';

import { Content } from './styles';

const fn = (
  order: number[],
  down: boolean,
  originalIndex: number,
  curIndex: number,
  y: number,
) => (index: number) =>
  down && index === originalIndex
    ? {
        y: curIndex * 100 + y,
        scale: 1.1,
        zIndex: 1,
        shadow: 15,
        immediate: (n: string) => n === 'y' || n === 'zIndex',
      }
    : {
        y: order.indexOf(index) * 100,
        scale: 1,
        zIndex: 0,
        shadow: 5,
        immediate: false,
      };

interface props {
  items: string[];
}
const DraggableList: React.FC<props> = React.memo(({ items, ...props }) => {
  const order = React.useRef(items.map((_, index) => index));
  const [springs, setSprings] = useSprings(
    items.length,
    fn(order.current, false, 0, 0, 0),
  );
  const bind = useDrag(
    ({ args: [originalIndex], down, offset: [, y], lastOffset: [, dy] }) => {
      const curIndex = order.current.indexOf(originalIndex);
      const curRow = clamp(
        Math.round((curIndex * 100 + y - dy) / 100),
        0,
        items.length - 1,
      );
      const newOrder = swap(order.current, curIndex, curRow);
      setSprings(fn(newOrder, down, originalIndex, curIndex, y - dy));
      if (!down) order.current = newOrder;
    },
  );

  return (
    <Content style={{ height: items.length * 100 }} {...props}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <a.div
          {...bind(i)}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={{
            zIndex: zIndex as never,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`,
            ) as never,
            y,
            scale,
          }}>
          {items[i]}
        </a.div>
      ))}
    </Content>
  );
});

export default DraggableList;
