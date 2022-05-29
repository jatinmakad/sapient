import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { GetEntryFunction } from "../../Slice/EntrySlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EntryTable from "../Entry/EntryTable";
const Coordination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth,admin } = useSelector((state) => state.Login);

  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryFunction());
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  const [searchInput, setSearchInput] = React.useState("");
  return ( isAuth ? 
    <BasicLayout heading="Coordination Team">
     <TableHeaderLayout setSearchInput={setSearchInput}/>
      <EntryTable searchInput={searchInput}/>
    </BasicLayout> : ""
  );
};

export default Coordination;
