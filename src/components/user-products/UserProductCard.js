import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'swiper/css';
import { Box, Typography } from '@mui/material';
import Loading from '../Loading';

// 상품 목록 출력 컴포넌트 (상품별 이미지 파일명 및 이미지 불러오기)
const Product = ({ product }) => {
  const [loading, setLoading] = useState(true); // 이미지 로딩 여부
  const [picture, setPicture] = useState(); // 상품 대표 이미지 이름
  const prodLink = `/products/details/${product.prodCode}`;

  const navigate = useNavigate();

  // 이미지 파일명 불러오기
  const getProdPictureNames = (prodCode) => {
    axios
      .get(`/products/lists/getProdPictures?prodCode=${prodCode}`)
      .then((res) => {
        const { data } = res;
        setPicture(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getProdPictureNames(product.prodCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prodCardStyle = {
    m: 0,
    p: '24px 20px 8px 20px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.5)',
      backgroundColor: '#f5f5f5',
    },
  };

  return (
    <>
      <Box
        sx={prodCardStyle}
        onClick={() => {
          navigate(prodLink);
        }}
      >
        <Box
          sx={{
            m: 0,
            p: 0,
            width: '200px',
            height: '200px',
            position: 'relative',
          }}
        >
          {product.prodIsRental === 1 && (
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '200px',
                height: '200px',
                backgroundColor: '#dddddd',
                opacity: '0.7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#000000',
                }}
              >
                대여중
              </Typography>
            </Box>
          )}

          {loading ? (
            <Loading height={'200px'} />
          ) : (
            <Box
              component="img"
              sx={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                border: '1px solid #d0d0d0',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              alt={product.prodName}
              src={`http://localhost:8080/products/lists/upload/${picture}`}
            />
          )}
        </Box>

        <Box sx={{ m: 0, width: '200px', my: 1 }}>
          <Typography
            title={product.prodName}
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.prodName}
          </Typography>
          <Typography variant="body1">
            {String(product.prodPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
              '원'}
          </Typography>
          <Typography variant="body1">{'관심 ' + product.prodDibs}</Typography>
        </Box>

        {/* <Swiper navigation={false} style={swiperStyle}>
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
                {product.prodIsRental === 1 ? (
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
        <CardActions>
          <Link
            sx={{
              mt: '5px',
              ml: '2px',
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
          <Typography sx={{ ml: '-5px' }}>{product.prodPrice}원</Typography>
          <Typography
            sx={{ ml: '-5px', color: '#ADADAD', fontWeight: 'Regular' }}
          >
            관심 {product.prodDibs}
          </Typography>
        </CardContent> */}
      </Box>
    </>
  );
};

export default Product;
