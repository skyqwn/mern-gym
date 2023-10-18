import React from "react";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Header />
      <ToastContainer
        autoClose={3000}
        position="top-center"
        theme="light"
        hideProgressBar={true}
      />
      <Router />
      <Footer />
    </>
  );
};

export default App;
