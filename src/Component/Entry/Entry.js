import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import EntryTable from "./EntryTable";
import { useDispatch, useSelector } from "react-redux";
import { GetEntryFunction } from "../../Slice/EntrySlice";
import { Navigate, useNavigate } from "react-router-dom";
const Entry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.Login);

  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryFunction());
    }

    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <BasicLayout heading="Entry">
      <TableHeaderLayout heading="Create Entry" link="/create-entry" />
      <EntryTable />
    </BasicLayout>
  );
};

export default Entry;
