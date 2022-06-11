import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import { Button, Grid } from "@mui/material";
import {
  GetUserFunction,
  GetUserFunctionSearch,
} from "../../Slice/RegisterSlice";
const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const [searchInput, setSearchInput] = React.useState("");
  useEffect(() => {
    if (searchInput) {
      dispatch(GetUserFunctionSearch(searchInput));
    }
    if (searchInput === "") {
      dispatch(GetUserFunction());
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, searchInput]);

  return isAuth ? (
    <BasicLayout heading="User Management">
      <TableHeaderLayout setSearchInput={setSearchInput}>
        {admin.user.role === "ADMIN" ? (
          <Grid
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
          </Grid>
        ) : (
          ""
        )}
      </TableHeaderLayout>
      <UserTable searchInput={searchInput} />
    </BasicLayout>
  ) : (
    ""
  );
};

export default User;
