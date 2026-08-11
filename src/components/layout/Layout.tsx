import ApiErrorBoundary from '@/components/ApiErrorBoundary';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import GlobalSize from '@/constants/globalSize';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { Outlet, useLocation } from 'react-router-dom';
import { color } from 'wowds-tokens';
import { Flex } from '../common/Wrapper';

const PATHS_WITH_HEADER_FOOTER: Set<string> = new Set([
  RoutePath.Index,
  RoutePath.FAQ,
  RoutePath.GithubSignin,
  RoutePath.Dashboard,
  RoutePath.Discord
]);

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;
if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gtagOptions: { send_page_view: false }
  });
}

const Layout = () => {
  const location = useLocation();

  const showHeaderFooter = useMemo(() => {
    return PATHS_WITH_HEADER_FOOTER.has(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search
    });
  }, [location.pathname, location.search]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ApiErrorBoundary>
      <Container $hasHeaderOnMobile={showHeaderFooter}>
        <HeaderWrapper $showOnMobile={showHeaderFooter}>
          <Header />
        </HeaderWrapper>
        <Wrapper>
          <Outlet />
          <Footer />
        </Wrapper>
      </Container>
    </ApiErrorBoundary>
  );
};
export default Layout;

const Container = styled(Flex)<{ $hasHeaderOnMobile: boolean }>`
  --header-height: ${GlobalSize.header};

  background-color: ${color.mono150};
  overflow: hidden;
  flex-direction: column;

  ${media.mobile} {
    --header-height: ${({ $hasHeaderOnMobile }) =>
      $hasHeaderOnMobile ? GlobalSize.header : '0px'};
  }
`;

const HeaderWrapper = styled(Flex)<{ $showOnMobile: boolean }>`
  display: block;

  ${media.mobile} {
    display: ${({ $showOnMobile }) => ($showOnMobile ? 'block' : 'none')};
  }
`;

const Wrapper = styled(Flex)`
  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
  align-items: flex-start;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile} {
    width: 100vw;
  }
`;
