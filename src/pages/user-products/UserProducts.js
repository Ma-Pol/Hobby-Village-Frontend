import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProductsList from './UserProductsList';
import UserProductsBrandList from './UserProductsBrandList';
import UserProductsSearch from './UserProductsSearch';
import UserProductsDetails from './UserProductsDetails';

const UserProducts = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<UserProductsList />} />
        <Route exact path="lists/search" element={<UserProductsSearch />} />
        <Route exact path="brand/lists" element={<UserProductsBrandList />} />
        {/* <Route
          exact
          path="details/:prodCode"
          element={<UserProductsDetails />}
        /> */}
        <Route path="details" element={<UserProductsDetails />} />
        <Route
          path="*"
          element={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '3rem',
              }}
            >
              에러페이지
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default UserProducts;
