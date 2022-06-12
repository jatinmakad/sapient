import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ToastComponent from "../Component/Common/TaostComponent";
const initialState = {
  //   get: {
  //     entry: "",
  //     isLoading: false,
  //     error: "",
  //   },
  //   create: {
  //     entry: "",
  //     isLoading: false,
  //     error: "",
  //   },
  //   delete: {
  //     deleteSuccess: false,
  //   },
  //   update: {
  //     updateSuccess: false,
  //   },
  assignTask: {
    updateAssignTaskSuccess: false,
  },
};
const ReportSlice = createSlice({
  name: "Report",
  initialState,
  reducers: {
    UpdateAssignTaskBefore: (state) => {
      state.assignTask.isLoading = true;
    },
    UpdateAssignTaskStatus: (state) => {
      state.assignTask.isLoading = false;
      state.assignTask.updateAssignTaskSuccess = true;
    },
    UpdateAssignTaskCleanup: (state) => {
      state.assignTask.updateAssignTaskSuccess = false;
    },
  },
});

const { actions } = ReportSlice;
export const {
  UpdateAssignTaskBefore,
  UpdateAssignTaskStatus,
  UpdateAssignTaskCleanup,
} = actions;
export default ReportSlice.reducer;

export const UpdateAssignFunction = (Data) => {
  return async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      dispatch(UpdateAssignTaskBefore());
      const { data } = await axios.post(
        `https://sap-data-management-mcs.herokuapp.com/assign-tasks`,
        Data,
        config
      );
      if (data.success === true) {
        dispatch(UpdateAssignTaskStatus());
        ToastComponent("Task Assigned SuccessFully", "success");
      }
      dispatch(UpdateAssignTaskCleanup());
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
    }
  };
};
