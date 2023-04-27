import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProductsList from './UserProductsList';
import UserProductsBrandList from './UserProductsBrandList';
import UserProductsSearch from './UserProductsSearch';
import UserProductsDetails from './UserProductsDetails';

const UserProducts = () => {
  return (
    <Routes>
      <Route path="/products/lists" element={<UserProductsList />} />
      <Route path="/products/lists/search" element={<UserProductsSearch />} />
      <Route path="/products/brand/lists" element={<UserProductsBrandList />} />
      <Route
        path="/products/details/:prodCode"
        element={<UserProductsDetails />}
      />
    </Routes>
  );
};

export default UserProducts;
