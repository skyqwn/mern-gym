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
  const posts: any = useAppSelector((state) => state.postSlice.posts);
  console.log(posts);
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
      {posts.map((post: any) => (
        <div key={post.id}>
          <Link to={`community/${post.id}`}>
            <h1 className="text-2xl">{post.title}</h1>
          </Link>
          <span>{post.desc}</span>
        </div>
      ))}
    </div>
  );
};

export default Home;
