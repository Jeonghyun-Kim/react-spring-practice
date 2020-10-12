import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { MinusSquare, CloseSquare, PlusSquare } from './icons';

import useMeasure from '../lib/hooks/useMeasure';
import usePrevious from '../lib/hooks/usePrevious';

const Root = styled.div`
  position: relative;
  padding: 4px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: middle;
  color: white;
  fill: white;
  .title {
    vertical-align: middle;
  }
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 10px;
    vertical-align: middle;
    &:hover {
      cursor: pointer;
    }
  }
`;

interface ContentProps {
  opacity: string;
  height: string;
}
const Content = styled.div<ContentProps>`
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  overflow: hidden;
  opacity: ${(props) => props.opacity};
  height: ${(props) => props.height};
`;

interface props {
  name: string | React.ReactNode;
  className?: string | undefined;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}
const Tree: React.FC<props> = React.memo(
  ({ name, className = '', children, defaultOpen = false, ...props }) => {
    const [isOpen, setOpen] = React.useState<boolean>(defaultOpen);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring({
      from: { height: 0, opacity: 0, transform: 'translate3d(20px, 0, 0)' },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        transform: `translate3d(${isOpen ? 0 : 20}px, 0, 0)`,
      },
    });
    // eslint-disable-next-line no-nested-ternary
    const Icon = children ? (isOpen ? MinusSquare : PlusSquare) : CloseSquare;

    return (
      <Root className={`${className}`} {...props}>
        <Icon
          style={{ opacity: children ? 1 : 0.3 }}
          onClick={() => setOpen(!isOpen)}
        />
        <h1 className="title">{name}</h1>
        <Content
          opacity={`${opacity}`}
          height={
            isOpen && Boolean(previous) === isOpen ? 'auto' : `${height}px`
          }>
          <animated.div style={{ transform }} {...bind}>
            {children}
          </animated.div>
        </Content>
      </Root>
    );
  },
);

export default Tree;
