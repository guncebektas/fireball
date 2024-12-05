import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      isCartModalOpen: false,
      openCartModal: () => set({ isCartModalOpen: true }),
      closeCartModal: () => set({ isCartModalOpen: false }),
      products: [],
      pushProduct: (product) => {
        set((state) => ({
          products: [...state.products, {
            ...product,
            ...{rowNumber: state.products.length + 1}
          }],
        }));
      },
      pullProduct: (product) => {
        set((state) => ({
          products: state.products.filter(
            (productInStore) => productInStore.rowNumber !== product.rowNumber
          ),
        }));
      },
      clearCart: () => set({ products: [] })
    }),
    {
      name: 'cart-store',
      storage: localStorage
    }
  )
);
