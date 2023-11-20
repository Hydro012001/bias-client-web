import React from "react";
import "../Screens/CSS/errormsg.css";
function ErrorMsg({ msg }) {
  return (
    <div className="error-container">
      <div className="error-content">
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default ErrorMsg;
