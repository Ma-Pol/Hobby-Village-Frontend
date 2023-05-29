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

  return (
    <Grid item xs={3}>
      <Box
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
      </Box>
    </Grid>
  );
};

export default ProductItem;
