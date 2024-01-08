import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from "./loader";
import { v4 as uuidv4 } from "uuid";
import {
  faQuestion,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bussinessTypes, bussinessesName } from "./bussinesDetails";
import AutoCompleteAddress from "./AutoCompleteAddress";
import { Accordion, Button } from "react-bootstrap";
import { formatDateToCustomString } from "../Utils/Compute";
import { Loan } from "loanjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";
function UpdateBusiness(props) {
  const user_id = localStorage.getItem("user_id");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const buss_id = searchParams.get("buss_id");
  const [address, setAddress] = useState("");
  const bussilistType = bussinessTypes();
  const [PaypalEmailAddress, setPaypalEmailAddres] = useState("");
  const [bussinessnameList, setbussinessnameList] = useState([]);
  //Working Usestate
  const [changeAddress, setchangeAddress] = useState(false);
  const [installments, setInstallments] = useState([]);
  const [totalReturn, setTotalReturn] = useState("");
  const [logoDisplay, setLogoDisplay] = useState("");
  const [logo, setLogo] = useState("");
  const [bussExperinceValue, setBussExpereinceValue] = useState("");
  const [changeSupportDoc, setchangeSupportDoc] = useState(false);
  const [bussExperienceYes, setBussExpereinceYes] = useState(false);
  const [bussExperienceNo, setBussExpereinceNo] = useState(false);
  const [supportingDoc, setSupportingDoc] = useState();
  const [permits, setPermits] = useState();
  const [proofOfResidence, setProofOfResdence] = useState();
  const [textDisable, setTextDisble] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [hasbusinessBuild, sethasbusinessBuild] = useState("");
  const [changePermits, setChangePermits] = useState(false);
  const [targetAudience, setTargetAudience] = useState("");

  const [useFunds, setUseFunds] = useState([]);
  const [fundAmount, setfundAmount] = useState("");
  const [fundProduct, setFundProduct] = useState("");
  const [prevBusinessName, setPrevBusinessName] = useState("");
  //   const [age, setAge] = useState(0);
  const [showLoaderUpdate, setShowLoaderUpdate] = useState(false);
  const [buildingsNearMe, setbuildingNearMe] = useState("");
  const [buildingsNearMeDisplay, setBuildingNearMeDisplay] = useState([]);
  const [changeCategory, setchangeCategory] = useState(false);
  const [bussinessName, setBussinessName] = useState("");
  const [bussiness, setBussiness] = useState([]);
  const [bussinesType, setBussinesType] = useState("");
  const [bussinessCapital, setBussinessCapital] = useState("");
  const [bussinessDetails, setBussinessDetails] = useState("");
  const [changeBusinessExperience, setChnageBusinessExperience] =
    useState(false);
  //const [bussStatus, setBusinessStatus] = useState()
  useEffect(() => {
    setShowLoader(true);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/showbusinessDetails`, {
        buss_id,
        user_id,
      })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.result[0].buss_photo);
          setLogo(res.data.result[0].buss_photo);
          setBussinessName(res.data.result[0].buss_name);
          setBussinesType(res.data.result[0].buss_type);
          setAddress(res.data.result[0].buss_address);
          setbussinessnameList(JSON.parse(res.data.result[0].buss_type_name));
          setBuildingNearMeDisplay(
            JSON.parse(res.data.result[0].buss_station_name)
          );
          setPaypalEmailAddres(res.data.result[0].buss_user_paypal_email);
          setBussinessDetails(res.data.result[0].buss_summary);
          setTargetAudience(res.data.result[0].buss_target_audience);
          setUseFunds(JSON.parse(res.data.result[0].buss_useof_funds));
          setSupportingDoc(JSON.parse(res.data.result[0].buss_support_doc));
          setPermits(JSON.parse(res.data.result[0].buss_credentials));
          setProofOfResdence(
            JSON.parse(res.data.result[0].buss_proof_of_residence)
          );
          setPrevBusinessName(res.data.result[0].buss_prev_name);
          sethasbusinessBuild(res.data.result[0].buss_station);
          setBussExpereinceValue(res.data.result[0].buss_experience);
          //   setBussiness(JSON.parse(res.data.result[0].buss_type_name));
          setShowLoader(false);
        } else {
        }
      });
  }, [buss_id]);

  const handleSetBusinessLogo = (e) => {
    const imgsrc = URL.createObjectURL(e);

    setLogoDisplay(imgsrc);
    setLogo(e);
  };
  const setBussinessNameList = (code) => {
    console.log(code);
    setbussinessnameList(bussinessesName(code));
  };
  const handleSetBusiness = (e) => {
    if (bussiness.includes(e)) {
      setBussiness(bussiness.filter((item) => item != e));
    } else {
      setBussiness([...bussiness, e]);
    }
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

  const handleRemoveFundsItems = (index) => {
    console.log(index);
    const updatedItems = [...useFunds];
    updatedItems.splice(index, 1);

    setUseFunds(updatedItems);
  };
  useEffect(() => {
    let totalSum = 0;

    for (let i = 0; i < useFunds.length; i++) {
      totalSum += parseFloat(useFunds[i].amount);
    }
    const amount = totalSum;
    const listStartDate = [];
    const listEndDate = [];
    if (amount) {
      const loans = new Loan(amount, 12, 5);

      console.log(loans);
      const loansInsallment = loans.installments;

      setTotalReturn(loans.sum);
      const startDate = new Date();
      for (let i = 0; i < 12; i++) {
        const nextStartDate = new Date(startDate);
        nextStartDate.setMonth(startDate.getMonth() + i);
        listStartDate.push(nextStartDate);

        const nextEndDate = new Date(nextStartDate);
        nextEndDate.setMonth(nextStartDate.getMonth() + 1);
        nextEndDate.setDate(nextStartDate.getDate() - 1);
        listEndDate.push(nextEndDate);
      }
      const updateReturnsWithDate = loansInsallment.map((item, index) => ({
        ...item,
        mindate: `${listStartDate[index].toDateString()} `,
        maxdate: `${listEndDate[index].toDateString()}`,

        id: `${uuidv4()}`,
      }));

      console.log(updateReturnsWithDate);

      ///Installments data
      setInstallments(updateReturnsWithDate);
    }
    setBussinessCapital(totalSum);
  }, [useFunds]);
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
  const handleAddToUseFund = () => {
    const feeAmount = parseFloat(fundAmount) * parseFloat(0.034);
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
  const handlePitchBusiness = async () => {
    setShowLoaderUpdate(true);
    setTextDisble(true);
    const bussLogo = logoDisplay ? await handleUploadImage(logo) : logo;

    console.log("Logo Display " + logoDisplay);
    console.log("Logo " + logo);
    const SupportingDocUrl = changeSupportDoc
      ? await handleUploadFileToCloud(supportingDoc)
      : supportingDoc;
    const Permits = changePermits
      ? await handleUploadFileToCloud(permits)
      : permits;
    const proofresidence = changePermits
      ? await handleUploadFileToCloud(proofOfResidence)
      : proofOfResidence;
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/updatedBusiness`, {
        bussinessName,
        bussLogo,
        SupportingDocUrl: JSON.stringify(SupportingDocUrl),
        Permits: JSON.stringify(Permits),
        proofOfResidence: JSON.stringify(proofresidence),
        bussinesType,
        bussinessCapital,
        bussinessDetails,
        buss_id,
        business:
          bussiness.length > 0
            ? JSON.stringify(bussiness)
            : JSON.stringify(bussinessnameList),
        address,
        hasbusinessBuild,
        bussBuildingPlaceName:
          buildingsNearMe.length > 0
            ? JSON.stringify(buildingsNearMe)
            : JSON.stringify(buildingsNearMeDisplay),
        bussExperinceValue,
        prevBusinessName,
        targetAudience,
        useFunds: JSON.stringify(useFunds),
        installments: JSON.stringify(installments),
        totalReturn,
        PaypalEmailAddress,
      })
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          setShowLoaderUpdate(false);
          setTextDisble(false);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="container-fluid pt-3 pb-5 mt-5">
      {showLoader ? (
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ height: "90vh" }}
        >
          <Loader />
        </div>
      ) : (
        <div className=" container-fluid mt-5 ">
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
                  src={logo}
                  alt="Logo"
                  className="border shadow"
                  style={{ width: "13rem", height: "13rem" }}
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
                  value={bussinessName}
                />
              </div>

              {changeCategory ? (
                <>
                  {" "}
                  <div className="mb-3">
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
                      <option selected>Category</option>
                      {bussilistType.map((item) => (
                        <option key={item.id} value={item.category_code}>
                          {item.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="form-label">Business Sub Category</label>
                  <div className="mb-3 d-flex  justify-content-between align-items-center flex-wrap">
                    {bussinessnameList.map((item) => (
                      <div class="form-check w-50 " key={item.id}>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={item.bussiness}
                          id="flexCheckDefault"
                          onChange={(e) => handleSetBusiness(e.target.value)}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          {item.bussiness}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <label className="form-label">Type of Business</label>
                    <Button
                      variant="primary"
                      className="rounded"
                      onClick={() => setchangeCategory(!changeCategory)}
                    >
                      Change Category
                    </Button>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g Juan Sari Sari Store "
                    className="form-control"
                    disabled
                    value={bussinesType}
                  />
                  <label className="form-label">Business Sub Category</label>
                  {bussinessnameList.length > 0 ? (
                    <div className="d-flex gap-2 flex-wrap">
                      {bussinessnameList.map((item) => (
                        <span className="border p-1">{item}</span>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}

              <div className="mb-3 mt-3">
                {changeAddress ? (
                  <>
                    <label className="form-label">Address</label>
                    <AutoCompleteAddress
                      address={setAddress}
                      buildingsNearTheEntrep={setbuildingNearMe}
                      hasBuilding={sethasbusinessBuild}
                    />
                  </>
                ) : (
                  <>
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <label className="form-label">Address</label>
                      <Button
                        variant="primary"
                        className="rounded"
                        onClick={() => setchangeAddress(!changeAddress)}
                      >
                        Change Address
                      </Button>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g Juan Sari Sari Store "
                      className="form-control"
                      disabled
                      value={address}
                    />
                    <label className="form-label">Business Sub Category</label>
                    <div className="d-flex gap-2 flex-wrap ">
                      {buildingsNearMeDisplay.map((item) => (
                        <span className="border p-1">{item.name}</span>
                      ))}
                    </div>
                  </>
                )}

                {/* <Address addressData={setAddress} /> */}
              </div>
            </div>
          </div>
          <hr />
          <div className="p-3">
            <h3>Business Experience</h3>
            {changeBusinessExperience ? (
              <>
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
                      <label className="form-label">
                        What kind of business?
                      </label>
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
              </>
            ) : (
              <>
                {prevBusinessName ? (
                  <div className="p-2 border">{prevBusinessName}</div>
                ) : (
                  <p className="text-danger fw-bold ">No Previous Business</p>
                )}

                <Button
                  variant="primary "
                  className="rounded"
                  onClick={() => setChnageBusinessExperience(true)}
                >
                  Chnage Business Experience
                </Button>
              </>
            )}
          </div>
          <hr />
          <div className="col  p-3">
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
                value={bussinessDetails}
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
                value={targetAudience}
              ></textarea>
            </div>

            <div class="mb-3 ms-3">
              <div className="d-flex gap-2">
                <label for="formFileMultiple" class="form-label">
                  Attach any supporting documents
                </label>
                <Button
                  className="rounded"
                  variant="primary"
                  onClick={() => setchangeSupportDoc(!changeSupportDoc)}
                >
                  Change Supporting Documents
                </Button>
              </div>
              {changeSupportDoc ? (
                <input
                  class="form-control mt-2"
                  type="file"
                  id="formFileMultiple"
                  disabled={textDisable}
                  multiple
                  onChange={(e) => setSupportingDoc(e.target.files)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <hr />
          <div className="col p-3">
            <h3>Funding Details</h3>
            <label className="form-label mb-3 text-danger">
              Note: You will return the amount with 5% interest in 12 months.
              Once you've submitted your funding request, our team will review
              it and generate a partial payment date for you. Please note that
              the payment date will only be determined and updated once the full
              capital amount has been provided.
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
                  value={PaypalEmailAddress}
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
                          Php {bussinessCapital ? <>{bussinessCapital}</> : ""}
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
          <div className="col  p-3">
            <h3>Business Registrations & Permits Files</h3>

            <div className="ms-4">
              <div className="d-flex gap-2 align-items-center ">
                <label for="formFileMultiple" class="form-label">
                  Bussines Credentials and Permits
                </label>
                <Button
                  className="rounded"
                  variant="primary"
                  onClick={() => setChangePermits(!changePermits)}
                >
                  Change Permits
                </Button>
              </div>

              {changePermits ? (
                <>
                  {" "}
                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label">
                      Bussines Credentials
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      disabled={textDisable}
                      multiple
                      onChange={(e) => setPermits(e.target.files)}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label">
                      Proof of Residence
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      disabled={textDisable}
                      multiple
                      onChange={(e) => setProofOfResdence(e.target.files)}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="container-fluid d-flex align-items-center justify-content-center">
            <button
              type="button"
              class="btn btn-primary rounded d-flex align-items-center justify-content-center gap-3"
              style={{ width: "80%" }}
              onClick={handlePitchBusiness}
              disabled={textDisable}
            >
              {showLoaderUpdate ? (
                <>
                  Uploading...
                  <Loader />
                </>
              ) : (
                <>Update Business</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateBusiness;
