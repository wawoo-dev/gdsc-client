import { BottomSheetContext } from '@/context/BottomSheetContext';
import { ReactNode, useCallback, useState } from 'react';

const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onApply, setOnApply] = useState<(() => void) | null>(null);

  const handleBottomSheet = useCallback((applyCallback?: () => void) => {
    setIsOpen((prev) => !prev);
    if (applyCallback) {
      setOnApply(() => applyCallback);
    }
  }, []);

  return (
    <BottomSheetContext.Provider value={{ isOpen, handleBottomSheet, onApply }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;
