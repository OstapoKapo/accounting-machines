import { RootState } from '@/app/Store/store'
import { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface initialState {  
    user: User  
}

const initialState: initialState = {
    user: {
        firstName: '',
        secondName: '',
        email: '',
        password: '',
        avatarImg: '',
        description: '',
        cars: [],
    }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions;

export const selectValue = (state: RootState) => state.user.user;

export default userSlice.reducer;