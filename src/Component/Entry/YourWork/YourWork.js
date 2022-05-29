import React, { useEffect } from "react";
import BasicLayout from "../../BasicLayout/BasicLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletEntryFunction,
  GetEntryFunction,
} from "../../../Slice/EntrySlice";
import { Link, useNavigate } from "react-router-dom";
import TableHeaderLayout from "../../Common/TableLayout/TableHeaderLayout";
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
import Loader from "../../Common/Loader";
import moment from "moment";
import DeleteDialog from "../../Common/DeleteDialog";
const YourWork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry } = useSelector((state) => state.Entry.get);
  const { deleteSuccess } = useSelector((state) => state.Entry.delete);
  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryFunction(admin.user._id));
    }
    if (isAuth === false) {
      navigate("/login");
    }
    if (deleteSuccess) {
      dispatch(GetEntryFunction(admin.user._id));
      setOpen(false);
    }
  }, [isAuth, deleteSuccess]);

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickDeleteOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const deleteAction = (id) => {
    dispatch(DeletEntryFunction(id));
  };
  const [searchInput, setSearchInput] = React.useState("");
  return isAuth ? (
    <BasicLayout heading="Your Work">
      <TableHeaderLayout setSearchInput={setSearchInput} />
      <TableContainer component={Paper}>
        {!entry ? (
          <Loader />
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
              {entry.data &&
                entry.data.length >= 1 &&
                entry.data.map((row, index) => (
                  <TableRow sx={{ border: "none" }}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.reportRefrenceNo}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.city}</StyledTableCell>
                    <StyledTableCell align="left">
                      {moment(row.date).format("L")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {/* <StatusColor status={row.status} /> */}
                      {row.insured}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="flex justify-evenly items-center">
                        <Link to={`/update-entry/${row.reportRefrenceNo}`}>
                          <EditIcon className="text-blue-700 cursor-pointer" />
                        </Link>
                        <DeleteIcon
                          className="text-red-700 cursor-pointer"
                          onClick={() =>
                            handleClickDeleteOpen(row.reportRefrenceNo)
                          }
                        />
                      </div>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
            <DeleteDialog
              open={open}
              handleClose={handleClose}
              deleteAction={deleteAction}
              handleClickOpen={handleClickOpen}
              id={id}
            />
          </Table>
        )}
      </TableContainer>
    </BasicLayout>
  ) : (
    ""
  );
};

export default YourWork;

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
    value: "Refrence No.",
    align: "left",
  },
  {
    value: "City",
    align: "left",
  },
  {
    value: "Date",
    align: "left",
  },
  {
    value: "Insure",
    align: "left",
  },
  {
    value: "Action",
    align: "center",
  },
];
