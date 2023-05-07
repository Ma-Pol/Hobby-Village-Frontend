import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminFAQLists from './AdminFAQLists';
import AdminFAQDetails from './AdminFAQDetails';
import AdminFAQModify from './AdminFAQModify';
import AdminFAQCreate from './AdminFAQCreate';

const AdminFAQs = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<AdminFAQLists />} />
        <Route exact path="details/:faqCode" element={<AdminFAQDetails />} />
        <Route exact path="modify/:faqCode" element={<AdminFAQModify />} />
        <Route exact path="create" element={<AdminFAQCreate />} />
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

export default AdminFAQs;
