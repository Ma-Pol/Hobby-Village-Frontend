import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
  Box,
  Link,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

const Review = ({ review }) => {
  const [pictureList, setPictureList] = useState([]); // 리뷰 이미지 파일명 목록

  // 이미지 파일명 불러오기
  const getRevwPicsNames = (revwCode) => {
    axios
      .get(`/prodReview/imgName?revwCode=${revwCode}`)
      .then((res) => {
        const { data } = res;
        setPictureList(data);
      })
      .catch((e) => {
        console.log('이미지 파일명 불러오기 실패!!!');
        console.error(e);
      });
  };

  useEffect(() => {
    getRevwPicsNames(review.revwCode);
  }, []);

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Box>
      <Swiper slidesPerView={3} spaceBetween={10} style={swiperStyle}>
        {pictureList.map((fileName) => {
          const fileSrc = `http://localhost:8080/prodReview/upload/${fileName}`;
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
                alt={review.revwCode}
                src={fileSrc}
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
  );
};

export default Review;
