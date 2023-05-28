import { React } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box, Container } from '@mui/material';

const BrandAds = () => {
  const brandAds = [
    {
      url: process.env.PUBLIC_URL + '/AdImage/arenaAD1.png',
    },
    {
      url: process.env.PUBLIC_URL + '/AdImage/melkinAD1.png',
    },
    {
      url: process.env.PUBLIC_URL + '/AdImage/retrosAD1.png',
    },
    {
      url: process.env.PUBLIC_URL + '/AdImage/yamahaAD1.png',
    },
  ];

  const brandAdStyle = {
    backgroundColor: '#f1f1f1',
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '--swiper-pagination-color': '#C3C36A',
  };

  return (
    <Container fixed>
      <Box>
        <Swiper
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={true}
          modules={[Autoplay, Pagination]}
          style={brandAdStyle}
        >
          {brandAds.map((ad) => {
            return (
              <SwiperSlide
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  alt="이미지를 불러오는 데에 실패했습니다."
                  src={ad.url}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Container>
  );
};

export default BrandAds;
