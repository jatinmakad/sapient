import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Common/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { GetUserFunction } from "../../Slice/RegisterSlice";
export default function UserTable({ searchInput }) {
  const { data } = useSelector((state) => state.Register.get.users);
  const { isLoading } = useSelector((state) => state.Register.get);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.Login);
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <Loader />
      ) : data && data.length === 0 ? (
        <p className="w-full flex justify-center items-center font-semibold text-3xl pt-3 pb-3">
          No Record Found
        </p>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerCell.map((r) => {
                return (
                  <TableCell
                    align={r.align}
                    sx={{
                      color: "gray",
                      borderBottom: "0.5px solid lightgray",
                    }}
                  >
                    {r.value}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <TableRow sx={{ border: "none" }}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.role}</StyledTableCell>
                  <StyledTableCell align="left">
                    {/* <StatusColor status={row.status} /> */}
                    {row.contactNumber}
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">
                    <div className="flex justify-evenly items-center">
                      <EditIcon className="text-blue-700 cursor-pointer" />
                      <DeleteIcon className="text-red-700 cursor-pointer" />
                    </div>
                  </StyledTableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "black",
    fontWeight: "500",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const headerCell = [
  {
    value: "Sr no.",
    align: "left",
  },
  {
    value: "Name",
    align: "left",
  },
  {
    value: "Email",
    align: "left",
  },
  {
    value: "Role",
    align: "left",
  },
  {
    value: "Contact Number",
    align: "left",
  },
  // {
  //   value: "Action",
  //   align: "center",
  // },
];
