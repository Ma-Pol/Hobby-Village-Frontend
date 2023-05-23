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

// 상품 목록 출력 컴포넌트 (상품별 이미지 파일명 및 이미지 불러오기)
const Product = ({ product }) => {
  const [pictureList, setPictureList] = useState([]); // 상품 이미지 이름 목록
  const prodLink = `/products/details/${product.prodCode}`;

  // 이미지 파일명 불러오기
  const getProdPictureNames = (prodCode) => {
    axios
      .get(`/products/lists/getProdPictures?prodCode=${prodCode}`)
      .then((res) => {
        const { data } = res;
        setPictureList(data);
        console.log('이미지 파일명 불러오기 성공~~');
      })
      .catch((e) => {
        console.log('이미지 파일명 불러오기 실패!!!');
        console.error(e);
      });
  };

  useEffect(() => {
    getProdPictureNames(product.prodCode);
  }, []);

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    // borderRadius: '5px',
    width: '200px',
    minHeight: '200px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const prodCardStyle = {
    width: '220px',
    height: '330px',
    border: 'none',
    boxShadow: 'none',
  };

  return (
    <>
      <Card sx={prodCardStyle}>
        <Swiper navigation={false} style={swiperStyle}>
          {pictureList.map((fileName) => {
            const fileSrc = `http://localhost:8080/products/lists/upload/${fileName}`;

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
                  alt={product.prodCode}
                  src={fileSrc}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                />
                {product.prodIsRental == 1 ? (
                  <Box
                    alt={product.prodCode}
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'gray',
                      opacity: [0.7],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5">대여중</Typography>
                  </Box>
                ) : null}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <CardContent>
          <Typography
            sx={{
              mt: '-5px',
              ml: '-5px',
              mb: '-25px',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            {product.prodBrand}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            sx={{
              mt: '5px',
              ml: '3px',
              color: 'black',
              fontSize: '1.2rem',
              textDecoration: 'none',
              '&:hover': {
                color: '#C3C36A',
              },
            }}
            href={prodLink}
          >
            {product.prodName}
          </Link>
        </CardActions>
        <CardContent sx={{ mt: '-22px' }}>
          <Typography sx={{ ml: '-4px' }}>{product.prodPrice}원</Typography>
          <Typography
            sx={{ ml: '-4px', color: '#ADADAD', fontWeight: 'Regular' }}
          >
            관심 {product.prodDibs}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Product;
