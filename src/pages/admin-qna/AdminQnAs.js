import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminQnALists from './AdminQnALists';
import AdminQnADetails from './AdminQnADetails';
import AdminQnACreate from './AdminQnACreate';
import AdminQnAModify from './AdminQnAModify';

const AdminQnAs = () => {
  return (
    <Routes>
      <Route path="/m/qnas/lists" element={<AdminQnALists />} />
      <Route path="/m/qnas/details/:qnaCode" element={<AdminQnADetails />} />
      <Route path="/m/qnas/create" element={<AdminQnACreate />} />
      <Route path="/m/qnas/modify/:aswCode" element={<AdminQnAModify />} />
    </Routes>
  );
};

export default AdminQnAs;
