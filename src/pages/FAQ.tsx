import { Flex, Space, Text } from '@/components/common/Wrapper';
import { InformationBox } from '@/components/onboarding/InformationBox';
import GlobalSize from '@/constants/globalSize';
import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color } from 'wowds-tokens';

export const FAQ = () => {
  return (
    <Wrapper direction="column" justify="flex-start" align="center">
      <Flex direction="column" gap="xxs">
        <Text typo="h1">FAQ</Text>
        <Text typo="body1" color="sub">
          자주 묻는 질문
        </Text>
      </Flex>
      <Space height={48} />
      <Flex direction="column" gap="sm">
        <InformationBox
          title="Q. 서류, 면접 전형이 있나요?"
          description="A. 없습니다!"
          description2="홍익대학교 학생이라면 누구나 본 사이트의 ‘지원하기' 를 통해 가입할 수 있어요."
          isFAQ={true}
        />
        <InformationBox
          title="Q. 다른 동아리, 학회와 병행 가능한가요?"
          description="A. 가능합니다!"
          description2="GDG Hongik Univ. 는 멤버 분들이 각자의 일정과 시간에 맞춰서 편하게 활동하실 수 있게, 모든 활동에 자율적으로 참여할 수 있는 환경을 제공하고 있어요."
          isFAQ={true}
        />
        <InformationBox
          title="Q. 저는 코딩을 하나도 모르는 새내기인데, 따라갈 수 있나요?"
          description="A. 당연하죠!"
          description2="저희는 커뮤니티 멤버 개개인이 저마다 다른 목표와 속도를 가지고 있다는 점을 깊이 이해하고 있어요. 새내기와 입문자 분들이 개발자로서 함께 성장할 수 있도록 기초 커리큘럼과 다양한 학술 지원 프로그램을 운영하고 있으니, 너무 걱정하지 않으셔도 돼요."
          isFAQ={true}
        />
      </Flex>
      <Space height={48} />
      <Flex direction="column" gap="md" align="center">
        <Text
          color="black"
          typo="body1"
          css={css`
            text-align: center;
            word-break: keep-all;
          `}>
          추가 문의사항이 있다면
          <br /> 카카오톡 플러스채널을 이용해주세요.
        </Text>
        <Text
          color="white"
          typo="label1"
          css={css`
            cursor: pointer;
            background-color: ${color.primary};
            padding: 16px 24px;
            border-radius: 100px;
          `}
          onClick={() => {
            window.open('http://pf.kakao.com/_dWxmen');
          }}>
          카카오톡 플러스채널 바로가기
        </Text>
      </Flex>
      <Space height={100} />
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  min-height: calc(100vh - var(--header-height, 0px));
  width: ${GlobalSize.width};
  margin: 0px -16px;
  padding: 64px 16px;
  padding-top: 40px;
  padding-bottom: 28px;
  background-color: ${color.backgroundAlternative};

  ${media.mobile} {
    width: 100vw;
  }
`;
