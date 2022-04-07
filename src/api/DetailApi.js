import { API_URL } from "url";
import axios from "axios";

const Token = sessionStorage.getItem("CC_Token");

export function getDiary(id) {
  if (Token) {
    return axios
      .get(`${API_URL}/diaries/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          ContentType: "application/json",
        },
        withCredentials: true,
      })
      .then((res) => res.data.data[0]);
  } else {
    return axios
      .get(`${API_URL}/diaries/${id}`)
      .then((res) => res.data.data[0]);
  }
}
export function deleteDiary(id) {
  return axios.delete(`${API_URL}/diaries/${id}`, {
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: "apllication/json",
    },
    withCredentials: true,
  });
}

export function postComments(id, comment) {
  return axios({
    method: "post",
    url: `${API_URL}/diaries/${id}/comments`,
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: "application/json",
    },
    data: {
      text: comment,
    },
    withCredentials: true,
  });
}

export function deleteComments(id) {
  return axios({
    method: "delete",
    url: `${API_URL}/comments/${id}`,
    headers: {
      Authorization: `Bearer ${Token}`,
      ContentType: "application/json",
    },
    withCredentials: true,
  });
}

// export function getGroupDiaries() {}
// export function getSearch(keywords) {}
