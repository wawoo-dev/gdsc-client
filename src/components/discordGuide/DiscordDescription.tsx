import { Discord as DiscordIcon } from '@/assets/Discord';
import {
  Flex,
  MobileBreak,
  MobileOnly,
  Space,
  Text
} from '@/components/common/Wrapper';
import { media } from '@/styles';
import { css } from '@emotion/react';
import { color, typography } from 'wowds-tokens';
import Button from 'wowds-ui/Button';

export const DiscordDescription = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <Flex
        direction="column"
        align="flex-start"
        css={css`
          ${media.pc} {
            align-items: center;
          }
        `}>
        <Flex
          gap="sm"
          css={css`
            ${media.mobile} {
              flex-direction: column;
              align-items: flex-start;
            }
            ${media.pc} {
              flex-direction: row;
            }
          `}>
          <DiscordIcon />
          <Text
            typo="h1"
            css={css`
              ${media.pc} {
                ${typography.display2};
              }
            `}>
            디스코드가 무엇이고, <MobileBreak />왜 쓰나요?
          </Text>
        </Flex>
        <Space height="lg" />
        <Text
          typo="body1"
          css={css`
            ${media.pc} {
              text-align: center;
              width: 100%;
            }
          `}>
          디스코드는 음성, 화상 채팅이 가능한 메신저예요. <br />
          GDG Hongik Univ.에서는
          <span style={{ color: color.discord }}> 멤버들 간의 소통,공지</span>를
          위해 디스코드를 사용하고 있어요.
          <br />
          <br />
          모든 공지는 디스코드에서 안내하고 있으므로,
          <br />
          계정을 생성하고 서버에 합류해야만 활동할 수 있어요.
        </Text>
      </Flex>
      <MobileOnly style={{ width: '100%' }}>
        <Button
          onClick={() => {
            onNext();
          }}
          style={{ maxWidth: '100%' }}>
          다음으로
        </Button>
      </MobileOnly>
    </>
  );
};
