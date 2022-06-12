import React, { useEffect, useState } from "react";
import BasicLayout from "../../BasicLayout/BasicLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import { Add, Cancel } from "@mui/icons-material";
import ToastComponent from "../../Common/TaostComponent";
import { uploadDocuments, GetEntryFunctionId } from "../../../Slice/EntrySlice";
const UpdateCoordination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry } = useSelector((state) => state.Entry.get);
  const { docmentUplaod } = useSelector((state) => state.Entry.update);
  const { id } = useParams();
  const [data, setData] = useState("");
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
    if (isAuth) {
      dispatch(GetEntryFunctionId(admin.user._id));
    }
    if (id) {
      let updated =
        entry.data && entry.data.filter((r) => r.uniqueJobId === id);
      setData(updated);
    }
    if (docmentUplaod) {
      navigate("/coordination");
    }
  }, [isAuth, id, docmentUplaod]);

  // const [serviceList, setServiceList] = useState([{ service: 1 }]);
  const [selectedFile, setSelectedFile] = useState();
  // const uploadImageField = (e, index) => {
  //   const id = serviceList.length + 1;
  //   setServiceList((oldValue) => [...oldValue, { service: id }]);
  //   e.preventDefault();
  // };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      let pop = {
        data: reader.result,
        uniqueJobId: data[0].uniqueJobId,
      };
      dispatch(uploadDocuments(pop))
    };
    reader.onerror = () => {
      ToastComponent("Something went wrong!", "error");
    };
  };
  // const onchangeInputImage = async (e, index) => {
  //   let data = new FormData();
  //   data.append("name", e.target.files[0].name);
  //   data.append("file", e.target.files[0]);
  //   const image = await fetch(`/api/v1/upload/user-image`, {
  //     method: "POST",
  //     body: data,
  //   });
  //   const json = await image.json();
  //   let updated = serviceList.map((r) =>
  //     r.service === index ? { ...r, url: json } : r
  //   );
  //   setServiceList(updated);
  // };
  // const handleServiceRemove = (id) => {
  //   // let updatedArray = serviceList.filter((r, ind) => ind !== id);
  //   setServiceList((old) => {
  //     return old.filter((r, ind) => ind !== id);
  //   });
  // };
  //   const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };
  const innerP = "w-2/5 text-blue-700 font-medium";
  const innerText = "w-3/5";
  const outerDiv = "flex justify-between items-center text-lg";
  return isAuth && data ? (
    <BasicLayout heading="Entry Details">
      <div className="bg-white lg:p-5 md:p-5 p-3 rounded-md">
        <div className=" flex lg:flex-row md:flex-row flex-col mb-4">
          <div className="lg:w-1/2 md:w-1/2 flex flex-col w-full">
            <div className={outerDiv}>
              <p className={innerP}>Refrence</p>
              <p className={innerText}>{data[0].reportRefrenceNo}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Claim No.</p>
              <p className={innerText}>{data[0].claimNo}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Claim Type</p>
              <p className={innerText}>{data[0].claimType}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Consignee</p>
              <p className={innerText}>{data[0].consignee}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Consignor</p>
              <p className={innerText}>{data[0].consignor}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Date</p>
              <p className={innerText}>{moment(data[0].date).format("L")}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Invocie No.</p>
              <p className={innerText}>{data[0].invoiceNo}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Invoice Value</p>
              <p className={innerText}>{data[0].invoiceValue}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Finanical Year</p>
              <p className={innerText}>
                {moment(data[0].financialYear).format("YYYY")}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insurer</p>
              <p className={innerText}>{data[0].insuer}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insured</p>
              <p className={innerText}>{data[0].insured}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insured City</p>
              <p className={innerText}>{data[0].insuredCity}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>State</p>
              <p className={innerText}>{data[0].state}</p>
            </div>
          </div>
          <div className="lg:w-1/2 md:w-1/2 flex flex-col w-full ">
            <div className={outerDiv}>
              <p className={innerP}>Policy No.</p>
              <p className={innerText}>{data[0].policyNo}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Broker</p>
              <p className={innerText}>{data[0].broker}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Broker Location</p>
              <p className={innerText}>{data[0].brokerLocation}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Age</p>
              <p className={innerText}>{data[0].age}</p>
            </div>

            <div className={outerDiv}>
              <p className={innerP}>City</p>
              <p className={innerText}>{data[0].city}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>State</p>
              <p className={innerText}>{data[0].state}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Intimation</p>
              <p className={innerText}>{data[0].intimation}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Loss City</p>
              <p className={innerText}>{data[0].lossCity}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Month</p>
              <p className={innerText}> {moment(data[0].month).format("MM")}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="mb-4">Upload Document</p>
          <div className="flex lg:w-2/5 md:w-2/4 sm:w-full w-full justify-between mb-2">
            <input
              name="Upload Image"
              type="file"
              id="service"
              onChange={(e) => handleFileInputChange(e)}
            />
            {/* <Button
              variant="outlined"
              size="small"
              color="success"
              sx={{ pl: 3, pr: 3 }}
              // onClick={() => handleServiceRemove(index)}
            >
              <Cancel sx={{ mr: 1 }} />
              Upload
            </Button> */}
          </div>
        </div>

        {/* <Grid
          lg={12}
          md={12}
          sm={12}
          xs={12}
          container
          marginBottom={2}
          spacing={2}
        >

          <Grid lg={12} md={12} sm={12} xs={12} item>
            <div className="flex lg:w-2/5 md:w-2/4 sm:w-full w-full justify-between mb-4">
              <p>Upload Document</p>
              <Button
                variant="outlined"
                color="primary"
                onClick={(e) => uploadImageField(e)}
              >
                <Add sx={{ mr: 1 }} />
                Add
              </Button>
            </div>
            {serviceList.map((singleService, index) => (
              <div className="flex lg:w-2/5 md:w-2/4 sm:w-full w-full justify-between mb-2">
                <input
                  name="Upload Image"
                  type="file"
                  id="service"
                  onChange={(e) =>
                    handleFileInputChange(e, singleService.service)
                  }
                />
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  sx={{ pl: 3, pr: 3 }}
                  onClick={() => handleServiceRemove(index)}
                >
                  <Cancel sx={{ mr: 1 }} />
                  Remove
                </Button>
              </div>
            ))}
          </Grid>
        </Grid> */}

        <div className="w-full flex justify-end">
          <div className="flex">
            <Button
              variant="contained"
              type="submit"
              sx={{ marginRight: "10px" }}
              color="primary"
              onClick={handleSubmitFile}
            >
              Update
            </Button>
            <Link to={"/coordination"}>
              <Button variant="contained" color="error">
                Close
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </BasicLayout>
  ) : (
    ""
  );
};

export default UpdateCoordination;

const StatusData = [{ value: "Approved" }];
