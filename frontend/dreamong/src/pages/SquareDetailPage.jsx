import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { baseURLState, userState } from '../recoil/atoms';

const SquareDetailPage = () => {
  const { dreamId } = useParams();
  const [isToggled, setIsToggled] = useState(false);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const baseURL = useRecoilValue(baseURLState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    fetchDreamDetail();
  }, []);

  ///////////////////////////////
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const fetchDreamDetail = () => {
    // 토큰이 존재하지 않을 경우 로그인 페이지로 이동
    if (!accessToken) {
      console.error('토큰이 없습니다. 로그인 페이지로 이동합니다.');
      return navigate('/login');
    }

    // 유저정보 가져오기
    axios
      .get(`${baseURL}/users/info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      // 유저정보 가져와서 userState 갱신하기
      .then((userInfoResponse) => {
        console.log('유저정보 가져왔어!', userInfoResponse);
        const userInfo = userInfoResponse.data.data;
        setUser(userInfo);
        // userInfo를 이용해 꿈 상세 정보 가져오기
        return axios.get(`${baseURL}/square/${dreamId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
          params: { userId: userInfo.userId },
        });
      })
      .then((dreamDetailResponse) => {
        const data = dreamDetailResponse.data.data;
        console.log(data);
        const updatedComments = data.comments;
        setSummary(data.summary);
        setContent(data.content);
        setImage(data.image);
        setComments(updatedComments);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('오류 발생:', error);
          navigate('/error');
        }
      });
  };

  const handleToggleClick = () => {
    setIsToggled(!isToggled);
  };

  const handleLikeClick = async (commentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${baseURL}/comments/${user.userId}/${commentId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );

      // 좋아요 토글 로직
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likedByUser: response.data.status === 'like' ? true : false,
                likesCount: response.data.status === 'like' ? comment.likesCount + 1 : comment.likesCount - 1,
              }
            : comment,
        ),
      );
    } catch (error) {
      Swal.fire({
        title: 'ERROR',
        text: '좋아요를 처리하는 도중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '돌아가기',
      });
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${baseURL}/comments/create`,
        {
          content: newComment,
          dreamId: parseInt(dreamId),
          userId: user.userId,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );

      if (response.data.status === 'success') {
        fetchDreamDetail();
        setNewComment('');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Swal.fire({
        title: 'ERROR',
        text: '댓글을 생성하는 도중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '돌아가기',
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(`${baseURL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        Swal.fire({
          title: '삭제 완료',
          text: '댓글이 삭제되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
        fetchDreamDetail();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Swal.fire({
        title: 'ERROR',
        text: '댓글을 삭제하는 도중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '돌아가기',
      });
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#222222]">
      {/* 꿈 이미지 */}
      <div className="flex w-4/5 mx-auto mt-12 mb-4">
        <div className="relative w-full pt-[100%]">
          <div
            className="absolute left-0 top-0 h-full w-full rounded-[30px] bg-gray-500"
            style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
        </div>
      </div>
      {/* 꿈 내용 토글 */}
      <div
        className={`align-center relative w-4/5 transition-all duration-300 ease-in-out ${isToggled ? 'h-96' : 'h-20'}`}
        onClick={handleToggleClick}
      >
        <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-[20px] bg-[#1a1819] px-4 text-white">
          {isToggled ? (
            <div className="w-full text-left">
              {/* 요약 */}
              <div className="flex items-center gap-4 mb-4">
                <p className="text-sm whitespace-nowrap md:text-base lg:text-lg">요약: </p>
                <p className="text-sm break-all md:text-base lg:text-lg">{summary}</p>
              </div>
              <hr className="my-4 border-gray-700" />
              <p className="text-sm break-all md:text-base lg:text-lg">{content}</p>
            </div>
          ) : (
            <span className="text-sm md:text-md lg:text-base">💡 어떤 꿈인지 궁금하시나요? 클릭해보세요!</span>
          )}
        </div>
      </div>

      {/* 꿈 댓글 */}
      <div className={`mt-4 ${isToggled ? 'max-h-60' : 'flex-grow'} w-full overflow-y-auto rounded-t-3xl bg-white p-4`}>
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center m-5">
            <div className="flex flex-col w-full ml-4">
              <div className="flex items-center">
                <div className="text-base font-bold text-black">{comment.nickname}</div>
                {comment.commentOwner && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="ml-2 text-gray-500 cursor-pointer bi bi-trash3 hover:text-red-500"
                    viewBox="0 0 16 16"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                )}
              </div>
              <div className="text-sm text-black">{comment.content}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div
                className="flex items-center justify-center w-6 h-6 cursor-pointer"
                onClick={() => handleLikeClick(comment.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-heart ${comment.likedByUser ? 'text-red-500' : ''}`}
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
              </div>
              <div className="w-10 h-full text-xs text-center">{comment.likesCount}</div>
            </div>
          </div>
        ))}
        {/* 댓글 작성 */}
        <div className="flex items-center mt-4">
          <textarea
            id="newComment"
            name="newComment"
            className="w-full h-12 p-2 border rounded-lg"
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={handleCommentChange}
          />
          <button className="w-12 h-12 p-3 mx-2 text-white rounded-2xl bg-primary-500" onClick={handleCommentSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SquareDetailPage;
