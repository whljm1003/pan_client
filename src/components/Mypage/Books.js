import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import Deletebook from "components/Modals/DeleteBook";
import styled from "styled-components";

function Books({ isCoverClick, books }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <ModalProvider>
      <CoverMain>
        <CoverWrapper>
          {books?.map((book) => {
            return (
              <Cover
                key={book.id}
                style={{
                  backgroundImage: `url(${book.bookCover})`,
                  backgroundSize: "100% 100%",
                }}
                onClick={() => isCoverClick(book.Diaries)}
              >
                <h2>{book.bookName}</h2>
              </Cover>
            );
          })}
        </CoverWrapper>
        <CoverHeader>
          <CoverDelete type="button" onClick={openModal}>
            일기장 삭제
          </CoverDelete>
        </CoverHeader>
        <Deletebook
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          books={books}
        />
      </CoverMain>
    </ModalProvider>
  );
}

export default Books;

const CoverMain = styled.div`
  align-items: center;
  height: 100%;
  width: 100%;
`;

const CoverWrapper = styled.div`
  display: grid;
  margin: 40px 20px;
  grid-template-columns: repeat(4, minmax(25%, 1fr));
  grid-template-rows: repeat(5, minmax(50%, 1fr));
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: #3d8dab;
    border-radius: 20px;
  }
`;

const CoverHeader = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
`;

const CoverDelete = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid tomato;
  border-radius: 20px;
  width: 130px;
  height: 50px;
  font-size: 23px;
  color: white;
  background-color: #d85941;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const Cover = styled.button`
  box-shadow: 10px 10px 10px #e4d8b4;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: "Cafe24SsurroundAir";
  font-size: x-large;
  font-weight: bold;
  border-radius: 20px;
  margin: 15px;
  z-index: 1;
  position: relative;
  &:after {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 20px;
    background: rgba(50, 50, 50, 0.4);
  }
  &:hover {
    transform: translateY(-1rem);
    opacity: 1;
  }
  h2 {
    color: #fff9e9;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow: hidden;
    line-height: 2.6rem;
    opacity: 1;
  }
`;
