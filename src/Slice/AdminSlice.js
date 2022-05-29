import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ToastComponent from "../Component/Common/TaostComponent";
const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
  admin: "",
  register: {
    isLoading: false,
    isSuccess: false,
  },
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
      state.admin = payload;
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.isAuth = false;
    },
    logoutPending: (state) => {
      state.isLoading = true;
    },
    logout: (state) => {
      state.isLoading = false;
      state.admin = "";
      state.isAuth = false;
    },
  },
});

const { actions } = loginSlice;
export const { loginPending, loginSuccess, loginFail, logout, logoutPending } =
  actions;
export default loginSlice.reducer;

export const LoginFunction = (Data) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `https://sap-user-microservice.herokuapp.com/login`,
        Data,
        config
      );
      // sessionStorage.setItem("auth", JSON.stringify(data));
      dispatch(loginSuccess(data));
      if (data.success === true) {
        ToastComponent("Login Successfully", "success");
      }
    } catch (error) {
      ToastComponent("Somthing went wrong", "error");
      dispatch(loginFail(error));
    }
  };
};
export const LogoutFunction = () => {
  return async (dispatch) => {
    // sessionStorage.removeItem("auth");
    dispatch(logout());
    ToastComponent("Logout Successfully", "success");
  };
};
