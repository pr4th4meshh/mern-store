import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "@/lib/slices/userSlice"
import configurationReducer from "@/lib/slices/configurationSlice"
import { authSlice } from "./api-slices/authApiSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { userApiSlice } from "./api-slices/userApiSlice"

const rootReducer = combineReducers({
  user: userReducer,
  configuration: configurationReducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
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
      userApiSlice.middleware
    ),
})

export const persistor = persistStore(store)
