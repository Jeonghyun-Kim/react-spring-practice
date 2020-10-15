import React from 'react';
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';

import usePrevious from '../../lib/hooks/usePrevious';
import useMeasure from '../../lib/hooks/useMeasure';
import { Frame, Title, Content } from './styles';
import { PlusSquare, MinusSquare, CloseSquare } from '../icons';

interface props {
  name: string | React.ReactNode;
  children?: React.ReactNode;
  titleColor?: string;
  defaultOpen?: boolean;
  className?: string | undefined;
}
const Tree: React.FC<props> = React.memo(
  ({
    name,
    children,
    titleColor,
    defaultOpen = false,
    className = '',
    ...props
  }) => {
    const [isOpen, setOpen] = React.useState<boolean>(defaultOpen);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();

    const [{ height, opacity, x }, animate] = useSpring(
      {
        height: 0,
        opacity: 0,
        x: 20,
      },
      [isOpen],
    );

    React.useEffect(() => {
      animate({
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        x: isOpen ? 0 : 20,
      });
    }, [animate, isOpen, viewHeight]);

    const selectIcon = React.useCallback(() => {
      if (!children) return CloseSquare;
      if (isOpen) return MinusSquare;
      return PlusSquare;
    }, [children, isOpen]);

    const Icon = selectIcon();

    return (
      <Frame className={className} {...props}>
        <Icon opacity={children ? 1 : 0.3} onClick={() => setOpen(!isOpen)} />
        <Title style={{ color: titleColor }}>{name}</Title>
        <Content
          style={{
            opacity: opacity as never,
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}>
          <animated.div style={{ x }} {...bind}>
            {children}
          </animated.div>
        </Content>
      </Frame>
    );
  },
);

export default Tree;
