import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserNoticesLists from './UserNoticesLists';
import UserNoticesDetails from './UserNoticesDetails';

const UserNotices = () => {
  return (
    <Routes>
      <Route path="/notices/lists" element={<UserNoticesLists />} />
      <Route
        path="/notices/details/:notCode"
        element={<UserNoticesDetails />}
      />
    </Routes>
  );
};

export default UserNotices;
