import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import checkIcons from "../../images/check.png";
import Text from "../../images/text.png";
import Drawing from "../../images/drawing.png";
import { useSetRecoilState } from "recoil";
import { DiariesAtom } from "atom";

function Diaries({ diary }) {
  // pagenation state
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const setDiaries = useSetRecoilState(DiariesAtom);
  // pagenation useEffect
  useEffect(() => {
    setPosts(diary);
  });

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //  page이동을 위한 변수!
  const navigate = useNavigate();

  // Details 페이지로 이동 하는 메소드
  // onClick하면 해당 일기의 id값을 추출해서 params로 전달하면서 페이지 이동
  const ToDetails = (id) => {
    navigate(`/details/${id}`);
    setDiaries(diary);
  };

  return (
    <Container>
      <DiaryHeader>
        <img src={Text} width="40px" height="40px" alt="textnote" /> : Text
        Diary
        <img src={Drawing} width="40px" height="40px" alt="drawingnote" /> :
        Drawing Diary
      </DiaryHeader>
      {/* 전체 페이지에서 한페이지당 10개만 나오게 설정 */}
      <DiaryBG>
        {currentPosts.map((post) => (
          <DiaryWrapper key={post.id}>
            <Diary onClick={() => ToDetails(post.id)}>
              <Ttitle>{post.title}</Ttitle>
              {post.picUrl === null ? (
                <ChooseTP>
                  <img src={Text} width="30px" height="30px" alt="textnote" />
                </ChooseTP>
              ) : (
                <ChooseTP>
                  <img
                    src={Drawing}
                    width="30px"
                    height="30px"
                    alt="drawingnote"
                  />
                </ChooseTP>
              )}
              {/* 더미 데이터 말고 date 들어올때 날짜추출 메소드를 쓸것인지 slice를 쓸것인지 정해야됨 */}
              {!post.date ? (
                <Date>{post.date}</Date>
              ) : (
                <Date>{post.date.slice(0, 10)}</Date>
              )}
            </Diary>
          </DiaryWrapper>
        ))}
      </DiaryBG>
      <DiaryBottom>
        <DiaryBottomCenter>
          {/* pagination 을 불러오고 위에 상태들을 props로 전달 */}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
            color={["#83B799", "black"]}
          />
        </DiaryBottomCenter>
      </DiaryBottom>
    </Container>
  );
}

export default Diaries;

const Container = styled.div`
  width: 100%;
  height: 120%;
`;

const DiaryHeader = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  height: 70px;
  img {
    margin-left: 40px;
  }
`;

const DiaryBG = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  border-radius: 10px;
  padding-top: 5px;
  background: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.6) 70%,
      rgba(20, 20, 20, 0.6) 70%,
      rgba(20, 20, 20, 0.6)
    ),
    url("https://source.unsplash.com/user/erondu");
  background-size: cover;
`;

const DiaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8%;
  margin-top: 10px;
  font-family: "Cafe24SsurroundAir";
`;

const Public = styled.input`
  display: inline-block;
  width: 3%;
  height: 50%;
  justify-content: center;
  align-items: center;
  border: 1px solid #e3dfd4;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  margin-right: 5px;
  :checked {
    border: 1px solid rgb(0, 192, 168);
    background-image: url(${checkIcons});
    background-size: 110% 110%;
    background-repeat: no-repeat;
  }
`;

const Diary = styled.div`
  display: flex;
  align-items: center;
  float: right;
  width: 96%;
  height: 100%;
  cursor: pointer;
  font-size: xx-large;
  :hover {
    transform: translateY(-0.2rem);
  }
`;

const Ttitle = styled.span`
  width: 40%;
  height: 80%;
  display: flex;
  margin: 0 1rem 0 1rem;
  padding-left: 10px;
  border-radius: 10px;
  background-color: #ccdee2;
  font-size: 17px;
  font-weight: bold;
  align-items: center;
`;

const Date = styled.span`
  position: relative;
  left: 34%;
  width: 17%;
  height: 80%;
  display: flex;
  background-color: #ccdee2;
  border-radius: 10px;
  font-size: 15px;
  justify-content: center;
  align-items: center;
`;

const ChooseTP = styled.span`
  display: flex;
  width: 3%;
  height: 70%;
  color: #c57951;
  border-radius: 50%;
  font-size: xx-large;
  justify-content: center;
  align-items: center;
`;

const DiaryBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
`;

const DiaryPublicButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 70%;
  background-color: #3d8dab;
  border: 2px solid #3d8dab;
  border-radius: 10px;
  margin-left: 20px;
  font-size: x-large;
  color: white;
  font-family: "Cafe24SsurroundAir";
`;

const DiaryBottomCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`;
