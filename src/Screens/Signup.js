import { useState } from "react";
import "../Screens/CSS/Signup.css";
import PasswordStrengthBar from "react-password-strength-bar";
import Axios from "axios";
import signupIcons from "../icons/signup.svg";
import Address from "../Components/address";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [usertype, setUserType] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [userage, setUserAge] = useState();
  const [gender, setGender] = useState("");
  const [phonenum, setPhonum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [passStrength, setPassStrength] = useState(0);
  const [conPass, setConPass] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");
  const settingTypeofUser = (userType) => {
    setUserType(userType);
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };
  const handleSetAge = (birthdate) => {
    setUserAge(calculateAge(birthdate));
  };

  const createAcount = () => {
    if (passStrength < 3) {
      setAlertMsg("Password is not secure enough");
      setShow(true);
      setAlertType("danger");
    } else {
      if (password === conPass) {
        Axios.post(`${process.env.REACT_APP_NETWORK_ADD}/createaccount`, {
          usertype: usertype,
          firstname: firstname,
          lastname: lastname,
          middlename: middlename,
          Birthday: Birthday,
          gender: gender,
          phonenum: phonenum,
          age: userage,
          email: email,
          password: password,
          province: address.province,
          city: address.city,
          barangay: address.barangay,
        })
          .then((res) => {
            if (res.data.status) {
              setAlertMsg(res.data.message);
              setShow(true);
              setAlertType("success");
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            } else {
              setAlertMsg(res.data.message);
              setShow(true);
              setAlertType("danger");
            }
          })
          .catch((error) => {
            setAlertMsg(error.message);
            setShow(true);
            setAlertType("danger");
          });
      } else {
        alert("Password not match");
      }
    }
  };

  return (
    <div className="contianer">
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
      <div className="d-flex flex-wrap w-100 align-items-center justify-content-center">
        <div className="text-center ">
          <img
            src={signupIcons}
            alt="Welcome"
            style={{ height: "38rem" }}
            className="w-50"
          />
        </div>
        <div
          className="w-50 align-items-center  justify-content-center overflow-auto"
          style={{ height: "90vh" }}
        >
          <h1 className="text-center mt-4 mb-5">Registration Form</h1>

          <div className="personal">
            <h4>Account Information</h4>
            <label>What is your rule? </label>
            <select
              onChange={(e) => settingTypeofUser(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Select rule :</option>
              <option value="entrepreneur">Entreprenuer</option>
              <option value="investor">Investor</option>
            </select>

            <div className="mb-3 mt-3">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingInput">Email address</label>
              </div>

              <div className=" mt-3">
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <PasswordStrengthBar
                  password={password}
                  onChangeScore={(number, feedback) => {
                    setPassStrength(number);
                  }}
                  className="mt-3"
                />{" "}
                <div id="passwordHelpBlock" class="form-text">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </div>
              </div>

              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setConPass(e.target.value)}
                />
                <label for="floatingInput">Confirm Password</label>
              </div>
            </div>
            <div className="mb-3 ">
              <h4>Personal Information</h4>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <label for="floatingInput">First Name</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setMiddleName(e.target.value)}
                />
                <label for="floatingInput">Middle Name</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setLastname(e.target.value)}
                />
                <label for="floatingInput">Last name</label>
              </div>
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                placeholder="Birthday"
                onChange={(e) => {
                  setBirthday(e.target.value);
                  handleSetAge(e.target.value);
                }}
                className="form-control"
              />
              <div class="form-floating mb-3 mt-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={userage}
                  readOnly
                />
                <label for="floatingInput">Age</label>
              </div>

              <label>Select you gender: </label>
              <select
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Prefer not to say</option>
              </select>

              <div class="form-floating mb-3 mt-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setPhonum(e.target.value)}
                />
                <label for="floatingInput">Phone Number</label>
              </div>
            </div>
            <h4>Address Information</h4>

            <br />
            <Address addressData={setAddress} />
            <br />
            <div className="text-center">
              <button
                onClick={() => createAcount()}
                className="btn btn-primary btn-lg col-10"
              >
                Signup
              </button>
            </div>
            <p className="text-center">
              Already have an account? Click <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
