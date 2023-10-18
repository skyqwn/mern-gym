import axios from "axios";
import qs from "qs";

interface GoogleOauthToken {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

const getGoogleToken = async ({
  code,
}: {
  code: string;
}): Promise<GoogleOauthToken> => {
  const rootURl = "https://oauth2.googleapis.com/token";

  const options = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };
  try {
    const { data } = await axios.post<GoogleOauthToken>(
      rootURl,
      qs.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (err: any) {
    console.log("Failed to fetch Google Oauth Tokens");
    throw new Error(err);
  }
};

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const { data } = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
}

interface KakaoOauthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

const getKakaoToken = async ({
  code,
  grantType,
}: {
  code: string;
  grantType: string;
}): Promise<KakaoOauthToken> => {
  try {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_OAUTH_KEY,
      redirect_uri: process.env.KAKAO_OAUTH_REDIRECT,
      code: code,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
    });
    const { data } = await axios.post<KakaoOauthToken>(
      "https://kauth.kakao.com/oauth/token",
      payload
    );

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

interface KakaoUserResult {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
    has_email?: true;
    email_needs_agreement?: boolean;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    email?: string;
  };
}

async function getKakaoUser({
  access_token,
}: {
  access_token: string;
}): Promise<KakaoUserResult> {
  try {
    const { data } = await axios.post<KakaoUserResult>(
      `https://kapi.kakao.com/v2/user/me`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    console.log(data);
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

export default { getGoogleToken, getGoogleUser, getKakaoToken, getKakaoUser };
