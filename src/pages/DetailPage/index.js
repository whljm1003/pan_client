import React, { useState } from 'react';
import Header from 'components/Header';
import ToggleButton from 'components/ToggleButton';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
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
} from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalProvider } from 'styled-react-modal';
import AlertModal from '../../components/Modals/AlertModal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getDiary, deleteDiary, postComments, deleteComments, isLike, isPublic } from 'api/DetailApi';
import { getUserInfo } from 'api/userApi';
import { useRecoilValue } from 'recoil';
import { DiariesAtom } from 'atom';
import Loader from 'components/Loader';
import { useEffect } from 'react';

export default function Details() {
  const { id } = useParams();
  const nummberId = parseInt(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  // modal state
  const [isModal, setIsModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [btnContents, setBtnContents] = useState('');
  const [toPage, setToPage] = useState('');
  // recoil
  const diaries = useRecoilValue(DiariesAtom);
  // react-query
  const { data: cur, isLoading: curLoading, refetch: curRefetch } = useQuery('diary', () => getDiary(id), {});
  const { data: userInfo, isLoading: userLoding } = useQuery('userInfo', getUserInfo);
  const { mutate: commentsPostMutate } = useMutation('commentsPost', () => postComments(id, comment), {
    onSuccess: () => {
      queryClient.invalidateQueries('diary');
    },
  });
  const { mutate: commentsDeleteMutate } = useMutation('commentsDelete', deleteComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('diary');
    },
  });
  const { mutate: diaryDeleteMutate } = useMutation('diariesDelete', deleteDiary);
  const { mutate: likeMutate } = useMutation('diariesLike', () => isLike(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('diary');
    },
  });
  const { mutate: publicMutate } = useMutation('publicMutate', () => isPublic(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('diary');
    },
  });
  // 모달 핸들러
  const modalHandler = (isModal, alertMsg, btnContents, toPage) => {
    setIsModal(isModal);
    setAlertMsg(alertMsg);
    setBtnContents(btnContents);
    setToPage(toPage);
  };
  // 다이어리 삭제
  const deletedDiary = () => {
    modalHandler(true, '일기가 삭제되었습니다', '확인', '/');
    diaryDeleteMutate(id);
  };
  // 다이어리 수정
  const FixedDiary = () => {
    sessionStorage.setItem('temp', JSON.stringify(cur));
    sessionStorage.setItem('id', JSON.stringify(id));
    !cur.picUrl ? navigate('/writing') : navigate('/drawing');
  };
  // 댓글 포스트
  const commentPost = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem('CC_Token')) {
      setComment('');
      return modalHandler(true, '로그인 후 이용가능합니다.', '확인');
    }
    if (comment.length > 1) commentsPostMutate();
    setComment('');
    modalHandler(true, '댓글이 등록 되었습니다.', '확인');
  };
  // 댓글 삭제
  const deleteCommnet = (id) => {
    commentsDeleteMutate(id);
    modalHandler(true, '댓글이 삭제 되었습니다.', '확인');
  };
  // 좋아요 기능 구현
  const likeHandler = () => {
    if (sessionStorage.getItem('CC_Token')) {
      likeMutate();
    } else {
      modalHandler(true, '로그인 후 이용가능합니다.', '확인');
    }
  };
  // 좋아요 태그
  const likeTag = () => {
    const filter = cur?.Likes.filter((like) => like.userId === userInfo?.id);
    if (filter?.length >= 1) {
      return (
        <BottomLikeBtn>
          <AiTwotoneHeart size={20} onClick={likeHandler} color="#e84118" />
          <span>{cur?.Likes.length}</span>
        </BottomLikeBtn>
      );
    } else {
      return (
        <BottomLikeBtn>
          <AiOutlineHeart size={20} onClick={likeHandler} />
          <span>{cur?.Likes.length}</span>
        </BottomLikeBtn>
      );
    }
  };
  // 일기 공개 비공개 소스
  const handleSubmit = () => {
    publicMutate();
  };
  // 이전 일기로 이동
  const PreviousDiary = () => {
    if (diaries) {
      for (let i = 0; i < diaries.length; i++) {
        if (diaries[i] !== diaries[0] && nummberId === diaries[i].id) {
          return navigate(`/details/${diaries[i - 1].id}`);
        }
      }
    }
  };
  // 다음 일기로 이동
  const afterDiary = () => {
    if (diaries) {
      for (let i = 0; i < diaries.length; i++) {
        if (nummberId === diaries[i].id) {
          return navigate(`/details/${diaries[i + 1].id}`);
        }
      }
    }
  };

  useEffect(() => {
    curRefetch();
  }, [id, curRefetch]);

  if (userLoding || curLoading) {
    return <Loader />;
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
                      backgroundSize: '100% 100%',
                    }}
                  />
                </ContentHBLeft>
                <ContentHBRight>
                  날씨:
                  <ContentWeather
                    style={{
                      backgroundImage: `url(${cur?.weather})`,
                      backgroundSize: '100% 100%',
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
                <BottomWriter>
                  작성자:
                  <span>{cur?.username}</span>
                </BottomWriter>
                {likeTag()}
              </BottomLeft>
              <BottomRight>
                {diaries.length > 1 && nummberId !== diaries[0]?.id && (
                  <BottomPreBtn onClick={PreviousDiary}>이전일기</BottomPreBtn>
                )}
                {diaries.length > 1 && nummberId !== diaries[diaries.length - 1]?.id && (
                  <BottomNextBtn onClick={afterDiary}>다음일기</BottomNextBtn>
                )}

                {/*수정,삭제 버튼 */}
                {cur?.userId === userInfo?.id && (
                  <>
                    {cur?.private ? (
                      <PublicBtn onClick={handleSubmit}> 공 개 </PublicBtn>
                    ) : (
                      <PublicBtn onClick={handleSubmit}> 비 공 개 </PublicBtn>
                    )}
                    <BottomEditBtn onClick={FixedDiary}>수 정</BottomEditBtn>
                    <BottomDeleteBtn onClick={deletedDiary}>삭 제</BottomDeleteBtn>
                  </>
                )}
              </BottomRight>
            </ContentBottom>
          </DetailContent>
          {/* 댓글부분 */}
          {cur && cur.private === false ? (
            <DetailComment>
              <DetailBG>
                {cur?.Comments.map((comment) => {
                  return (
                    <CommnetBG key={comment.id}>
                      <CommentHeader>
                        <CommentLeft>{comment.User.username}</CommentLeft>
                        <CommentMiddle>{comment.createdAt.slice(0, 10)}</CommentMiddle>
                        <CommentRight>
                          {comment.userId === userInfo?.id && (
                            <CommentDeleteBtn onClick={() => deleteCommnet(comment.id)}>삭 제</CommentDeleteBtn>
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
