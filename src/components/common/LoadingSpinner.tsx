import styled from '@emotion/styled';
import { color } from 'wowds-tokens';
import RainbowSpinner from 'wowds-ui/RainbowSpinner';
import { Flex } from './Wrapper';

const LoadingSpinner = () => {
  return (
    <Wrapper justify="center" align="center">
      <RainbowSpinner width={60} height={60} />
    </Wrapper>
  );
};

export default LoadingSpinner;

const Wrapper = styled(Flex)`
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  gap: 40px;
  background-color: ${color.blackOpacity40};
  width: 100vw;
`;
