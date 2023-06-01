import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const ProductItem = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const [productImage, setProductImage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/main/getImageName/${product.prodCode}`)
      .then((image) => {
        setProductImage(image.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.prodCode]);

  const prodCardStyle = {
    m: 0,
    p: 0,
    mb: '10px',
    boxSizing: 'border-box',
    border: '1px solid #D8D8D8',
    width: '250px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.2s',
    '&:hover': {
      cursor: 'pointer',
      // boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.5)',
      // backgroundColor: '#f5f5f5',
    },
  };

  return (
    <Grid item xs={3}>
      <Box
        sx={prodCardStyle}
        onClick={() => {
          window.scrollTo(0, 0);
          navigate(`/products/details/${product.prodCode}`);
        }}
      >
        <Box
          sx={{
            m: 0,
            p: 0,
            width: '250px',
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
                width: '250px',
                height: '200px',
                backgroundColor: '#dddddd',
                borderRadius: '20px 20px 0 0',
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
                  textShadow:
                    '-1px 0px #ffffff, 0px 1px #ffffff, 1px 0px #ffffff, 0px -1px #ffffff',
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
                boxSizing: 'border-box',
                width: '250px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '20px 20px 0 0',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              alt={product.prodName}
              src={'http://localhost:8080/main/viewImage/' + productImage}
            />
          )}
        </Box>

        <Box sx={{ m: 0, width: '230px', mt: '10px', px: '10px' }}>
          {product.prodBrand !== null && (
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.prodBrand}
            </Typography>
          )}
          <Typography
            title={product.prodName}
            variant="body1"
            sx={{
              width: '100%',
              fontSize: '0.9rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.prodName}
          </Typography>
          <Box sx={{ m: 0, display: 'flex', alignItems: 'flex-end' }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {String(product.prodPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                ml: '3px',
              }}
            >
              원
            </Typography>
          </Box>

          <Box
            sx={{
              mb: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              width="12"
              height="12"
              src="https://img.icons8.com/pastel-glyph/64/000000/hearts--v1.png"
              alt="hearts--v1"
            />
            <Typography
              variant="body1"
              sx={{
                ml: '3px',
                fontSize: '0.7rem',
                color: '#ADADAD',
              }}
            >
              {'관심 ' + product.prodDibs}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* <Box
        onClick={() => {
          window.scrollTo(0, 0);
          navigate(`/products/details/${product.prodCode}`);
        }}
        sx={{
          m: 0,
          p: '24px 0px 8px 0px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '&:hover': {
            cursor: 'pointer',
            boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.5)',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        {loading ? (
          <Loading height={'170px'} />
        ) : (
          <Box
            component="img"
            sx={{
              width: '170px',
              height: '170px',
              objectFit: 'contain',
              border: '1px solid #d0d0d0',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            alt={product.prodName}
            src={'http://localhost:8080/main/viewImage/' + productImage}
          />
        )}

        <Box sx={{ m: 0, width: '170px', my: 1 }}>
          {product.prodBrand !== null && (
            <Typography
              title={product.prodBrand}
              variant="h6"
              sx={{
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.prodBrand}
            </Typography>
          )}
          <Typography
            title={product.prodName}
            variant="body1"
            sx={{
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
      </Box> */}
    </Grid>
  );
};

export default ProductItem;
