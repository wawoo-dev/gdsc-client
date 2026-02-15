import BottomSheet from '@/components/common/BottomSheet';
import { useContext, ReactNode } from 'react';
import { BottomSheetContext } from '@/context/BottomSheetContext';

const useBottomSheet = () => {
  const { isOpen, handleBottomSheet, onApply } = useContext(BottomSheetContext);

  const BottomSheetElement = ({ children }: { children: ReactNode }) => {
    return <BottomSheet>{children}</BottomSheet>;
  };
  return { isOpen, BottomSheetElement, handleBottomSheet, onApply };
};

export default useBottomSheet;
