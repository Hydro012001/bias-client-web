import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Screens/CSS/welcome.css";
import welcomeIcon from "../icons/welcome.jpg";
import logoIcon from "../icons/logo.png";
import Login from "../Screens/Login";
export default function Welcome() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const userType = localStorage.getItem("userType");
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
    <>
      {showLoader ? (
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
      )}
    </>
  );
}
