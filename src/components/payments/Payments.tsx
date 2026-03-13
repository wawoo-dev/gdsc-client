import { Flex, Space, Text } from '@/components/common/Wrapper';

import styled from '@emotion/styled';
import { color, typography } from 'wowds-tokens';
import Button from 'wowds-ui/Button';

import { CalculateBox } from '@/components/payments/CalculateBox';
import { CouponDropDown } from '@/components/payments/CouponDropDown';
import { PaymentItemBox } from '@/components/payments/PaymentItemBox';
import { media } from '@/styles';
import { css } from '@emotion/react';

export const Payments = ({ onNext }: { onNext: () => void }) => {
  return (
    <Wrapper direction="column" justify="space-between">
      <Flex
        direction="column"
        justify="space-between"
        align="flex-start"
        css={css`
          height: 100%;
          ${media.pc} {
            justify-content: center;
            gap: 70px;
            max-width: 500px;
          }
        `}>
        <Flex
          direction="column"
          justify="space-between"
          align="flex-start"
          gap="xl"
          css={css`
            ${media.pc} {
              gap: 40px;
            }
          `}>
          <Heading>회비 납부</Heading>
          <PaymentItemBox />
          <CouponDropDown />
        </Flex>
        <Flex direction="column">
          <CalculateBox />
          <Space height={20} />
          <Button onClick={onNext}>결제하러 가기</Button>
          <Space height={28} />
        </Flex>
      </Flex>
    </Wrapper>
  );
};

const Heading = styled(Text)`
  ${typography.h1}
  padding-top: 40px;
  ${media.pc} {
    padding-bottom: 30px;
    ${typography.display2}
    text-align:center;
    width: 100%;
  }
`;

const Wrapper = styled(Flex)`
  box-sizing: border-box;
  height: 100vh;
  padding: 0px 16px;
  background-color: ${color.backgroundAlternative};
  width: 100vw;
  ${media.pc} {
    height: calc(100vh - var(--header-height, 0px));
  }
`;
