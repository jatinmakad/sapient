import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReportTable from "./reportTable";
const ReportTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  const [searchInput, setSearchInput] = React.useState("");
  return isAuth ? (
    <BasicLayout heading="Report Team">
      <TableHeaderLayout setSearchInput={setSearchInput} />
      <ReportTable searchInput={searchInput} />
    </BasicLayout>
  ) : (
    ""
  );
};

export default ReportTeam;
