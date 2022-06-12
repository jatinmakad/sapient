import React, { useEffect } from "react";
import { List, ListItemButton, IconButton, Box } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Link, useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Icon from "../Assets/avatar.png";
import Logo from "../Assets/LogoLeft.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { useSelector } from "react-redux";
import { CustomViewport } from "../Common/CustomViewport";
const DrawerLeft = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
  setOpen,
  handle,
}) => {
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const widthPort = CustomViewport();
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  return isAuth ? (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        style={{ position: widthPort < 956 ? "absolute" : "initial" }}
        anchor="left"
        open={open}
      >
        <DrawerHeader className="border-b" style={{ background: "#fff" }}>
          <div
            className="flex justify-between pl-2 items-center w-full"
            style={{ height: "90px" }}
          >
            <img src={Logo} className="w-32" />
            <IconButton sx={{ alignSelf: "center" }}>
              {open ? (
                <ChevronLeftIcon
                  className="text-red-500"
                  sx={{ fontSize: "32px" }}
                  onClick={handleDrawerClose}
                />
              ) : (
                <ChevronRightIcon
                  className="text-red-500"
                  sx={{ fontSize: "32px" }}
                  onClick={handleDrawerOpen}
                />
              )}
            </IconButton>
          </div>
        </DrawerHeader>
        <div
          style={{ background: "#fff" }}
          className="flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center px-3 mt-4 mb-4">
              <img src={Icon} className="rounded-full w-12 mr-2" />
              <div>
                <p className="text-md text-black">
                  {admin.user && admin.user.name}
                </p>
                <p className="text-xs text-gray-400 break-words capitalize whitespace-normal">
                  {admin.user && admin.user.role}
                </p>
              </div>
            </div>
            <List sx={{ alignSelf: "center", width: "100%" }}>
              {(admin.user && admin.user.role === "ADMIN"
                ? adminData
                : admin.user.role === "ENTRY TEAM EMPLOYEE"
                ? EntryData
                : admin.user.role === "COORDINATION TEAM EMPLOYEE"
                ? CoordinationData
                : admin.user.role === "COORDINATION TEAM MANAGER"
                ? CoordinationManagerData
                : admin.user.role === "REPORT TEAM MANAGER"
                ? reportTeamManagerData
                : admin.user.role === "REPORT TEAM EMPLOYEE"
                ? reportTeamData
                : ""
              ).map((item) => {
                return (
                  <Link to={item.click}>
                    <ListItemButton
                      key={item.text}
                      // onClick={(e) => handle(e, index)}
                      // onMouseDown={handleMouseDownPassword}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        background: "#fff",
                        // px: 2,
                        // mb: 1,
                        borderRadius: "10px",
                        // "&:hover": {
                        //   background: "rgb(247,249,254)",
                        // },
                      }}
                    >
                      <item.icon
                        sx={{
                          minWidth: 0,
                          color: "black",
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                        }}
                      />
                      <p
                        style={{ opacity: open ? 1 : 0 }}
                        className="font-medium text-black"
                      >
                        {item.text}
                      </p>
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </div>
        </div>
      </Drawer>
    </Box>
  ) : (
    ""
  );
};

export default DrawerLeft;

const EntryData = [
  {
    text: "Dashboard",
    icon: DashboardOutlinedIcon,
    click: "/dashboard",
  },
  {
    text: "Entry Team",
    icon: DashboardOutlinedIcon,
    click: "/entry",
  },
  {
    text: "Your Work",
    icon: DashboardOutlinedIcon,
    click: "/your-work",
  },
];

const CoordinationData = [
  {
    text: "Dashboard",
    icon: DashboardOutlinedIcon,
    click: "/dashboard",
  },
  {
    text: "Cordination Team",
    icon: DashboardOutlinedIcon,
    click: "/coordination",
  },
];

const CoordinationManagerData = [
  {
    text: "Dashboard",
    icon: DashboardOutlinedIcon,
    click: "/dashboard",
  },
  {
    text: "Assign Task",
    icon: DashboardOutlinedIcon,
    click: "/assign-task",
  },
];
const reportTeamManagerData = [
  {
    text: "Dashboard",
    icon: DashboardOutlinedIcon,
    click: "/dashboard",
  },
  {
    text: "Assign Task",
    icon: DashboardOutlinedIcon,
    click: "/assign-task-report-team",
  },
];
const reportTeamData = [
  {
    text: "Dashboard",
    icon: DashboardOutlinedIcon,
    click: "/dashboard",
  },
  {
    text: "Report Team",
    icon: DashboardOutlinedIcon,
    click: "/report-team",
  },
];
const adminData = [
  {
    text: "Dashboard",
    icon: DashboardOutlinedIcon,
    click: "/dashboard",
  },
  {
    text: "Entry Team",
    icon: DashboardOutlinedIcon,
    click: "/entry",
  },
  {
    text: "Report Team",
    icon: DashboardOutlinedIcon,
    click: "/dashboard",
  },
  {
    text: "Cordination Team",
    icon: DashboardOutlinedIcon,
    click: "/dashboard",
  },
  {
    text: "Checking Team",
    icon: AssignmentIcon,
    click: "/dashboard",
  },
  {
    text: "Account Team",
    icon: AssignmentIcon,
    click: "/dashboard",
  },
  {
    text: "User Management",
    icon: AssignmentIcon,
    click: "/user",
  },
  // {
  //   text: "Log out",
  //   icon: AssignmentIcon,
  //   click: "/login",
  // },
];

const drawerWidth = 220;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
