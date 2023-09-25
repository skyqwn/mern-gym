export interface UserContextTypes {
  auth: UserStateTypes;
  onSignin: (
    accessToken: string,
    userEmail: string,
    userNickname: string
  ) => void;
}

export interface UserStateTypes {
  isLogin: boolean;
  email: string;
  nickname: string;
}
