import { setCookie, removeCookie } from '@/lib/cookies';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt from 'jsonwebtoken';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: 'user' | 'admin' | null;
  isAuthenticated: boolean;
  login: any;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  role: null,
  refreshToken: null,
  login: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<any>) => {
      const decodedData: any = jwt.decode(action.payload.data.accessToken);
      setCookie('accessToken', action.payload.data.accessToken);
      setCookie('refreshToken', action.payload.data.refreshToken);
      setCookie('loginData', decodedData);
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken = action.payload.data.refreshToken;
      state.isAuthenticated = true;
      state.role = decodedData.role;
      state.login = decodedData;
    },
    setLogout: (state) => {
      removeCookie('accessToken');
      removeCookie('refreshToken');
      removeCookie('loginData');
      state.accessToken = null;
      state.refreshToken = null;
      state.login = null;
      state.isAuthenticated = false;
      state.role = null;
      state.login = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
