import { createContext } from 'react';

export const BottomSheetContext = createContext({
  isOpen: false,
  handleBottomSheet: (_applyCallback?: () => void) => {},
  onApply: null as (() => void) | null
});
