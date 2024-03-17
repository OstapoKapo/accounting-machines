import { RootState } from '@/app/Store/store'
import { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    allCarPage: true,
}

export const MainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    setCarPage: (state, action: PayloadAction<boolean>) => {
        state.allCarPage = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setCarPage} = MainPageSlice.actions;
export const allCarPageValue = (state: RootState) => state.mainPage.allCarPage;
export default MainPageSlice.reducer;