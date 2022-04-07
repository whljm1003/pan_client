import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "store/UserStore";
import axios from "axios";
import Header from "components/Header";
import ToggleButton from "components/ToggleButton";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import {
  CommentHeader,
  CommentMain,
  CommentMiddle,
  CommentLeft,
  CommentRight,
  ContentBottom,
  CommnetBG,
  DetailBG,
  ContentHeader,
  ContentMain,
  DetailComment,
  DetailContent,
  DetailsMain,
  DetailsWrapper,
  CommentDeleteBtn,
  BottomEditBtn,
  BottomDeleteBtn,
  BottomRight,
  BottomPreBtn,
  BottomNextBtn,
  BottomLikeBtn,
  PublicBtn,
  CommentBottom,
  CommentInput,
  CommentSubmitBtn,
  BottomLeft,
  BottomWriter,
  ContentTitle,
  ContentDate,
  ContentFeel,
  ContentWeather,
  ContentHeaderT,
  ContentHeaderB,
  ContentHBLeft,
  ContentHBRight,
  DisableComment,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { ModalProvider } from "styled-react-modal";
import AlertModal from "../../components/Modals/AlertModal";
import { API_URL } from "url";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getDiary,
  deleteDiary,
  postComments,
  deleteComments,
} from "api/DetailApi";
import { getUserInfo } from "api/userApi";
export default function Details() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // modal state
  const [isModal, setIsModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [btnContents, setBtnContents] = useState("");
  const [toPage, setToPage] = useState("");
  // react-query
  const {
    data: cur,
    isLoading: curLoading,
    refetch: curRefetch,
  } = useQuery("diary", () => getDiary(id));
  const {
    data: userInfo,
    isLoading: userLoding,
    refetch: userRefetch,
  } = useQuery("userInfo", getUserInfo);
  const { mutate: commentsPost } = useMutation(
    "commentsPost",
    () => postComments(id, comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("diary");
      },
    }
  );
  const { mutate: commentsDelete } = useMutation(
    "commentsDelete",
    deleteComments,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("diary");
      },
    }
  );
  const { mutate: diariesDelete } = useMutation("diariesDelete", deleteDiary);
  // 모달 핸들러
  const modalHandler = (isModal, alertMsg, btnContents, toPage) => {
    setIsModal(isModal);
    setAlertMsg(alertMsg);
    setBtnContents(btnContents);
    setToPage(toPage);
  };
  // 다이어리 삭제
  const deletedDiary = () => {
    modalHandler(true, "일기가 삭제되었습니다", "확인", "/");
    diariesDelete(id);
  };
  // 다이어리 수정
  const FixedDiary = () => {
    // sessionStorage.setItem("temp", JSON.stringify(details));
    // sessionStorage.setItem("id", JSON.stringify(id));
    // !details.picUrl ? navigate("/writing") : navigate("/drawing");
  };
  // 댓글 포스트
  const commentPost = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("CC_Token")) {
      setComment("");
      return modalHandler(true, "로그인 후 이용가능합니다", "확인");
    }
    if (comment.length > 1) commentsPost();
    setComment("");
    modalHandler(true, "댓글이 등록 되었습니다", "확인");
  };
  // 댓글 삭제
  const deleteCommnet = (id) => {
    commentsDelete(id);
    modalHandler(true, "댓글이 삭제 되었습니다", "확인");
  };
  // 좋아요 기능 구현
  const likeHandler = async () => {
    await axios({
      method: "post",
      url: `${API_URL}/diaries/${id}/trending`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
        ContentType: "application/json",
      },
      withCredentials: true,
    });
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };
  // 이전 일기로 이동
  const PreviousDiary = () => {
    const prvious = parseInt(id) - 1;
    navigate(`/details/${prvious}`);
  };
  // 다음 일기로 이동
  const afterDiary = () => {
    const next = parseInt(id) + 1;
    navigate(`/details/${next}`);
  };

  // 일기 공개 비공개 소스
  // 체크박스 클릭후 버튼 클릭하면 공개 비공개 전환 (true, false)
  const handleSubmit = async () => {
    await axios({
      method: "post",
      url: `${API_URL}/diaries/${id}/private`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
        ContentType: "application/json",
      },
      withCredentials: true,
    }).then(
      // setTiomeout으로 공개 비공개 전환을 가능하게 해주었다.
      setTimeout(() => {
        window.location.reload(true);
      }, 100)
    );
  };
  // 이전,다음 버튼 클릭 시 데이터 랜더링
  useEffect(() => {
    curRefetch();
  }, [id]);
  // test
  useEffect(() => {
    // console.log(comment);
    // console.log(cur);
    // console.log(id);
    // console.log(userInfo);
  }, [cur, userInfo, comment]);

  if (userLoding && curLoading) {
    return <div>로딩중!!</div>;
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
      <DetailsWrapper>
        <Header main="/" login="/login" />
        <DetailsMain>
          <DetailContent>
            <ContentHeader>
              <ContentHeaderT>
                <ContentHBLeft>
                  제목: <ContentTitle> {cur?.title} </ContentTitle>
                </ContentHBLeft>
                <ContentHBRight>
                  날짜: <ContentDate> {cur?.date.slice(0, 10)} </ContentDate>
                </ContentHBRight>
              </ContentHeaderT>
              <ContentHeaderB>
                <ContentHBLeft>
                  기분:
                  <ContentFeel
                    style={{
                      backgroundImage: `url(${cur?.feelings})`,
                      backgroundSize: "100% 100%",
                    }}
                  />
                </ContentHBLeft>
                <ContentHBRight>
                  날씨:
                  <ContentWeather
                    style={{
                      backgroundImage: `url(${cur?.weather})`,
                      backgroundSize: "100% 100%",
                    }}
                  />
                </ContentHBRight>
              </ContentHeaderB>
            </ContentHeader>
            {/* 일기 본문 내용 */}
            <ContentMain>
              {cur?.picUrl ? <img src={cur?.picUrl} alt="" /> : null}
              <div dangerouslySetInnerHTML={{ __html: cur?.content }}></div>
              {/* {details.content} */}
            </ContentMain>
            <ContentBottom>
              <BottomLeft>
                <BottomWriter>작성자: {cur?.username}</BottomWriter>
                <BottomLikeBtn>
                  <AiOutlineHeart size={24} onClick={likeHandler} />
                  <span>{cur?.like}</span>
                </BottomLikeBtn>
              </BottomLeft>
              <BottomRight>
                <BottomPreBtn onClick={PreviousDiary}>이전일기</BottomPreBtn>
                <BottomNextBtn onClick={afterDiary}>다음일기</BottomNextBtn>
                {/* id과 userId 비교 */}
                {/* 없다면 수정,삭제 버튼 안보이게 함 */}
                {cur?.userId === userInfo?.id && (
                  <>
                    {cur?.private ? (
                      <PublicBtn onClick={handleSubmit}> 공 개 </PublicBtn>
                    ) : (
                      <PublicBtn onClick={handleSubmit}> 비 공 개 </PublicBtn>
                    )}
                    <BottomEditBtn onClick={FixedDiary}>수 정</BottomEditBtn>
                    <BottomDeleteBtn onClick={deletedDiary}>
                      삭 제
                    </BottomDeleteBtn>
                  </>
                )}
              </BottomRight>
            </ContentBottom>
          </DetailContent>
          {/* 댓글부분 */}
          {/* private true면 비공개 false면 공개 */}
          {cur && cur.private === false ? (
            <DetailComment>
              <DetailBG>
                {cur?.Comments.map((comment) => {
                  return (
                    <CommnetBG key={comment.id}>
                      <CommentHeader>
                        <CommentLeft>{comment.User.username}</CommentLeft>
                        <CommentMiddle>
                          {comment.createdAt.slice(0, 10)}
                        </CommentMiddle>
                        <CommentRight>
                          {cur?.userId === userInfo?.id && (
                            <CommentDeleteBtn
                              onClick={() => deleteCommnet(comment.id)}
                            >
                              삭 제
                            </CommentDeleteBtn>
                          )}
                        </CommentRight>
                      </CommentHeader>
                      <CommentMain>{comment.text}</CommentMain>
                    </CommnetBG>
                  );
                })}
              </DetailBG>
              <CommentBottom onSubmit={commentPost}>
                <CommentInput
                  placeholder="댓글을 입력하세요"
                  type="text"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <CommentSubmitBtn type="submit" onClick={commentPost}>
                  입 력
                </CommentSubmitBtn>
              </CommentBottom>
            </DetailComment>
          ) : (
            <DisableComment>
              <p>공개된 일기의 경우에만</p>
              <p>댓글 작성이 가능합니다</p>
            </DisableComment>
          )}
        </DetailsMain>
        <ToggleButton />
      </DetailsWrapper>
    </ModalProvider>
  );
}
