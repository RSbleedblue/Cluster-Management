import Image from "next/image";
import DashBoard from "./components/dashboard";

import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  return (
    <>

      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={true} />
      <DashBoard />
    </>
  );
}
