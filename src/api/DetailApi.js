import { API_URL } from 'url';
import axios from 'axios';

const Token = sessionStorage.getItem('CC_Token');
// 페이지 조회
export function getDiary(id) {
  if (Token) {
    return axios
      .get(`${API_URL}/diaries/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          ContentType: 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => res.data.data[0]);
  } else {
    return axios.get(`${API_URL}/diaries/${id}`).then((res) => res.data.data[0]);
  }
}
// 페이지 삭제
export function deleteDiary(id) {
  return axios.delete(`${API_URL}/diaries/${id}`, {
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: 'apllication/json',
    },
    withCredentials: true,
  });
}
// 댓글 생성
export function postComments(id, comment) {
  return axios({
    method: 'post',
    url: `${API_URL}/diaries/${id}/comments`,
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: 'application/json',
    },
    data: {
      text: comment,
    },
    withCredentials: true,
  });
}
// 댓글 삭제
export function deleteComments(id) {
  return axios({
    method: 'delete',
    url: `${API_URL}/comments/${id}`,
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
}
// 좋아요 기능
export function isLike(id) {
  return axios({
    method: 'post',
    url: `${API_URL}/diaries/${id}/trending`,
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
}
// 공개/비공개 기능
export function isPublic(id) {
  return axios({
    method: 'post',
    url: `${API_URL}/diaries/${id}/private`,
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
}
