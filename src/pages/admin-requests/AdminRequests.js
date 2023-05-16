import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRequestsLists from './AdminRequestsLists';
import AdminRequestsDetails from './AdminRequestsDetails';

const AdminRequests = () => {
  return (
    <>
      <Routes>
        <Route exact path=":category/lists" element={<AdminRequestsLists />} />
        <Route
          exact
          path="details/:reqCode"
          element={<AdminRequestsDetails />}
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

export default AdminRequests;
