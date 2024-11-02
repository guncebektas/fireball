import {create} from 'zustand';

export const useStampCountStore = create((set) => ({
  stampCount: 0,
  setStampCount: (amount) => set(() => ({ stampCount: amount })),
  increaseStampCount: (amount) => set((state) => ({ stampCount: state.stampCount + amount })),
  decreaseStampCount: (amount) => set((state) => ({ stampCount: state.stampCount - amount })),
}));
