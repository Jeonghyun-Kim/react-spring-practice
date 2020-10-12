import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  &.full {
    grid-row: 1 / 3;
    grid-column: 1 / 3;
    width: 100vw;
    height: 100vh;
  }
`;

interface Props {
  full?: boolean;
  children?: React.ReactNode;
}
const Loading: React.FC<Props> = ({ full = false, children, ...props }) => {
  return (
    <Root className={`${full ? 'full' : ''}`} {...props}>
      {children ?? <h1>Loading...</h1>}
    </Root>
  );
};

export default Loading;
