import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminProductsLists from './AdminProductsLists';
import AdminProductsDetails from './AdminProductsDetails';
import AdminProductsCreate from './AdminProductsCreate';
import AdminProductsModify from './AdminProductsModify';

const AdminProducts = () => {
  return (
    <Routes>
      <Route path="/m/products/lists" element={<AdminProductsLists />} />
      <Route
        path="/m/products/details/:prodCode"
        element={<AdminProductsDetails />}
      />
      <Route path="/m/products/create" element={<AdminProductsCreate />} />
      <Route
        path="/m/products/modify/:prodCode"
        element={<AdminProductsModify />}
      />
    </Routes>
  );
};

export default AdminProducts;
