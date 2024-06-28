import { DRAWER_STATE } from '@/common/states'
import { createSlice } from '@reduxjs/toolkit'

const initalState = {
  [DRAWER_STATE.OPEN_DRAWER_STATE]: false,
  user: null,
}

const slice = createSlice({
  name: 'configurationSlice',
  initialState: initalState,
  reducers: {
    toggleDrawer: (state, { payload: drawerState }) => {
      switch (drawerState) {
        case DRAWER_STATE.OPEN_DRAWER_STATE:
          state[DRAWER_STATE.OPEN_DRAWER_STATE] =
            !state[DRAWER_STATE.OPEN_DRAWER_STATE]
          break
        default:
          break
      }
    },
  },
})

export const { toggleDrawer } = slice.actions;
export const selectConfiguration = (state: any) => state.configuration;
export default slice.reducer;