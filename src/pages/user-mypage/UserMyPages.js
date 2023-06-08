import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import MyPagesOrders from './MyPagesOrders';
import MyPagesRequests from './MyPagesRequests';
import MyPagesAddresses from './MyPagesAddresses';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';
import UserReviews from '../user-reviews/UserReviews';

const UserMyPages = () => {
  const sessionEmail = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기
  const { email } = useParams();

  if (sessionEmail === null) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to="/login" replace={true} />;
  }

  if (sessionEmail !== email) {
    alert('접근 권한이 없습니다.');
    const url = `/mypages/${sessionEmail}/orders?odrState=payment-completed`;
    return <Navigate to={url} replace={true} />;
  }

  return (
    <>
      <UserHeader />
      <Routes>
        <Route exact path="orders" element={<MyPagesOrders />} />
        <Route exact path="requests/lists" element={<MyPagesRequests />} />
        <Route exact path="addresses/*" element={<MyPagesAddresses />} />
        <Route exact path="reviews/*" element={<UserReviews />} />
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
      <UserFooter />
    </>
  );
};

export default UserMyPages;
