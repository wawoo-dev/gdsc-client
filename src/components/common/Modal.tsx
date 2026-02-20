import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import { color } from 'wowds-tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string | number;
}

/**
 * @default {Modal}
 *
 * @param {boolean} isOpen: 모달 열림 여부
 * @param {() => void} onClose: 모달 닫기 함수
 * @param {ReactNode} children: 모달 내용
 * @param {string | number} width?: 모달 너비
 */
export const Modal = ({ isOpen, onClose, children, width }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer width={width} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${color.backgroundDimmer};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div<{ width?: string | number }>`
  background-color: ${color.backgroundNormal};
  border-radius: 8px;
  padding: 24px;
  width: ${({ width }) => (width ? (typeof width === 'number' ? `${width}px` : width) : '90%')};
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid ${color.outline};
`;
