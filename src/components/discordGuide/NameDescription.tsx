import { Flex, MobileOnly, Space, Text } from '@/components/common/Wrapper';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from 'wowds-ui/Button';
import { Image } from '../common/Image';
import DiscordImage from '/discord/discord-guide-name.png';

export const NameDescription = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <Flex direction="column" align="flex-start" gap="lg">
        <Text typo="h1">별명? 사용자명?</Text>
        <ContentRow gap="lg">
          <Image
            src={DiscordImage}
            alt="discord-guide-name"
            css={css`
              ${media.pc} {
                width: 444px;
              }
            `}
          />
          <Flex direction="column" gap="lg" align="flex-start">
            <div>
              <Text typo="label1" color="discord">
                별명 = 이름
              </Text>
              <Space height="xs" />
              <Text typo="body1">
                서버에서 드러나는 이름으로, 서버별로 다르게 설정할 수 있고
                본인만의 개성을 드러낼 수 있어요.
              </Text>
            </div>
            <div>
              <Text typo="label1" color="discord">
                사용자명 = 주민등록번호
              </Text>
              <Space height="xs" />
              <Text typo="body1">
                개인의 고유한 문자로, 멤버를 식별할 때 사용해요. <br />
                별명과 다르게 어느 서버든 동일하게 적용돼요.
              </Text>
            </div>
          </Flex>
        </ContentRow>
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

const ContentRow = styled(Flex)`
  flex-direction: column;
  width: 100%;

  ${media.pc} {
    flex-direction: row;
    gap: 28px;
    align-items: flex-start;
  }
`;

