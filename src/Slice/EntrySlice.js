import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ToastComponent from "../Component/Common/TaostComponent";
const initialState = {
  get: {
    entry: "",
    isLoading: false,
    error: "",
  },
  create: {
    entry: "",
    isLoading: false,
    error: "",
  },
  delete: {
    deleteSuccess: false,
  },
  update: {
    updateSuccess: false,
  },
};
const EntrySlice = createSlice({
  name: "Entry",
  initialState,
  reducers: {
    GetEntryPending: (state) => {
      state.get.isLoading = true;
    },
    GetEntrySuccess: (state, { payload }) => {
      state.get.isLoading = false;
      state.get.error = "";
      state.get.entry = payload;
    },
    GetEntryFail: (state, { payload }) => {
      state.get.isLoading = false;
      state.get.error = payload;
      state.get.entry = "";
    },
    CreateEntryPending: (state) => {
      state.create.isLoading = true;
    },
    CreateEntrySuccess: (state, { payload }) => {
      state.create.isLoading = false;
      state.create.error = "";
      state.create.isSuccess = true;
    },
    CreateEntrySuccessAfter: (state, { payload }) => {
      state.create.isSuccess = false;
    },
    CreateEntryFail: (state, { payload }) => {
      state.create.isLoading = false;
      state.create.error = payload;
      state.create.entry = "";
    },
    DeleteEntry: (state) => {
      state.delete.deleteSuccess = true;
    },
    DeleteEntryCleanup: (state) => {
      state.delete.deleteSuccess = false;
    },
    UpdateEntryBefore: (state) => {
      state.update.isLoading = true;
    },
    UpdateEntry: (state) => {
      state.update.updateSuccess = true;
      state.update.isLoading = false;
    },
    UpdateEntryCleanup: (state) => {
      state.update.updateSuccess = false;
    },
  },
});

const { actions } = EntrySlice;
export const {
  GetEntryFail,
  GetEntryPending,
  GetEntrySuccess,
  CreateEntryFail,
  CreateEntrySuccess,
  CreateEntryPending,
  CreateEntrySuccessAfter,
  DeleteEntry,
  DeleteEntryCleanup,
  UpdateEntry,
  UpdateEntryCleanup,
  UpdateEntryBefore,
} = actions;
export default EntrySlice.reducer;

export const GetEntryFunction = (id) => {
  console.log(id, "id");
  return async (dispatch) => {
    try {
      dispatch(GetEntryPending());
      let link = `https://sap-data-management-mcs.herokuapp.com/get-job-lists/${id}`;
      const { data } = await axios.get(link);
      dispatch(GetEntrySuccess(data));
    } catch (error) {
      ToastComponent("Somthing went wrong", "error");
      dispatch(GetEntryFail(error));
    }
  };
};
export const CreateEntryFunction = (Data) => {
  return async (dispatch) => {
    try {
      dispatch(CreateEntryPending());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `https://sap-data-management-mcs.herokuapp.com/entry`,
        Data,
        config
      );
      dispatch(CreateEntrySuccess(data));
      if (data.success === true) {
        ToastComponent("Entry Created Successfully", "success");
      }
      dispatch(CreateEntrySuccessAfter());
    } catch (error) {
      ToastComponent("Somthing went wrong", "error");
      dispatch(CreateEntryFail(error));
    }
  };
};

export const DeletEntryFunction = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(
      `https://sap-data-management-mcs.herokuapp.com/delete-job/${id}`
    );
    if (data.success === true) {
      dispatch(DeleteEntry(data.success));
      ToastComponent("Entry Deleted SuccessFully", "success");
    }
    dispatch(DeleteEntryCleanup());
  };
};

export const UpdateEntryFunction = (id, Data) => {
  return async (dispatch) => {
    const config = { headers: { "Content-Type": "application/json" } };
    dispatch(UpdateEntryBefore());
    const { data } = await axios.put(
      `https://sap-data-management-mcs.herokuapp.com/edit-job/${id}`,
      Data,
      config
    );
    if (data.success === true) {
      dispatch(UpdateEntry(data.success));
      ToastComponent("Entry Updated SuccessFully", "success");
    }
    dispatch(UpdateEntryCleanup());
  };
};
