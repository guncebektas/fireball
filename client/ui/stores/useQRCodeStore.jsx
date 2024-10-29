import { create } from 'zustand';

export const useQRCodeStore = create((set) => ({
  isQRCodeModalOpen: false,
  openQRCodeModal: () => set({ isQRCodeModalOpen: true, secondsLeft: 60 }), // Reset countdown on open
  closeQRCodeModal: () => set({ isQRCodeModalOpen: false }),
  secondsLeft: 60, // Set initial countdown time
  resetCountdown: () => set({ secondsLeft: 60 }),
  decrementCountdown: () => set((state) => ({ secondsLeft: state.secondsLeft - 1 })),
}));
