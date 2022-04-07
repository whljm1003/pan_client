import { API_URL } from "url";
import axios from "axios";

export function postLogin(email, password) {
  return axios({
    method: "post",
    url: `${API_URL}/login`,
    data: {
      email,
      password,
    },
    withCredentials: true,
  }).then((res) => {
    if (res.data.data.accessToken) {
      let tokenData = res.data.data.accessToken;
      sessionStorage.setItem("CC_Token", tokenData);
    }
  });
}

export function getUserInfo() {
  return axios
    .get(`${API_URL}/accessToken`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
        ContentType: "application/json",
      },
      withCredentials: true,
    })
    .then((res) => res.data.data.userInfo);
}
