import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserReviewsLists from './UserReviewsLists';
import UserReviewsDetails from './UserReviewsDetails';
import UserReviewsCreate from './UserReviewsCreate';
import UserReviewsModify from './UserReviewsModify';

const UserReviews = () => {
  return (
    <Routes>
      <Route path="/reviews/:email/lists" element={<UserReviewsLists />} />
      <Route
        path="/reviews/details/:revwCode"
        element={<UserReviewsDetails />}
      />
      <Route path="/reviews/create/:prodCode" element={<UserReviewsCreate />} />
      <Route path="/reviews/modify/:revwCode" element={<UserReviewsModify />} />
    </Routes>
  );
};

export default UserReviews;
