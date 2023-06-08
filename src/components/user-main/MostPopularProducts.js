import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import ProductItem from './ProductItem';
import Loading from '../Loading';

const MostPopularProducts = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    axios
      .get(`/main/most-popular-products`)
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
    return <Loading height={'810.688px'} />;
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
        <Typography variant="h4" sx={{ mt: 7, mb: 5, fontWeight: 'bold' }}>
          인기 취미 물품
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            width: '95%',
            mb: 5,
          }}
        >
          {productList.length !== 0 &&
            productList.map((product) => (
              <ProductItem key={product.prodCode} product={product} />
            ))}
        </Grid>

        <Link
          onClick={() => window.scrollTo(0, 0)}
          to="/products/lists?category=all&sort=all&array=popular&pages=1"
          style={{
            marginBottom: '40px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              // fontFamily: 'SCDream4',
              color: '#000000',
              fontSize: '17px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            인기 취미 물품 더 보기
          </Typography>
        </Link>
      </Container>
    );
  }
};

export default MostPopularProducts;
