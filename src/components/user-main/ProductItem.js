import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductItem = ({ product }) => {
  const [productImage, setProductImage] = useState();

  useEffect(() => {
    axios
      .get(`/main/getImageName/${product.prodCode}`)
      .then((image) => {
        setProductImage(image.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.prodCode]);

  return (
    <Grid
      item
      xs={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        sx={{
          width: '170px',
          height: '170px',
          objectFit: 'cover',
          border: '1px solid #d0d0d0',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        alt={product.prodName}
        src={'http://localhost:8080/main/viewImage/' + productImage}
      />
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
    </Grid>
  );
};

export default ProductItem;
