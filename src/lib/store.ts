import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@/lib/slices/userSlice"
import { authSlice } from "./api-slices/authApiSlice"

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       user: userReducer,
//       [authSlice.reducerPath]: authSlice.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({ serializableCheck: false }).concat(
//         authSlice.middleware
//       ),
//   })
// }

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authSlice.middleware
    ),
});

export default store;

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
