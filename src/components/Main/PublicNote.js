import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { DiariesAtom } from "atom";

function PublicNote({ current, totalDiaries }) {
  const navicate = useNavigate();
  // recoil
  const setDiaries = useSetRecoilState(DiariesAtom);
  const ToDetails = (id) => {
    navicate(`/details/${id}`);
    setDiaries(totalDiaries);
  };
  return (
    <ListSection>
      {/*  main페이지에서 props로 current를 받아서 이것을 반복문으로 돌려줌
            current는 공개된 전체 데이터 
            대신, 개인일기는 개인 일기 / 교환일기면 교환 일기 데이터를 받게 해줌  */}
      {current?.map((post) => {
        return (
          <ListItemBox key={post.id} onClick={() => ToDetails(post.id)}>
            <ItemImg src={post.bookCover} />
            <Link to="/">
              <ItemContent>
                <h3>{post.title}</h3>
                <h4>{post.username}</h4>
                <h4>{post.date}</h4>
              </ItemContent>
            </Link>
          </ListItemBox>
        );
      })}
    </ListSection>
  );
}

export default PublicNote;

const ListSection = styled.section`
  display: grid;
  max-width: 1600px;
  height: 460px;
  grid-gap: 10px;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  margin-top: 10px;
  padding-top: 24px;
  padding-left: 1rem;
  width: 100%;
  overflow: hidden;
`;

const ListItemBox = styled.div`
  width: 80%;
  height: 180px;
  box-shadow: #ced4da 0 1px 4px;
  background-color: none;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;
  position: relative;
  ::after {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 20px;
    background: rgba(50, 50, 50, 0.2);
  }
  &:hover {
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    filter: brightness(1.2);
    cursor: pointer;
  }
`;

const ItemImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0.5;
`;

const ItemOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #868e96;
  opacity: 0.3;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0;
  }
`;

const ItemContent = styled.article`
  width: 100%;
  position: absolute;
  left: 15px;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  font-family: "Cafe24SsurroundAir";
  color: #343a40;
  padding: 10px;
  filter: brightness(1);
  opacity: 1;
  h3 {
    font-size: x-large;
    font-weight: 800;
    margin: 0 0 10px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow: hidden;
    text-shadow: 1.5px 1.5px 0 #e3dfd4;
  }
  h4 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 10px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow: hidden;
    text-shadow: 1px 1px 0 #e3dfd4;
  }
`;
