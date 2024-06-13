import { createSlice } from "@reduxjs/toolkit";
import { Login } from "../pages/login/Login";
import { LoginForm } from "../components/login/LoginForm";  

const initialState = {
  login: "",
  password: "",
};


export const store = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
    password: (state, action) => {
      state.password = action.payload;
    },
  },
});


export const { login, password } = store.actions;

export default store.reducer;



