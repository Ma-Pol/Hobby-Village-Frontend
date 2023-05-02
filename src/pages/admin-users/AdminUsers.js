import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminUsersLists from './AdminUsersLists';
import AdminUsersDetails from './AdminUsersDetails';

const AdminUsers = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<AdminUsersLists />} />
        <Route exact path="details/:userCode" element={<AdminUsersDetails />} />
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

export default AdminUsers;
