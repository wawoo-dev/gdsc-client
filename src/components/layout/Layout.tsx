import styled from '@emotion/styled';
import { Flex } from '../common/Wrapper';
import { media } from '@/styles';
import { color } from 'wowds-tokens';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLayoutEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import GlobalSize from '@/constants/globalSize';
import ApiErrorBoundary from '@/components/ApiErrorBoundary';
import RoutePath from '@/routes/routePath';

const PATHS_WITH_HEADER_FOOTER: Set<string> = new Set([
  RoutePath.Index,
  RoutePath.FAQ,
  RoutePath.Dashboard
]);

const Layout = () => {
  const location = useLocation();

  const showHeaderFooter = useMemo(() => {
    return PATHS_WITH_HEADER_FOOTER.has(location.pathname);
  }, [location.pathname]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ApiErrorBoundary>
      <Container
        style={
          {
            '--header-height': showHeaderFooter ? GlobalSize.header : '0px'
          } as React.CSSProperties
        }>
        {showHeaderFooter && <Header />}
        <Wrapper $hasHeader={showHeaderFooter}>
          <Outlet />
          {showHeaderFooter && <Footer />}
        </Wrapper>
      </Container>
    </ApiErrorBoundary>
  );
};
export default Layout;

const Container = styled(Flex)`
  background-color: ${color.mono150};
  overflow: hidden;
  flex-direction: column;
`;

const Wrapper = styled(Flex)<{ $hasHeader: boolean }>`
  width: ${GlobalSize.width};
  margin-top: ${({ $hasHeader }) => ($hasHeader ? GlobalSize.header : '0')};
  min-height: ${({ $hasHeader }) =>
    $hasHeader ? `calc(100vh - ${GlobalSize.header})` : '100vh'};
  align-items: flex-start;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile} {
    width: 100vw;
  }
`;
