import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminNoticesLists from './AdminNoticesLists';
import AdminNoticesDetails from './AdminNoticesDetails';
import AdminNoticesCreate from './AdminNoticesCreate';
import AdminNoticesModify from './AdminNoticesModify';

const AdminNotices = () => {
  return (
    <Routes>
      <Route path="/m/notices/lists" element={<AdminNoticesLists />} />
      <Route
        path="/m/notices/details/:notCode"
        element={<AdminNoticesDetails />}
      />
      <Route path="/m/notices/create" element={<AdminNoticesCreate />} />
      <Route
        path="/m/notices/modify/:notCode"
        element={<AdminNoticesModify />}
      />
    </Routes>
  );
};

export default AdminNotices;
