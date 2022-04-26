import { API_URL } from 'url';
import axios from 'axios';

const Token = sessionStorage.getItem('CC_Token');
// 로그인
export function postLogin(email, password) {
  return axios({
    method: 'post',
    url: `${API_URL}/login`,
    data: {
      email,
      password,
    },
    withCredentials: true,
  }).then((res) => {
    if (res.data.data.accessToken) {
      let tokenData = res.data.data.accessToken;
      sessionStorage.setItem('CC_Token', tokenData);
    }
  });
}
// 유저 정보
export function getUserInfo() {
  if (Token) {
    return axios
      .get(`${API_URL}/accessToken`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          ContentType: 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => res.data.data.userInfo);
  }
}
// 유저 프로필 변경
export function putUserInfo(newName, newPassword, newProfile) {
  return axios({
    method: 'put',
    url: `${API_URL}/profile`,
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: 'application/json',
    },
    data: {
      username: newName,
      password: newPassword,
      profileUrl: newProfile,
    },
    withCredentials: true,
  }).then(sessionStorage.removeItem('CC_Token'));
}
// 유저 프로필 이미지 변경
export function userImg(formData) {
  return axios({
    method: 'put',
    url: `${API_URL}/profile/upload`,
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: 'multipart/form-data',
    },
    data: formData,
    withCredentials: true,
  }).then((res) => res.data.profileUrl);
}
// 회원탈퇴
export function accountWithdrawal() {
  return axios.delete(`${API_URL}/withdrawal`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
}
