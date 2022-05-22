import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isAuth} = useSelector((state) => state.Login)
  useEffect(() => {
    // if(isAuth){
    //   dispatch(GetEntryFunction());
    // }
    if(isAuth === false){
     navigate("/login")
    }
  }, [isAuth]);
  
  return (
    <BasicLayout heading="User Management">
      <TableHeaderLayout heading="Create User" link="/create-user" />
      <UserTable/>
    </BasicLayout>
  );
};

export default User;
