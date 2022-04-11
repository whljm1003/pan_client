import React, { useState, useEffect } from 'react';
import ToggleButton from 'components/ToggleButton';
import Diaries from 'components/Mypage/Diaries';
import Header from 'components/Header';
import Books from 'components/Mypage/Books';
import mask from 'images/mask.png';
import UserInfo from 'components/Mypage/Userinfo';
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
} from './styles';
import { useQuery } from 'react-query';
import { getUserInfoApi } from 'api/userApi';
import Loader from 'components/Loader';
import { getMyBookApi } from 'api/DiaryAPi';

export default function Mypage() {
  const [cur, setCur] = useState({
    individual: true,
    group: false,
    edit: false,
  });
  const [individual, setIndividual] = useState([]);
  const [group, setGroup] = useState([]);
  const [lookBooks, SetLookBooks] = useState(false);
  const [diaries, setDiaries] = useState([]);
  //react-query
  const { data: userInfoData, isLoading: userInfoLoading, isError: userInfoErr } = useQuery('userInfo', getUserInfoApi);
  const { data: bookInfoData, isLoading: bookInfoLoading, isError: bookInfoErr } = useQuery('bookInfo', getMyBookApi);
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
  useEffect(() => {
    const individualBooks = bookInfoData?.filter((e) => !e.groupId);
    const groupBooks = bookInfoData?.filter((e) => e.groupId);
    setIndividual(individualBooks);
    setGroup(groupBooks);
  }, [bookInfoData]);

  if (userInfoLoading || bookInfoLoading) {
    <Loader />;
  }
  if (userInfoErr || bookInfoErr) {
    console.log('에러발생');
  }
  return (
    <>
      <Header main="/" login="/login"></Header>
      <MypageWrapper>
        <MypageMain>
          <LeftSection>
            <ProfileWrapper>
              {!userInfoData?.profileUrl ? (
                <Profile src={mask} alt="이미지입니다" />
              ) : (
                <Profile src={userInfoData.profileUrl} alt="이미지입니다" />
              )}
              <Username>{userInfoData?.username}</Username>
              <Username></Username>
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
                <Books isCoverClick={isCoverClick} books={individual} />
              ) : (
                <Diaries diary={diaries} />
              )
            ) : cur.group ? (
              lookBooks === false ? (
                <Books isCoverClick={isCoverClick} books={group} />
              ) : (
                <Diaries diary={diaries} />
              )
            ) : (
              <UserInfo
                username={userInfoData?.username}
                email={userInfoData?.email}
                profileUrl={userInfoData?.profileUrl}
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
