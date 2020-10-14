import styled from 'styled-components';
import { animated } from '@react-spring/web';

const Frame = styled('div')`
  position: relative;
  padding-top: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: middle;
  /* color: white;
  fill: white; */
`;

const Title = styled('span')`
  vertical-align: middle;
`;

const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

export { Frame, Content, Title };
