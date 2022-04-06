import React, { createContext, useState } from "react";
import axios from "axios";
import { API_URL } from "../url";

export const UserContext = createContext();

export default function UserStore(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [userId, setUserId] = useState("");

  const accessTokenRequest = () => {
    axios
      .get(`${API_URL}/accessToken`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
          ContentType: "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const { username, email, id, profileUrl } = res.data.data.userInfo;
        setUsername(username);
        setEmail(email);
        setProfileUrl(profileUrl);
        setUserId(id);
      })
      .catch((error) => {
        alert("다시 로그인 해주세요.");
      });
  };

  // const refreshTokenRequest = () => {
  //   axios
  //     .get(`${API_URL}/refreshToken`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       if (res.data.message !== "ok") {
  //         alert(
  //           "refresh token이 만료되어 불러올 수 없습니다. 다시 로그인 해주시기 바랍니다."
  //         );
  //       }

  //       const { username, email } = res.data.data.userInfo;
  //       setUsername(username);
  //       setEmail(email);
  //       let tokenData = res.data.data.accessToken;
  //       sessionStorage.setItem("CC_Token", tokenData);
  //     });
  // };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        email,
        userId,
        setEmail,
        profileUrl,
        setProfileUrl,
        accessTokenRequest,
        // refreshTokenRequest,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
