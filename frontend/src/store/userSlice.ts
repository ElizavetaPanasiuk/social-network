import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  isAuth: boolean;
}

type SignInData = {
  id: number;
  firstName: string;
  lastName: string;
};

const initialState: UserState = {
  id: null,
  firstName: null,
  lastName: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<SignInData>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.isAuth = true;
    },
    signOut: (state) => {
      state = initialState;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
