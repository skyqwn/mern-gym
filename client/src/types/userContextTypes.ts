import { SetStateAction } from "react";
export interface SigninProps {
  accessToken: string;
  email: string;
  nickname: string;
  id: string;
  avatar: string;
}
export interface UserContextTypes {
  auth: boolean;
  onSignin: (props: SigninProps) => void;
  onSignout: () => void;
  loading: boolean;
  error: {
    message: string;
    redirectUrl: string;
  };
  setError: SetStateAction<boolean>;
}
