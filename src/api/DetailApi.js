import { API_URL } from "url";
import axios from "axios";

export function getDiary(id) {
  return axios.get(`${API_URL}/diaries/${id}`).then((res) => res.data.data[0]);
}
export function getGroupDiaries() {}
export function getSearch(keywords) {}
