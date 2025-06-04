import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useStoreStore = create(
  persist(
    (set) => ({
      stores: [],
      setStores: (rows) => set({ stores: rows }),
      selectedStore: '',
      setSelectedStore: (row) => set({ selectedStore: row }),
      selectedStoreProductCategories: [],
      setSelectedStoreProductCategories: (rows) => set({ selectedStoreProductCategories: rows }),
      selectedStoreProducts: [],
      storyBoardLastFetch: 0,
      setSelectedStoreProducts: (rows) => set((state) => {
        const currentTime = Date.now();
        // Only update products if cache is expired (1 minute)
        if (currentTime - state.storyBoardLastFetch > 60000 || state.selectedStoreProducts.length === 0) {
          return { 
            selectedStoreProducts: rows,
            storyBoardLastFetch: currentTime
          };
        }
        return state;
      }),
      isMenuModalOpen: false,
      openMenuModal: () => set({ isMenuModalOpen: true }),
      closeMenuModal: () => set({ isMenuModalOpen: false }),
    }),
    {
      name: 'store-store',
      storage: localStorage,
      partialize: (state) => ({
        selectedStoreProducts: state.selectedStoreProducts,
        storyBoardLastFetch: state.storyBoardLastFetch
      })
    }
  )
);
