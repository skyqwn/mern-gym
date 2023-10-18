import React, { useContext } from "react";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserContext } from "./context/UserContext";
import { UserContextTypes } from "./types/userContextTypes";
import Loader from "./components/Loader";
import PostCreateModal from "./components/modals/PostCreateModal";

const RefreshLoader = ({ children }: React.PropsWithChildren) => {
  const { loading } = useContext(UserContext) as UserContextTypes;

  if (loading) return <Loader />;

  return <>{children}</>;
};

const App = () => {
  return (
    <RefreshLoader>
      <Header />
      <ToastContainer
        autoClose={3000}
        position="top-center"
        theme="light"
        hideProgressBar={true}
      />
      <Router />
      <Footer />
    </RefreshLoader>
  );
};

export default App;
