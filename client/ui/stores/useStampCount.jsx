import {create} from 'zustand';

export const useStampCount = create((set) => ({
  stampCount: 3,
  increaseStampCount: (amount) => set((state) => ({ stampCount: state.stampCount + amount })),
  decreaseStampCount: (amount) => set((state) => ({ stampCount: state.stampCount - amount })),
}));
