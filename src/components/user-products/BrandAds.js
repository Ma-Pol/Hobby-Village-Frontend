import { React } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BrandAds = () => {
  const navigate = useNavigate();
  const brandAds = [
    {
      brand: '아레나',
      url: process.env.PUBLIC_URL + '/AdImage/arenaAD1.png',
    },
    {
      brand: '멜킨',
      url: process.env.PUBLIC_URL + '/AdImage/melkinAD1.png',
    },
    {
      brand: '레트로스',
      url: process.env.PUBLIC_URL + '/AdImage/retrosAD1.png',
    },
    {
      brand: '야마하',
      url: process.env.PUBLIC_URL + '/AdImage/yamahaAD1.png',
    },
  ];

  const brandAdStyle = {
    margin: '0',
    padding: '0',
    width: '100%',
    height: '400px',
    cursor: 'pointer',
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          m: 0,
          p: 0,
          userSelect: 'none',
          borderBottom: '1px solid #d5d5d5',
        }}
      >
        <Swiper
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={true}
          modules={[Autoplay, Pagination]}
          style={brandAdStyle}
        >
          {brandAds.map((ad) => {
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
                  alt="이미지를 불러오는 데에 실패했습니다."
                  src={ad.url}
                  sx={{
                    m: 0,
                    objectFit: 'cover',
                    width: '100%',
                    height: '400px',
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </>
  );
};

export default BrandAds;
