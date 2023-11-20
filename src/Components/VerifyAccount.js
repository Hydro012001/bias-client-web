import React, { useRef, useState } from "react";
import "../Screens/CSS/verify.css";
import { storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function VerifyAccount(props) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIDFront, setselectedIDFront] = useState("");
  const [selectedIDBack, setselectedIDBack] = useState("");
  const [idType, setIdType] = useState("");
  const user_id = localStorage.getItem("user_id");
  const fileInputRefID = useRef(null);
  const fileInputRefImage = useRef(null);
  const fileInputRefBack = useRef(null);
  const handelUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgurl = URL.createObjectURL(file);
      setSelectedImage({ imgUrl: imgurl, file: file });
    }
  };
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
        .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/uploadVerify`, {
          front: Front,
          back: Back,
          user: User,
          user_id: user_id,
          date: formattedDate,
          idType: idType,
        })
        .then((res) => {
          if (res.data.status) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
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
    <div className="verify-contianer">
      <div className="verify-content">
        <div className="verify-profile">
          {selectedImage ? (
            <img src={selectedImage.imgUrl} id="pic" />
          ) : (
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              id="pic"
            />
          )}
          <label>
            2x2 Picture: <button onClick={RefInputImage}>Upload </button>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handelUploadImage}
            style={{ display: "none" }}
            ref={fileInputRefImage}
          />
        </div>
        <div className="verify-id">
          <div className="front">
            {selectedIDFront ? (
              <img src={selectedIDFront.imgUrl} />
            ) : (
              <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
            )}
            <label>
              Front ID: <button onClick={RefInputId}>Upload</button>
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handelUploadID}
              ref={fileInputRefID}
            />
          </div>

          <div className="back">
            {selectedIDBack ? (
              <img src={selectedIDBack.imgUrl} />
            ) : (
              <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
            )}

            <label>
              Back ID: <button onClick={RefInputIdBack}>Upload</button>
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handelUploadIDBack}
              ref={fileInputRefBack}
            />
          </div>
        </div>
        <button onClick={handleSubmitVerfiyAccount}>Submit and Exit</button>
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

export default VerifyAccount;
