import axios from 'axios';
import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
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
} from './Style_ChooseBook';
import bg09 from 'images/Cover_img/09.png';
import bg10 from 'images/Cover_img/10.png';
import bg13 from 'images/Cover_img/13.png';
import bg14 from 'images/Cover_img/14.png';
import bg16 from 'images/Cover_img/16.png';
import bg33 from 'images/Cover_img/33.png';
import bg36 from 'images/Cover_img/36.png';
import bg38 from 'images/Cover_img/38.jpeg';
import bg39 from 'images/Cover_img/39.png';
import bg40 from 'images/Cover_img/40.png';
import bg41 from 'images/Cover_img/41.jpeg';
import bg42 from 'images/Cover_img/42.jpeg';
import bg43 from 'images/Cover_img/43.jpeg';
import bg44 from 'images/Cover_img/44.jpeg';
import bg45 from 'images/Cover_img/45.jpeg';
import bg46 from 'images/Cover_img/46.png';
import bg47 from 'images/Cover_img/47.jpeg';
import bg48 from 'images/Cover_img/48.jpeg';
import { ModalProvider } from 'styled-react-modal';
import AlertModal from './AlertModal';
import Modal from 'styled-react-modal';
import styled from 'styled-components';
import { API_URL } from 'url';
import { useRecoilState } from 'recoil';
import { booksInfo } from 'atom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createGroupBook, getGroupBook } from 'api/DiaryAPi';

