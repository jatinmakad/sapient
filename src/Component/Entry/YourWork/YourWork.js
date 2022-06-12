import React, { useEffect } from "react";
import BasicLayout from "../../BasicLayout/BasicLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletEntryFunction,
  GetEntryFunction,
  GetEntryFunctionId,
  UpdateEntryStatusFunction,
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
import { setNestedObjectValues } from "formik";
import { MenuItem, Select } from "@mui/material";
const YourWork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const { deleteSuccess } = useSelector((state) => state.Entry.delete);
  const { updateStatusSuccess } = useSelector(
    (state) => state.Entry.updateStatus
  );
  const [value, setValue] = React.useState("");
  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryFunctionId(admin.user._id));
    }
    if (isAuth === false) {
      navigate("/login");
    }
    if (deleteSuccess) {
      dispatch(GetEntryFunctionId(admin.user._id));
      setOpen(false);
    }
    if (updateStatusSuccess) {
      dispatch(GetEntryFunctionId(admin.user._id));
    }
  }, [isAuth, deleteSuccess, updateStatusSuccess]);

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
  const changeValue = (row, e) => {
    dispatch(UpdateEntryStatusFunction(row, e.target.value));
  };
  const [searchInput, setSearchInput] = React.useState("");
  console.log(entry.data);

  return isAuth ? (
    <BasicLayout heading="Your Work">
      <TableHeaderLayout setSearchInput={setSearchInput} />
      <TableContainer component={Paper}>
        {isLoading ? (
          <Loader />
        ) : entry.data && !entry.data.length ? (
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
                      <Select
                        fullWidth
                        size="small"
                        onChange={(e) =>
                          changeValue(row,e)
                        }
                        value={row.currentJobStatus}
                      >
                        {data &&
                          data.map((r) => {
                            return (
                              <MenuItem value={r.value}>{r.value}</MenuItem>
                            );
                          })}
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="flex justify-evenly items-center">
                        <Link to={`/update-entry/${row.uniqueJobId}`}>
                          <EditIcon className="text-blue-700 cursor-pointer" />
                        </Link>
                        <DeleteIcon
                          className="text-red-700 cursor-pointer"
                          onClick={() => handleClickDeleteOpen(row.uniqueJobId)}
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
    value: "Status",
    align: "center",
  },
  {
    value: "Action",
    align: "center",
  },
];

const data = [
  {
    value: "OPEN",
  },
  {
    value: "DONE",
  },
  {
    value: "IN-PROGRESS",
  },
];
