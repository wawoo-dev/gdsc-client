import { GitHubIcon } from '@/assets/GitHubIcon';
import { Flex, Text } from '@/components/common/Wrapper';
import { useGetAccountInfo } from '@/hooks/query';
import useAccountInfoStore from '@/hooks/zustand/useAccountInfo';
import { media } from '@/styles';
import { User } from '@/types/user';
import { css } from '@emotion/react';
import { color, typography } from 'wowds-tokens';

const UserInfo = ({ member }: { member: User }) => {
  useGetAccountInfo(); // API 호출 및 zustand에 저장
  const githubHandle = useAccountInfoStore((state) => state.githubHandle);

  return (
    <Flex gap="sm" direction="column" align="flex-start">
      <Flex gap="sm" direction="row" align="center" justify="flex-start">
        {member.info.name ? (
          <Text
            typo="h1"
            color={'textBlack'}
            css={css`
              ${media.pc} {
                ${typography.display2}
              }
            `}>
            {member.info.name} 님
          </Text>
        ) : (
          <Text
            typo="h1"
            color="darkDisabled"
            css={css`
              ${media.pc} {
                ${typography.display2}
              }
            `}>
            정보를 입력해주세요
          </Text>
        )}
        {githubHandle && (
          <Flex
            style={{
              width: 'fit-content',
              padding: '8px 12px',
              borderRadius: 40,
              background: '#fff',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: color.outline
            }}
            gap="xxs">
            <GitHubIcon width={14} height={14} />
            <Text typo="label2">{githubHandle}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default UserInfo;
