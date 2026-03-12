import { Flex, Space, Text } from '@/components/common/Wrapper';

import { color, typography } from 'wowds-tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { media } from '@/styles';

export const InformationBox = ({
  title,
  description,
  description2,
  isFAQ
}: {
  title: string;
  description: string;
  description2?: string;
  isFAQ?: boolean;
}) => {
  return (
    <Wrapper
      direction="column"
      align="flex-start"
      justify="flex-start"
      isFAQ={isFAQ}>
      <Text
        color="black"
        css={css`
          word-break: keep-all;
          display: flex;
          justify-content: center;
          align-items: center;
          ${typography.h1};
          ${media.mobile} {
            ${typography.h3};
          }
        `}>
        {title}
      </Text>
      <Space height={8} />
      <Text
        typo="body1"
        color="sub"
        css={css`
          word-break: keep-all;
          line-height: 160%;
          font-weight: ${isFAQ ? 700 : 500};
        `}>
        {description}
      </Text>
      <Text
        typo="body1"
        color="sub"
        css={css`
          word-break: keep-all;
        `}>
        {description2}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)<{ isFAQ?: boolean }>`
  box-sizing: border-box;
  padding: 32px 40px;
  background-color: ${color.white};
  bottom: 10px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;

  text-align: start;
  height: fit-content;
  max-width: 576px;
  ${(props) => props.isFAQ && `max-width: 820px;`}
  ${media.mobile} {
    padding: 20px 24px;
  }
`;
