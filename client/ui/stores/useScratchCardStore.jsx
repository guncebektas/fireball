import { create } from 'zustand';

export const useScratchCardStore = create((set) => ({
  isScratchCardModalOpen: false,
  openScratchCardModal: () => set({ isScratchCardModalOpen: true }),
  closeScratchCardModal: () => set({ isScratchCardModalOpen: false }),
}));
