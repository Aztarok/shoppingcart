import { create } from 'zustand';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  removeItem: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  toggleCart: (value?: boolean) => void;
  removeItemToggle: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,
  removeItem: false,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
  toggleCart: (value?) => set((state) => ({ isCartOpen: value !== undefined ? value : !state.isCartOpen })),
  removeItemToggle: () => set((state) => ({removeItem: !state.removeItem}))
})); 