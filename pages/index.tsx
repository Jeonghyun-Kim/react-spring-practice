import React from 'react';
import styled from 'styled-components';

import Loading from '../components/Loading';

const Root = styled.div``;

const IndexPage: React.FC = () => {
  return (
    <Root>
      <Loading full />
    </Root>
  );
};

export default IndexPage;
