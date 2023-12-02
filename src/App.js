import "./App.css";

import RoutePath from "../src/Routers/RoutePath";
import { BrowserRouter } from "react-router-dom";
import "./Components/SCSS/custome.scss";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function App() {
  return (
    <BrowserRouter>
      <RoutePath />
    </BrowserRouter>
  );
}

export default App;
