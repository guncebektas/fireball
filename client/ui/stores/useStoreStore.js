import {create} from 'zustand';

export const useStoreStore = create((set) => ({
  stores: [],
  setStores: (rows) => set({ stores: rows }),
  selectedStore: '',
  setSelectedStore: (row) => set({ selectedStore: row }),
  selectedStoreProductCategories: [],
  setSelectedStoreProductCategories: (rows) => set({ selectedStoreProductCategories: rows }),
  selectedStoreProducts: [],
  setSelectedStoreProducts: (rows) => set({ selectedStoreProducts: rows })
}));
