import React from "react";
import Box from "@mui/material/Box";
import DrawerLeft from "./DrawerLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const BasicLayout = ({ children, heading }) => {
  const [open, setOpen] = React.useState(true);
  const [ind, setIndex] = React.useState("");
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handle = (e, index) => {
    setOpen(true);
    setIndex(index);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box component="main" sx={{ display: "flex", position: "relative" }}>
      <DrawerLeft
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        setOpen={setOpen}
        ind={ind}
        handle={handle}
        handleMouseDownPassword={handleMouseDownPassword}
      />
      <div className="flex flex-col w-full h-full">
        <div className="flex lg:p-4 md:p-2 z-30 p-2 bg-white h-20 w-full fixed border-b text-blue-600 justify-between items-center cursor-pointer">
          <p className="lg:text-2xl md:text-2xl text-xl flex items-center capitalize ">
            {!open ? (
              <ChevronRightIcon
                onClick={handleDrawerOpen}
                style={{ fontSize: "36px" }}
              />
            ) : (
              ""
            )}
            {heading}
          </p>
          {/* <LogoutOutlinedIcon className="text-blue-600 " /> */}
        </div>
        <div
          className="lg:p-5 md:p-5 p-3 mt-20 h-auto w-full"
          style={{ background: "#E5E5E5" }}
        >
          {" "}
          {children}
        </div>
      </div>
    </Box>
  );
};

export default BasicLayout;
