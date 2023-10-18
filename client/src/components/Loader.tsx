import React from "react";
import { FadeLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center absolute z-10 top-0 left-0 bg-black/10">
      <FadeLoader color="green" />
    </div>
  );
};

export default Loader;
