import { createContext } from 'react';

export const BottomSheetContext = createContext({
  isOpen: false,
  handleBottomSheet: (applyCallback?: () => void) => {},
  onApply: null as (() => void) | null
});
