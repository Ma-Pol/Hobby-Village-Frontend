import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminReviewsLists from './AdminReviewsLists';
import AdminReviewsDetails from './AdminReviewsDetails';

const AdminReviews = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<AdminReviewsLists />} />
        <Route
          exact
          path="details/:revwCode"
          element={<AdminReviewsDetails />}
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

export default AdminReviews;
