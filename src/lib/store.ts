import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "@/lib/slices/userSlice"
import { authSlice } from "./api-slices/authApiSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"


const rootReducer = combineReducers({
  user: userReducer,
  [authSlice.reducerPath]: authSlice.reducer,
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
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authSlice.middleware
    ),
});

export const persistor = persistStore(store)