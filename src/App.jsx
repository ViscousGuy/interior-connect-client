import "./App.scss";
import Layout from "./components/layouts/Layout";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


function App() {
  return (
    <>
      <Layout></Layout>
      <ToastContainer />
    </>
  );
}

export default App;
