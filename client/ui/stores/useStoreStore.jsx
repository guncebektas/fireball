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
      setSelectedStoreProducts: (rows) => set({ selectedStoreProducts: rows }),
      // story board
      storyBoardLastFetch: 0,
      storyBoardProducts: [],
      setStoryBoardProducts: (rows) => set((state) => {
        const currentTime = Date.now();
        // Only update products if cache is expired (1 minute)
        if (currentTime - state.storyBoardLastFetch > 60000 || state.storyBoardProducts.length === 0) {
          return { 
            storyBoardProducts: rows,
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
      name: 'story-board-products-store',
      storage: localStorage,
      partialize: (state) => ({
        storyBoardProducts: state.storyBoardProducts,
        storyBoardLastFetch: state.storyBoardLastFetch
      })
    }
  )
);
