import React from 'react';
import Banner from "components/user-main/Banner";
import MostPopularProducts from "components/user-main/MostPopularProducts";
import MainAds from "components/user-main/MainAds";
import MostPopularBrand from "components/user-main/MostPopularBrand";

function UserMain(props) {
  return (
    <div className = "layout"> 
      <Banner></Banner>
      <MostPopularProducts></MostPopularProducts>
      <MainAds></MainAds>
      <MostPopularBrand></MostPopularBrand>
  </div>
  );
};

export default UserMain;
