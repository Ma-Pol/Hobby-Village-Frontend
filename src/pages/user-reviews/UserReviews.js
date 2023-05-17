import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserReviewsLists from './UserReviewsLists';
import UserReviewsDetails from './UserReviewsDetails';
import UserReviewsCreate from './UserReviewsCreate';
import UserReviewsModify from './UserReviewsModify';

const UserReviews = () => {
  return (
    <>
      <Routes>
        <Route exact path=":email/lists" element={<UserReviewsLists />} />
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
