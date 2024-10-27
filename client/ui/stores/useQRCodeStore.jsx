import {create} from 'zustand';

export const useQRCodeStore = create((set) => ({
  isQRCodeModalOpen: false,
  openQRCodeModal: () => set({ isQRCodeModalOpen: true }),
  closeQRCodeModal: () => set({ isQRCodeModalOpen: false }),
}));
