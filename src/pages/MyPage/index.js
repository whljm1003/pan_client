import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ToggleButton from "components/ToggleButton";
import Diaries from "components/Mypage/Diaries";
import Header from "components/Header";
import Books from "components/Mypage/Books";
import mask from "images/mask.png";
import UserInfo from "components/Mypage/Userinfo";
import { UserContext } from "store/UserStore";
import {
  MypageWrapper,
  MypageMain,
  LeftSection,
  ProfileWrapper,
  Profile,
  Username,
  PersonalDiary,
  ExchangeDiary,
  Print,
  DiarySection,
  MypageFooter,
} from "./styles";
import { API_URL } from "url";

export default function Mypage() {
  const [cur, setCur] = useState({
    individual: true,
    group: false,
    edit: false,
  });

  const context = useContext(UserContext);
  const { username, email, profileUrl, accessTokenRequest } = context;
  const [individual, setIndividual] = useState([]);
  const [group, setGroup] = useState([]);
  const [lookBooks, SetLookBooks] = useState(false);
  const [diaries, setDiaries] = useState([]);

  // books=> cover onClick 하면 books안에있는 diary들이 diaries state에 저장이 된다.
  const isCoverClick = (e) => {
    SetLookBooks(true);
    setDiaries(e);
  };

  const changeIndividual = () => {
    setCur({ individual: true, group: false, edit: false });
    SetLookBooks(false);
  };
  const changeGroup = () => {
    setCur({ individual: false, group: true, edit: false });
    SetLookBooks(false);
  };
  const changeEdit = () => {
    setCur({ individual: false, group: false, edit: true });
    SetLookBooks(false);
  };

  // refreshTokenRequest()
  useEffect(accessTokenRequest, [accessTokenRequest]);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`${API_URL}/books`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
            ContentType: "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          const individualBooks = res.data.data.filter((e) => !e.groupId);
          const groupBooks = res.data.data.filter((e) => e.groupId);
          setIndividual(individualBooks);
          setGroup(groupBooks);
        });
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header main="/" login="/login"></Header>
      <MypageWrapper>
        <MypageMain>
          <LeftSection>
            <ProfileWrapper>
              {!profileUrl ? (
                <Profile src={mask} alt="이미지입니다" />
              ) : (
                <Profile src={profileUrl} alt="이미지입니다" />
              )}
              <Username>{username}</Username>
            </ProfileWrapper>
            <PersonalDiary cur={cur.individual} onClick={changeIndividual}>
              개인 일기
            </PersonalDiary>
            <ExchangeDiary cur={cur.group} onClick={changeGroup}>
              교환 일기
            </ExchangeDiary>
            <Print cur={cur.edit} onClick={changeEdit}>
              회원 정보
            </Print>
          </LeftSection>
          <DiarySection>
            {/* 개인일기, 교환일기 선택해서 나오게 해주는 것! 내용은 수정이 필요함 */}
            {cur.individual ? (
              lookBooks === false ? (
                <Books isCoverClick={isCoverClick} books={individual}></Books>
              ) : (
                <Diaries diary={diaries} />
              )
            ) : cur.group ? (
              lookBooks === false ? (
                <Books isCoverClick={isCoverClick} books={group}></Books>
              ) : (
                <Diaries diary={diaries} />
              )
            ) : (
              <UserInfo
                username={username}
                email={email}
                profileUrl={profileUrl}
              />
            )}
          </DiarySection>
        </MypageMain>
      </MypageWrapper>
      <MypageFooter />
      <ToggleButton />
    </>
  );
}
