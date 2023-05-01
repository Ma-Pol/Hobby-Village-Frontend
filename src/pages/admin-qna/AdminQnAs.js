import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminQnALists from './AdminQnALists';
import AdminQnADetails from './AdminQnADetails';
import AdminQnACreate from './AdminQnACreate';
import AdminQnAModify from './AdminQnAModify';

const AdminQnAs = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<AdminQnALists />} />
        <Route exact path="details/:qnaCode" element={<AdminQnADetails />} />
        <Route exact path="create" element={<AdminQnACreate />} />
        <Route exact path="modify/:aswCode" element={<AdminQnAModify />} />
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

export default AdminQnAs;
