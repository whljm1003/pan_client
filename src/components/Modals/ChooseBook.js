import React, { useState } from "react";
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
import bg09 from "images/Cover_img/09.png";
import bg10 from "images/Cover_img/10.png";
import bg13 from "images/Cover_img/13.png";
import bg14 from "images/Cover_img/14.png";
import bg16 from "images/Cover_img/16.png";
import bg33 from "images/Cover_img/33.png";
import bg36 from "images/Cover_img/36.png";
import bg38 from "images/Cover_img/38.jpeg";
import bg39 from "images/Cover_img/39.png";
import bg40 from "images/Cover_img/40.png";
import bg41 from "images/Cover_img/41.jpeg";
import bg42 from "images/Cover_img/42.jpeg";
import bg43 from "images/Cover_img/43.jpeg";
import bg44 from "images/Cover_img/44.jpeg";
import bg45 from "images/Cover_img/45.jpeg";
import bg46 from "images/Cover_img/46.png";
import bg47 from "images/Cover_img/47.jpeg";
import bg48 from "images/Cover_img/48.jpeg";
import { getBookApi, createBooksApi } from "api/DiaryAPi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { booksInfo } from "atom";
import { useRecoilState } from "recoil";
import { ModalProvider } from "styled-react-modal";
import AlertModal from "./AlertModal";
// import Loader from "components/Loader";
const BG = [
  bg09,
  bg10,
  bg13,
  bg14,
  bg16,
  bg33,
  bg36,
  bg38,
  bg39,
  bg40,
  bg41,
  bg42,
  bg43,
  bg44,
  bg45,
  bg46,
  bg47,
  bg48,
];
export default function ChooseBook() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [create, setCreate] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookCover, setBookCover] = useState(bg09);
  // react-query
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: dataLoading,
    error,
  } = useQuery("bookData", getBookApi);
  const {
    mutate,
    isLoading: mutateLoading,
    isError,
  } = useMutation(() => createBooksApi(bookName, bookCover), {
    onSuccess: () => {
      queryClient.invalidateQueries("bookData");
    },
  });
  // recoil
  const [bookInfo, setBookInfo] = useRecoilState(booksInfo);
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
  // 선택 버튼
  const selectBtn = () => {
    setBookInfo(bookInfo);
    bookInfo.id
      ? setModalIsOpen(false)
      : modalHandler(true, "일기장을 선택해주세요", "확인");
  };
  // create에서 북을 선택하고 북 이름을 적으면 일기장이 생성되기 위한 메소드
  const createBookHandler = () => {
    if (!bookName || !bookCover) {
      return modalHandler(true, "이름과 커버를 선택해주세요", "확인");
    }
    if (sessionStorage.getItem("CC_Token")) {
      mutate();
      setCreate(false);
      modalHandler(true, "일기장이 생성되었습니다", "확인");
    } else {
      modalHandler(true, "로그인 후 이용해주세요", "확인");
    }
  };
  // 취소하면 리로드되서 다시 북 선택 모달창으로 이동
  const createCancelBtn = () => {
    setCreate(false);
  };
  // 취소 버튼을 누르면 모달창이 닫아짐 => 비회원한테 글쓰기 화면을 보여주기 위함
  const chooseCancelBtn = () => {
    setModalIsOpen(false);
  };
  if (dataLoading || mutateLoading) {
    // return <Loader />;
  }
  if (error || isError) {
    console.log("에러");
  }
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
                {data?.map((book) => {
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
              <ModalButton onClick={createBookHandler}>생성</ModalButton>
            </Footer>
          </>
        )}
      </StyledModal>
    </ModalProvider>
  );
}
