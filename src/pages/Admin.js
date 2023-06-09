import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AdminMain from './admin-main/AdminMain';
import AdminLogin from './admin-login/AdminLogin';
import AdminUsers from './admin-users/AdminUsers';
import AdminOrders from './admin-orders/AdminOrders';
import AdminProducts from './admin-products/AdminProducts';
import AdminRequests from './admin-requests/AdminRequests';
import AdminReviews from './admin-reviews/AdminReviews';
import AdminCoupons from './admin-coupons/AdminCoupons';
import AdminNotices from './admin-notices/AdminNotices';
import AdminFAQs from './admin-faq/AdminFAQs';
import AdminQnAs from './admin-qna/AdminQnAs';
import AdminHeader from '../components/AdminHeader';
import AdminStats from './admin-stats/AdminStats';

const Admin = () => {
  const location = useLocation();
  const id = sessionStorage.getItem('hobbyvillage-id');
  const nickname = sessionStorage.getItem('hobbyvillage-nickname');

  if (id === null && nickname === null && location.pathname !== '/m/login') {
    alert('로그인이 필요합니다.');
    return <Navigate to={`/m/login`} replace={true} />;
  }

  return (
    <>
      <AdminHeader id={id} nickname={nickname} />
      <Routes>
        <Route exact path="" element={<AdminMain />} />
        <Route exact path="login" element={<AdminLogin />} />
        <Route exact path="users/*" element={<AdminUsers />} />
        <Route exact path="orders/*" element={<AdminOrders />} />
        <Route exact path="products/*" element={<AdminProducts />} />
        <Route exact path="requests/*" element={<AdminRequests />} />
        <Route exact path="reviews/*" element={<AdminReviews />} />
        <Route exact path="coupons/*" element={<AdminCoupons />} />
        <Route exact path="notices/*" element={<AdminNotices />} />
        <Route exact path="faqs/*" element={<AdminFAQs />} />
        <Route exact path="qnas/*" element={<AdminQnAs />} />
        <Route exact path="stats/*" element={<AdminStats />} />
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

export default Admin;
