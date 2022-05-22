import { combineReducers } from "redux";
import loginSlice from "../Slice/AdminSlice";
import EntrySlice from "../Slice/EntrySlice";
import RegisterSlice from "../Slice/RegisterSlice";
export const rootReducer = combineReducers({
  Login: loginSlice,
  Entry:EntrySlice,
  Register:RegisterSlice
});
