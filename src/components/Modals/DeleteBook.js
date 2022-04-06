import axios from "axios";
import React, { useState } from "react";
import checkIcons from "images/check.png";
import { ModalProvider } from "styled-react-modal";
import DeleteModal from "./DeleteModal";
import AlertModal from "./AlertModal";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { API_URL } from "url";

function Deletebook(props) {
  const { modalIsOpen, setIsOpen, books } = props;
  const closeModal = () => {
    setIsOpen(false);
  };
  const [bookId, setBookId] = useState();
  // modal state
  const [isModal, setIsModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [target, setTarget] = useState("");
  const [btnContents, setBtnContents] = useState("");
  // alertModal handler
  const alertHandler = (isModal, alertMsg, btnContents) => {
    setIsModal(isModal);
    setBtnContents(btnContents);
    setAlertMsg(alertMsg);
    setTarget(target);
  };
  // deleteModal handler
  const deleteHandler = (isConfirmModal, target) => {
    setIsConfirmModal(isConfirmModal);
    setTarget(target);
  };

  // 일기장 삭제
  const HandleSubmit = async () => {
    await axios({
      method: "delete",
      url: `${API_URL}/books/${bookId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
        ContentType: "application/json",
      },
      withCredentials: true,
    }).then(() => {
      alertHandler(true, "삭제가 완료되었습니다", "확인");
      setIsOpen(false);
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    });
  };

  return (
    <ModalProvider>
      <AlertModal
        isModal={isModal}
        setIsModal={setIsModal}
        alertMsg={alertMsg}
        btnContents={btnContents}
      />
      <DeleteModal
        isModal={isConfirmModal}
        setIsModal={setIsConfirmModal}
        target={target}
        HandleSubmit={HandleSubmit}
      />
      <StyledModal isOpen={modalIsOpen}>
        <ModalBox>
          <ModalHeader>
            <ModalTitle>삭제할 일기장을 선택하세요</ModalTitle>
          </ModalHeader>
          <ModalMiddle>
            <MiddleTitle>
              <p>일기장을</p>
              <br />
              <p>선택해</p>
              <br />
              <p>주세요</p>
            </MiddleTitle>
            <ModalBook>
              {books.map((book) => {
                return (
                  <DiaryWrapper key={book.id}>
                    {book.id === bookId ? (
                      <Public
                        type="checkbox"
                        onClick={() => {
                          setBookId(book.id);
                        }}
                        style={{
                          border: "3px solid white",
                          backgroundImage: `url(${checkIcons})`,
                          backgroundSize: "100% 100%",
                          width: "13%",
                          height: "6%",
                        }}
                      />
                    ) : (
                      <Public
                        type="checkbox"
                        onClick={() => {
                          setBookId(book.id);
                        }}
                      />
                    )}
                    <DeleteCover
                      key={book.id}
                      style={{
                        backgroundImage: `url(${book.bookCover})`,
                        backgroundSize: "100% 100%",
                      }}
                    >
                      <h2>{book.bookName}</h2>
                    </DeleteCover>
                  </DiaryWrapper>
                );
              })}
            </ModalBook>
          </ModalMiddle>
          <ModalBottom>
            <Button
              style={{ backgroundColor: "white", color: "tomato" }}
              onClick={() => {
                return !bookId
                  ? alertHandler(true, "삭제할 일기를 선택해주세요", "확인")
                  : deleteHandler(true, "삭제");
              }}
            >
              DELETE
            </Button>
            <Button className="close" onClick={closeModal}>
              CLOSE
            </Button>
          </ModalBottom>
        </ModalBox>
      </StyledModal>
    </ModalProvider>
  );
}

export default Deletebook;

const StyledModal = Modal.styled`
    width: 60vw;
    height: 50vh;
    display: flex;
    border-radius: 20px;
    align-items: center;
    flex-direction: column;
    background-color: white;
`;

const ModalBox = styled.div`
  border-radius: 20px;
  width: 98%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
`;

const ModalTitle = styled.div`
  width: 100%;
  margin: 10px 0;
  font-size: 2rem;
  text-align: center;
`;

const ModalMiddle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 74%;
`;

const MiddleTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 16%;
  height: 100%;
  padding-left: 10px;
  font-size: 24px;
  color: #c57951;
`;

const ModalBook = styled.div`
  display: grid;
  grid-template-columns: repeat(100, minmax(25%, 1fr));
  grid-template-rows: repeat(1, minmax(50%, 1fr));
  overflow-x: scroll;
  height: 100%;
  width: 84%;
  &::-webkit-scrollbar {
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e4d8b4;
    border-radius: 20px;
  }
`;

const DiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-family: "Cafe24SsurroundAir";
`;

const Public = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7%;
  height: 5%;
  border: 3px solid #e3dfd4;
  border-radius: 50%;
  cursor: pointer;
`;

const DeleteCover = styled.button`
  width: 90%;
  height: 80%;
  box-shadow: 10px 10px 10px #e4d8b4;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: "Cafe24SsurroundAir";
  font-size: xx-large;
  font-weight: bold;
  color: #fff9e9;
  border-radius: 10px;
  margin: 15px;
  h2 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow: hidden;
    line-height: 2.6rem;
  }
`;

const ModalBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 3.5rem;
  margin-top: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid tomato;
  border-radius: 20px;
  width: 7rem;
  height: 3.5rem;
  font-size: 25px;
  color: white;
  background-color: #d85941;
  margin-left: 10px;
  cursor: pointer;
`;
