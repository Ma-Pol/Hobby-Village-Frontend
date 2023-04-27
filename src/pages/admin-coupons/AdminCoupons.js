import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminCouponsLists from './AdminCouponsLists';
import AdminCouponsDetails from './AdminCouponsDetails';
import AdminCouponsCreate from './AdminCouponsCreate';

const AdminCoupons = () => {
  return (
    <Routes>
      <Route path="/m/coupons/lists" element={<AdminCouponsLists />} />
      <Route
        path="/m/coupons/details/:couponCode"
        element={<AdminCouponsDetails />}
      />
      <Route path="/m/coupons/create" element={<AdminCouponsCreate />} />
    </Routes>
  );
};

export default AdminCoupons;
