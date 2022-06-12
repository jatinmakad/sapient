import { Grid, Button, Select, MenuItem } from "@mui/material";
import React, { useRef, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import BasicLayout from "../../BasicLayout/BasicLayout";
import FomikTextField from "../../Common/FormikComponent/FomikTextField";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormikDropdown from "../../Common/FormikComponent/FormikDropdown";
import { RegisterFunction } from "../../../Slice/RegisterSlice";
const CreateUser = () => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.Login);
  const { isSuccess } = useSelector((state) => state.Register.register);

  useEffect(() => {
    if (isSuccess) {
      navigate("/user");
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, isSuccess]);
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    contactNumber: Yup.number().min(10).required("Required"),
    role: Yup.string().required("Required"),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "BROKER",
  };
  const onSubmit = (values) => {
    let data;
   if( values.role === "ENTRY TEAM EMPLOYEE"){
    data = "ENTRY TEAM"
   } else if(values.role === "REPORT TEAM EMPLOYEE"){
    data = "REPORT TEAM"
   } else if (values.role === "COORDINATION TEAM EMPLOYEE") {
    data = "COORDINATION TEAM"
   } else if(values.role === "ACCOUNT TEAM EMPLOYEE") {
    data = "ACCOUNT TEAM"
   } else if (values.role === "ENTRY TEAM MANAGER"){
    data = "ENTRY TEAM"
   } else if(values.role === "REPORT TEAM MANAGER"){
    data = "REPORT TEAM"
   } else if( values.role === "COORDINATION TEAM MANAGER"){
    data = "COORDINATION TEAM"
   } else if(values.role === "ACCOUNT TEAM MANAGER"){
    data = "ACCOUNT TEAM"
   }
    dispatch(RegisterFunction({ ...values, team: data }));
  };
  return (
    <BasicLayout heading="Create User">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
      >
        {({ errors, handleChange, values, touched, setFieldValue }) => (
          <Form className="bg-white rounded-sm p-4 pt-5 pb-5">
            <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
              <Grid lg={4} md={6} sm={12} xs={12} item>
                <FomikTextField
                  heading="Name"
                  handleChange={handleChange}
                  name="name"
                  type="text"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name ? errors.name : ""}
                />
              </Grid>

              <Grid lg={4} md={6} sm={12} xs={12} item>
                <FomikTextField
                  heading="Email"
                  type="email"
                  handleChange={handleChange}
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email ? errors.email : ""}
                />
              </Grid>
              <Grid lg={4} md={6} sm={12} xs={12} item>
                <FomikTextField
                  heading="Contact Number"
                  handleChange={handleChange}
                  type="text"
                  name="contactNumber"
                  error={touched.contactNumber && Boolean(errors.contactNumber)}
                  helperText={touched.contactNumber ? errors.contactNumber : ""}
                />
              </Grid>
              <Grid lg={4} md={6} sm={12} xs={12} item>
                <FomikTextField
                  heading="Password"
                  handleChange={handleChange}
                  type="password"
                  name="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password ? errors.password : ""}
                />
              </Grid>
              <Grid lg={4} md={6} sm={12} xs={12} item>
                <FormikDropdown
                  heading="Role"
                  handleChange={handleChange}
                  name="role"
                  value={values.role}
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role ? errors.role : ""}
                  data={roleData}
                />
              </Grid>
              <Grid
                lg={12}
                xs={12}
                sm={12}
                md={12}
                marginTop="20px"
                justifyContent="flex-end"
                display="flex"
                item
              >
                <div className="flex items-center">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginRight: "10px" }}
                    color="primary"
                  >
                    Create
                  </Button>
                  <Link to="/user">
                    <Button variant="contained" color="error">
                      Close
                    </Button>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </BasicLayout>
  );
};

export default CreateUser;

const roleData = [
  { value: "ADMIN", label: "Admin" },
  { value: "INSUER", label: "Insuer" },
  { value: "INSURENCE COMPANY", label: "Insurence Company" },
  { value: "BROKER", label: "Broker" },
  { value: "ENTRY TEAM EMPLOYEE", label: "Entry Team", team: "ENTRY TEAM" },
  { value: "REPORT TEAM EMPLOYEE", label: "Report Team", team: "REPORT TEAM" },
  {
    value: "COORDINATION TEAM EMPLOYEE",
    label: "Coordination Team",
    team: "COORDINATION TEAM",
  },
  {
    value: "ACCOUNT TEAM EMPLOYEE",
    label: "Account Team",
    team: "ACCOUNT TEAM",
  },
  {
    value: "ENTRY TEAM MANAGER",
    label: "Entry Team Manager",
    team: "ENTRY TEAM",
  },
  {
    value: "REPORT TEAM MANAGER",
    label: "Report Team Manager",
    team: "REPORT TEAM",
  },
  {
    value: "COORDINATION TEAM MANAGER",
    label: "Coordination Team Manager",
    team: "COORDINATION TEAM",
  },
  {
    value: "ACCOUNT TEAM MANAGER",
    label: "Account Team Manager",
    team: "ACCOUNT TEAM",
  },
];
