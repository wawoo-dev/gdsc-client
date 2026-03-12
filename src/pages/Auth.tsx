import { GitHubButton } from '@/components/auth/GitHubButton';
import { Flex, Space, Text } from '@/components/common/Wrapper';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DownArrow } from 'wowds-icons';
import { color, space, typography } from 'wowds-tokens';
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
      <Flex
        direction="column"
        align="center"
        css={css`
          ${media.mobile} {
            align-items: flex-start;
          }
        `}>
        <Text
          css={css`
            ${typography.display2};
            margin-bottom: 1.25rem;
            ${media.mobile} {
              ${typography.h1};
            }
          `}>
          로그인 및 가입하기
        </Text>
        <Text
          align="center"
          css={css`
            ${typography.body1};
            line-height: 160%;
            ${media.mobile} {
              text-align: start;
              ${typography.body2};
            }
          `}>
          GDG Hongik Univ.에서는 더 나은 커뮤니티 운영과
          <br /> 안전한 회원 정보 관리를 위해 Github 소셜 로그인을
          <br /> 사용하고 있어요. Github 계정이 없다면, 새로 가입해야 해요.
        </Text>
        <Space height={32} />
        <AccordionWrapper
          direction="column"
          align="flex-start"
          justify="flex-start"
          gap="lg">
          <Box
            text={
              <AccordionContainer>
                <Text typo="h3">Q. GitHub가 무엇인가요?</Text>
                <ArrowIconWrapper open={accordionState.githubInfo}>
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
                </ArrowIconWrapper>
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
                <ArrowIconWrapper open={accordionState.githubDetail}>
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
                </ArrowIconWrapper>
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
        </AccordionWrapper>
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
  padding: 49px 16px;
  padding-bottom: 15dvh;
  background-color: ${color.mono50};
  margin: 0px -16px;
  min-height: calc(100vh - var(--header-height, 0px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 44px;
  ${media.mobile} {
    width: 100vw;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const ButtonContainer = styled.div`
  padding-top: 1rem;
  width: 100%;
  max-width: 358px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space.xs};

  ${media.mobile} {
    max-width: 100%;
  }
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

const AccordionWrapper = styled(Flex)`
  position: relative;
  width: 100%;
  max-width: 358px;
  ${media.mobile} {
    max-width: 100%;
  }
`;

const AccordionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${space.sm};
`;

const ArrowIconWrapper = styled.div<{ open: boolean }>`
  cursor: pointer;
  position: absolute;
  right: 24px;
  transform: rotate(${({ open }) => (open ? '180deg' : '0deg')});
  transition: transform 0.3s ease;
`;
