import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      isCartModalOpen: false,
      openCartModal: () => set({ isCartModalOpen: true }),
      closeCartModal: () => set({ isCartModalOpen: false }),
      products: [],
      groupedProducts: [],
      pushProduct: (product) => {
        set((state) => {
          const newProducts = [...state.products, {
            ...product,
            ...{rowNumber: state.products.length + 1}
          }];
          
          // Calculate grouped products
          const grouped = newProducts.reduce((acc, product) => {
            const existingProduct = acc.find(p => p._id === product._id);
            if (existingProduct) {
              existingProduct.quantity += 1;
            } else {
              acc.push({ ...product, quantity: 1 });
            }
            return acc;
          }, []);

          return {
            products: newProducts,
            groupedProducts: grouped
          };
        });
      },
      pullProduct: (product) => {
        set((state) => {
          const newProducts = state.products.filter(
            (productInStore) => productInStore.rowNumber !== product.rowNumber
          );

          // Recalculate grouped products
          const grouped = newProducts.reduce((acc, product) => {
            const existingProduct = acc.find(p => p._id === product._id);
            if (existingProduct) {
              existingProduct.quantity += 1;
            } else {
              acc.push({ ...product, quantity: 1 });
            }
            return acc;
          }, []);

          return {
            products: newProducts,
            groupedProducts: grouped
          };
        });
      },
      clearCart: () => set({ products: [], groupedProducts: [] })
    }),
    {
      name: 'cart-store',
      storage: localStorage
    }
  )
);
