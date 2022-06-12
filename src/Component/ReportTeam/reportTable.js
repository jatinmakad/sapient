import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetEntryFunctionId,
  UpdateEntryStatusFunction2,
  UpdateEntryStatusFunction3,
} from "../../Slice/EntrySlice";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Loader from "../Common/Loader";
import { MenuItem, Select } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import moment from "moment";
const ReportTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const { updateStatusSuccess } = useSelector(
    (state) => state.Entry.updateStatus
  );
  const [open2, setOpen2] = React.useState(false);
  const [selectData, setSelectData] = React.useState("");
  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryFunctionId(admin.user._id));
    }
    if (isAuth === false) {
      navigate("/login");
    }
    if (updateStatusSuccess) {
      dispatch(GetEntryFunctionId(admin.user._id));
      setOpen2(false);
    }
  }, [isAuth, updateStatusSuccess]);

  const handleClickOpen2 = (row) => {
    setOpen2(true);
    setSelectData(row);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [searchInput, setSearchInput] = React.useState("");
  return isAuth ? (
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
                    {/* <StatusColor status={row.status} /> */}
                    {row.currentJobStatus}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="flex justify-start items-left">
                      {row.currentJobHoldingTeam !== "REPORT TEAM" ? (
                        "DONE BY REPORT TEAM"
                      ) : (
                        <>
                          <Link to={`/update-coordination/${row.uniqueJobId}`}>
                            <EditIcon className="text-blue-700 cursor-pointer" />
                          </Link>
                          &nbsp; &nbsp;
                          <p
                            onClick={() => handleClickOpen2(row)}
                            className="text-blue-600 cursor-pointer"
                          >
                            Update Status
                          </p>
                        </>
                      )}
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
          <AssignDialogBox
            open={open2}
            admin={admin}
            handleClose={handleClose2}
            dispatch={dispatch}
            selectData={selectData}
          />
        </Table>
      )}
    </TableContainer>
  ) : (
    ""
  );
};

export default ReportTable;

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
    value: "Status",
    align: "left",
  },
  {
    value: "Action",
    align: "left",
  },
];

const AssignDialogBox = ({ open, handleClose, selectData, dispatch }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [demo, setDemo] = React.useState("");
  const onSubmit = () => {
    dispatch(UpdateEntryStatusFunction3(selectData, demo));
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
      <DialogTitle id="responsive-dialog-title">Select Job Status</DialogTitle>
      <DialogContent>
        <Select
          fullWidth
          size="small"
          onChange={(e) => setDemo(e.target.value)}
          // value={}
        >
          {data &&
            data.map((r) => {
              return <MenuItem value={r.value}>{r.value}</MenuItem>;
            })}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSubmit} color="info">
          Submit
        </Button>
        <Button variant="contained" onClick={handleClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const data = [
  {
    value: "OPEN",
  },
  {
    value: "OPEN-FOR-NEXT-TEAM",
  },
  {
    value: "IN-PROGRESS",
  },
];
