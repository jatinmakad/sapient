import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Logo from "../Assets/Logo.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { LoginFunction } from "../../Slice/AdminSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const { isAuth, isLoading } = useSelector((state) => state.Login);
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  const onSubmit = () => {
    dispatch(LoginFunction(data));
  };
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{ background: "#363740" }}
      className="w-full h-screen flex justify-center items-center"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center lg:w-4/12 md:w-1/2 sm:w-2/3 w-5/6 items-center flex-col bg-white rounded-md lg:p-7 md:p-7 p-5">
          <img src={Logo} className="w-full object-cover" />
          <p
            className="lg:text-base text-sm mb-5 lg:tracking-wide"
            style={{ color: "#9FA2B4" }}
          >
            Enter your email and password below
          </p>
          <div className="w-full">
            <div className="mb-6">
              <p className="mb-2 text-sm" style={{ color: "#9FA2B4" }}>
                EMAIL
              </p>
              <TextField
                id="outlined-name"
                margin="none"
                variant="outlined"
                name="email"
                placeholder="Email Address"
                size="small"
                fullWidth
                value={data.email}
                sx={{ background: "#fff", border: "none" }}
                onChange={handleChange("email")}
              />
            </div>
            <div className="mb-5">
              <p className="mb-2 text-sm " style={{ color: "#9FA2B4" }}>
                PASSWORD
              </p>
              <OutlinedInput
                id="outlined-adornment-password"
                type={data.showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleChange("password")}
                margin="none"
                fullWidth
                sx={{ background: "#fff", border: "none" }}
                placeholder="Password"
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {data.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              style={{ background: "#3751FF" }}
              className="text-white font-normal w-full rounded-lg pt-2 pb-2 text-lg"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
