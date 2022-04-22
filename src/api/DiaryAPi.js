import { API_URL } from 'url';
import axios from 'axios';

export function getDiaries() {
  return axios.get(`${API_URL}/diaries`).then((res) => res.data.data);
}
export function getGroupDiaries() {
  return axios.get(`${API_URL}/group-diaries`).then((res) => res.data.data);
}
export function getSearch(keywords) {
  return axios({
    method: 'get',
    url: `${API_URL}/search?q=${keywords}`,
    withCredentials: true,
  }).then((res) => res.data.data);
}
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
