import { Flex, Text } from '@/components/common/Wrapper';
import useSendVerifyEmail from '@/hooks/mutation/useSendVerifyEmail';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { color } from 'wowds-tokens';
import Box from 'wowds-ui/Box';
import Button from 'wowds-ui/Button';

interface EmailVerificationState {
  email: string;
  previousMemberId: number;
  previousGithubHandle: string;
  currentGithubHandle: string;
}

export const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as EmailVerificationState;
  const { sendVerifyEmail } = useSendVerifyEmail();
  const hasAutoSent = useRef(false);

  const isValidState =
    state?.email && state?.previousMemberId !== undefined && state?.previousMemberId !== null;

  const maskedEmail = state?.email
    ? state.email.replace(/(.{3})(.*)(@.*)/, '$1***$3')
    : '';

  useEffect(() => {
    // 상태가 없거나 유효하지 않은 경우 토스트 에러를 띄우고 이전 페이지로 이동
    if (!isValidState) {
      toast.error('인증 링크가 만료되었거나 잘못된 접근입니다.');
      navigate(-1);
      return;
    }

    if (state?.previousGithubHandle && state?.currentGithubHandle) {
      localStorage.setItem('previousGithubHandle', state.previousGithubHandle);
      localStorage.setItem('currentGithubHandle', state.currentGithubHandle);
    }

    // 처음 페이지에 접속했을 때만 자동으로 인증 메일 전송
    if (state.previousMemberId && !hasAutoSent.current) {
      sendVerifyEmail(state.previousMemberId);
      hasAutoSent.current = true;
    }
  }, [state, sendVerifyEmail, isValidState, navigate]);

  const handleResendEmail = () => {
    if (isValidState && state?.previousMemberId) {
      sendVerifyEmail(state.previousMemberId);
    }
  };

  return (
    <Container direction="column" align="flex-start" justify="space-between">
      <Flex gap="xl" direction="column">
        <Flex direction="column" align="flex-start" gap="sm">
          <Text typo="h1">본인 인증하기</Text>
          <Text typo="body1">
            기존에 입력하신 본인 이메일을 통해 현재 계정의 <br />
            주인이 본인임을 확인해요. 이메일로 보낸 메일을 <br />
            확인해주세요!
          </Text>
        </Flex>

        <Flex gap="xs" direction="column" align="flex-start">
          <Box
            text={
              <Flex justify="flex-start" gap="xs">
                <Text typo="body1" color="sub">
                  이메일
                </Text>
                <Text typo="body1">{maskedEmail}</Text>
              </Flex>
            }
            status="success"
          />

          <Text typo="body3" color="sub">
            <ul
              style={{
                listStyleType: 'disc',
                listStylePosition: 'outside',
                paddingLeft: '20px'
              }}>
              <li>메일 전송이 최대 30분 가량 늦어질 수 있어요.</li>
              <li>
                메일이 보이지 않는 경우 스팸 메일함을 확인해주시고, 스팸
                메일함에도 없을 경우 카카오톡 채널로 문의해주세요.
              </li>
            </ul>
          </Text>
        </Flex>
      </Flex>

      <Button onClick={handleResendEmail}>인증메일 다시 받기</Button>
    </Container>
  );
};

const Container = styled(Flex)`
  position: relative;
  min-height: calc(100vh - 54px);
  background-color: ${color.backgroundAlternative};
  padding: 40px 16px;
  ${media.mobile} {
    width: 100vw;
  }
`;
