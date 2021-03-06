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
  // ?????? ?????????
  const modalHandler = (isModal, alertMsg, btnContents, toPage) => {
    setIsModal(isModal);
    setAlertMsg(alertMsg);
    setBtnContents(btnContents);
    setToPage(toPage);
  };
  // ???????????? ??????
  const deletedDiary = () => {
    modalHandler(true, '????????? ?????????????????????', '??????', '/');
    diaryDeleteMutate(id);
  };
  // ???????????? ??????
  const FixedDiary = () => {
    sessionStorage.setItem('temp', JSON.stringify(cur));
    sessionStorage.setItem('id', JSON.stringify(id));
    !cur.picUrl ? navigate('/writing') : navigate('/drawing');
  };
  // ?????? ?????????
  const commentPost = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem('CC_Token')) {
      setComment('');
      return modalHandler(true, '????????? ??? ?????????????????????.', '??????');
    }
    if (comment.length > 1) commentsPostMutate();
    setComment('');
    modalHandler(true, '????????? ?????? ???????????????.', '??????');
  };
  // ?????? ??????
  const deleteCommnet = (id) => {
    commentsDeleteMutate(id);
    modalHandler(true, '????????? ?????? ???????????????.', '??????');
  };
  // ????????? ?????? ??????
  const likeHandler = () => {
    if (sessionStorage.getItem('CC_Token')) {
      likeMutate();
    } else {
      modalHandler(true, '????????? ??? ?????????????????????.', '??????');
    }
  };
  // ????????? ??????
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
  // ?????? ?????? ????????? ??????
  const handleSubmit = () => {
    publicMutate();
  };
  // ?????? ????????? ??????
  const PreviousDiary = () => {
    if (diaries) {
      for (let i = 0; i < diaries.length; i++) {
        if (diaries[i] !== diaries[0] && nummberId === diaries[i].id) {
          return navigate(`/details/${diaries[i - 1].id}`);
        }
      }
    }
  };
  // ?????? ????????? ??????
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
                  ??????: <ContentTitle> {cur?.title} </ContentTitle>
                </ContentHBLeft>
                <ContentHBRight>
                  ??????: <ContentDate> {cur?.date.slice(0, 10)} </ContentDate>
                </ContentHBRight>
              </ContentHeaderT>
              <ContentHeaderB>
                <ContentHBLeft>
                  ??????:
                  <ContentFeel
                    style={{
                      backgroundImage: `url(${cur?.feelings})`,
                      backgroundSize: '100% 100%',
                    }}
                  />
                </ContentHBLeft>
                <ContentHBRight>
                  ??????:
                  <ContentWeather
                    style={{
                      backgroundImage: `url(${cur?.weather})`,
                      backgroundSize: '100% 100%',
                    }}
                  />
                </ContentHBRight>
              </ContentHeaderB>
            </ContentHeader>
            {/* ?????? ?????? ?????? */}
            <ContentMain>
              {cur?.picUrl ? <img src={cur?.picUrl} alt="" /> : null}
              <div dangerouslySetInnerHTML={{ __html: cur?.content }}></div>
              {/* {details.content} */}
            </ContentMain>
            <ContentBottom>
              <BottomLeft>
                <BottomWriter>
                  ?????????:
                  <span>{cur?.username}</span>
                </BottomWriter>
                {likeTag()}
              </BottomLeft>
              <BottomRight>
                {diaries.length > 1 && nummberId !== diaries[0]?.id && (
                  <BottomPreBtn onClick={PreviousDiary}>????????????</BottomPreBtn>
                )}
                {diaries.length > 1 && nummberId !== diaries[diaries.length - 1]?.id && (
                  <BottomNextBtn onClick={afterDiary}>????????????</BottomNextBtn>
                )}

                {/*??????,?????? ?????? */}
                {cur?.userId === userInfo?.id && (
                  <>
                    {cur?.private ? (
                      <PublicBtn onClick={handleSubmit}> ??? ??? </PublicBtn>
                    ) : (
                      <PublicBtn onClick={handleSubmit}> ??? ??? ??? </PublicBtn>
                    )}
                    <BottomEditBtn onClick={FixedDiary}>??? ???</BottomEditBtn>
                    <BottomDeleteBtn onClick={deletedDiary}>??? ???</BottomDeleteBtn>
                  </>
                )}
              </BottomRight>
            </ContentBottom>
          </DetailContent>
          {/* ???????????? */}
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
                            <CommentDeleteBtn onClick={() => deleteCommnet(comment.id)}>??? ???</CommentDeleteBtn>
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
                  placeholder="????????? ???????????????"
                  type="text"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <CommentSubmitBtn type="submit" onClick={commentPost}>
                  ??? ???
                </CommentSubmitBtn>
              </CommentBottom>
            </DetailComment>
          ) : (
            <DisableComment>
              <p>????????? ????????? ????????????</p>
              <p>?????? ????????? ???????????????</p>
            </DisableComment>
          )}
        </DetailsMain>
        <ToggleButton />
      </DetailsWrapper>
    </ModalProvider>
  );
}
