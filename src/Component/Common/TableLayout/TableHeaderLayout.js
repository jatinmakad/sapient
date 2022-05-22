import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";

const TableHeaderLayout = ({ heading, link, setSearchInput }) => {
  return (
    <Grid lg={12} container justifyContent={"space-between"} spacing={2} mb={2}>
      <Grid item lg={3} md={3} xs={6} sm={6}>
        <TextField
          variant="standard" 
          fullWidth
          placeholder="Search....."
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ background: "#fff",padding:"7px 10px",border:"1px solid lightgray",borderRadius:"5px" }}
          size="small"
          InputProps={{
            disableUnderline: true, 
          }}
        />
      </Grid>
      <Grid
        item
        lg={3}
        md={3}
        sm={6}
        xs={6}
        display="flex"
        justifyContent="flex-end"
      >
        <Link to={link}>
          <Button variant="contained" color="primary">
            {/* <AddIcon /> */}
            {heading}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default TableHeaderLayout;
