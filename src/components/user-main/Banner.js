import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './Banner.css';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const Banner = () => {
  const navigate = useNavigate();

  const linkToProductsLists = () => {
    navigate('/products/lists');
  };
  const linkToRequests = () => {
    navigate('/requests');
  };
  const linkToProductsBrandLists = () => {
    navigate('/products/brand/lists');
  };
  const linkToNoticesLists = () => {
    navigate('/notices/lists?filter=none&pages=1');
  };
  const linkToServiceInfo = () => {
    navigate('/guide');
  };

  const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class="${className}"></span>`;
    },
  };

  const slideBox = {
    width: '100%',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const slideTextBox = {
    m: 0,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Box sx={{ width: '100%', m: 0, p: 0, userSelect: 'none' }}>
      <Swiper
        loop={true}
        pagination={pagination}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{
          margin: '0',
          padding: '0',
          width: '100%',
          height: '400px',
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <Box
            sx={{
              ...slideBox,
              backgroundColor: '#F0F0DC',
            }}
          >
            <Box sx={{ ...slideTextBox, mr: 20 }}>
              <Typography
                sx={{
                  fontSize: '18px',
                  '& h1': {
                    marginTop: '0',
                    marginBottom: '20px',
                  },
                }}
              >
                <h1>취미를 빌려드립니다.</h1>
                고가의 취미 용품,
                <br />
                시작하기 힘들었던 취미.
                <br />
                저희가 도와드리겠습니다.
              </Typography>
              <Button
                onClick={linkToProductsLists}
                sx={{
                  mt: 2,
                  width: '120px',
                  height: '42px',
                  color: '#4a4a4a',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#d9d9d999',
                  '&:hover': {
                    backgroundColor: '#7a7a7a',
                    color: '#ffffff',
                  },
                }}
              >
                취미 물품 보기
              </Button>
            </Box>
            <Box
              component="img"
              alt="banner1"
              src="/MainBanner/banner1.png"
              sx={{
                m: 0,
                objectFit: 'cover',
                width: '400px',
                height: '298px',
                boxShadow: '0px 4px 4px #00000040, 0px 4px 4px #00000040',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            />
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box
            sx={{
              ...slideBox,
              backgroundColor: '#ffffff',
            }}
          >
            <Box
              component="img"
              alt="banner2"
              src="/MainBanner/banner2.jpg"
              sx={{
                m: 0,
                objectFit: 'cover',
                width: '277px',
                height: '340px',
                boxShadow: '0px 4px 4px #00000040, 0px 4px 4px #00000040',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            />
            <Box sx={{ ...slideTextBox, ml: 20 }}>
              <Typography
                sx={{
                  fontSize: '18px',
                  '& h1': {
                    fontSize: '30px',
                    marginTop: '0',
                    marginBottom: '20px',
                  },
                }}
              >
                <h1>
                  내가 하고 싶은 취미를 빌리고,
                  <br />
                  내가 해봤던 취미를 빌려주자
                </h1>
                우리 회사에서 소유하고 있는 물품뿐만 아니라,
                <br />
                개인의 취미 물품을 빌려주고, 빌릴 수 있습니다.
              </Typography>
              <Box sx={{ m: 0 }}>
                <Button
                  onClick={linkToProductsLists}
                  sx={{
                    mt: 2,
                    mr: 2,
                    width: '120px',
                    height: '42px',
                    color: '#4a4a4a',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    backgroundColor: '#d9d9d999',
                    '&:hover': {
                      backgroundColor: '#7a7a7a',
                      color: '#ffffff',
                    },
                  }}
                >
                  취미 물품 보기
                </Button>
                <Button
                  onClick={linkToRequests}
                  sx={{
                    mt: 2,
                    width: '160px',
                    height: '42px',
                    color: '#4a4a4a',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    backgroundColor: '#d9d9d999',
                    '&:hover': {
                      backgroundColor: '#7a7a7a',
                      color: '#ffffff',
                    },
                  }}
                >
                  물품 판매/위탁하기
                </Button>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box
            sx={{
              ...slideBox,
              backgroundColor: '#E4E58E50',
            }}
          >
            <Box sx={{ ...slideTextBox, mr: 20 }}>
              <Typography
                sx={{
                  fontSize: '18px',
                  '& h1': {
                    fontSize: '30px',
                    marginTop: '0',
                    marginBottom: '20px',
                  },
                }}
              >
                <h1>
                  브랜드의 새로운
                  <br />
                  물품까지 빌려드립니다
                </h1>
                제휴 브랜드의 인기 상품부터
                <br />
                신상품까지 빌려드립니다.
              </Typography>
              <Button
                onClick={linkToProductsBrandLists}
                sx={{
                  mt: 2,
                  width: '120px',
                  height: '42px',
                  color: '#4a4a4a',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#d9d9d999',
                  '&:hover': {
                    backgroundColor: '#7a7a7a',
                    color: '#ffffff',
                  },
                }}
              >
                브랜드관 보기
              </Button>
            </Box>
            <Box
              component="img"
              alt="banner3"
              src="/MainBanner/banner3.jpg"
              sx={{
                m: 0,
                objectFit: 'cover',
                width: '400px',
                height: '298px',
                boxShadow: '0px 4px 4px #00000040, 0px 4px 4px #00000040',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            />
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box
            sx={{
              ...slideBox,
              backgroundColor: '#EFE8E850',
            }}
          >
            <Box
              component="img"
              alt="banner4"
              src="/MainBanner/banner4.png"
              sx={{
                m: 0,
                objectFit: 'cover',
                width: '277px',
                height: '340px',
                boxShadow: '0px 4px 4px #00000040, 0px 4px 4px #00000040',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            />
            <Box sx={{ ...slideTextBox, ml: 20 }}>
              <Typography
                sx={{
                  fontSize: '18px',
                  '& h1': {
                    fontSize: '30px',
                    marginTop: '0',
                    marginBottom: '20px',
                  },
                }}
              >
                <h1>
                  취미빌리지 서비스의
                  <br />
                  상세 정보를 알려드립니다
                </h1>
                취미빌리지의 취미 용품 구독 서비스와
                <br />
                새롭게 게시된 공지사항을 알아보세요.
              </Typography>
              <Box sx={{ m: 0 }}>
                <Button
                  onClick={linkToServiceInfo}
                  sx={{
                    mt: 2,
                    mr: 2,
                    width: '170px',
                    height: '42px',
                    color: '#4a4a4a',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    backgroundColor: '#d9d9d999',
                    '&:hover': {
                      backgroundColor: '#7a7a7a',
                      color: '#ffffff',
                    },
                  }}
                >
                  구독 서비스 안내
                </Button>
                <Button
                  onClick={linkToNoticesLists}
                  sx={{
                    mt: 2,
                    width: '100px',
                    height: '42px',
                    color: '#4a4a4a',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    backgroundColor: '#d9d9d999',
                    '&:hover': {
                      backgroundColor: '#7a7a7a',
                      color: '#ffffff',
                    },
                  }}
                >
                  공지사항
                </Button>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Banner;
