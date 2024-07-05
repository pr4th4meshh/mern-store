import { createSlice } from "@reduxjs/toolkit"

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  selectedSize: string
}

interface CartState {
  cart: CartItem[]
}

const initialState: CartState = {
  cart: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemsToCart: (state, action) => {
        const { item, quantity } = action.payload;
        const existingItem = state.cart.find(
          (cartItem) => cartItem._id === item._id && cartItem.selectedSize === item.selectedSize
        );
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.cart.push({ ...item, quantity });
        }
    },
    removeItemsFromCart: (state, action) => {
        const { item, quantity } = action.payload;
        if (!item) return;
        const existingItem = state.cart.find(
          (cartItem) => cartItem._id === item._id && cartItem.selectedSize === item.selectedSize
        );
        if (existingItem) {
          existingItem.quantity -= quantity;
          if (existingItem.quantity <= 0) {
            state.cart = state.cart.filter(
              (cartItem) => cartItem._id !== item._id || cartItem.selectedSize !== item.selectedSize
            );
          }
        }
    },
    deleteItemFromCart: (state, action) => {
      const itemId = action.payload
      state.cart = state.cart.filter((item) => item._id !== itemId)
    },
  },
})

export const {addItemsToCart, removeItemsFromCart, deleteItemFromCart} = cartSlice.actions;
export default cartSlice.reducer