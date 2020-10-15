import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Root = styled.div`
  padding: 30px;
`;

const IndexPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>react-spring Examples</title>
      </Head>
      <Root>
        <Link href="/tree">
          <a>
            <h4>Tree</h4>
          </a>
        </Link>
        <Link href="/drag">
          <a>
            <h4>Draggable List</h4>
          </a>
        </Link>
        <Link href="/slider">
          <a>
            <h4>Page Slider</h4>
          </a>
        </Link>
      </Root>
    </>
  );
};

export default IndexPage;
