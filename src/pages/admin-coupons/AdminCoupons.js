import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminCouponsLists from './AdminCouponsLists';
import AdminCouponsDetails from './AdminCouponsDetails';
import AdminCouponsCreate from './AdminCouponsCreate';

const AdminCoupons = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<AdminCouponsLists />} />
        <Route exact path="details" element={<AdminCouponsDetails />} />
        {/* <Route
          exact
          path="details/:couponCode"
          element={<AdminCouponsDetails />}
        /> */}
        <Route exact path="create" element={<AdminCouponsCreate />} />
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

export default AdminCoupons;
