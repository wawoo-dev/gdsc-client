import { media } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type {
  color as colorType,
  space as spaceType,
  typography as typographyType
} from 'wowds-tokens';

import {
  color as wowColor,
  space as wowSpace,
  typography as wowTypo
} from 'wowds-tokens';

type colorKey = keyof typeof colorType;
type typoKey = keyof typeof typographyType;
type spaceKey = keyof typeof spaceType;

const getSpace = (space?: number | spaceKey) => {
  if (typeof space === 'number') {
    return `${space}px`;
  } else if (space && space in wowSpace) {
    return wowSpace[space];
  }
  return '';
};

export const Flex = styled.div<{
  direction?: string;
  justify?: string;
  align?: string;
  margin?: spaceKey;
  padding?: spaceKey;
  gap?: spaceKey;
  css?: ReturnType<typeof css>;
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? `${direction}` : 'row')};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  align-items: ${({ align }) => (align ? `${align}` : 'center')};
  gap: ${({ gap }) => (gap ? wowSpace[gap] : '0px')};
  margin: ${({ margin }) => (margin ? wowSpace[margin] : '0')};
  padding: ${({ padding }) => (padding ? wowSpace[padding] : '0')};
  width: 100%;
  box-sizing: border-box;
  ${({ css }) => css}
`;

export const Space = styled.div<{
  height?: number | spaceKey;
  width?: number | spaceKey;
  css?: ReturnType<typeof css>;
}>`
  height: ${({ height }) => getSpace(height)};
  width: ${({ width }) => getSpace(width)};
  ${({ css }) => css}
`;

export const Text = styled.p<{
  typo?: typoKey;
  color?: colorKey;
  css?: ReturnType<typeof css>;
  align?: 'start' | 'center';
}>`
  font-family: 'SUIT', 'Apple SD Gothic Neo';
  ${({ typo = 'body1' }) => wowTypo[typo]};
  color: ${({ color = 'textBlack' }) => wowColor[color]};
  text-align: ${({ align }) => (align ? `${align}` : 'start')};

  white-space: pre-wrap;
  word-break: keep-all;

  margin: 0;
  padding: 0;

  ${({ css }) => css}
`;

export const GuideList = styled.ul<{
  color?: colorKey;
  listPosition?: 'inside' | 'outside';
}>`
  ${wowTypo.body3};
  color: ${({ color = 'sub' }) => wowColor[color]};
  list-style-type: disc;
  list-style-position: ${({ listPosition = 'outside' }) => listPosition};
  padding-left: ${({ listPosition = 'outside' }) =>
    listPosition === 'outside' ? '20px' : '0'};
  margin: 0;
`;

export const MobileBreak = styled.br`
  display: none;
  ${media.mobile} {
    display: block;
  }
`;

export const DesktopOnly = styled.div`
  display: none;
  ${media.pc} {
    display: block;
    width: 100%;
  }
`;

export const MobileOnly = styled.div`
  display: block;
  width: 100%;
  ${media.pc} {
    display: none;
  }
`;
