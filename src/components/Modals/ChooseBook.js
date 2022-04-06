import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { FiPlusCircle } from "react-icons/fi";
import {
  StyledModal,
  Header,
  Wrapper,
  CreateBooks,
  SelectBook,
  Footer,
  ModalButton,
  LeftCreateDiv,
  LeftTitleDiv,
  LeftCoverDiv,
  SelectCover,
  RightCreateDiv,
  PreviewCover,
  CoverImg,
} from "./Style_ChooseBook";
import bg01 from "images/Cover_img/01.png";
import bg02 from "images/Cover_img/02.png";
import bg03 from "images/Cover_img/03.png";
import bg04 from "images/Cover_img/04.png";
import bg05 from "images/Cover_img/05.png";
import bg06 from "images/Cover_img/06.png";
import bg07 from "images/Cover_img/07.png";
import bg08 from "images/Cover_img/08.png";
import bg09 from "images/Cover_img/09.png";
import bg10 from "images/Cover_img/10.png";
import { API_URL } from "url";

import { CreateBookContext } from "store/CreateBookStore";
import { ModalProvider } from "styled-react-modal";
import AlertModal from "./AlertModal";

export default function ChooseBook() {
  const BG = [bg01, bg02, bg03, bg04, bg05, bg06, bg07, bg08, bg09, bg10];

  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [create, setCreate] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("일기장 이름");
  const [bookCover, setBookCover] = useState(bg01);
  //context API
  const context = useContext(CreateBookContext);
  const { bookInfo, setBookInfo } = context;

  // modal state
  const [isModal, setIsModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [btnContents, setBtnContents] = useState("");
  const [toPage, setToPage] = useState("");

  // 모달 핸들러
  const modalHandler = (isModal, alertMsg, btnContents, toPage) => {
    setIsModal(isModal);
    setAlertMsg(alertMsg);
    setBtnContents(btnContents);
    setToPage(toPage);
  };

  // 서버랑 통신해서 현재 회원의 북 정보를 받아온다
  useEffect(async () => {
    try {
      await axios
        .get(`${API_URL}/myBook`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
            ContentType: "application/json",
          },
          withCredentials: true,
        })
        .then((res) => setBooks(res.data.data));
    } catch {
      console.error("err");
    }
  }, []);

  // 선택 버튼
  const selectBtn = () => {
    setBookInfo(bookInfo);
    bookInfo.id
      ? setModalIsOpen(false)
      : modalHandler(true, "일기장을 선택해주세요", "확인");
  };

  // create에서 북을 선택하고 북 이름을 적으면 일기장이 생성되기 위한 메소드
  const createBook = async () => {
    sessionStorage.getItem("CC_Token")
      ? await axios({
          method: "post",
          url: `${API_URL}/books`,
          data: {
            bookName,
            bookCover,
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
            ContentType: "application/json",
          },
          withCredentials: true,
        }).then(
          modalHandler(true, "일기장이 생성되었습니다", "확인"),
          setCreate(false),
          setTimeout(() => {
            window.location.reload(true);
          }, 100)
        )
      : modalHandler(true, "로그인 후 이용해주세요", "확인");
  };

  // 취소하면 리로드되서 다시 북 선택 모달창으로 이동
  const createCancelBtn = () => {
    setCreate(false);
  };

  // 취소 버튼을 누르면 모달창이 닫아짐 => 비회원한테 글쓰기 화면을 보여주기 위함
  const chooseCancelBtn = () => {
    setModalIsOpen(false);
  };

  return (
    <ModalProvider>
      <AlertModal
        isModal={isModal}
        setIsModal={setIsModal}
        alertMsg={alertMsg}
        btnContents={btnContents}
        toPage={toPage}
      />
      <StyledModal isOpen={modalIsOpen}>
        {!create ? (
          <>
            <Header>
              <h1>일기장 선택하기</h1>
              <h2>일기장을 생성하기를 원하신다면 생성 버튼 클릭해주세요</h2>
            </Header>
            <Wrapper>
              <CreateBooks
                onClick={() => {
                  setCreate(true);
                }}
              >
                <FiPlusCircle size="50%" />
                일기장 생성하기
              </CreateBooks>
              <SelectBook>
                {books.map((book) => {
                  return book.id === bookInfo.id ? (
                    <div
                      key={book.id}
                      className="foo"
                      style={{
                        backgroundImage: `url(${book.bookCover})`,
                        backgroundSize: "100% 100%",
                        border: "4px solid black",
                      }}
                      onClick={() => setBookInfo(book)}
                    >
                      {book.bookName}
                    </div>
                  ) : (
                    <div
                      key={book.id}
                      className="foo"
                      style={{
                        backgroundImage: `url(${book.bookCover})`,
                        backgroundSize: "100% 100%",
                      }}
                      onClick={() => setBookInfo(book)}
                    >
                      {book.bookName}
                    </div>
                  );
                })}
              </SelectBook>
            </Wrapper>
            <Footer>
              <ModalButton onClick={chooseCancelBtn}>취소</ModalButton>
              <ModalButton onClick={selectBtn}>선택</ModalButton>
            </Footer>
          </>
        ) : (
          <>
            <Header>
              <h1>일기장 생성하기</h1>
              <h2>일기장 이름을 작성해주시고 표지를 선택해주세요.</h2>
            </Header>
            <Wrapper>
              <LeftCreateDiv>
                <LeftTitleDiv>
                  일기장 이름:
                  <input
                    type="text"
                    placeholder="일기장 이름"
                    onChange={(e) => {
                      setBookName(e.target.value);
                    }}
                  />
                </LeftTitleDiv>
                <LeftCoverDiv>
                  <h1>커버를 선택해주세요.</h1>
                  <SelectCover>
                    {BG.map((img, index) => (
                      <CoverImg
                        key={index}
                        src={img}
                        onClick={(e) => {
                          setBookCover(e.target.src);
                        }}
                      />
                    ))}
                  </SelectCover>
                </LeftCoverDiv>
              </LeftCreateDiv>
              <RightCreateDiv>
                <PreviewCover
                  style={{
                    backgroundImage: `url(${bookCover})`,
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {bookName}
                </PreviewCover>
              </RightCreateDiv>
            </Wrapper>
            <Footer>
              {/* 여기서 취소를 누르면 전페이지로 이동 */}
              <ModalButton onClick={createCancelBtn}>취소</ModalButton>
              <ModalButton onClick={createBook}>생성</ModalButton>
            </Footer>
          </>
        )}
      </StyledModal>
    </ModalProvider>
  );
}
