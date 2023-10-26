import { instance } from "../api/apiconfig";
import userErrorHandler from "../hooks/userErrorHandler";

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
