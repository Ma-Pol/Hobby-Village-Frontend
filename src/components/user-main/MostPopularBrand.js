import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import ProductItem from './ProductItem';

const MostPopularBrand = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getBrandProductList();
  }, []);

  const getBrandProductList = () => {
    axios
      .get(`/main/most-popular-brand-products`)
      .then((list) => {
        setProductList(list.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const linkToBrandLists = () => {
    navigate('/products/brand/lists');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      <Typography variant="h4" sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
        브랜드관 인기 취미 물품
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 5,
        }}
      >
        {productList.length !== 0 &&
          productList.map((product) => (
            <ProductItem key={product.prodCode} product={product} />
          ))}
      </Grid>

      <Typography
        variant="body1"
        sx={{
          mb: 5,
          color: '#000000',
          fontSize: '17px',
          fontWeight: 'bold',
          '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
          },
        }}
        onClick={linkToBrandLists}
      >
        브랜드관 인기 물품 더 보기
      </Typography>
    </Container>
  );
};

export default MostPopularBrand;
