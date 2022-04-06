import { API_URL } from "url";
import axios from "axios";

export function getDiaries() {
  return axios.get(`${API_URL}/diaries`).then((res) => res.data.data);
}
export function getGroupDiaries() {
  return axios.get(`${API_URL}/group-diaries`).then((res) => res.data.data);
}
export function getSearch(keywords) {
  return axios({
    method: "get",
    url: `${API_URL}/search?q=${keywords}`,
    withCredentials: true,
  }).then((res) => res.data.data);
}
