import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import loginIcon from "../icons/login.svg";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import emailjs from "@emailjs/browser";
import axios from "axios";
import Loader from "../Components/loader";
import { decryptTextId, encrypTextId } from "../Components/EncryptIDs";
import PasswordStrengthBar from "react-password-strength-bar";
import cryptoRandomString from "crypto-random-string";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [code, setCode] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState("");
  const [showVerificationModal, setshowVerificationModal] = useState(false);
  const [userType, setUserType] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [ForgotPass, setForgotPass] = useState(false);
  const [emailForFOrgotPass, setEmailForForgotPass] = useState("");
  const [GeneratedCOdeForFOrgotPass, setGeneratedCOdeForFOrgotPass] =
    useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [newPass, setNewPas] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [PassStrength, setPassStrength] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showResende, setShowResend] = useState(false);
  const [showLoadingSendCode, setShowLoadingSendCode] = useState(false);
  const [showCheckCode, setShowCheckCode] = useState(false);
  const [sendForgotCodeInput, setsendForgotCodeInput] = useState("");
  const loginUser = () => {
    setBtnStatus(true);
    setShowLoader(true);
    Axios.post(`${process.env.REACT_APP_NETWORK_ADD}/login`, {
      email: email,
      password: pass,
    })
      .then((response) => {
        if (response.data.success) {
          const generatedCode = cryptoRandomString({
            length: 6,
            type: "numeric",
          });
          setGeneratedCodes(generatedCode);

          emailjs
            .send(
              "service_mbvx5x9",
              "template_7m8yhnl",
              {
                to_name: email,
                message: generatedCode,
                send_to: email,
              },
              "-yH3TEB14-G4yit6d"
            )
            .then((data) => {
              localStorage.setItem(
                "userType",
                response.data.result[0].user_type
              );
              localStorage.setItem("user_id", response.data.result[0].user_id);
              localStorage.setItem("auth", encrypTextId("authorized"));

              setshowVerificationModal(true);
              setUserType(response.data.result[0].user_type);
            })
            .catch((error) => {
              console.log(error);
              setBtnStatus(false);
              setShowLoader(false);
            });
        } else {
          setAlertMsg(response.data.message);
          setShow(true);
          setAlertType("danger");
          setBtnStatus(false);
          setShowLoader(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setAlertMsg(error.message);
        setShow(true);
        setAlertType("danger");
        setBtnStatus(false);
        setShowLoader(false);
      });
  };
  const showForgotPassword = () => {
    setForgotPass(!ForgotPass);
  };

  const handleLoginUser = () => {
    if (generatedCodes === code) {
      setBtnStatus(false);
      console.log(userType);

      if (userType === "entrepreneur") {
        setAlertMsg("Login successfully");
        setShow(true);
        setAlertType("success");
        setShowLoader(false);
        setTimeout(() => {
          navigate("/entrepreneur/account/business");
        }, 3000);
      } else if (userType === "investor") {
        setAlertMsg("Login successfully");
        setShow(true);
        setAlertType("success");
        setShowLoader(false);
        setTimeout(() => {
          navigate("/investor/feeds/list/all/category/all");
        }, 3000);
      } else if (userType === "admin") {
        setAlertMsg("Login successfully");
        setShow(true);
        setAlertType("success");
        setShowLoader(false);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 3000);
      } else {
        navigate("/");
      }
    } else {
      alert("Wrong Code");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(interval);
        // You can perform any action when the countdown reaches 0.
        setShowResend(true);
        setSeconds(0);
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [seconds]);

  const handleSendCode = async () => {
    setShowLoadingSendCode(true);

    const generatedCode = await cryptoRandomString({
      length: 6,
      type: "numeric",
    });
    setGeneratedCOdeForFOrgotPass(generatedCode);

    emailjs
      .send(
        "service_mbvx5x9",
        "template_7m8yhnl",
        {
          to_name: emailForFOrgotPass,
          message: generatedCode,
          send_to: emailForFOrgotPass,
        },
        "-yH3TEB14-G4yit6d"
      )
      .then((data) => {
        console.log(data);
        // if(data.status){

        // }
        setShowLoadingSendCode(false);
        setShowCheckCode(true);
        setShowResend(false);
        setSeconds(60);
      });
  };

  const checkMatchCode = () => {
    if (
      parseInt(GeneratedCOdeForFOrgotPass) === parseInt(sendForgotCodeInput)
    ) {
      setShow(true);
      setAlertMsg("Code match");
      setAlertType("success");
      setShowResend(false);
      setShowNewPass(true);
    } else {
      setShow(true);
      setAlertMsg("Code not match");
      setAlertType("danger");
    }
  };
  const handleSubmitForgotPass = () => {
    if (newPass === newPassConfirm) {
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}/updateForgotPass`, {
          newPass,
          emailForFOrgotPass,
        })
        .then((res) => {
          if (res.data.status) {
            setShow(true);
            setAlertMsg(res.data.message);
            setAlertType("success");
            setEmailForForgotPass("");
            setsendForgotCodeInput("");
            window.location.reload();
          } else {
            setShow(true);
            setAlertMsg(res.data.message);
            setAlertType("success");
          }
        })
        .catch((error) => {
          setShow(true);
          setAlertMsg(error.message);
          setAlertType("danger");
        });
    } else {
      setShow(true);
      setAlertMsg("Password does not match");
      setAlertType("danger");
    }
  };

  const formatTime = (time) => {
    // Format time to display leading zero for single-digit seconds
    return time < 10 ? `0${time}` : time;
  };
  const handleClose = () => {
    setShowNewPass(false);
    setSeconds(0);
    setForgotPass(false);
    setShowCheckCode(false);
    setsendForgotCodeInput("");
    setEmailForForgotPass("");
  };

  return (
    <>
      {ForgotPass ? (
        <Modal show={ForgotPass} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showNewPass ? (
              <>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    onChange={(e) => setNewPas(e.target.value)}
                    className="form-control"
                    value={newPass}
                  />
                  <PasswordStrengthBar
                    password={newPass}
                    onChangeScore={(number, feedback) => {
                      setPassStrength(number);
                    }}
                    className="mt-3"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    onChange={(e) => setNewPassConfirm(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={handleSubmitForgotPass}>
                    Submit
                  </Button>
                </div>
              </>
            ) : (
              <>
                {showCheckCode ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Enter the Code</label>
                      <input
                        type="text"
                        onChange={(e) => setsendForgotCodeInput(e.target.value)}
                        className="form-control"
                        value={sendForgotCodeInput}
                      />
                    </div>
                    {showLoadingSendCode ? (
                      <Loader />
                    ) : (
                      <div className="d-flex justify-content-between">
                        <Button variant="primary" onClick={checkMatchCode}>
                          Verify Code
                        </Button>
                        <div>
                          {showResende ? (
                            <Button variant="success" onClick={handleSendCode}>
                              Resend Code
                            </Button>
                          ) : (
                            <label className="fw-bold text-primary">
                              Resend code after{" "}
                              {`${Math.floor(seconds / 60)}:${formatTime(
                                seconds % 60
                              )}`}
                            </label>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Enter your email</label>
                      <input
                        type="text"
                        onChange={(e) => setEmailForForgotPass(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    {showLoadingSendCode ? (
                      <Loader />
                    ) : (
                      <Button variant="primary" onClick={handleSendCode}>
                        Send Code
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {showVerificationModal ? (
        <Modal show={showVerificationModal}>
          <Modal.Header closeButton>
            <Modal.Title>Code Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">
                Check you email and enter the verification code
              </label>
              <input
                type="text"
                onChange={(e) => setCode(e.target.value)}
                className="form-control"
              />
            </div>
            <Button variant="primary" onClick={handleLoginUser}>
              Verify
            </Button>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      <div className="contianer-fluid row">
        <ToastContainer position="top-center" className="p-3">
          <Toast
            className="d-inline-block m-1"
            bg={alertType}
            show={show}
            delay={3000}
            onClose={() => setShow(false)}
            autohide
          >
            <Toast.Body className="primary text-light">{alertMsg}</Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="row align-items-center col-6 justify-content-center">
          <div className="row align-items-center justify-content-center">
            <h1 className="text-center">Login</h1>
            <div className="col-8">
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  placeholder="name@sample.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  class="form-control"
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                />

                <div id="passwordHelpBlock" class="form-text">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </div>
              </div>

              <div className="text-center d-flex justify-content-center align-items-center">
                <button
                  onClick={() => loginUser()}
                  class="btn btn-primary rounded d-flex align-items-center justify-content-center gap-3 col-10"
                  disabled={btnStatus}
                >
                  {showLoader ? (
                    <>
                      Login
                      <Loader />
                    </>
                  ) : (
                    <>Login</>
                  )}
                </button>
              </div>
              <label
                className="text-primary fw-bold mt-3"
                onClick={showForgotPassword}
                style={{ cursor: "pointer" }}
              >
                Forgot password ?
              </label>
              <p className="text-center mt-3">
                Don't have a acount? Click <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col text-center ">
          <img
            src={loginIcon}
            alt="Welcome"
            style={{ width: "80%", height: "38rem" }}
          />
        </div>
      </div>
    </>
  );
}
