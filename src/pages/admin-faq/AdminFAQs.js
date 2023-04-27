import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminFAQLists from './AdminFAQLists';
import AdminFAQDetails from './AdminFAQDetails';
import AdminFAQModify from './AdminFAQModify';
import AdminFAQCreate from './AdminFAQCreate';

const AdminFAQs = () => {
  return (
    <Routes>
      <Route path="/m/faqs/lists" element={<AdminFAQLists />} />
      <Route path="/m/faqs/details/:faqCode" element={<AdminFAQDetails />} />
      <Route path="/m/faqs/modify/:faqCode" element={<AdminFAQModify />} />
      <Route path="/m/faqs/create" element={<AdminFAQCreate />} />
    </Routes>
  );
};

export default AdminFAQs;
