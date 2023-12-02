import React, { useEffect, useRef, useState } from "react";
import "../Screens/CSS/verify.css";
import { storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
function VerifyAccountEntrep(props) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIDFront, setselectedIDFront] = useState("");
  const [selectedIDBack, setselectedIDBack] = useState("");
  const [idType, setIdType] = useState("");
  const user_id = localStorage.getItem("user_id");
  const fileInputRefID = useRef(null);
  const fileInputRefImage = useRef(null);
  const fileInputRefBack = useRef(null);
  const [btnStatus, setBtnStatus] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const handelUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgurl = URL.createObjectURL(file);
      setSelectedImage({ imgUrl: imgurl, file: file });
    }
  };
  useEffect(() => {
    if (selectedImage && selectedIDBack && selectedIDFront && idType) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [selectedImage, selectedIDFront, selectedIDBack, idType]);
  const handelUploadID = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgurl = URL.createObjectURL(file);
      setselectedIDFront({ imgUrl: imgurl, file: file });
    }
  };
  const handelUploadIDBack = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgurl = URL.createObjectURL(file);
      setselectedIDBack({ imgUrl: imgurl, file: file });
    }
  };
  const RefInputId = () => {
    fileInputRefID.current.click();
  };
  const RefInputIdBack = () => {
    fileInputRefBack.current.click();
  };
  const RefInputImage = () => {
    fileInputRefImage.current.click();
  };

  const handleSubmitVerfiyAccount = async () => {
    // console.log(selectedIDFront.file);
    // console.log(selectedImage.file);
    // console.log(selectedIDBack.file);
    setBtnStatus(true);
    setShowLoader(true);
    let listOfLink = [
      { type: "Front", fileSelect: selectedIDFront.file },
      { type: "User", fileSelect: selectedImage.file },
      { type: "Back", fileSelect: selectedIDBack.file },
    ];
    let downloadURLLink = [];
    for (let i = 0; i < listOfLink.length; i++) {
      const fileName = listOfLink[i].fileSelect.name;
      const fileType = listOfLink[i].type;
      //   console.log(fileName);
      //   console.log(fileType);
      const storageRef = ref(storage, `${user_id}/${fileName}`);

      try {
        const snapshot = await uploadBytes(
          storageRef,
          listOfLink[i].fileSelect
        );
        const url = await getDownloadURL(snapshot.ref);

        downloadURLLink.push({ type: fileType, link: url });
      } catch (error) {
        console.error("Error uploading or getting download URL:", error);
      }
    }
    //console.log(downloadURLLink);
    handlVerifyUploads(downloadURLLink);
  };

  const handlVerifyUploads = (url) => {
    let Front = "";
    let User = "";
    let Back = "";
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    try {
      for (let i = 0; i < url.length; i++) {
        if (url[i].type === "Front") {
          Front = url[i].link;
        } else if (url[i].type === "User") {
          User = url[i].link;
        } else if (url[i].type === "Back") {
          Back = url[i].link;
        }
      }
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}/uploadVerify`, {
          front: Front,
          back: Back,
          user: User,
          user_id: user_id,

          idType: idType,
        })
        .then((res) => {
          if (res.data.status) {
            alert(res.data.message);
            setBtnStatus(false);
            setShowLoader(false);
          } else {
            alert(res.data.message);
            setBtnStatus(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="container-fluid mt-5 d-flex align-items-center justify-content-center">
      <div className="shadow m-3 w-70">
        <div className="d-flex flex-column justify-content-center align-items-center w-100   pt-3">
          {selectedImage ? (
            <img
              src={selectedImage.imgUrl}
              className=" border"
              style={{ width: "15rem", height: "15rem" }}
            />
          ) : (
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              style={{ width: "15rem", height: "15rem" }}
              className="rounded-circle border"
            />
          )}
          <div class="mb-3 text-center">
            <label for="formFileSm" class="fw-bold form-label">
              2x2 Picture
            </label>
            <input
              class="form-control form-control-sm"
              id="formFileSm"
              type="file"
              accept="image/*"
              onChange={handelUploadImage}
            />
          </div>
          {/* <label>
            2x2 Picture: <button onClick={RefInputImage}>Upload </button>
          </label>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRefImage}
          /> */}
        </div>
        <div className="container w-75 mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setIdType(e.target.value)}
          >
            <option selected>Select your ID type</option>
            <option value="1">National ID</option>
            <option value="2">Voter's ID</option>
            <option value="2">Driver License</option>
            <option value="2">NBI Clearance</option>
            <option value="2">Police Clearance</option>
            <option value="2">Barangay Clearance</option>
          </select>
        </div>
        <div className="container d-flex  justify-content-center gap-5 align-items-center  ">
          <div className="d-flex flex-column justify-content-center align-items-center ">
            {selectedIDFront ? (
              <img
                src={selectedIDFront.imgUrl}
                style={{ width: "25rem", height: "15rem" }}
                className=" border"
              />
            ) : (
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                style={{ width: "25rem", height: "15rem" }}
                className=" border"
              />
            )}
            <div class="mb-3 text-center">
              <label for="formFileSm" class="fw-bold form-label">
                Front ID
              </label>
              <input
                class="form-control form-control-sm"
                id="formFileSm"
                type="file"
                accept="image/*"
                onChange={handelUploadID}
              />
            </div>
            {/* <label>
              Front ID: <button onClick={RefInputId}>Upload</button>
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handelUploadID}
              ref={fileInputRefID}
            /> */}
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center">
            {selectedIDBack ? (
              <img
                src={selectedIDBack.imgUrl}
                style={{ width: "25rem", height: "15rem" }}
                className=" border"
              />
            ) : (
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                style={{ width: "25rem", height: "15rem" }}
                className=" border"
              />
            )}
            <div class="mb-3 text-center">
              <label for="formFileSm" class="fw-bold form-label">
                Back ID
              </label>
              <input
                class="form-control form-control-sm"
                id="formFileSm"
                type="file"
                accept="image/*"
                onChange={handelUploadIDBack}
              />
            </div>
            {/* <label>
              Back ID: <button onClick={RefInputIdBack}>Upload</button>
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handelUploadIDBack}
              ref={fileInputRefBack}
            /> */}
          </div>
        </div>
        <div className="mb-3 d-flex align-items-center justify-content-center">
          <button
            onClick={handleSubmitVerfiyAccount}
            type="button"
            class="btn btn-primary rounded d-flex align-items-center justify-content-center gap-3"
            disabled={btnStatus}
          >
            {showLoader ? (
              <>
                Uploading...
                <Loader />
              </>
            ) : (
              <> Submit</>
            )}
          </button>
        </div>

        {/* <div className="verify-user-content">
          <div className="verify-user-pic-container">
            <h3>Person's Picture</h3>
            <div className="verify-upload-image">
              {selectedImage ? (
                <img src={selectedImage.imgUrl} />
              ) : (
                <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
              )}
            </div>
            <button onClick={RefInputImage}>Upload Your Picture</button>
            <input
              type="file"
              accept="image/*"
              onChange={handelUploadImage}
              style={{ display: "none" }}
              ref={fileInputRefImage}
            />
          </div>

          <div className="verify-user-id-container">
            <h3>Person ID</h3>
            <h3>Front</h3>
            <div className="verify-id-image">
              {selectedIDFront ? (
                <img src={selectedIDFront.imgUrl} />
              ) : (
                <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
              )}
            </div>
            <button onClick={RefInputId}>Upload ID</button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handelUploadID}
              ref={fileInputRefID}
            />
            <h3>Back</h3>
            <div className="verify-id-image">
              {selectedIDBack ? (
                <img src={selectedIDBack.imgUrl} />
              ) : (
                <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
              )}
            </div>
            <button onClick={RefInputIdBack}>Upload ID</button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handelUploadIDBack}
              ref={fileInputRefBack}
            />
            <br />
            <select onChange={(e) => setIdType(e.target.value)}>
              <option>Select Id Type</option>
              <option value="nationaID">National Id</option>
              <option value="votersId">Voters Id</option>
              <option value="postalID">Postal Id</option>
            </select>
          </div>
        </div>

        <div>
          <button onClick={handleSubmitVerfiyAccount}>Submit and Exit</button>
        </div> */}
      </div>
    </div>
  );
}

export default VerifyAccountEntrep;
