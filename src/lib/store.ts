import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "@/lib/slices/userSlice"
import wishlistedReducer from "@/lib/slices/wishlistSlice"
import cartReducer from "@/lib/slices/cartSlice"
import configurationReducer from "@/lib/slices/configurationSlice"
import { authSlice } from "./api-slices/authApiSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { userApiSlice } from "./api-slices/userApiSlice"
import { productsApiSlice } from "./api-slices/productsApiSlice"
import { ordersApiSlice } from "./api-slices/ordersApiSlice"
import { paymentApiSlice } from "./api-slices/paymentApiSlice"
import { discountApiSlice } from "./api-slices/discountApiSlice"

const rootReducer = combineReducers({
  user: userReducer,
  wishlistedItems: wishlistedReducer,
  cart: cartReducer,
  configuration: configurationReducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
  [paymentApiSlice.reducerPath]: paymentApiSlice.reducer,
  [discountApiSlice.reducerPath]: discountApiSlice.reducer
})

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authSlice.middleware,
      userApiSlice.middleware,
      productsApiSlice.middleware,
      ordersApiSlice.middleware,
      paymentApiSlice.middleware,
      discountApiSlice.middleware
    ),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;