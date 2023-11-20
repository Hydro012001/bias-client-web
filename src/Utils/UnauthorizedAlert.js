import React from "react";
import { useNavigate } from "react-router-dom";

function UnauthorizedAlert() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/");
  };
  return (
    <div>
      <h4>Your Not authorized to access.... Please login first</h4>
      <button onClick={handleBackToLogin}>Okay</button>
    </div>
  );
}

export default UnauthorizedAlert;
