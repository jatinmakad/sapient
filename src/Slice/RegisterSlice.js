import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ToastComponent from "../Component/Common/TaostComponent";
const initialState = {
  register: {
    isLoading: false,
    isSuccess: false,
  },
  get: {
    users: "",
    isLoading: false,
    error: "",
  },
};
const RegisterSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    GetUserPending: (state) => {
      state.get.isLoading = true;
    },
    GetUserSuccess: (state, { payload }) => {
      state.get.isLoading = false;
      state.get.users = payload;
    },
    GetUserFail: (state, { payload }) => {
      state.get.isLoading = false;
      state.get.error = payload;
    },
    RegisterPending: (state) => {
      state.register.isLoading = true;
    },
    RegisterSuccess: (state) => {
      state.register.isLoading = false;
      state.register.error = "";
      state.register.isSuccess = true;
    },
    RegisterSuccessAfter: (state) => {
      state.register.isSuccess = false;
    },
    RegisterFail: (state, { payload }) => {
      state.register.error = payload;
    },
  },
});

const { actions } = RegisterSlice;
export const {
  GetUserFail,
  GetUserPending,
  GetUserSuccess,
  RegisterFail,
  RegisterPending,
  RegisterSuccess,
  RegisterSuccessAfter,
} = actions;
export default RegisterSlice.reducer;

export const RegisterFunction = (Data) => {
  return async (dispatch) => {
    try {
      dispatch(RegisterPending());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `http://localhost:3000/register`,
        Data,
        config
      );
      if (data.success === true) {
        dispatch(RegisterSuccess());
        ToastComponent("User Created Successfully", "success");
      }
      dispatch(RegisterSuccessAfter());
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
      dispatch(RegisterFail(error));
    }
  };
};

export const GetUserFunction = () => {
  return async (dispatch) => {
    try {
      dispatch(GetUserPending());
      const { data } = await axios.get(`/api/v1/logout`);
      dispatch(GetUserSuccess(data));
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
      dispatch(GetUserFail(error));
      
    }
  };
};
