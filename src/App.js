import "./App.css";

import RoutePath from "../src/Routers/RoutePath";
import { BrowserRouter } from "react-router-dom";
import "../src/SCSS/custome.scss";
function App() {
  return (
    <BrowserRouter>
      <RoutePath />
    </BrowserRouter>
  );
}

export default App;
