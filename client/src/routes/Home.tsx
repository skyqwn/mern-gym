import React from "react";
import { instance } from "../api/apiconfig";

const Home = () => {
  return (
    <div>
      Home
      <div
        onClick={() => {
          instance
            .post("/api/test")
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        }}
      >
        test
      </div>
    </div>
  );
};

export default Home;
