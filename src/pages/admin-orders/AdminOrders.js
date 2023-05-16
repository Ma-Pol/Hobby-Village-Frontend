import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminOrdersLists from './AdminOrdersLists';
import AdminOrdersDetails from './AdminOrdersDetails';

const AdminOrders = () => {
  return (
    <>
      <Routes>
        <Route exact path="lists" element={<AdminOrdersLists />} />
        <Route exact path="details/:odrCode" element={<AdminOrdersDetails />} />
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

export default AdminOrders;
