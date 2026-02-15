import { create } from 'zustand';

type AccountInfoStore = {
  name: string | null;
  githubHandle: string | null;
  setAccountInfo: (name: string, githubHandle: string) => void;
};

export const useAccountInfoStore = create<AccountInfoStore>((set) => ({
  name: null,
  githubHandle: null,
  setAccountInfo: (name, githubHandle) => set({ name, githubHandle })
}));

export default useAccountInfoStore;
