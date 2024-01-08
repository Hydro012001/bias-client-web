import { useNavigate } from "react-router-dom";
export default function ErrorHandler(error, navigate) {
  if (error.response) {
    navigate("/server-error");
  } else if (error.request) {
    navigate("/error");
  } else {
    navigate("/somethingwrong");
  }
}
