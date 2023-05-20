import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminNoticesLists from './AdminNoticesLists';
import AdminNoticesDetails from './AdminNoticesDetails';
import AdminNoticesCreate from './AdminNoticesCreate';
import AdminNoticesModify from './AdminNoticesModify';

const AdminNotices = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<AdminNoticesLists />} />
        <Route
          exact
          path="details/:notCode"
          element={<AdminNoticesDetails />}
        />
        <Route exact path="create" element={<AdminNoticesCreate />} />
        <Route path="modify/:notCode" element={<AdminNoticesModify />} />
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

export default AdminNotices;
