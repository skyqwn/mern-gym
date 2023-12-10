import axios from "axios";
import CONSTNAT from "../constant";

// export const instance = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config, //기존요청했던 객체
      response,
    } = error;
    if (config.sent) {
      return Promise.reject(error); // 리프레쉬 요청 에러시 기존에러 리턴
    }
    if (response.data.message === CONSTNAT.ERROR_MESSAGE.REFRESH_TOKEN) {
      return Promise.reject(error);
    }

    if (response.status) {
      if (response.status === 401 || response.status === 403) {
        //인증관련된 에러 분기처리
        config.sent = true;
        try {
          const res = await axios.post("/api/user/refresh"); //리프레쉬 토큰 요청

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`; //axios axios header값 변경

          const originalRequest = config; // config원래의 값을 변경하지않기 위한 객체 복사
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`; //기존요청했던 header accessToken값 변경
          // config.headers.Authorization = `Bearer ${res.data.accessToken}`;  //기존요청했던 header accessToken값 변경
          return axios.request(originalRequest); //
          // return axios.request(config); //
        } catch (error) {
          return Promise.reject(error); // 리프레쉬 요청 에러시 기존에러 리턴
        }
      }
    }
    return Promise.reject(error); // 인증관련 아닌건 그대로 에러 리턴
  }
);
