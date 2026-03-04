import { Flex, Space, Text } from '@/components/common/Wrapper';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Button from 'wowds-ui/Button';

export const CompleteDiscordConnect = () => {
  const navigate = useNavigate();
  return (
    <Wrapper direction="column" justify="space-between">
      <Flex direction="column" align="flex-start">
        <Text
          typo="h1"
          css={css`
            ${media.pc} {
              text-align: center;
              width: 100%;
            }
          `}>
          디스코드 연동이 완료되었어요!
        </Text>
        <Space height="lg" />
        <Text
          typo="body1"
          css={css`
            ${media.pc} {
              text-align: center;
              width: 100%;
            }
          `}>
          다른 가입 조건과 활동 조건을 모두 만족하면
          <br />
          커뮤니티 멤버로 디스코드에서 활동할 수 있어요.
        </Text>
      </Flex>
      <Button
        onClick={() => {
          navigate(RoutePath.Dashboard);
        }}
        style={{ maxWidth: '100%', marginTop: 'auto' }}>
        완료하기
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled(Flex)`
  height: 100%;
  ${media.pc} {
    padding: 50px;
    width: 100%;
    gap: 30px;
  }
`;
