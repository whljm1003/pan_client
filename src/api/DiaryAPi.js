import { API_URL } from 'url';
import axios from 'axios';
// 공개된 개인 일기장 정보
export function getDiaries() {
  return axios.get(`${API_URL}/diaries`).then((res) => res.data.data);
}
// 공개된 그룹 일기장 정보
export function getGroupDiaries() {
  return axios.get(`${API_URL}/group-diaries`).then((res) => res.data.data);
}
// 공개된 일기장 검색
export function getSearch(keywords) {
  return axios({
    method: 'get',
    url: `${API_URL}/search?q=${keywords}`,
    withCredentials: true,
  }).then((res) => res.data.data);
}
// 일기장 커버 조회
export function getBook() {
  return axios
    .get(`${API_URL}/myBook`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
        ContentType: 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => res.data.data);
}
// 내 일기장 조회
export function getMyBook() {
  return axios
    .get(`${API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
        ContentType: 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => res.data.data);
}
// 개인 일기장 생성
export function createBook(bookName, bookCover) {
  return axios({
    method: 'post',
    url: `${API_URL}/books`,
    data: {
      bookName,
      bookCover,
    },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
}
// 그룹 일기장 생성
export function getGroupBook() {
  return axios
    .get(`${API_URL}/myGroupBook`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
        ContentType: 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => res.data.data);
}
// 그룹 일기장 생성
export function createGroupBook(bookName, bookCover, groupId) {
  return axios({
    method: 'post',
    url: `${API_URL}/books`,
    data: {
      bookName,
      bookCover,
      groupId,
    },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
}
// 그룹 유저 초대
export function inviteGroup(inviteUser) {
  return axios({
    method: 'post',
    url: `${API_URL}/user-group`,
    data: {
      email: inviteUser,
    },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => res.data.groupInfo.id);
}
// 일기장 삭제
export function deleteDiary(bookId) {
  return axios({
    method: 'delete',
    url: `${API_URL}/books/${bookId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  });
}
