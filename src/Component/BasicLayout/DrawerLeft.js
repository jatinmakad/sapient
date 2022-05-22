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
const DrawerLeft = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
  setOpen,
  handle,
}) => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const navigate = useNavigate();
  const {isAuth,admin} = useSelector(state => state.Login)
  useEffect(() => {
    window.addEventListener("resize", update);
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
console.log(admin,"admin")
 
  const update = () => {
    setWindowWidth(window.innerWidth);
    setOpen(false);
  };
  let res = false;
  if (windowWidth <= 957) {
    res = true;
  } else {
    res = false;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        style={{ position: res ? "absolute" : "initial" }}
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
                <p className="text-md text-black">{admin.user && admin.user.name}</p>
                <span className="text-sm text-gray-400">Entry Team</span>
              </div>
            </div>
            <List sx={{ alignSelf: "center", width: "100%" }}>
              {HrData.map((item) => {
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
  );
};

export default DrawerLeft;

const HrData = [
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
    click: "/absence",
  },
  {
    text: "Cordination Team",
    icon: DashboardOutlinedIcon,
    click: "/employee",
  },
  {
    text: "Checking Team",
    icon: AssignmentIcon,
    click: "/tasks",
  },
  {
    text: "Account Team",
    icon: AssignmentIcon,
    click: "/tasks",
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

// const data = [
//   {
//     text: "Dashboard",
//     icon: DashboardIcon,
//     click: "/dashboard",
//   },
//   {
//     text: "Attendence",
//     icon: DashboardIcon,
//     click: "/attendence",
//   },
//   {
//     text: "Absence",
//     icon: DashboardIcon,
//     click: "/absence",
//   },
//   {
//     text: "Employee",
//     icon: PeopleAltIcon,
//     click: "/employee",
//   },
//   {
//     text: "Tasks",
//     icon: AssignmentIcon,
//     click: "/tasks",
//   },
//   {
//     text: "Projects",
//     icon: DashboardIcon,
//     click: "/projects",
//   },
//   {
//     text: "Attendence Logs",
//     icon: DashboardIcon,
//     click: "/logs",
//   },
//   {
//     text: "Ticket Raise",
//     icon: DashboardIcon,
//     click: "/ticket-raise",
//   },
// ];

const drawerWidth = 230;
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
