import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserReviewsLists from './UserReviewsLists';
import UserReviewsDetails from './UserReviewsDetails';
import UserReviewsCreate from './UserReviewsCreate';
import UserReviewsModify from './UserReviewsModify';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';

const UserReviews = () => {
  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기

  if (email === null) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <Routes>
        <Route exact path="lists" element={<UserReviewsLists />} />
        <Route
          exact
          path="details/:revwCode"
          element={<UserReviewsDetails />}
        />
        <Route exact path="create/:prodCode" element={<UserReviewsCreate />} />
        <Route exact path="modify/:revwCode" element={<UserReviewsModify />} />
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

export default UserReviews;
