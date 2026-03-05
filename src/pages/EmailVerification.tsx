import {
  Flex,
  GuideList,
  MobileBreak,
  Text
} from '@/components/common/Wrapper';
import useSendVerifyEmail from '@/hooks/mutation/useSendVerifyEmail';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { color, typography } from 'wowds-tokens';
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
    state?.email &&
    state?.previousMemberId !== undefined &&
    state?.previousMemberId !== null;

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
      <Flex
        direction="column"
        justify="space-between"
        css={css`
          flex: 1;
          ${media.pc} {
            justify-content: center;
            gap: 100px;
          }
        `}>
        <Flex
          gap="xl"
          direction="column"
          css={css`
            ${media.pc} {
              gap: 100px;
            }
          `}>
          <Flex direction="column" align="flex-start" gap="sm">
            <EmailVerificationTitle>본인 인증하기</EmailVerificationTitle>
            <Text
              typo="body1"
              css={css`
                ${media.pc} {
                  width: 100%;
                  text-align: center;
                }
              `}>
              기존에 입력하신 본인 이메일을 통해 현재 계정의 <MobileBreak />
              주인이 본인임을 확인해요. <br />
              이메일로 보낸 메일을 <MobileBreak />
              확인해주세요!
            </Text>
          </Flex>

          <Flex
            gap="xs"
            direction="column"
            align="flex-start"
            css={css`
              ${media.pc} {
                align-items: center;
              }
            `}>
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

            <GuideList>
              <li>메일 전송이 최대 30분 가량 늦어질 수 있어요.</li>
              <li>
                메일이 보이지 않는 경우 스팸 메일함을 확인해주시고, 스팸
                메일함에도 없을 경우 카카오톡 채널로 문의해주세요.
              </li>
              <li>
                만약 이메일 수신 이후에 인증 버튼을 눌렀음에도 제대로 인증이
                되지 않는 경우, 해당 브라우저에서 다시 가입 절차를 진행해주세요.
              </li>
            </GuideList>
          </Flex>
        </Flex>

        <StyledButton onClick={handleResendEmail}>
          인증메일 다시 받기
        </StyledButton>
      </Flex>
    </Container>
  );
};

const Container = styled(Flex)`
  position: relative;
  min-height: 100vh;
  background-color: ${color.backgroundAlternative};
  padding: 40px 16px;
  width: 100vw;
  ${media.pc} {
    min-height: calc(100vh - var(--header-height, 0px));
    align-items: center;
  }
`;

const EmailVerificationTitle = styled(Text)`
  ${typography.h1}
  ${media.pc} {
    ${typography.display2}
    width:100%;
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  max-width: 100%;
  ${media.pc} {
    max-width: 328px;
  }
`;
