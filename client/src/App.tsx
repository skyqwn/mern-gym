import React, { useContext } from "react";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserContext } from "./context/UserContext";
import { UserContextTypes } from "./types/userContextTypes";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";

const RefreshLoader = ({ children }: React.PropsWithChildren) => {
  const { loading } = useContext(UserContext) as UserContextTypes;

  if (loading) return <Loader />;

  return <>{children}</>;
};

const App = () => {
  return (
    <RefreshLoader>
      <div className="flex flex-col h-screen">
        <div className="flex-1">
          <Header />
          <Toaster position="top-center" />
          <Router />
        </div>
        <Footer />
      </div>
    </RefreshLoader>
  );
};

export default App;
