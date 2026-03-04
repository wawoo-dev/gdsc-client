import { Logo } from '@/assets/LogoIcon';
import { Flex, Text } from '@/components/common/Wrapper';
import { JoinButton } from '@/components/layout/JoinButton';
import GlobalSize from '@/constants/globalSize';
import { useLogout } from '@/hooks/mutation';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { isAuthenticated } from '@/utils/auth';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { color } from 'wowds-tokens';

//TODO: 백엔드 로그인 로직 수정 이후 반영 필요
export default function Header() {
  const navigation = useNavigate();
  const location = useLocation();
  const { mutate } = useLogout();
  const handleLogoutClick = () => {
    mutate();
  };
  const handleClick = () => {
    if (isAuthenticated()) navigation(RoutePath.Dashboard);
    else {
      navigation(RoutePath.GithubSignin);
    }
  };

  const isGithubSigninPage = location.pathname === RoutePath.GithubSignin;

  return (
    <Container>
      <HeaderContainter>
        <LogoContainer onClick={() => navigation(RoutePath.Home)}>
          <Flex direction="row" align="center" justify="flex-start" gap="xs">
            <Logo />
            <LogoText>GDG</LogoText>
            <SubLogoText>Hongik Univ.</SubLogoText>
          </Flex>
        </LogoContainer>
        <ButtonWrapper $isVisible={!isGithubSigninPage}>
          {isAuthenticated() ? (
            <button onClick={handleLogoutClick}>
              <Text color="sub" typo="label2">
                <u>로그아웃</u>
              </Text>
            </button>
          ) : (
            <JoinButton onClick={handleClick}>로그인/가입하기</JoinButton>
          )}
        </ButtonWrapper>
      </HeaderContainter>
    </Container>
  );
}

const Container = styled(Flex)`
  width: 100%;
  height: ${GlobalSize.header};
  gap: 16px;
  background-color: ${color.white};
  ${media.mobile} {
    background-color: ${color.monoBackgroundPressed};
  }
  position: fixed;
  top: 0;
  z-index: 99;
  border-bottom: 1px solid ${color.outline};
`;
const LogoText = styled.div`
  @font-face {
    font-family: 'Google-Sans';
    src: url('/fonts/GoogleSans-Bold.ttf') format('truetype');
    font-style: normal;
  }
  font-family: 'Google-Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${color.black};
`;
const SubLogoText = styled.div`
  @font-face {
    font-family: 'Google-Sans';
    src: url('/fonts/GoogleSans-Regular.ttf') format('truetype');
    font-style: normal;
  }
  font-family: 'Google-Sans', sans-serif;
  font-size: 14px;
  color: ${color.primary};
`;

const HeaderContainter = styled(Flex)`
  width: 100%;
  max-width: 984px;
  justify-content: space-between;
  padding: 0 16px;
  margin: 0 auto;
  ${media.mobile} {
    width: 100vw;
  }
`;
const LogoContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;
const ButtonWrapper = styled.div<{ $isVisible: boolean }>`
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;
