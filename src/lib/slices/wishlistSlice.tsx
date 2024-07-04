import { createSlice } from "@reduxjs/toolkit"

interface WishlistedItem {
  _id: string
  name: string
  price: number
  selectedSize: string
}

interface WishlistedItemsState {
  wishlistedItems: WishlistedItem[]
}

const initialState: WishlistedItemsState = {
  wishlistedItems: [],
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      const { item } = action.payload
      const existingItem = state.wishlistedItems.find(
        (wishlistedItem) => wishlistedItem._id === item._id,
      )
      if (!existingItem) {
        state.wishlistedItems.push({ ...item })
      }
    },
    removeItemFromWishlist: (state, action) => {
        const itemId = action.payload;
        state.wishlistedItems = state.wishlistedItems.filter(item => item._id !== itemId);
    }
  },
})

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
