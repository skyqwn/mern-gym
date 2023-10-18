export const getKakaoUrl = (from: string) => {
  const rootUrl = `https://kauth.kakao.com/oauth/authorize`;

  const options = {
    redirect_uri: process.env.REACT_APP_KAKAO_OAUTH_REDIRECT as string,
    client_id: process.env.REACT_APP_KAKAO_OAUTH_KEY as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    state: from,
  };
  console.log(options);

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;

  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_OAUTH_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_OAUTH_REDIRECT}&response_type=code`;

  // return kakaoURL;
};
