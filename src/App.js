import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AllRoutes from "./AllRoutes";
export const url = "http://localhost:8000";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
