import {
  DesktopOnly,
  Flex,
  MobileBreak,
  MobileOnly,
  Text
} from '@/components/common/Wrapper';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { color, typography } from 'wowds-tokens';
import Box from 'wowds-ui/Box';
import Button from 'wowds-ui/Button';
import TextButton from 'wowds-ui/TextButton';

export const JoinDiscord = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isReconnect = searchParams.get('reconnect') === 'true';

  return (
    <Wrapper direction="column" gap="xl">
      <Flex direction="column" align="flex-start" gap="md">
        <Text
          typo="h1"
          css={css`
            ${media.mobile} {
              ${typography.h1};
            }
            ${media.pc} {
              ${typography.display2};
              text-align: center;
              width: 100%;
            }
          `}>
          지금 바로 <MobileBreak />
          디스코드를 연동하세요.
        </Text>
        <Text
          typo="body1"
          css={css`
            line-height: 160%;
            ${media.mobile} {
              text-align: left;
            }
            ${media.pc} {
              text-align: center;
              width: 100%;
            }
          `}>
          현재 GDG Hongik Univ.는 디스코드를 <MobileBreak />
          메인 커뮤니케이션 플랫폼으로 사용하고 있어요. <br />
          따라서 반드시 연동 절차를 완료해야만 <MobileBreak />
          정상적인 활동이 가능해요.
        </Text>
        <MobileOnly>
          <Text typo="body1">
            디스코드가 처음이거나 사용법을 확인하고 싶은 분들은 <br />
            아래 디스코드 가이드라인을 참고해주세요.
          </Text>
        </MobileOnly>
      </Flex>

      <DesktopOnlyWrapper>
        <Box
          text={
            <Flex direction="column" align="center" gap="md">
              <Text
                typo="body1"
                css={css`
                  text-align: center;
                `}>
                디스코드가 처음이거나 사용법을 확인하고 싶은 분들은 <br />
                아래 디스코드 가이드라인을 참고해주세요.
              </Text>
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
          }
        />
      </DesktopOnlyWrapper>

      <ButtonSection direction="column" gap="xs">
        <ButtonWrapper>
          <Button
            style={{ width: '100%' }}
            onClick={() => {
              const path = isReconnect
                ? `${RoutePath.DiscordConnect}?reconnect=true`
                : RoutePath.DiscordConnect;
              navigate(path);
            }}>
            연동 정보 입력하기
          </Button>
        </ButtonWrapper>
        <MobileOnly>
          <TextButton
            text="디스코드 가이드라인↗︎"
            onClick={() => {
              const path = isReconnect
                ? `${RoutePath.DiscordGuide}?reconnect=true`
                : RoutePath.DiscordGuide;
              navigate(path);
            }}
            style={{ color: color.discord, margin: 'auto' }}
          />
        </MobileOnly>
      </ButtonSection>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  min-height: calc(100vh - var(--header-height, 0px));
  margin: 0px -16px;
  padding: 0px 16px;
  background-color: ${color.backgroundAlternative};
  align-items: center;
  justify-content: center;
  gap: 100px;
  ${media.mobile} {
    width: 100vw;
    padding: 20px 16px 40px 16px;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const DesktopOnlyWrapper = styled(DesktopOnly)`
  ${media.pc} {
    width: 100%;
    max-width: 653px;
  }
`;

const ButtonSection = styled(Flex)`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;

  ${media.pc} {
    max-width: 328px;
  }
`;
