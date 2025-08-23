import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainAllRoutes from "./AllRoutes/mainRoutes";

function App() {
  return (
    <>
      <MainAllRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
