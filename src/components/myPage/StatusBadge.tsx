import styled from '@emotion/styled';
import { color, typography } from 'wowds-tokens';

interface StatusBadgeProps {
  statusMessage: '완료' | '진행전';
}

const StatusBadge = ({ statusMessage }: StatusBadgeProps) => {
  return (
    <StatusContainer status={statusMessage}>{statusMessage}</StatusContainer>
  );
};

export default StatusBadge;

const StatusContainer = styled.div<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ status }) =>
    status === '완료' ? '#D7E9FD' : '#FBD9D7'};
  color: ${({ status }) => (status === '완료' ? color.blueHover : color.error)};
  ${typography.label2};
`;
