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
        const { item } = action.payload;
        const existingItem = state.cart.find(
          (cartItem) => cartItem._id === item._id && cartItem.selectedSize === item.selectedSize
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cart.push({ ...item, quantity: 1 });
        }
      },
      removeItemsFromCart: (state, action) => {
        const { item, quantity } = action.payload;
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
        const { id, selectedSize } = action.payload;
        state.cart = state.cart.filter(
          (item) => !(item._id === id && item.selectedSize === selectedSize)
        );
      },
  },
})

export const {addItemsToCart, removeItemsFromCart, deleteItemFromCart} = cartSlice.actions;
export default cartSlice.reducer