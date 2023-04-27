import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRequestsLists from './AdminRequestsLists';
import AdminRequestsDetails from './AdminRequestsDetails';

const AdminRequests = () => {
  return (
    <Routes>
      <Route
        path="/m/requests/:category/lists"
        element={<AdminRequestsLists />}
      />
      <Route
        path="/m/requests/details/reqCode"
        element={<AdminRequestsDetails />}
      />
    </Routes>
  );
};

export default AdminRequests;
