import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminReviewsLists from './AdminReviewsLists';
import AdminReviewsDetails from './AdminReviewsDetails';

const AdminReviews = () => {
  return (
    <Routes>
      <Route path="/m/reviews/lists" element={<AdminReviewsLists />} />
      <Route
        path="/m/reviews/details/:revwCode"
        element={<AdminReviewsDetails />}
      />
    </Routes>
  );
};

export default AdminReviews;
