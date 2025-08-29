import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShoppingList } from '@/types/types'

interface ProductStore {
    products: ShoppingList[],
    addProduct: (item: ShoppingList) => void,
    deleteProduct: (id: number) => void,
    clear: () => void
}

export const useProductStore = create<ProductStore>()(
    persist(
      (set) => ({
        products: [],
        addProduct: (item) =>
          set((state) => ({ products: [...state.products, item] })),
        deleteProduct: (id) =>
          set((state) => ({
            products: state.products.filter((p) => p.createdAt !== id),
          })),
        clear: () => set(() => ({ products: [] })),
      }),
      {
        name: 'product-store-v1', // storage key
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ products: state.products }),
        version: 1,
      }
    )
);