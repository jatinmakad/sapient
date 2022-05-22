import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import EntryTable from "./EntryTable";
import { useDispatch, useSelector } from "react-redux";
import { GetEntryFunction } from "../../Slice/EntrySlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
const Entry = () => {
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

  return ( isAuth ? 
    <BasicLayout heading="Entry">
     <TableHeaderLayout>
        {admin.user.role === "entry team" ? <Grid
          item
          lg={3}
          md={3}
          sm={6}
          xs={6}
          display="flex"
          justifyContent="flex-end"
        >
          <Link to={"/create-entry"}>
            <Button variant="contained" color="primary">
              {/* <AddIcon /> */}
              Create Entry
            </Button>
          </Link>
        </Grid> : ""}
      </TableHeaderLayout>
      <EntryTable />
    </BasicLayout> : ""
  );
};

export default Entry;
