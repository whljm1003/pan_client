import { API_URL } from "url";
import axios from "axios";

export function getDiariesApi() {
  return axios.get(`${API_URL}/diaries`).then((res) => res.data.data);
}
export function getGroupDiariesApi() {
  return axios.get(`${API_URL}/group-diaries`).then((res) => res.data.data);
}
export function getSearchApi(keywords) {
  return axios({
    method: "get",
    url: `${API_URL}/search?q=${keywords}`,
    withCredentials: true,
  }).then((res) => res.data.data);
}
export function getBookApi() {
  return axios
    .get(`${API_URL}/myBook`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
        ContentType: "application/json",
      },
      withCredentials: true,
    })
    .then((res) => res.data.data);
}
export function createBooksApi(bookName, bookCover) {
  return axios({
    method: "post",
    url: `${API_URL}/books`,
    data: {
      bookName,
      bookCover,
    },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
      ContentType: "application/json",
    },
    withCredentials: true,
  });
}
