import { Grid, Button, TextField, Autocomplete } from "@mui/material";
import React, { useRef, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import BasicLayout from "../../BasicLayout/BasicLayout";
import FomikTextField from "../../Common/FormikComponent/FomikTextField";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CreateEntryFunction } from "../../../Slice/EntrySlice";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Cities, State } from "../../Common/Constant/Constant";
import Loader from "../../Common/Loader";
import FormikDropdown from "../../Common/FormikComponent/FormikDropdown";
const CreateEntry = () => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isLoading } = useSelector((state) => state.Entry.create);
  const { isAuth, admin } = useSelector((state) => state.Login);
  useEffect(() => {
    if (isSuccess) {
      navigate("/entry");
    }
    if (!isAuth) {
      navigate("/login");
    }
  }, [isSuccess, isAuth]);
  const validationSchema = Yup.object({
    reportRefrenceNo: Yup.number().required("Required"),
    finanicalYear: Yup.string().required("Required"),
    insuer: Yup.string().required("Required"),
    policyNo: Yup.string().required("Required"),
    broker: Yup.string().required("Required"),
    consignee: Yup.string().required("Required"),
    invoiceNo: Yup.string().required("Required"),
    month: Yup.string().required("Required"),
    intimation: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    insured: Yup.string().required("Required"),
    brokerLocation: Yup.string().required("Required"),
    lossCity: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
    age: Yup.string().required("Required"),
    claimType: Yup.string().required("Required"),
    claimNo: Yup.string().required("Required"),
    insuredCity: Yup.string().required("Required"),
    consignor: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    invoiceValue: Yup.string().required("Required"),
  });
  const initialValues = {
    reportRefrenceNo: "",
    finanicalYear: new Date(),
    insuer: "",
    policyNo: "",
    broker: "",
    consignee: "",
    invoiceNo: "",
    month: new Date(),
    intimation: "",
    city: "",
    insured: "",
    brokerLocation: "",
    lossCity: "",
    date: new Date(),
    age: "",
    claimType: "",
    claimNo: "",
    insuredCity: "",
    consignor: "",
    state: "",
    invoiceValue: "",
  };
  const onSubmit = (values) => {
    dispatch(
      CreateEntryFunction({
        ...values,
        currentJobHolder: admin.user._id,
        ownerId: admin.user._id,
        previousJobHoldingTeam: "ENTRY TEAM",
        currentJobHoldingTeam: "ENTRY TEAM",
        // currentJobStatus: "OPEN",
        // previousJobStatus: "OPEN",
      })
    );
  };
  return (
    <BasicLayout heading="Create Entry">
      {isLoading ? (
        <Loader />
      ) : (
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
                    heading="Report Refrence No."
                    handleChange={handleChange}
                    name="reportRefrenceNo"
                    type="number"
                    error={
                      touched.reportRefrenceNo &&
                      Boolean(errors.reportRefrenceNo)
                    }
                    helperText={
                      touched.reportRefrenceNo ? errors.reportRefrenceNo : ""
                    }
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Intimation"
                    handleChange={handleChange}
                    type="text"
                    name="intimation"
                    error={touched.intimation && Boolean(errors.intimation)}
                    helperText={touched.intimation ? errors.intimation : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Finanical Year</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={["year"]}
                        onChange={(e) => setFieldValue("finanicalYear", e)}
                        value={values.finanicalYear}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            error={
                              touched.finanicalYear &&
                              Boolean(errors.finanicalYear)
                            }
                            helperText={
                              touched.finanicalYear ? errors.finanicalYear : ""
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FormikDropdown
                    heading="Claim Type"
                    handleChange={handleChange}
                    name="claimType"
                    value={values.claimType}
                    error={touched.claimType && Boolean(errors.claimType)}
                    helperText={touched.claimType ? errors.claimType : ""}
                    data={claimTypeData}
                  />
                </Grid>
                <Grid lg={4} item>
                  <FomikTextField
                    heading="Claim No."
                    handleChange={handleChange}
                    name="claimNo"
                    value={values.claimNo}
                    type="text"
                    error={touched.claimNo && Boolean(errors.claimNo)}
                    helperText={touched.claimNo ? errors.claimNo : ""}
                  />
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Policy No."
                    handleChange={handleChange}
                    type="text"
                    name="policyNo"
                    error={touched.policyNo && Boolean(errors.policyNo)}
                    helperText={touched.policyNo ? errors.policyNo : ""}
                  />
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Broker"
                    handleChange={handleChange}
                    type="text"
                    name="broker"
                    error={touched.broker && Boolean(errors.broker)}
                    helperText={touched.broker ? errors.broker : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Broker Location"
                    handleChange={handleChange}
                    name="brokerLocation"
                    type="text"
                    error={
                      touched.brokerLocation && Boolean(errors.brokerLocation)
                    }
                    helperText={
                      touched.brokerLocation ? errors.brokerLocation : ""
                    }
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Insuer"
                    type="text"
                    handleChange={handleChange}
                    name="insuer"
                    error={touched.insuer && Boolean(errors.insuer)}
                    helperText={touched.insuer ? errors.insuer : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Insured"
                    handleChange={handleChange}
                    name="insured"
                    type="text"
                    error={touched.insured && Boolean(errors.insured)}
                    helperText={touched.insured ? errors.insured : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Insured City</p>
                    <Autocomplete
                      value={values.insuredCity}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("insuredCity", newValue);
                      }}
                      size="small"
                      options={Cities}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          placeholder="Insured City"
                          {...params}
                          error={
                            touched.insuredCity && Boolean(errors.insuredCity)
                          }
                          helperText={
                            touched.insuredCity ? errors.insuredCity : ""
                          }
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Loss City</p>
                    <Autocomplete
                      value={values.lossCity}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("lossCity", newValue);
                      }}
                      size="small"
                      options={Cities}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          placeholder="Loss City"
                          fullWidth
                          {...params}
                          error={touched.lossCity && Boolean(errors.lossCity)}
                          helperText={touched.lossCity ? errors.lossCity : ""}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Date</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={(e) => setFieldValue("date", e)}
                        value={values.date}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            error={touched.date && Boolean(errors.date)}
                            helperText={touched.date ? errors.date : ""}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Consignor"
                    handleChange={handleChange}
                    name="consignor"
                    error={touched.consignor && Boolean(errors.consignor)}
                    helperText={touched.consignor ? errors.consignor : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Consignee"
                    handleChange={handleChange}
                    type="text"
                    name="consignee"
                    error={touched.consignee && Boolean(errors.consignee)}
                    helperText={touched.consignee ? errors.consignee : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Invoice No."
                    handleChange={handleChange}
                    type="text"
                    name="invoiceNo"
                    error={touched.invoiceNo && Boolean(errors.invoiceNo)}
                    helperText={touched.invoiceNo ? errors.invoiceNo : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Invoice Value"
                    handleChange={handleChange}
                    name="invoiceValue"
                    type="text"
                    error={touched.invoiceValue && Boolean(errors.invoiceValue)}
                    helperText={touched.invoiceValue ? errors.invoiceValue : ""}
                  />
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Month</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={(e) => setFieldValue("month", e)}
                        value={values.month}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            error={touched.month && Boolean(errors.month)}
                            helperText={touched.month ? errors.month : ""}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">City</p>
                    <Autocomplete
                      value={values.city}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("city", newValue);
                      }}
                      size="small"
                      options={Cities}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          {...params}
                          error={touched.city && Boolean(errors.city)}
                          placeholder="City"
                          helperText={touched.city ? errors.city : ""}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">State</p>
                    <Autocomplete
                      value={values.state}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("state", newValue);
                      }}
                      size="small"
                      options={State}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          placeholder="State"
                          fullWidth
                          {...params}
                          error={touched.state && Boolean(errors.state)}
                          helperText={touched.state ? errors.state : ""}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Age"
                    handleChange={handleChange}
                    name="age"
                    type="number"
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age ? errors.age : ""}
                  />
                </Grid>

                <Grid
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
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
                    <Link to="/entry">
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
      )}
    </BasicLayout>
  );
};

export default CreateEntry;

const claimTypeData = [{ value: "Marine" }, { value: "Non-Marine" }];
