import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../icons/logo.jpg";
import logopng from "../icons/logo.png";
import Typewriter from "typewriter-effect";
export default function Welcome() {
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (user_id) {
  //       if (userType === "entrepreneur") {
  //         navigate("/entrepreneur/dashboard");
  //       } else if (userType === "investor") {
  //         navigate("/investor/dashboard");
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [user_id, userType, navigate]);

  const handleRedirectToLogin = () => {
    navigate("/login");
  };
  const handleRedirectToLSignUp = () => {
    navigate("/signup");
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowLoader(false);
  //     navigate("/login");
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [navigate]);

  return (
    <div className="d-flex w-100">
      {/* {showLoader ? (
        <div
          class="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )} */}

      <div className="w-50 bg-primary text-light" style={{ height: "100vh" }}>
        <div className="d-flex align-items-center gap-1 ps-2 mt-2">
          <label className="fs-5 fw-bold">BiaS </label>
          <img
            src={logo}
            alt="..."
            className="rounded-circle"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-center w-100  text-center gap-2"
          style={{ height: "70vh" }}
        >
          <img
            src={logo}
            alt="..."
            className="rounded-circle shadow-lg"
            style={{ width: "15rem", height: "15rem" }}
          />
          <label className="fs-3 ">
            <label className="">
              <strong className="fs-1 ">B</strong>usiness{" "}
              <strong className="fs-1 ">I</strong>
              nvestment <strong className="fs-1 ">A</strong>pplication for{" "}
              <strong className="fs-1 ">S</strong>mall Entrepreneurs
            </label>
          </label>

          <Typewriter
            options={{
              strings: [
                "Investing our way through the future.",
                "Empowering Dreams, Igniting Success — Where Innovation Meets Opportunity.",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 30,
              delay: 70,
              wrapperClassName: "fw-bold mt-5",
            }}
          />
          {/* <label>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Investing our way through the future.")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(
                    "Empowering Dreams, Igniting Success — Where Innovation Meets Opportunity."
                  )
                  .start();
              }}
            />
          </label> */}
        </div>
      </div>

      <div className="w-50 d-flex flex-column justify-content-center align-items-center ">
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
      </div>
    </div>
  );
}
