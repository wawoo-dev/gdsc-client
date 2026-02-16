import { color, typography } from 'wowds-tokens';
import styled from '@emotion/styled';

/**
 * @default {HTMLButtonElement}
 */
export const JoinButton = styled.button`
  padding: 12px 20px;
  ${typography.label2}
  color: ${color.black};
  background-color: ${color.white};
  border: 1px solid ${color.sub};
  border-radius: 20px;
  min-width: max-content;
`;
