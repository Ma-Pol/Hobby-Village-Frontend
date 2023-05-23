import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './Banner.css';
import { Box } from '@mui/material';

function MainAds(props) {
  const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class="${className}"></span>`;
    },
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
          height: '200px',
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <Box
            component="img"
            alt="brandAD1"
            src="/AdImage/arenaAD0.png"
            sx={{
              m: 0,
              objectFit: 'cover',
              width: '100%',
              height: '200px',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="img"
            alt="brandAD2"
            src="/AdImage/melkinAD0.png"
            sx={{
              m: 0,
              objectFit: 'cover',
              width: '100%',
              height: '200px',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="img"
            alt="brandAD3"
            src="/AdImage/retrosAD0.png"
            sx={{
              m: 0,
              objectFit: 'cover',
              width: '100%',
              height: '200px',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="img"
            alt="brandAD4"
            src="/AdImage/yamahaAD0.png"
            sx={{
              m: 0,
              objectFit: 'cover',
              width: '100%',
              height: '200px',
            }}
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default MainAds;
