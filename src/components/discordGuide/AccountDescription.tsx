import { Flex, Text } from '@/components/common/Wrapper';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Button from 'wowds-ui/Button';
import { Image } from '../common/Image';
import DiscordImage from '/discord/discord-guide-account.png';

export const AccountDescription = ({
  isReconnect = false
}: {
  isReconnect?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex direction="column" align="flex-start" gap="lg">
        <Text typo="h1">계정은 어떻게 만드나요?</Text>
        <ContentRow gap="lg">
          <Image
            src={DiscordImage}
            alt="discord-guide-account"
            css={css`
              ${media.mobile} {
                padding: 0px 27px;
              }
              ${media.pc} {
                width: 317px;
              }
            `}
          />
          <Text typo="body1">
            디스코드 계정을 만들기 위해서는 위와 같은 정보를 입력해야 해요.
            계정을 생성하고 다음 연동 절차를 진행해주세요!
          </Text>
        </ContentRow>
      </Flex>
      <ButtonRow gap="sm" justify="space-between">
        <Button
          asProp="a"
          href={RoutePath.DiscordRegisterLink}
          target="_blank"
          variant="outline">
          계정 생성하기
        </Button>
        <Button
          onClick={() => {
            const path = isReconnect
              ? `${RoutePath.DiscordConnect}?reconnect=true`
              : RoutePath.DiscordConnect;
            navigate(path);
          }}>
          연동하기
        </Button>
      </ButtonRow>
    </>
  );
};

const ContentRow = styled(Flex)`
  flex-direction: column;
  width: 100%;

  ${media.pc} {
    flex-direction: row;
    gap: 28px;
    align-items: flex-start;
  }
`;

const ButtonRow = styled(Flex)`
  ${media.pc} {
    max-width: 678px;
  }
`;
