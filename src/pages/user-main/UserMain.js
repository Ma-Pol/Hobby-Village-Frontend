import React from 'react';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';
import Banner from '../../components/user-main/Banner';
import MostPopularProducts from '../../components/user-main/MostPopularProducts';
import MainAds from '../../components/user-main/MainAds';
import MostPopularBrand from '../../components/user-main/MostPopularBrand';

const UserMain = () => {
  return (
    <>
      <UserHeader />
      <Banner />
      <MostPopularProducts />
      <MainAds />
      <MostPopularBrand />
      <UserFooter />
    </>
  );
};

export default UserMain;
