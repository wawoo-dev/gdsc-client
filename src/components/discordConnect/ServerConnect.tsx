import { DiscordLinkRequest } from '@/apis/discord/discordType';
import { Flex, MobileBreak, Space, Text } from '@/components/common/Wrapper';
import { usePostDiscordLink } from '@/hooks/mutation/usePostDiscordLink';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { DiscordFormValues } from '@/types/discord';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { color, typography } from 'wowds-tokens';
import Button from 'wowds-ui/Button';
import Divider from 'wowds-ui/Divider';
import TextButton from 'wowds-ui/TextButton';
import TextField from 'wowds-ui/TextField';
import DiscordImage from '/discord/discord-server-connect.png';

export const ServerConnect = ({ onNext }: { onNext: () => void }) => {
  const { getValues, control } = useFormContext<DiscordFormValues>();
  const [error, setError] = useState(false);
  const { postDiscordLink, isSuccess, isError } = usePostDiscordLink();

  useEffect(() => {
    if (isSuccess) {
      onNext();
    } else if (isError) {
      setError(true);
    }
  }, [isSuccess, isError, onNext]);

  const handleLinkButtonClick = () => {
    const data = {
      discordUsername: getValues('discordUsername'),
      nickname: getValues('discordNickname'),
      code: Number(getValues('code'))
    } as DiscordLinkRequest;

    postDiscordLink({ ...data });
  };

  const { field } = useController({
    name: 'code',
    control,
    rules: {
      required: true
    }
  });

  return (
    <Wrapper direction="column" justify="space-between">
      <Flex direction="column" align="flex-start" gap="lg">
        <Text
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
          서버와 연동하세요.
        </Text>
        <Flex direction="column" align="flex-start">
          <Text
            typo="label1"
            color="discord"
            css={css`
              ${media.pc} {
                text-align: center;
                width: 100%;
              }
            `}>
            /인증코드
          </Text>
          <Space height="sm" />
          <Text
            typo="body1"
            css={css`
              ${media.pc} {
                text-align: center;
                width: 100%;
              }
            `}>
            #명령어 채널에서 /인증코드 명령어를 통해 <MobileBreak />
            연동을 위한 인증코드를 받을 수 있어요. <br />
            인증코드를 아래에 입력해주세요.
          </Text>
        </Flex>
        <Flex direction="column" align="center">
          <img src={DiscordImage} alt="discord-server-connect" />
          <Space height="lg" />
          <Divider />
          <Space height="lg" />
          <TextButton
            text="번호 발급받기↗︎"
            style={{ color: color.discord }}
            asProp="a"
            href={RoutePath.DiscordCodeLink}
            target="_blank"
          />
        </Flex>
        <TextField
          {...field}
          label="인증번호"
          placeholder="내용을 입력해주세요"
          style={{
            width: '100%'
          }}
          error={error}
          {...(error && {
            helperText: (
              <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
                <li>번호가 올바르지 않아요. 다시 발급받아 진행해주세요.</li>
              </ul>
            )
          })}
        />
      </Flex>

      <Flex direction="column">
        <ButtonWrapper>
          <Button style={{ width: '100%' }} onClick={handleLinkButtonClick}>
            다음으로
          </Button>
        </ButtonWrapper>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  max-width: 500px;
  height: 100%;
  ${media.pc} {
    gap: 60px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  ${media.pc} {
    max-width: 328px;
  }
`;
