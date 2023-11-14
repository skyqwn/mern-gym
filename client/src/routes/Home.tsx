import { instance } from "../api/apiconfig";
import userErrorHandler from "../hooks/userErrorHandler";

const Home = () => {
  const errorHandler = userErrorHandler();
  return <div>Home</div>;
};

export default Home;
