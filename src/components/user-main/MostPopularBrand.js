import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import ProductItem from './ProductItem';
import Loading from '../Loading';

const MostPopularBrand = () => {
  const [loading, setLoading] = useState(true);
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
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) {
    return <Loading height={'874.69px'} />;
  } else {
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
            width: '85%',
            mb: 5,
          }}
        >
          {productList.length !== 0 &&
            productList.map((product) => (
              <ProductItem key={product.prodCode} product={product} />
            ))}
        </Grid>

        <Link to="/products/brand/lists" style={{ marginBottom: '40px' }}>
          <Typography
            variant="body1"
            sx={{
              color: '#000000',
              fontSize: '17px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            브랜드관 인기 물품 더 보기
          </Typography>
        </Link>
      </Container>
    );
  }
};

export default MostPopularBrand;