export default function ChooseBook() {
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

  // modal
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [inviteModalIsOpen, setInviteModalIsOpen] = useState(true);
  // create 변수
  const [create, setCreate] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookCover, setBookCover] = useState(bg09);
  const [groupId, setGroupId] = useState('');
  // 초대 유저
  const [inviteUser, setInviteUser] = useState([]);
  const [inviteUser1, setInviteUser1] = useState('');
  const [inviteUser2, setInviteUser2] = useState('');
  // recoil
  const [bookInfo, setBookInfo] = useRecoilState(booksInfo);
  // react-query
  const queryClient = useQueryClient();
  const { data } = useQuery('getGroupBook', getGroupBook);
  const { mutate } = useMutation(() => createGroupBook(bookName, bookCover, groupId), {
    onSuccess: () => {
      queryClient.invalidateQueries('getGroupBook');
    },
  });
  // modal state
  const [isModal, setIsModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [btnContents, setBtnContents] = useState('');
  const [toPage, setToPage] = useState('');
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
    bookInfo.id ? setModalIsOpen(false) : modalHandler(true, '일기장을 선택해주세요', '확인');
  };
  // create에서 북을 선택하고 북 이름을 적으면 일기장이 생성되기 위한 메소드
  const createBook = () => {
    if (!groupId) {
      return modalHandler(true, '그룹을 먼저 생성해주세요', '확인');
    }
    if (!bookName || !bookCover) {
      return modalHandler(true, '이름과 커버를 선택해주세요', '확인');
    }
    if (sessionStorage.getItem('CC_Token')) {
      mutate();
      setCreate(false);
      modalHandler(true, '일기장이 생성되었습니다', '확인');
    } else {
      modalHandler(true, '로그인 후 이용해주세요', '확인');
    }
  };

  // 초대할 그룹 모달 핸들러
  const inviteModalBtn = async () => {
    await axios({
      method: 'post',
      url: `${API_URL}/user-group`,
      data: {
        email: inviteUser,
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('CC_Token')}`,
        ContentType: 'application/json',
      },
      withCredentials: true,
    })
      .then((res) => setGroupId(res.data.groupInfo.id))
      .then(() => {
        modalHandler(true, '그룹이 생성되었습니다.', '확인');
        setInviteModalIsOpen(false);
      })
      .catch(() => modalHandler(true, '이메일을 확인해주세요', '확인'));
  };
  // 초대 그룹 모달 창 취소하기
  const inviteCancelBtn = () => {
    setInviteModalIsOpen(false);
  };
  // 1번째 유저를 확인합니다.
  const CheckUser1 = () => {
    setInviteUser([inviteUser1]);
    modalHandler(true, `이메일이 등록 되었습니다`, '확인');
  };
  // 2번째 유저를 확인합니다.
  const CheckUser2 = () => {
    setInviteUser([inviteUser1, inviteUser2]);
    modalHandler(true, `이메일이 등록 되었습니다`, '확인');
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
                {data?.map((book) => {
                  return book.id === bookInfo.id ? (
                    <div
                      key={book.id}
                      className="foo"
                      style={{
                        backgroundImage: `url(${book.bookCover})`,
                        backgroundSize: '100% 100%',
                        border: '4px solid black',
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
                        backgroundSize: '100% 100%',
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

            {/* 그룹 일기장 생성 */}
            <Wrapper>
              {/* 그룹 초대 모달창 */}
              <InviteModal isOpen={inviteModalIsOpen}>
                <GroupWrapper>
                  <GroupHeader>초대할 유저의 이메일을 작성해주세요</GroupHeader>
                  <SearchUser>
                    <InviteUser
                      type="text"
                      placeholder="초대할 유저의 이메일을 작성해주세요."
                      onChange={(e) => {
                        setInviteUser1(e.target.value);
                      }}
                    />
                    <CheckBtn onClick={CheckUser1}>Check</CheckBtn>
                  </SearchUser>
                  <SearchUser>
                    <InviteUser
                      type="text"
                      placeholder="초대할 유저의 이메일을 작성해주세요."
                      onChange={(e) => {
                        setInviteUser2(e.target.value);
                      }}
                    />
                    <CheckBtn onClick={CheckUser2}>Check</CheckBtn>
                  </SearchUser>
                  <InviteBottom>
                    <CancelBtn onClick={inviteCancelBtn}>취소</CancelBtn>
                    <InviteBtn onClick={inviteModalBtn}>초대</InviteBtn>
                  </InviteBottom>
                </GroupWrapper>
              </InviteModal>
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
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
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

export const InviteModal = Modal.styled`
    width: 40%;
    height: 40%;
    display: flex;
    border-radius: 20px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: white;
`;
export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Cafe24SsurroundAir';
  border: 4px solid #c49c48;
  border-radius: 16px;
  width: 95%;
  height: 92%;
`;
export const GroupHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  margin-bottom: 4%;
`;
export const SearchUser = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3%;
`;
export const InviteUser = styled.input`
  border: 1px solid #242d40;
  border-radius: 12px;
  width: 350px;
  height: 50px;
  text-align: center;
  font-size: large;
  color: black;
`;

export const CheckBtn = styled.button`
  width: 60px;
  height: 40px;
  margin-left: 20px;
  background-color: #9196e1;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  color: white;
  font-weight: 700;
  :hover {
    border: 3px solid #505ac5;
  }
`;
export const InviteBottom = styled.div`
  display: flex;
`;
export const InviteBtn = styled.button`
  width: 90px;
  height: 40px;
  margin-left: 15px;
  border: 1px solid #242d40;
  border-radius: 10px;
  outline: 0;
  background-color: white;
  font-size: large;
  color: black;
  cursor: pointer;
  font-weight: bolder;
  :hover {
    transform: scale(1.05);
    border: 2px solid #242d40;
  }
`;
export const CancelBtn = styled.button`
  width: 90px;
  height: 40px;
  margin-left: 15px;
  border: 1px solid #d9a9a9;
  border-radius: 10px;
  outline: 0;
  background-color: white;
  font-size: large;
  color: black;
  cursor: pointer;
  font-weight: bolder;
  opacity: 0.7;
  :hover {
    transform: scale(1.05);
    border: 2px solid #d9a9a9;
    opacity: 0.7;
  }
`;
