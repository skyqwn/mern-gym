import React from "react";
import { instance } from "../api/apiconfig";
import userErrorHandler from "../hooks/userErrorHandler";
import { useAppSelector } from "../store";
import { Link } from "react-router-dom";

// interface postsType {
//   posts: {
//     title: string;
//     desc: string;
//     category: string;
//     id: string;
//   }[];
// }

const Home = () => {
  const errorHandler = userErrorHandler();
  return (
    <div>
      Home
      <div
        onClick={() => {
          instance
            .post("/api/test")
            .then((res) => console.log(res))
            .catch((error) => errorHandler(error));
        }}
      >
        test
      </div>
    </div>
  );
};

export default Home;
