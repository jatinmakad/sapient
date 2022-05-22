import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import { Button, Grid } from "@mui/material";
import { GetUserFunction } from "../../Slice/RegisterSlice";
const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  useEffect(() => {
    if(isAuth){
      dispatch(GetUserFunction());
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);

  return ( isAuth ?
    <BasicLayout heading="User Management">
      <TableHeaderLayout>
        {admin.user.role === "admin" ? <Grid
          item
          lg={3}
          md={3}
          sm={6}
          xs={6}
          display="flex"
          justifyContent="flex-end"
        >
          <Link to={"/create-user"}>
            <Button variant="contained" color="primary">
              {/* <AddIcon /> */}
              Create User
            </Button>
          </Link>
        </Grid> : ""}
      </TableHeaderLayout>
      <UserTable />
    </BasicLayout> : ""
  );
};

export default User;
