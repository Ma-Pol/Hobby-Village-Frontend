import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminMain from './admin-main/AdminMain';
import AdminUsers from './admin-user/AdminUsers';
import AdminOrders from './admin-order/AdminOrders';
import AdminProducts from './admin-product/AdminProducts';
import AdminRequests from './admin-request/AdminRequests';
import AdminReviews from './admin-review/AdminReviews';
import AdminCoupons from './admin-coupons/AdminCoupons';
import AdminNotices from './admin-notice/AdminNotices';
import AdminFAQs from './admin-faq/AdminFAQs';
import AdminQnAs from './admin-qna/AdminQnAs';

const Admin = () => {
  return (
    <Routes>
      <Route exact path="/m" element={<AdminMain />} />
      <Route path="/m/users" element={<AdminUsers />} />
      <Route path="/m/orders" element={<AdminOrders />} />
      <Route path="/m/products" element={<AdminProducts />} />
      <Route path="/m/requests" element={<AdminRequests />} />
      <Route path="/m/reviews" element={<AdminReviews />} />
      <Route path="/m/coupons" element={<AdminCoupons />} />
      <Route path="/m/notices" element={<AdminNotices />} />
      <Route path="/m/faqs" element={<AdminFAQs />} />
      <Route path="/m/qnas" element={<AdminQnAs />} />
    </Routes>
  );
};

export default Admin;
