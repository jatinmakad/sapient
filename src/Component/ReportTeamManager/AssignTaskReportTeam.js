import React, { useEffect, useState } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import { useDispatch, useSelector } from "react-redux";
import { GetEntryDoneFunction } from "../../Slice/EntrySlice";
import { useNavigate } from "react-router-dom";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Loader from "../Common/Loader";
import moment from "moment";
import { MenuItem, Select } from "@mui/material";
import { GetUserFunction } from "../../Slice/RegisterSlice";
import { UpdateAssignFunction } from "../../Slice/ReportSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ToastComponent from "../Common/TaostComponent";
const AssignTaskReportTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { data } = useSelector((state) => state.Register.get.users);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const { updateAssignTaskSuccess } = useSelector(
    (state) => state.Report.assignTask
  );
  const [open, setOpen] = React.useState(false);
  const [selectData, setSelectData] = useState("");
  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryDoneFunction(admin.user.team));
      dispatch(GetUserFunction());
    }
    if (isAuth === false) {
      navigate("/login");
    }
    if (updateAssignTaskSuccess) {
      setOpen(false);
    }
  }, [isAuth, updateAssignTaskSuccess]);
  const handleClickOpen = (row) => {
    setOpen(true);
    setSelectData(row);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectData("");
  };
  const [searchInput, setSearchInput] = React.useState("");
  let updated =
    data &&
    data.filter((r) => {
      return r.role === "REPORT TEAM EMPLOYEE";
    });
  return isAuth ? (
    <BasicLayout heading="Assign Task">
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
                      {row.insured}
                    </StyledTableCell>
                    {row.isTaskAssigned ? (
                      <StyledTableCell align="center">Assigned</StyledTableCell>
                    ) : (
                      <StyledTableCell
                        align="center"
                        onClick={() => handleClickOpen(row)}
                      >
                        <p className="text-blue-600 flex justify-center w-full cursor-pointer">
                          Assign Here
                        </p>
                      </StyledTableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
            <AssignDialogBox
              open={open}
              admin={admin}
              handleClose={handleClose}
              data={selectData}
              updated={updated}
              dispatch={dispatch}
            />
          </Table>
        )}
      </TableContainer>
    </BasicLayout>
  ) : (
    ""
  );
};

export default AssignTaskReportTeam;

const AssignDialogBox = ({
  open,
  handleClose,
  data,
  updated,
  admin,
  dispatch,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [demo, setDemo] = useState("");
  const onSubmit = () => {
    const taskData = {
      userId: admin.user._id,
      uniqueJobId: data.uniqueJobId,
      currentJobHolder: demo._id,
      isTaskAssigned: true,
    };
    if (demo._id) {
      dispatch(UpdateAssignFunction(taskData));
    } else {
      ToastComponent("Please Select Member", "error");
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth
      size={"lg"}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Select Team Member</DialogTitle>
      <DialogContent>
        <Select
          fullWidth
          size="small"
          onChange={(e) => setDemo(e.target.value)}
        >
          {updated &&
            updated.map((r) => {
              return <MenuItem value={r}>{r.name}</MenuItem>;
            })}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSubmit} color="info">
          Assgin
        </Button>
        <Button variant="contained" onClick={handleClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
    value: "Assign To",
    align: "center",
  },
];
