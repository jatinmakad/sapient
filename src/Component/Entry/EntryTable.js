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
import StatusColor from "../Common/StatusColor";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Common/Loader";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import DeleteDialog from "../Common/DeleteDialog";
import { DeletEntryFunction, GetEntryFunction } from "../../Slice/EntrySlice";
export default function EntryTable({ searchInput }) {
  const { entry,isLoading } = useSelector((state) => state.Entry.get);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { deleteSuccess } = useSelector((state) => state.Entry.delete);
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
    if (deleteSuccess) {
      dispatch(GetEntryFunction());
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
  return (
    <TableContainer component={Paper}>
      {isLoading ? (
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
                  {admin.user.role === "admin" ? (
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
                  ) : (
                    <StyledTableCell align="left">
                      <Link to={`/entry-details/${row._id}`}>
                        <p className="text-blue-600 flex justify-center w-full cursor-pointer">
                          View More
                        </p>
                      </Link>
                    </StyledTableCell>
                  )}
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
