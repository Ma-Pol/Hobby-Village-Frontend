import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminUsersLists from './AdminUsersLists';
import AdminUsersDetails from './AdminUsersDetails';

const AdminUsers = () => {
  return (
    <Routes>
      <Route path="/m/users/lists" element={<AdminUsersLists />} />
      <Route
        path="/m/users/details/:userCode"
        element={<AdminUsersDetails />}
      />
    </Routes>
  );
};

export default AdminUsers;
