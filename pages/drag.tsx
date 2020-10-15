import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import DraggableList from '../components/DraggableList';

const Root = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const DragPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>react-spring drag example</title>
      </Head>
      <Root>
        <DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />
      </Root>
    </>
  );
};

export default DragPage;
