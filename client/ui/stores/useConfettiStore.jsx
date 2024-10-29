import {create} from 'zustand';

export const useConfettiStore = create((set) => ({
  showConfetti: false,
  openConfetti: () => set({ showConfetti: true }),
  closeConfetti: () => set({ showConfetti: false }),
}));
