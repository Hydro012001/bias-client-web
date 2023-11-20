import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import loginIcon from "../icons/login.svg";
import { Toast, ToastContainer } from "react-bootstrap";
import { Loan } from "loanjs";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);
  const loginUser = () => {
    Axios.post(`${process.env.REACT_APP_NETWORK_ADD}:3006/login`, {
      email: email,
      password: pass,
    })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("userType", response.data.result[0].user_type);

          localStorage.setItem("user_id", response.data.result[0].user_id);
          localStorage.setItem("auth", true);
          setBtnStatus(true);
          if (response.data.result[0].user_type === "entrepreneur") {
            setAlertMsg("Login successfully");
            setShow(true);
            setAlertType("success");
            setTimeout(() => {
              navigate("/entrepreneur/account/business");
            }, 3000);
          } else if (response.data.result[0].user_type === "investor") {
            setAlertMsg("Login successfully");
            setShow(true);
            setAlertType("success");
            setTimeout(() => {
              navigate("/investor/feeds/list/all/category/all");
            }, 3000);
          } else {
            navigate("/");
          }
        } else {
          setAlertMsg(response.data.message);
          setShow(true);
          setAlertType("danger");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setAlertMsg(error.message);
        setShow(true);
        setAlertType("danger");
      });
  };

  return (
    <>
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

              <div className="text-center">
                <button
                  onClick={() => loginUser()}
                  className="btn btn-primary btn-lg col-10"
                  disabled={btnStatus}
                >
                  Login
                </button>
              </div>

              <p className="text-center">
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
