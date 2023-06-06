import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Button, Container, Rating } from '@mui/material';
import Loading from '../../components/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MyPageTop from '../../components/user-mypage/MyPageTop';

const pagination = {
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className}"></span>`;
  },
};

// MUI 스타일
const tableRow = {
  m: 0,
  p: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '1030px',
  height: '60px',
  borderTop: '1px solid #808080',
  borderLeft: '1px solid #808080',
  borderRight: '1px solid #808080',
};

const tableRowBottom = {
  m: 0,
  p: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '1030px',
  height: '400px',
  border: '1px solid #808080',
};

const tableHeadCell = {
  px: 2,
  width: '150px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  borderRight: '1px solid #808080',
  userSelect: 'none',
};

const tableCell2 = {
  px: 2,
  width: '400px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  borderRight: '1px solid #808080',
};

const tableCell3 = {
  px: 1,
  width: '400px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
};

const noImageBox = {
  backgroundColor: '#f1f1f1',
  borderRadius: '5px',
  width: '350px',
  minHeight: '382.8px',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
};

const swiperStyle = {
  backgroundColor: '#f1f1f1',
  borderRadius: '5px',
  width: '350px',
  minHeight: '382.8px',
  height: '350px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
};

const updateBtnStyle = {
  mx: 3,
  width: '100px',
  backgroundColor: '#c3c36a',
  color: '#000000',
  border: '1px solid #000000',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#c3c36a',
    color: '#ffffff',
  },
};

const listBtnStyle = {
  mx: 3,
  width: '100px',
  backgroundColor: '#ffffff',
  color: '#000000',
  border: '1px solid #000000',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
};

const UserReviewsDetails = () => {
  const sessionEmail = sessionStorage.getItem('hobbyvillage-email');
  const nickname = sessionStorage.getItem('hobbyvillage-usernickname');

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const prevQuery = location.state?.queryString;
  const { revwCode } = useParams();
  const [detail, setDetail] = useState(null);
  const [reviewImages, setReviewImages] = useState([]);

  useEffect(() => {
    checkReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revwCode]);

  const checkReview = () => {
    axios
      .get(`/users/reviews/check?revwCode=${revwCode}&email=${sessionEmail}`)
      .then((check) => {
        if (check.data === 1) {
          getReviewDetail();
        } else {
          alert(`존재하지 않거나 접근 불가능한 리뷰입니다.`);
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getReviewDetail = () => {
    let check = true;
    axios
      .get(`/users/reviews/reviewDetails/${revwCode}`)
      .then((res) => {
        if (res.data.revwWriter !== nickname) {
          alert('본인의 리뷰만 조회할 수 있습니다.');
          check = false;
          // navigate(-1);
        } else {
          setDetail(res.data);
        }
      })
      .finally(() => {
        if (check) {
          getReviewImages();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getReviewImages = () => {
    axios
      .get(`/users/reviews/reviewImage/${revwCode}`)
      .then((images) => {
        if (images.data !== null) {
          if (images.data.length === 1) {
            setReviewImages([images.data]);
          } else {
            setReviewImages(images.data);
          }
        } else {
          setReviewImages([]);
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <MyPageTop />

      <Container
        sx={{
          mt: '40px',
          userSelect: 'none',
          width: '1100px',
          minHeight: '60vh',
        }}
      >
        {/* 타이틀 */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            margin: '30px 0 20px 0',
          }}
        >
          리뷰 상세
        </Typography>

        {loading ? (
          <Loading height={'70vh'} />
        ) : (
          <>
            {/* form 시작 */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* 첫 번째 행 */}
              <Box sx={tableRow}>
                <Box sx={tableHeadCell}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    상품 명
                  </Typography>
                </Box>
                <Box sx={tableCell2}>
                  <Typography
                    variant="body1"
                    component="h2"
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {detail.prodName}
                  </Typography>
                </Box>

                <Box sx={tableHeadCell}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold' }}
                  >
                    별점
                  </Typography>
                </Box>
                <Box sx={tableCell3}>
                  <Typography
                    variant="body1"
                    component="h2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Rating value={detail.revwRate} readOnly />
                  </Typography>
                </Box>
              </Box>

              {/* 두 번째 행 */}
              <Box sx={tableRow}>
                <Box sx={tableHeadCell}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    리뷰 제목
                  </Typography>
                </Box>
                <Box sx={tableCell2}>
                  <Typography variant="body1" component="h2">
                    {detail.revwTitle}
                  </Typography>
                </Box>

                <Box sx={tableHeadCell}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold' }}
                  >
                    누적 신고 수
                  </Typography>
                </Box>
                <Box sx={tableCell3}>
                  <Typography
                    variant="body1"
                    component="h2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {detail.revwReport}
                  </Typography>
                </Box>
              </Box>

              {/* 세 번째 행 */}
              <Box sx={tableRowBottom}>
                <Box sx={tableHeadCell}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    리뷰 본문
                  </Typography>
                </Box>
                <Box sx={{ ...tableCell2, py: 1 }}>
                  <Typography
                    variant="body1"
                    component="h2"
                    sx={{
                      display: 'flex',
                      height: '100%',
                      overflow: 'auto',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {detail.revwContent}
                  </Typography>
                </Box>

                <Box sx={tableHeadCell}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold' }}
                  >
                    첨부 사진
                  </Typography>
                </Box>
                <Box sx={tableCell3}>
                  {reviewImages.length === 0 ? (
                    <Box sx={noImageBox}>
                      <Typography variant="h6" component="h2" color="#626262">
                        등록된 사진이 없습니다.
                      </Typography>
                    </Box>
                  ) : (
                    <Swiper
                      loop={true}
                      pagination={pagination}
                      modules={[Pagination]}
                      style={swiperStyle}
                    >
                      {reviewImages.map((fileName) => {
                        const fileSrc = `http://localhost:8080/m/reviews/images/${fileName}`;
                        return (
                          <SwiperSlide
                            key={fileName}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Box
                              component="img"
                              alt={fileName}
                              src={fileSrc}
                              sx={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  )}
                </Box>
              </Box>

              {/* 하단 버튼 */}
              <Box
                style={{
                  marginTop: '20px',
                  marginBottom: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  sx={listBtnStyle}
                  onClick={() => {
                    if (prevQuery === undefined) {
                      navigate(
                        `/mypages/${sessionEmail}/reviews/lists?sort=-revwRegiDate&pages=1`
                      );
                    } else {
                      navigate(
                        `/mypages/${sessionEmail}/reviews/lists${prevQuery}`
                      );
                    }
                  }}
                >
                  목록
                </Button>

                <Button
                  onClick={() => {
                    navigate(
                      `/mypages/${sessionEmail}/reviews/modify/${revwCode}`
                    );
                  }}
                  sx={updateBtnStyle}
                >
                  수정
                </Button>
              </Box>
            </Box>
            {/* form 끝 */}
          </>
        )}
      </Container>
    </>
  );
};

export default UserReviewsDetails;
