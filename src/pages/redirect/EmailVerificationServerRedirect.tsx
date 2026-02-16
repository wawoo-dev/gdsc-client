import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Flex, Text } from '@/components/common/Wrapper';
import GlobalSize from '@/constants/globalSize';
import { useVerifyEmail } from '@/hooks/mutation';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { color } from 'wowds-tokens';

export const EmailVerificationServerRedirect = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { isSuccess, isPending, verifyEmail } = useVerifyEmail();
  const [previousGithubHandle, setPreviousGithubHandle] = useState('');
  const [currentGithubHandle, setCurrentGithubHandle] = useState('');

  useLayoutEffect(() => {
    if (token) verifyEmail(token);

    const prevHandle = localStorage.getItem('previousGithubHandle') || '';
    const currHandle = localStorage.getItem('currentGithubHandle') || '';
    setPreviousGithubHandle(prevHandle);
    setCurrentGithubHandle(currHandle);
  }, [token, verifyEmail]);

  return (
    <Wrapper direction="column">
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <Container direction="column" align="flex-start">
          <Text
            typo="h1"
            css={css`
              margin-bottom: 20px;
              margin-top: 40px;
            `}>
            {isSuccess ? '본인 인증 성공' : '본인 인증 실패'}
          </Text>
          <TextContainer>
            {isSuccess ? (
              <Text typo="body1">
                기존 계정({previousGithubHandle})의 내용을 삭제하고 새로운 계정({currentGithubHandle})으로 이전했어요. 가입 절차를 계속해서 진행해주세요.
              </Text>
            ) : (
              <Text typo="body1">
                본인 인증에 실패했어요. 원래 페이지로 돌아가서 인증메일 다시
                받기 버튼을 눌러주세요.
              </Text>
            )}
          </TextContainer>
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  min-height: calc(100vh - 54px);
  width: ${GlobalSize.width};
  margin: 0px -16px;
  padding: 0px 16px;
  direction: column;
  justify-content: flex-start;
  gap: '40px';
  align-items: flex-start;
  background-color: ${color.mono50};

  ${media.mobile} {
    width: 100vw;
  }
`;

const Container = styled(Flex)`
  position: relative;
  justify-content: flex-start;
  width: 100%;
  min-height: calc(100vh - 54px);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
