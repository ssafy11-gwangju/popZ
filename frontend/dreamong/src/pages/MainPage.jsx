import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatisticsIcon, ScrollButton } from '../assets/icons';
import axios from 'axios';
import { baseURLState } from '../recoil/atoms';
import { userState } from '../recoil/atoms';
import { useRecoilValue, useRecoilState } from 'recoil';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Swal from 'sweetalert2';
import { useHandleError } from '../utils/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { HeaderContent } from '../assets/icons';

const MainPage = () => {
  // dreams : 꿈리스트 / year, month : 년월 /
  // const current = new Date();
  // const [dreams, setDreams] = useState([]);
  // const [year, setYear] = useState(current.getFullYear());
  // // 달은 현재의 달에서 -1이 된 값이 전달
  // const [month, setMonth] = useState(current.getMonth() + 1);
  // const [user, setUser] = useRecoilState(userState);
  // const [totalCount, setTotalCount] = useState(0);
  // // 월에 포커스를 맞추기 위해서
  // const swiperRef = useRef(null);
  // const baseURL = useRecoilValue(baseURLState);
  // const navigate = useNavigate();
  // const handleError = useHandleError();

  // /** - 데이터를 가져오는 함수, 날짜 변동에 따라 계속 호출되므로 함수로 처리 */
  // const accessToken = localStorage.getItem('accessToken');

  // const getDreams = () => {
  //   if (!accessToken) {
  //     return navigate('/login');
  //   }
  //   axios
  //     .get(`${baseURL}/users/info`, {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log('유저정보 가져왔어!', response);
  //       setUser(response.data.data);
  //       return axios.get(`${baseURL}/dream/${response.data.data.userId}/${year}${String(month).padStart(2, '0')}01`, {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //         withCredentials: true,
  //       });
  //     })
  //     .then((response) => {
  //       const responseData = response.data.data;
  //       setDreams(responseData.dreamMainResponsesList);
  //       setTotalCount(responseData.totalCount);
  //       console.log(responseData);
  //     })
  //     .catch((error) => {
  //       if (error.response && error.response.status === 401) {
  //         navigate('/login');
  //       } else {
  //         navigate('/error');
  //       }
  //     });
  // };

  // // useEffect
  // useEffect(() => {
  //   swiperRef.current?.swiper.slideTo(month - 1, 0);
  //   getDreams();
  // }, []);

  // // 선택한 달에 따라서 swiper 이동
  // useEffect(() => {
  //   if (swiperRef.current) {
  //     swiperRef.current.swiper.slideTo(month - 1, 0);
  //   }
  // }, [month]);

  // // 날짜 변동에 따라 데이터 새로 호출
  // useEffect(() => {
  //   getDreams();
  // }, [year, month]);

  // const handleYear = (number) => {
  //   setYear((prev) => Math.max(prev + number, 1900));
  // };

  // const handleMonth = (number) => {
  //   setMonth(number + 1);
  // };

  // // 요일을 나타내기 위한 함수
  // const getWeekDay = (dateStr) => {
  //   const date = new Date(year, month - 1, parseInt(dateStr.slice(6, 8)));
  //   const option = { weekday: 'long' };
  //   return date.toLocaleDateString('en-US', option).slice(0, 3).toUpperCase();
  // };

  // const headerRef = useRef(null);
  // const ScrollToHeader = () => {
  //   // 참조된 div가 있으면 그 위치로 스크롤 이동
  //   if (headerRef.current) {
  //     headerRef.current.scrollIntoView({ behavior: 'smooth' });
  //     console.log(window.scrollY);
  //   }
  // };

  // const handleClick = (dreamId) => {
  //   ScrollToHeader();
  //   navigate(`/dream/${dreamId}`);
  // };

  // // 통계 아이콘 선택시 통계 페이지로 이동
  // const navigateToStatistics = () => {
  //   console.log(window.scrollY);
  //   navigate('/statistics');
  // };

  // // 스크롤버튼의 화면 노출 관리
  // const [isButtonVisible, setIsButtonVisible] = useState(true);
  // const mainRef = useRef(null);

  // // 버튼 노출 여부
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const entry = entries[0];
  //       // 요소가 보일 때 true, 보이지 않을 때 false로 설정
  //       setIsButtonVisible(entry.isIntersecting);
  //     },
  //     {
  //       threshold: 0.8, // 요소가 10% 이상 보이면 감지
  //     },
  //   );

  //   if (mainRef.current) {
  //     observer.observe(mainRef.current);
  //   }

  //   // 컴포넌트가 언마운트될 때 observer를 해제합니다.
  //   return () => {
  //     if (mainRef.current) {
  //       observer.unobserve(mainRef.current);
  //     }
  //   };
  // }, []);

  // const ScrollToDiv = () => {
  //   // 참조된 div가 있으면 그 위치로 스크롤 이동
  //   if (mainRef.current) {
  //     mainRef.current.scrollIntoView({ behavior: 'smooth' });
  //     console.log(window.scrollY);
  //   }
  // };

  return (
    <div className="relative h-dvh">
    </div>
  );
};

export default MainPage;

// readme 정리할 때 애초에 예시로 이미지 넣을거 지금 완성이 안되어있으니까 이미지 넣을 칸만 예시파일 하나 넣어놓고 @![]()
