import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default Router;
