import { createSlice } from '@reduxjs/toolkit';
const storedUser = localStorage.getItem('user');

const initialState = {
  value: 'Chlin',
  user: storedUser ? JSON.parse(storedUser) : {
    email: null,
    role: null,
    displayName: null,
    ip: null,
    _id: null,
    orderCount: null,
    token: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = 'login';
      state.user = {
        email: action.payload.email,
        role: action.payload.role,
        displayName: action.payload.displayName,
        ip: action.payload.ip,
        _id: action.payload._id,
        orderCount: action.payload.orderCount,
        token: action.payload.token,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = [];
      localStorage.clear();
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    updateOrderCount: (state, action) => {
      state.user.orderCount = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { login, logout, incrementByAmount, updateOrderCount } = userSlice.actions;

export default userSlice.reducer;
