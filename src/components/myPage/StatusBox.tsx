import { Logo } from '@/assets/LogoIcon';
import { UserRoleType } from '@/types/user';
import { css } from '@emotion/react';
import { typography } from 'wowds-tokens';
import { media } from '@/styles';
import { Text } from '../common/Wrapper';
import CustomBox from './CustomBox';

export const StatusBox = ({ role }: { role: UserRoleType }) => {
  const convertRoleToTitle = (role: UserRoleType) => {
    switch (role) {
      case 'GUEST':
        return '게스트';
      case 'ASSOCIATE':
        return '준회원';
      default:
        return (
          <>
            <Logo width="30" height="15" />
            <strong style={{ color: '#4285f4', marginLeft: '4px' }}>
              GDG Hongik Univ.정회원
            </strong>
          </>
        );
    }
  };
  const convertRoleToSub = (role: UserRoleType) => {
    switch (role) {
      case 'GUEST':
        return '지금 바로 가입할 수 있어요. 몇 가지 정보를 입력해 GDG Hongik Univ. 활동을 시작해보세요.';
      case 'ASSOCIATE':
        return '가입이 완료되었어요. 정회원 모집 기간에 맞춰 신청하면 학회 활동에 참여할 수 있어요.';
      default:
        return '이번 학기 GDG Hongik Univ.에서 스터디와 세션을 비롯한 다양한 커뮤니티 활동에 함께해보세요.';
    }
  };

  return (
    <CustomBox
      variant="text"
      text={convertRoleToTitle(role)}
      subTextContent={
        <Text
          typo="body2"
          color="sub"
          css={css`
            ${media.pc} {
              ${typography.body1}
            }
          `}>
          {convertRoleToSub(role)}
        </Text>
      }
      status="success"
    />
  );
};
