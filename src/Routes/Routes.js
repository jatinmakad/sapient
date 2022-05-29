import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "../Component/Dashboard/Dashboard";
import Entry from "../Component/Entry/Entry";
import Login from "../Component/Login/Login";
import CreateEntry from "../Component/Entry/Create/CreateEntry";
import User from "../Component/UserManagement/User";
import CreateUser from "../Component/UserManagement/Create/CreateUser";
import UpdateEntry from "../Component/Entry/Update/UpdateEntry";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Slice/AdminSlice";
import EntryDetails from "../Component/Entry/EntryDetails";
import YourWork from "../Component/Entry/YourWork/YourWork";
import Coordination from "../Component/Coordination/Coordination";
const RoutesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let local = localStorage.getItem("auth");
    if (local === null) {
      return null
    } else {
      let updated = JSON.parse(local);
      dispatch(loginSuccess(updated));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        /* Entry */
        <Route path={"/entry"} element={<Entry />} />
        <Route path={"/create-entry"} element={<CreateEntry />} />
        <Route path={"/update-entry/:id"} element={<UpdateEntry />} />
        <Route path={"/entry-details/:id"} element={<EntryDetails/>} />
        <Route path={"/your-work"} element={<YourWork/>} />
        /* User */
        <Route path={"/user"} element={<User />} />
        <Route path={"/create-user"} element={<CreateUser />} />
      /* Coordination */
      <Route path={"/coordination"} element={<Coordination />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
