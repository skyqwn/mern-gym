import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const signAccessToken = (id: string) => {
  try {
    return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "20m",
    });
  } catch (error) {
    console.log(error);
  }
};

const signRefreshToken = () => {
  try {
    return jwt.sign({}, REFRESH_TOKEN_SECRET, {
      expiresIn: "20m",
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      id: string;
      lat: number;
      lng: number;
    };
    return decoded.id;
  } catch (error) {
    return false;
  }
};
const verifyRefreshToken = (token: string) => {
  try {
    jwt.verify(token, REFRESH_TOKEN_SECRET) as {
      lat: number;
      lng: number;
    };
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
