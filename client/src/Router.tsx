import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import ProtectRoute from "./components/ProtectRoute";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        }
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default Router;
