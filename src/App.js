import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AllRoutes from "./AllRoutes";
export const API_URL = "https://stack-overflow-api.onrender.com";
// export const API_URL = "http://localhost:8000";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
