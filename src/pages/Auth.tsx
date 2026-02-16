import { GitHubButton } from '@/components/auth/GitHubButton';
import { Flex, Space, Text } from '@/components/common/Wrapper';
import GlobalSize from '@/constants/globalSize';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DownArrow } from 'wowds-icons';
import { color, space } from 'wowds-tokens';
import Box from 'wowds-ui/Box';

/** 깃허브 로그인 및 가입하기 */
export const Auth = () => {
  const handleClick = () => {
    // GitHub 로그인 페이지로 직접 리다이렉트
    setTimeout(function () {
      document.location.href = RoutePath.AuthGithubLoginRedirect;
    }, 250);
  };

  const [accordionState, setAccordionState] = useState({
    githubInfo: false,
    githubDetail: false
  });

  return (
    <Container>
      <Flex direction="column" align="flex-start">
        <Text typo="h1" style={{ marginBottom: '1.25rem' }}>
          로그인 및 가입하기
        </Text>
        <Text typo="body2">
          GDG Hongik Univ.에서는 더 나은 커뮤니티 운영과
          <br /> 안전한 회원 정보 관리를 위해 Github 소셜 로그인을
          <br /> 사용하고 있어요. Github 계정이 없다면, 새로 가입해야 해요.
        </Text>
        <Space height={32} />
        <Flex
          direction="column"
          align="flex-start"
          justify="flex-start"
          gap="lg"
          style={{ position: 'relative' }}>
          <Box
            text={
              <AccordionContainer>
                <Text typo="h3">Q. GitHub가 무엇인가요?</Text>
                <div
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '24px'
                  }}>
                  <DownArrow
                    width={20}
                    height={20}
                    stroke="sub"
                    onClick={() => {
                      setAccordionState({
                        ...accordionState,
                        githubInfo: !accordionState.githubInfo
                      });
                    }}
                  />
                </div>
                {accordionState.githubInfo && (
                  <Text color="sub" typo="body2">
                    GitHub는 Git을 이용하여 파일을 자유롭게 업로드 및 공유할 수
                    있는 사이트예요. 개발자라면 누구나 이용하는 사이트로, GDG
                    Hongik Univ.에서도 학회 운영을 위해 이용하고 있어요.
                  </Text>
                )}
              </AccordionContainer>
            }
          />
          <Box
            text={
              <AccordionContainer>
                <Text typo="h3">Q. GitHub는 왜 사용하나요?</Text>
                <div
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '24px'
                  }}>
                  <DownArrow
                    width={20}
                    height={20}
                    stroke="sub"
                    onClick={() => {
                      setAccordionState({
                        ...accordionState,
                        githubDetail: !accordionState.githubDetail
                      });
                    }}
                  />
                </div>
                {accordionState.githubDetail && (
                  <Text color="sub" typo="body2">
                    GDG Hongik Univ.에서는 정규 스터디의 과제를 GitHub를 통해
                    관리해요. 매 스터디, 혹은 여러 학술 프로그램에서 이용하기에
                    GitHub를 통한 로그인 방식을 채택했어요.
                  </Text>
                )}
              </AccordionContainer>
            }
          />
        </Flex>
      </Flex>
      <ButtonContainer>
        <GitHubButton onClick={handleClick}>
          GitHub 로그인/회원가입
        </GitHubButton>
        <GithubGuideLink to={RoutePath.GitHubGuideLink} target="_blank">
          <Text
            typo="label2"
            color="textBlack"
            css={css`
              text-decoration: underline;
              padding: ${space.sm};
              ${space.lg}
            `}>
            GitHub 계정을 어떻게 만드나요?
          </Text>
        </GithubGuideLink>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 49px 16px 40px 16px;
  background-color: ${color.mono50};
  margin: 0px -16px;
  min-height: calc(100vh - 54px);
  width: ${GlobalSize.width};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${media.mobile} {
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  padding-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space.xs};
`;

const GithubGuideLink = styled(Link)`
  color: ${color.textBlack};
  font-weight: 600;
  &:active {
    color: ${color.sub};
  }
  &:hover {
    color: ${color.sub};
  }
  &:visited {
    color: ${color.black};
  }
`;

const AccordionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${space.sm};
`;
