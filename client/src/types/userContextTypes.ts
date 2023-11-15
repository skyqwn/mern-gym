import { SetStateAction } from "react";

export type AuthType = {
  loggedIn: boolean;
  email: string;
  nickname: string;
};

export interface UserContextTypes {
  auth: AuthType | null;
  onSignin: (
    accessToken: string,
    userEmail: string,
    userNickname: string
  ) => void;
  loading: boolean;
  error: {
    message: string;
    redirectUrl: string;
  };
  setError: SetStateAction<boolean>;
}
