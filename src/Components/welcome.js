import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../icons/logo.jpg";
import logopng from "../icons/logo.png";

import Terms_and_Condition from "../Terms and Condition/Terms_and_Condition";
export default function Welcome() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const userType = localStorage.getItem("userType");
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user_id) {
        if (userType === "entrepreneur") {
          navigate("/entrepreneur/dashboard");
        } else if (userType === "investor") {
          navigate("/investor/dashboard");
        }
      } else {
        navigate("/login");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user_id, userType, navigate]);

  const handleRedirectToLogin = () => {
    navigate("/login");
  };
  const handleRedirectToLSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      navigate("/login");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="d-flex w-100">
      {showLoader ? (
        <div
          class="d-flex justify-content-center align-items-center  w-100"
          style={{ height: "100vh" }}
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* <div className="w-50 d-flex flex-column justify-content-center align-items-center ">
        <h2 className="fw-bold">Get started</h2>
        <div className="w-100 d-flex justify-content-evenly align-items-center ">
          {" "}
          <button
            type="button"
            class="btn btn-primary btn-lg shadow-lg"
            style={{ height: "4rem", width: "40%" }}
            onClick={handleRedirectToLogin}
          >
            Login
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-lg shadow-lg"
            style={{ height: "4rem", width: "40%" }}
            onClick={handleRedirectToLSignUp}
          >
            Signup
          </button>
        </div>
      </div> */}
    </div>
  );
}
