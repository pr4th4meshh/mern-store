import { createSlice } from '@reduxjs/toolkit';

// Function to get the token from localStorage if available
const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

const initialState = {
  currentUser: null,
  token: getTokenFromLocalStorage() || null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.currentUser = { ...user }; // Ensure immutability by creating a new object
      state.token = token;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', token);
      }
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export const selectCurrentUser = (state: { user: { currentUser: any; }; }) => state.user.currentUser;
export const selectToken = (state: { user: { token: any; }; }) => state.user.token;
export const selectLoading = (state: { user: { isLoading: any; }; }) => state.user.isLoading;
export const selectError = (state: { user: { error: any; }; }) => state.user.error;

export default userSlice.reducer;
