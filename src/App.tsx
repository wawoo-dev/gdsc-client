import {
  JoinText,
  OnboardingLogo1,
  OnboardingLogo2
} from '@/assets/Onboarding';
import { OnboardingArrow } from '@/assets/OnboardingArrow';
import { Flex, Space, Text } from '@/components/common/Wrapper';

import { InformationBox } from '@/components/onboarding/InformationBox';
import GlobalSize from '@/constants/globalSize';
import { media } from '@/styles';
import { isAuthenticated } from '@/utils/auth';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { color, typography } from 'wowds-tokens';
import Button from 'wowds-ui/Button';

import Carousel from './components/onboarding/Carousel';
import RoutePath from './routes/routePath';

function App() {
  const navigate = useNavigate();

  return (
    <Wrapper direction="column" justify="flex-start" align="center">
      <BlueSection
        direction="column"
        justify="space-between"
        align="flex-start"
        css={css`
          padding: 16px 0px;
          height: 100dvh;
        `}>
        <Flex direction="column" justify="flex-start" align="flex-end">
          <Flex
            css={css`
              width: 100dvw;
              max-width: 400px;
            `}>
            <OnboardingLogo1 />
          </Flex>
          <Flex
            direction="column"
            css={css`
              padding: 16px;
            `}>
            <Text
              typo="display2"
              color="backgroundNormal"
              css={css`
                width: 100%;
              `}>
              Google Developer
              <br />
              Groups on Campus
            </Text>
            <Text
              typo="h3"
              color="backgroundNormal"
              css={css`
                width: 100%;
                margin-top: 12px;
              `}>
              Hongik University
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          justify="flex-end"
          gap="xl"
          css={css`
            padding: 0px 16px;
          `}>
          <Button
            variant="outline"
            onClick={() => {
              if (isAuthenticated()) navigate(RoutePath.Dashboard);
              else navigate(RoutePath.GithubSignin);
            }}>
            지금 지원하기
          </Button>
          <OnboardingArrow />
        </Flex>
      </BlueSection>
      <Flex
        direction="column"
        align="flex-start"
        css={css`
          background-color: white;
          width: 100%;
          height: 411px;
          padding: 16px;
        `}>
        <Text typo="h1" color="primary">
          모두에게 성장의 기회를 제공하는
          <br />
          홍익대학교 최대 규모의 <br />
          IT 커뮤니티
        </Text>
        <Space height={32} />
        <Text
          typo="body1"
          color="black"
          css={css`
            word-break: keep-all;
          `}>
          GDG는 Google Developers에서 제공되는 프로그램과 함께 운영되는 개발자
          커뮤니티 그룹이에요. 특히 GDG Hongik Univ.는 개발자에 관심이 있는
          홍익대학교 학생이라면 누구나 참여할 수 있어요!
        </Text>
      </Flex>
      <Flex
        direction="column"
        css={css`
          padding: 100px 16px;
          gap: 100px;
        `}>
        <Flex direction="column">
          <Text typo="h1" color="black">
            GDG와 함께 해요!
          </Text>
          <Space height={42} />
          <Flex direction="column" gap="sm">
            <InformationBox
              title="모집 기간"
              description="1차 지원 기간: 2월 27일 ~ 3월 1일"
              description2="2차 지원 기간: 3월 4일 ~ 3월 8일"
            />
            <InformationBox
              title="지원 자격"
              description="학과, 전공, 학년 무관 홍익대학교 학생이라면"
              description2="누구나 활동할 수 있어요."
            />
            <InformationBox
              title="지원 시 유의사항"
              description="GDGoC 커뮤니티 가이드라인 및 오픈 커뮤니티 
가이드라인을 준수해야 해요. 또한, 학기 당 
2만원의 회비가 있어요."
            />
          </Flex>
        </Flex>
        <Flex direction="column" align="center">
          <Text typo="h1" color="black">
            GDG에서는 이런 활동을 해요!
          </Text>
          <Space height={42} />
          <Carousel />
        </Flex>
        <Flex
          direction="column"
          align="center"
          css={css`
            gap: 16px;
          `}>
          <Text typo="h1" color="black">
            GDG에 대해 궁금한 점이 있나요?
          </Text>
          <Button size="sm" onClick={() => navigate(RoutePath.FAQ)}>
            FAQ 바로가기
          </Button>
        </Flex>
      </Flex>
      <BlueSection direction="column" justify="space-between">
        <Space height={60} />
        <JoinText />
        <OnboardingLogo2 />
        <Space height={25} />
        <ApplyButton
          onClick={() => {
            if (isAuthenticated()) navigate(RoutePath.Dashboard);
            else navigate(RoutePath.GithubSignin);
          }}>
          지원하기
        </ApplyButton>
        <Space height={40} />
      </BlueSection>
      <Space height={48} />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled(Flex)`
  text-align: center;
  box-sizing: border-box;

  width: ${GlobalSize.width};
  background-color: #f8f8f8;

  ${media.mobile} {
    width: 100vw;
  }
`;

const BlueSection = styled(Flex)`
  height: calc(100vh - ${GlobalSize.header});
  width: ${GlobalSize.width};
  background-color: ${color.primary};

  box-sizing: border-box;

  ${media.mobile} {
    width: 100vw;
  }
`;

const ApplyButton = styled.button`
  height: 44px;
  width: calc(100% - 32px);
  border-radius: 8px;

  background-color: ${color.white};
  color: ${color.primary};
  ${typography.h2};

  flex-shrink: 0;

  :disabled {
    background-color: ${color.mono400};
    color: ${color.mono100};
  }
`;
