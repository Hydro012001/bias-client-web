import { useEffect, useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import logoicon from "../icons/logo.jpg";

import { v4 as uuidv4 } from "uuid";

import { storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import {
  faQuestion,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "./loader";

import Modal from "react-bootstrap/Modal";
import { Loan } from "loanjs";
import { calculateAge, formatDateToCustomString } from "../Utils/Compute";
import AutoCompleteAddress from "./AutoCompleteAddress";
import { LoanCalculate } from "./LoanCalculator";

export default function Pitch({
  handleShowPitchBusiness,
  status,
  msg,
  alertType,
  currentDate,
}) {
  const user_id = localStorage.getItem("user_id");

  const [address, setAddress] = useState("");
  const [bussilistType, setbussilistType] = useState([]);
  const [PaypalEmailAddress, setPaypalEmailAddres] = useState("");
  const [bussinessnameList, setbussinessnameList] = useState([]);
  //Working Usestate
  const [installments, setInstallments] = useState([]);
  const [totalReturn, setTotalReturn] = useState("");
  const [logoDisplay, setLogoDisplay] = useState("");
  const [logo, setLogo] = useState("");
  const [bussExperinceValue, setBussExpereinceValue] = useState("");

  const [bussExperienceYes, setBussExpereinceYes] = useState(false);
  const [bussExperienceNo, setBussExpereinceNo] = useState(false);
  const [supportingDoc, setSupportingDoc] = useState("");
  const [permits, setPermits] = useState("");
  const [proofOfResidence, setProofOfResdence] = useState("");
  const [textDisable, setTextDisble] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [hasbusinessBuild, sethasbusinessBuild] = useState(false);

  const [targetAudience, setTargetAudience] = useState("");

  const [useFunds, setUseFunds] = useState([]);
  const [fundAmount, setfundAmount] = useState("");
  const [fundProduct, setFundProduct] = useState("");
  const [prevBusinessName, setPrevBusinessName] = useState("");
  const [age, setAge] = useState(0);

  const [buildingsNearMe, setbuildingNearMe] = useState("");

  const [bussineName, setBussinessName] = useState("");
  const [bussiness, setBussiness] = useState([]);
  const [bussinesType, setBussinesType] = useState("");
  const [bussinessCapital, setBussinessCapital] = useState("");
  const [bussinessDetails, setBussinessDetails] = useState("");

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/bussinesTypeList`)
      .then((res) => {
        setbussilistType(res.data.categoryres);
        console.log(res.data.categoryres);
        localStorage.setItem(
          "subcategory",
          JSON.stringify(res.data.subcategoryRes)
        );
      });
  }, []);

  const setBussinessNameList = (code) => {
    console.log(code);
    const subCategory = JSON.parse(localStorage.getItem("subcategory"));
    console.log(subCategory);
    const filterBusinessSubCategory = subCategory.filter(
      (item) => item.sub_ctg_ctg_id.toString() === code.toString()
    );

    console.log(filterBusinessSubCategory);
    setbussinessnameList(filterBusinessSubCategory);
  };

  const handleSetBusiness = (e) => {
    if (bussiness.includes(e)) {
      setBussiness(bussiness.filter((item) => item != e));
    } else {
      setBussiness([...bussiness, e]);
    }
  };

  //   const imgRef = ref(strg, "files/" + bussinessPhoto.name);

  //   uploadBytes(imgRef, bussinessPhoto)
  //     .then((snap) => {
  //       getDownloadURL(snap.ref).then((url) => {
  //         uploadDB(url);
  //       });
  //     })
  //     .catch((error) => alert(error));
  // };

  //   // alert("You click me");
  //   // console.log(address.barangay);
  //   try {
  //     await uploadBussinessPhoto(bussinessPhotoFilename, bussinessPhoto)
  //       .then((res) => (bussinessPhotoURL = res))
  //       .catch((error) => console.log(error));

  //     // await uploadBussinessPhoto(
  //     //   bussinessPhotoMayorFilename,
  //     //   bussinessPhotoMayor
  //     // ).then((res) => (bussinessPhotoMayorURL = res));

  //     // await uploadBussinessPhoto(
  //     //   bussinessPhotoBIRFilename,
  //     //   bussinessPhotoBIR
  //     // ).then((res) => (bussinessPhotoBIRURL = res));

  //     // await uploadBussinessPhoto(
  //     //   bussinessPhotoBrgyFilename,
  //     //   bussinessPhotoBrgy
  //     // ).then((res) => (bussinessPhotoBrgyURL = res));
  //     // setBussinessPhotoRUL(url);
  //     // if (fileInputRef.current) {
  //     //   fileInputRef.current.value = "";
  //     // }

  //     // displayProp();
  //     //uplaodDB();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   console.log(bussinessPhotoURL);
  // }, [bussinessPhotoURL]);

  // const displayData = (url) => {
  //   console.log(url);
  // };
  // const handleSetFiles = (uploadType, event) => {
  //   const index = filesUpload.findIndex((item) => item.fileType === uploadType);
  //   // console.log(index);
  //   if (index !== -1) {
  //     const updateFilesUpload = [...filesUpload];
  //     updateFilesUpload[index] = {
  //       fileType: uploadType,
  //       fileSelected: event,
  //     };
  //     setFilesUpload(updateFilesUpload);
  //   } else {
  //     setFilesUpload([
  //       ...filesUpload,
  //       { fileType: uploadType, fileSelected: event },
  //     ]);
  //   }
  // };

  // const setImages = (id, images) => {
  //   const findImageId = uploadImages.findIndex((index) => index.id === id);

  //   console.log(findImageId);
  //   if (findImageId !== -1) {
  //     setUploadImages((prev) => {
  //       const updatedImages = [...prev];
  //       updatedImages[findImageId] = { id: id, filename: images };
  //       return updatedImages;
  //     });
  //   } else {
  //     setUploadImages((prev) => [...prev, { id: id, filename: images }]);
  //   }
  // };
  // useEffect(() => {
  //   uploadImages.map((e) => console.log(e.filename));
  // }, [uploadImages]);

  // const checkImages = () => {
  //   let process = 0;
  //   while (process < uploadImages.length) {
  //     //console.log(uploadImages[process].filename.name);

  //     try {
  //       const strg = storage;
  //       const imgRef = ref(
  //         strg,
  //         "files/" + uploadImages[process].filename.name
  //       );

  //       uploadBytes(imgRef, uploadImages[process].filename)
  //         .then((snap) => {
  //           getDownloadURL(snap.ref).then((url) => {
  //             console.log(url);
  //             setImagesURL((prev) => [...prev, { url: url }]);
  //             process++;
  //           });
  //         })
  //         .catch((error) => console.log(error));
  //     } catch (error) {
  //       console.log(error);
  //       process++;
  //     }
  //   }

  //   // uploadImages.map((e, index) => {
  //   //   const strg = storage;
  //   //   const imgRef = ref(strg, "files/" + e.filename.name);

  //   //   uploadBytes(imgRef, e.filename)
  //   //     .then((snap) => {
  //   //       getDownloadURL(snap.ref).then((url) => {
  //   //         console.log(url);
  //   //         setImagesURL((prev) => [...prev, { url: url }]);
  //   //       });
  //   //     })
  //   //     .catch((error) => console.log(error));
  //   // });
  // };

  // const checkImages = async () => {
  //   for (const e of uploadImages) {
  //     try {
  //       const strg = storage;
  //       const imgRef = ref(strg, "files/" + e.filename.name);

  //       const snap = await uploadBytes(imgRef, e.filename);
  //       const url = await getDownloadURL(snap.ref);
  //       //console.log(e.id);
  //       if (e.id === "1") {
  //         setbussinessPhotoMayor(url);
  //         console.log("1");
  //       } else if (e.id === "2") {
  //         setbussinessPhotoBIR(url);
  //         console.log("2");
  //       } else if (e.id === "3") {
  //         setbussinessPhotoBrgy(url);
  //         console.log("3");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   console.log("Done");
  //   uploadDB();
  // };

  // const uploadDB = (url) => {
  //   // console.log(bussinessPhotoMayor);
  //   // console.log(bussinessPhotoBIR);
  //   // console.log(bussinessPhotoBrgy);
  //   // console.log("Upload Database");
  //   // console.log(url);
  //   let BusinessPhoto = "";
  //   let MayorPermit = "";
  //   let BIR = "";
  //   let BRGYClearance = "";

  //   try {
  //     for (let i = 0; i < url.length; i++) {
  //       if (url[i].fileType === "BusinessPhoto") {
  //         BusinessPhoto = url[i].link;
  //       } else if (url[i].fileType === "MayorPermit") {
  //         MayorPermit = url[i].link;
  //       } else if (url[i].fileType === "BIR") {
  //         BIR = url[i].link;
  //       } else if (url[i].fileType === "BRGYClearance") {
  //         BRGYClearance = url[i].link;
  //       }
  //     }
  //   } catch (error) {}
  //   // console.log(BusinessPhoto);
  //   // console.log(MayorPermit);
  //   // console.log(BIR);
  //   // console.log(BRGYClearance);
  //   axios
  //     .post(`${process.env.REACT_APP_NETWORK_ADD}/pitchbussines`, {
  //       bussinessName: bussineName,
  //       bussinesType: bussinesType,
  //       bussinessCapital: bussinessCapital,
  //       bussinessPhotoURL: BusinessPhoto,
  //       bussinessDetails: bussinessDetails,
  //       MayorPermit: MayorPermit,
  //       BIR: BIR,
  //       BRGYClearance: BRGYClearance,
  //       user_id: user_id,
  //       bussiness: bussiness,
  //       city: address.city,
  //       province: address.province,
  //       barangay: address.barangay,
  //     })
  //     .then((res) => {
  //       if (res.data.sucess) {
  //         setShowLoader(false);
  //         alert(res.data.message);
  //       } else {
  //         alert(res.data.message);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  const handleCloseModal = () => {
    handleShowPitchBusiness();
  };

  const handleSetBusinessLogo = (e) => {
    const imgsrc = URL.createObjectURL(e);

    setLogoDisplay(imgsrc);
    setLogo(e);
  };
  // const HandleUploadFile = async () => {
  //   setShowLoader(true);
  //   let downloadURL = [];

  //   for (let i = 0; i < filesUpload.length; i++) {
  //     const fileType = filesUpload[i].fileType;
  //     const fileName = filesUpload[i].fileSelected.name;

  //     console.log(fileName);
  //     const storageRef = ref(storage, `${user_id}/${fileName}`);

  //     try {
  //       const snapshot = await uploadBytes(
  //         storageRef,
  //         filesUpload[i].fileSelected
  //       );
  //       const url = await getDownloadURL(snapshot.ref);

  //       downloadURL.push({ fileType, link: url });
  //     } catch (error) {
  //       console.error("Error uploading or getting download URL:", error);
  //     }
  //   }
  //   console.log(downloadURL);
  //   uploadDB(downloadURL);
  // };
  const handleUploadFileToCloud = async (files) => {
    let downloadURL = [];

    if (files != null) {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const filename = files[i].name;

          const storageRef = ref(storage, `sample1/${filename}`);

          try {
            const snapshot = await uploadBytes(storageRef, files[i]);
            const urlDowloand = await getDownloadURL(snapshot.ref);
            downloadURL.push(urlDowloand);
          } catch (error) {
            alert(error.message);
          }
        }
        return downloadURL;
      }
    }
  };

  const handleUploadImage = async (files) => {
    let downloadURL = [];
    const filename = files.name;

    const storageRef = ref(storage, `sample1/${filename}`);

    try {
      const snapshot = await uploadBytes(storageRef, files);
      const urlDowloand = await getDownloadURL(snapshot.ref);
      downloadURL.push(urlDowloand);
    } catch (error) {
      alert(error.message);
    }
    return downloadURL;
  };

  const handlePitchBusiness = async () => {
    setShowLoader(true);
    setTextDisble(true);

    const logoURL = await handleUploadImage(logo);
    const SupportingDocUrl = await handleUploadFileToCloud(supportingDoc);
    const Permits = await handleUploadFileToCloud(permits);
    const proofresidence = await handleUploadFileToCloud(proofOfResidence);
    console.log(logoURL);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/pitchbussines`, {
        bussinessName: bussineName,
        bussinesType: bussinesType,
        bussinessCapital: bussinessCapital,
        bussinessPhotoURL: logoURL,
        bussinessDetails: bussinessDetails,
        permits: Permits,
        SupportingDocUrl: SupportingDocUrl,
        user_id: user_id,
        bussiness: JSON.stringify(bussiness),
        address: address,

        bussLocationValue: hasbusinessBuild,
        bussBuildingPlaceName: JSON.stringify(buildingsNearMe),
        bussExperinceValue: bussExperinceValue,
        prevBusinessName: prevBusinessName,
        targetAudience: targetAudience,
        useFunds: JSON.stringify(useFunds),
        installments: installments,
        totalReturn: totalReturn,
        proofresidence,
        PaypalEmailAddress,
      })
      .then((res) => {
        if (res.data.status) {
          setShowLoader(false);
          setTextDisble(false);
          status(true);
          handleCloseModal();
          alertType("success");
          msg("Business is pitched succesffuly");
        } else {
          setShowLoader(false);
          setTextDisble(false);
          alertType("danger");
          status(true);
          handleCloseModal();
          msg("There is an error when pitching");
        }
      })
      .catch((error) => {
        status(true);
        handleCloseModal();
        alertType("danger");
        msg(error.message);
      });
  };

  const handleCheckboxChange = (e) => {
    if (e === "yes") {
      setBussExpereinceYes(!bussExperienceYes);
      setBussExpereinceNo(false);
      setBussExpereinceValue("yes");
    }
    if (e === "no") {
      setBussExpereinceNo(!bussExperienceNo);
      setBussExpereinceYes(false);
      setBussExpereinceValue("no");
    }
  };

  const handleAddToUseFund = () => {
    //const feeAmount = parseFloat(fundAmount) * parseFloat(0.034);
    setUseFunds([
      ...useFunds,
      ...[
        {
          id: uuidv4(),
          products: fundProduct,
          amount: fundAmount,
          // fees: feeAmount,
        },
      ],
    ]);

    setFundProduct("");
    setfundAmount("");
  };

  const handleRemoveFundsItems = (index) => {
    console.log(index);
    const updatedItems = [...useFunds];
    updatedItems.splice(index, 1);

    setUseFunds(updatedItems);
  };

  // useEffect(() => {
  //   const simpleInterest = LoanCalculate(1000, 12, 5);
  //   console.log(simpleInterest);
  // }, []);

  useEffect(() => {
    let totalSum = 0;

    for (let i = 0; i < useFunds.length; i++) {
      totalSum += parseFloat(useFunds[i].amount);
    }
    const amount = totalSum;
    // const listStartDate = [];
    // const listEndDate = [];
    if (amount) {
      // const loans = new Loan(amount, 12, 5);
      const simpleInterest = LoanCalculate(
        amount,
        12,
        5,
        new Date(currentDate)
      );
      // console.log(simpleInterest.updateReturnsWithDate);
      //const loansInsallment = loans.installments;

      setTotalReturn(simpleInterest.totalAmountReturn);
      setInstallments(simpleInterest.updateReturnsWithDate);
      // const startDate = new Date(currentDate);
      // for (let i = 0; i < 12; i++) {
      //   const nextStartDate = new Date(startDate);
      //   nextStartDate.setMonth(startDate.getMonth() + i);
      //   listStartDate.push(nextStartDate);

      //   const nextEndDate = new Date(nextStartDate);
      //   nextEndDate.setMonth(nextStartDate.getMonth() + 1);
      //   nextEndDate.setDate(nextStartDate.getDate() - 1);
      //   listEndDate.push(nextEndDate);
      // }
      // const updateReturnsWithDate = loansInsallment.map((item, index) => ({
      //   ...item,
      //   mindate: `${listStartDate[index].toDateString()} `,
      //   maxdate: `${listEndDate[index].toDateString()}`,

      //   id: `${uuidv4()}`,
      // }));

      //console.log(updateReturnsWithDate);

      ///Installments data
    }
    setBussinessCapital(totalSum);
  }, [useFunds]);

  return (
    <>
      <Modal
        show={handleShowPitchBusiness}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pitch Business
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid  pb-5">
            <div className=" container-fluid">
              <div className="col row justify-content-md-center">
                <span className=" text-center  d-flex align-items-center justify-content-center flex-column gap-2">
                  {logoDisplay ? (
                    <img
                      src={logoDisplay}
                      alt="Logo"
                      className="border shadow"
                      style={{ width: "13rem", height: "13rem" }}
                    />
                  ) : (
                    <img
                      src={logoicon}
                      alt="Logo"
                      className="border"
                      style={{ opacity: ".5" }}
                    />
                  )}

                  <div class="mb-3">
                    <input
                      class="form-control form-control-sm"
                      id="formFileSm"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => handleSetBusinessLogo(e.target.files[0])}
                      disabled={textDisable}
                    />
                  </div>
                </span>
              </div>
              <hr />
              <div className="col pt-4">
                <h3>Business Overview</h3>

                <div className="ms-4">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      placeholder="e.g Juan Sari Sari Store "
                      onChange={(e) => setBussinessName(e.target.value)}
                      className="form-control"
                      disabled={textDisable}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Type of Business</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      disabled={textDisable}
                      onChange={(e) => {
                        setBussinessNameList(e.target.value);
                        setBussiness([]);
                        setBussinesType(
                          e.target.options[e.target.selectedIndex].text
                        );
                      }}
                    >
                      <option disabled selected>
                        Category
                      </option>
                      {bussilistType.map((item) => (
                        <option key={item.id} value={item.ctg_id}>
                          {item.ctg_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="form-label">Business Sub Category</label>
                  <div className="mb-3 d-flex  justify-content-between align-items-center flex-wrap">
                    {bussinessnameList.map((item) => (
                      <div class="form-check w-50 " key={item.sub_ctg_id}>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={item.sub_ctg_name}
                          id="flexCheckDefault"
                          onChange={(e) => handleSetBusiness(e.target.value)}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          {item.sub_ctg_name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Business Location</label>
                    {/* <Address addressData={setAddress} /> */}
                    <AutoCompleteAddress
                      address={setAddress}
                      buildingsNearTheEntrep={setbuildingNearMe}
                      hasBuilding={sethasbusinessBuild}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="p-3">
              <h3>Business Experience</h3>
              <div className="mb-3 mt-3 ms-4">
                <label class="form-label">
                  Do you have any exprience on business?
                </label>
                <div className="d-flex">
                  <div class="form-check ms-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      onChange={() => handleCheckboxChange("yes")}
                      checked={bussExperienceYes}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Yes
                    </label>
                  </div>
                  <div class="form-check ms-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckChecked"
                      onChange={() => handleCheckboxChange("no")}
                      checked={bussExperienceNo}
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      No
                    </label>
                  </div>
                </div>
              </div>
              {bussExperienceYes ? (
                <>
                  {" "}
                  <div className="mb-3 ms-3">
                    <label className="form-label">What kind of business?</label>
                    <input
                      type="text"
                      placeholder="e.g Juan Sari Sari Store "
                      onChange={(e) => setPrevBusinessName(e.target.value)}
                      className="form-control"
                      disabled={textDisable}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <hr />
            <div className="col container p-3">
              <h3>Business Details</h3>
              <div class=" mb-3 ms-3 mt-3">
                <label className="form-label d-flex align-items-center gap-2">
                  Business Summary{" "}
                  <FontAwesomeIcon
                    icon={faQuestion}
                    size="2xs"
                    style={{ color: "#000000", height: "12px", width: "12px" }}
                    className="rounded-circle border"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Briefly describe the business and its primary products and services.
Outline the business's mission and vision."
                  />
                </label>
                <textarea
                  class="form-control resizable"
                  id="floatingTextarea"
                  onChange={(e) => setBussinessDetails(e.target.value)}
                ></textarea>
              </div>
              <div class=" mb-3 ms-3">
                <label className="form-label d-flex align-items-center gap-2">
                  Target Audience
                  <FontAwesomeIcon
                    icon={faQuestion}
                    size="2xs"
                    style={{ color: "#000000", height: "12px", width: "12px" }}
                    className="rounded-circle border"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Identify the target customer base, such as local residents, tourists, or a specific niche.
Explain why you believe there's demand within this audience."
                  />
                </label>
                <textarea
                  class="form-control resizable"
                  id="floatingTextarea"
                  onChange={(e) => setTargetAudience(e.target.value)}
                ></textarea>
              </div>

              <div class="mb-3 ms-3">
                <label for="formFile" class="form-label">
                  Attach any supporting documents
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFileMultiple"
                  disabled={textDisable}
                  onChange={(e) => setSupportingDoc(e.target.files)}
                  accept=".pdf"
                />
              </div>
            </div>
            <hr />
            {/* <div className="col container p-3">
              <h3>Co-Maker Details</h3>
              <div className="mb-3 ms-3 mt-3">
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Firstname
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Lastname
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Birthday
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => handleCaculateAge(e.target.value)}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Age
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      readOnly
                      value={age}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      readOnly
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Address
                    </label>
                    <Address addressData={setCoAddress} />
                  </div>
                  <div class="border p-4 rounded">
                    <div class="card-body">
                      <h5 class="card-title">Co-makers Terms and Condition</h5>
                      <p class="card-text mt-2">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                      <button
                        type="button"
                        class="btn btn-primary rounded  w-100"
                      >
                        Agree
                      </button>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label  for="formFile" class="form-label">
                      Valid ID
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFileMultiple"
                      disabled={textDisable}
                      multiple
                      onChange={(e) => setPermits(e.target.files)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <hr /> */}
            <div className="col container p-3">
              <h3>Funding Details</h3>
              <label className="form-label mb-3 text-danger">
                Note: You will return the amount with 5% interest in 12 months.
                Once you've submitted your funding request, our team will review
                it and generate a partial payment date for you. Please note that
                the payment date will only be determined and updated once the
                full capital amount has been provided.
                {/* Please be advised that
                each funds amount will be subject to a 3.40% for transaction fee
                in sending that fund. */}
              </label>
              <div class=" mb-3 ">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setPaypalEmailAddres(e.target.value)}
                  />
                  <label for="floatingInput">Paypal email address</label>
                </div>

                <label className="form-label d-flex align-items-center gap-2">
                  Use of Funds
                  <FontAwesomeIcon
                    icon={faQuestion}
                    size="2xs"
                    style={{ color: "#000000", height: "12px", width: "12px" }}
                    className="rounded-circle border"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Specify how the invested capital will be used 
                  (e.g., equipment purchase, lease costs, marketing, initial inventory)."
                  />
                </label>

                <div className="d-flex align-items-center ">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Products"
                    onChange={(e) => setFundProduct(e.target.value)}
                    value={fundProduct}
                  />
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Amount"
                    onChange={(e) => setfundAmount(e.target.value)}
                    value={fundAmount}
                  />
                  <button
                    class="btn btn-primary rounded"
                    type="button"
                    onClick={handleAddToUseFund}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                <table class="table align-middle mb-0 bg-white mt-2">
                  <thead className="table-dark">
                    <tr>
                      <th>No.</th>
                      <th>Products</th>
                      <th>Amount</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useFunds.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <p class="fw-normal mb-1">{item.products}</p>
                        </td>
                        <td>
                          <p class="fw-normal mb-1">{item.amount}</p>
                        </td>

                        <td className="text-center">
                          <button
                            type="button"
                            class="btn btn-link btn-rounded btn-sm fw-bold"
                            data-mdb-ripple-color="dark"
                          >
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              onClick={() => handleRemoveFundsItems(index)}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mb-3">
                <label className="form-label">Your capital needed</label>
                <input
                  type="number"
                  placeholder="e.g 10000.00 "
                  // onChange={(e) => handleSetCapital(e.target.value)}
                  className="form-control"
                  disabled={textDisable}
                  // onBlur={(e) => handleOnBlur(e)}
                  value={bussinessCapital}
                  readOnly
                />
              </div>

              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Loan Details</Accordion.Header>
                  <Accordion.Body>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Capital</th>
                          <th scope="col">Interest</th>
                          <th scope="col">Months</th>
                          <th scope="col">Return Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            Php{" "}
                            {bussinessCapital ? <>{bussinessCapital}</> : ""}
                          </td>
                          <td>5%</td>
                          <td>12</td>
                          <td>Php {totalReturn ? <>{totalReturn}</> : ""}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Payments</Accordion.Header>
                  <Accordion.Body>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Amount</th>
                          <th scope="col">Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {installments.map((item, index) => (
                          <tr key={index}>
                            <td>Php {item.installment}</td>
                            <td>
                              {formatDateToCustomString(item.mindate)} -{" "}
                              {formatDateToCustomString(item.maxdate)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <hr />
            <div className="col container p-3">
              <h3>Business Registrations & Permits Files</h3>

              <div className="ms-4">
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Bussines Credentials
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    disabled={textDisable}
                    onChange={(e) => setPermits(e.target.files)}
                    accept=".pdf"
                  />
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Proof of Residence
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    disabled={textDisable}
                    onChange={(e) => setProofOfResdence(e.target.files)}
                    accept=".pdf"
                  />
                </div>
              </div>
            </div>
            <div className="container ">
              <label className="form-label mb-3 text-danger ps-5 pe-5">
                Please be advised that our administrative team will conduct a
                thorough evaluation of your proposal over the next 1-2 business
                days, assessing its feasibility, alignment with our objectives,
                and collaboration potential.
              </label>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center">
              <button
                type="button"
                class="btn btn-primary rounded d-flex align-items-center justify-content-center gap-3"
                style={{ width: "80%" }}
                onClick={handlePitchBusiness}
                disabled={textDisable}
              >
                {showLoader ? (
                  <>
                    Uploading...
                    <Loader />
                  </>
                ) : (
                  <>Pitch</>
                )}
              </button>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </>
  );
}
