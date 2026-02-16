import { Flex, Space, Text } from '@/components/common/Wrapper';
import GlobalSize from '@/constants/globalSize';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { color } from 'wowds-tokens';
import Button from 'wowds-ui/Button';
import TextButton from 'wowds-ui/TextButton';

export const JoinDiscord = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isReconnect = searchParams.get('reconnect') === 'true';

  return (
    <Wrapper direction="column" justify="space-between">
      <Flex direction="column" align="flex-start">
        <Text typo="h1">
          지금 바로 <br />
          디스코드를 연동하세요.
        </Text>
        <Space height="lg" />
        <Text typo="body1">
          현재 GDG Hongik Univ.는 디스코드를 <br />
          메인 커뮤니케이션 플랫폼으로 사용하고 있어요. <br />
          따라서 반드시 연동 절차를 완료해야만 <br />
          정상적인 활동이 가능해요.
        </Text>
        <Space height="lg" />
        <Text typo="body1">
          디스코드가 처음이거나 사용법을 확인하고 싶은 분들은 <br />
          아래 디스코드 가이드라인을 참고해주세요.
        </Text>
      </Flex>
      <Flex direction="column">
        <Button
          onClick={() => {
            const path = isReconnect
              ? `${RoutePath.DiscordConnect}?reconnect=true`
              : RoutePath.DiscordConnect;
            navigate(path);
          }}
          style={{ maxWidth: '100%' }}>
          연동 정보 입력하기
        </Button>
        <Space height="xs" />
        <TextButton
          text="디스코드 가이드라인↗︎"
          onClick={() => {
            const path = isReconnect
              ? `${RoutePath.DiscordGuide}?reconnect=true`
              : RoutePath.DiscordGuide;
            navigate(path);
          }}
          style={{ color: color.discord }}
        />
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  min-height: calc(100vh - ${GlobalSize.header});
  width: ${GlobalSize.width};
  margin: 0px -16px;
  padding: 0px 16px;
  padding-top: 40px;
  padding-bottom: 28px;
  background-color: ${color.backgroundAlternative};

  ${media.mobile} {
    width: 100vw;
  }
`;
