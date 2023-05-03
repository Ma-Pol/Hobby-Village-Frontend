import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminProductsLists from './AdminProductsLists';
import AdminProductsDetails from './AdminProductsDetails';
import AdminProductsCreate from './AdminProductsCreate';
import AdminProductsModify from './AdminProductsModify';

const AdminProducts = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<AdminProductsLists />} />
        <Route path="details/:prodCode" element={<AdminProductsDetails />} />
        <Route exact path="create" element={<AdminProductsCreate />} />
        <Route
          exact
          path="modify/:prodCode"
          element={<AdminProductsModify />}
        />
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

export default AdminProducts;
