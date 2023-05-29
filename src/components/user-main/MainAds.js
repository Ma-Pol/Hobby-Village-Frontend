import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './Banner.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainAds = () => {
  const navigate = useNavigate();

  const banner = [
    {
      brand: '아레나',
      url: process.env.PUBLIC_URL + '/AdImage/arenaAD0.png',
    },
    {
      brand: '멜킨',
      url: process.env.PUBLIC_URL + '/AdImage/melkinAD0.png',
    },
    {
      brand: '레트로스',
      url: process.env.PUBLIC_URL + '/AdImage/retrosAD0.png',
    },
    {
      brand: '야마하',
      url: process.env.PUBLIC_URL + '/AdImage/yamahaAD0.png',
    },
  ];

  const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class="${className}"></span>`;
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        m: 0,
        p: 0,
        userSelect: 'none',
        borderTop: '1px solid #d5d5d5',
        borderBottom: '1px solid #d5d5d5',
      }}
    >
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
          height: '200px',
          cursor: 'pointer',
        }}
        modules={[Autoplay, Pagination]}
      >
        {banner.map((ad) => {
          return (
            <SwiperSlide
              key={ad.brand}
              onClick={() => {
                navigate(
                  `/products/brand/lists?brand=${ad.brand}&sort=all&array=recent&pages=1`
                );
              }}
            >
              <Box
                component="img"
                alt="brandAD"
                src={ad.url}
                sx={{
                  m: 0,
                  objectFit: 'cover',
                  width: '100%',
                  height: '200px',
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default MainAds;
