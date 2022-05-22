import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Component/Dashboard/Dashboard";
import Entry from "../Component/Entry/Entry";
import Login from "../Component/Login/Login";
import CreateEntry from "../Component/Entry/CreateEntry/CreateEntry";
import User from "../Component/UserManagement/User";
import CreateUser from "../Component/UserManagement/CreateUser/CreateUser";
import UpdateEntry from "../Component/Entry/UpdateEntry/UpdateEntry";
const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/dashboard"} element={<Dashboard/>} />
        /* Entry */
        <Route path={"/entry"} element={<Entry/>} />
        <Route path={"/create-entry"} element={<CreateEntry/>} />
        <Route path={"/update-entry/:id"} element={<UpdateEntry/>} />

        /* User */
        <Route path={"/user"} element={<User/>} />
        <Route path={"/create-user"} element={<CreateUser/>} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
