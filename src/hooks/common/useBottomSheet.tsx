import BottomSheet from '@/components/common/BottomSheet';
import { BottomSheetContext } from '@/context/BottomSheetContext';
import { ReactNode, useContext } from 'react';

const useBottomSheet = () => {
  const { isOpen, handleBottomSheet } = useContext(BottomSheetContext);

  const BottomSheetElement = ({ children }: { children: ReactNode }) => {
    return <BottomSheet>{children}</BottomSheet>;
  };
  return { isOpen, BottomSheetElement, handleBottomSheet };
};

export default useBottomSheet;
