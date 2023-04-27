import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserFAQLists from './UserFAQLists';
import UserQnALists from './UserQnALists';
import UserFAQDetails from './UserFAQDetails';
import UserQnADetails from './UserQnADetails';
import UserQnACreate from './UserQnACreate';

const UserCs = () => {
  return (
    <Routes>
      <Route path="/cs/faq/lists" element={<UserFAQLists />} />
      <Route path="/cs/qna/:email/lists" element={<UserQnALists />} />
      <Route path="/cs/faq/details/:faqCode" element={<UserFAQDetails />} />
      <Route path="/cs/qna/details/:qstCode" element={<UserQnADetails />} />
      <Route path="/cs/qna/create" element={<UserQnACreate />} />
    </Routes>
  );
};

export default UserCs;
