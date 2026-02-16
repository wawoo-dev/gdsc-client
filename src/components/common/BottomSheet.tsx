import useBottomSheet from '@/hooks/common/useBottomSheet';
import useClickOutside from '@/hooks/useClickOutSide';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { Close } from 'wowds-icons';
import { color, space } from 'wowds-tokens';

const BottomSheet = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isOpen, handleBottomSheet } = useBottomSheet();

  useClickOutside(ref, handleBottomSheet);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      <Overlay>
        {isOpen && (
          <Container>
            <Wrapper
              ref={ref}
              animate={{ height: '40.375rem' }}
              initial={{ height: 0 }}
              transition={{ type: 'spring', duration: 1 }}
              exit={{ height: 0 }}>
              <BottomSheetActionArea onClick={() => handleBottomSheet()}>
                <Close width={24} height={24} stroke="outline" />
              </BottomSheetActionArea>
              {children}
            </Wrapper>
          </Container>
        )}
      </Overlay>
    </AnimatePresence>
  );
};

export default BottomSheet;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${color.backgroundDimmer};
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 40.375rem;
  display: relative;
  justify-content: center;
`;

const Wrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;
  width: 600px;
  height: 40.375rem;
  background-color: ${color.backgroundNormal};
  display: flex;
  flex-direction: column;
  padding: 20px 16px 28px 16px;
  gap: ${space.lg};
  border-radius: 8px 8px 0px;
  overflow-y: scroll;
  ${media.mobile} {
    width: 100vw;
  }
`;

const BottomSheetActionArea = styled.div`
  display: flex;
  direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 20px;
  width: 100%;
`;
