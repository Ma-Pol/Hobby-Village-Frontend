import { Container } from '@mui/material';
import React from 'react';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';
import Banner from '../../components/user-main/Banner';
import MostPopularProducts from '../../components/user-main/MostPopularProducts';
import MainAds from '../../components/user-main/MainAds';
import MostPopularBrand from '../../components/user-main/MostPopularBrand';

function UserMain(props) {
  return (
    <>
      <UserHeader />
      {/* <Container> */}
      <Banner />
      <MostPopularProducts />
      <MainAds />
      <MostPopularBrand />
      {/* </Container> */}
      <UserFooter />
    </>
  );
}

export default UserMain;
