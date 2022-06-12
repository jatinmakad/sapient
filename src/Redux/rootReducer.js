import { combineReducers } from "redux";
import loginSlice from "../Slice/AdminSlice";
import CoordinationSlice from "../Slice/CoordinationSlice";
import EntrySlice from "../Slice/EntrySlice";
import RegisterSlice from "../Slice/RegisterSlice";
import ReportSlice from "../Slice/ReportSlice";
export const rootReducer = combineReducers({
  Login: loginSlice,
  Entry: EntrySlice,
  Register: RegisterSlice,
  Coordination: CoordinationSlice,
  Report: ReportSlice,
});
