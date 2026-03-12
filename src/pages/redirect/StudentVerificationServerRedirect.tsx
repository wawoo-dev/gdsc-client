import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Flex, Text } from '@/components/common/Wrapper';
import { useVerifyStudentEmail } from '@/hooks/mutation';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { color } from 'wowds-tokens';

export const StudentVerificationServerRedirect = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { isSuccess, isPending, verifyStudentMail } = useVerifyStudentEmail();

  useLayoutEffect(() => {
    if (token) verifyStudentMail(token);
  }, [token, verifyStudentMail]);

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
            {isSuccess ? '재학생 인증 성공' : '재학생 인증 실패'}
          </Text>
          <TextContainer>
            {isSuccess ? (
              <Text typo="body1">홍익대학교 재학생 인증에 성공했어요.</Text>
            ) : (
              <Text typo="body1">
                유효하지 않거나 만료된 인증코드예요. 원래 페이지로 돌아가서 메일
                재전송 버튼을 눌러주세요.
              </Text>
            )}
          </TextContainer>
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  min-height: calc(100vh - var(--header-height, 0px));
  margin: 0px -16px;
  padding: 0px 16px;
  direction: column;
  justify-content: flex-start;
  gap: '40px';
  align-items: flex-start;
  background-color: ${color.mono50};
  width: 100vw;
`;

const Container = styled(Flex)`
  position: relative;
  justify-content: flex-start;
  width: 100%;
  min-height: calc(100vh - var(--header-height, 0px));
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
