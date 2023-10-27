import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-rose-300 h-14">
      <Container>
        <div className="h-full flex items-center justify-between mx-auto">
          <Link to={"/"}>
            <div>Home</div>
          </Link>
          <div className=" flex gap-5 items-center">
            <Link to={"/community"}>
              <div>커뮤니티</div>
            </Link>
            <Link to={"/gallery"}>
              <div>갤러리 </div>
            </Link>
            <div>프로등록 </div>
            <div className="w-8 h-8 rounded-full bg-red-500"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
