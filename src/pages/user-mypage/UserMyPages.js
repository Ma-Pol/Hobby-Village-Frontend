import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPagesOrders from './MyPagesOrders';
import MyPagesRequests from './MyPagesRequests';
import MyPagesAddressesLists from './MyPagesAddressesLists';
import MyPagesAddressesCreate from './MyPagesAddressesCreate';
import MyPagesAddressesModify from './MyPagesAddressesModify';

const UserMyPages = () => {
  return (
    <>
      <Routes>
        <Route exact path="orders" element={<MyPagesOrders />} />
        <Route exact path="requests/lists" element={<MyPagesRequests />} />
        <Route
          exact
          path="addresses/lists"
          element={<MyPagesAddressesLists />}
        />
        <Route
          exact
          path="addresses/create"
          element={<MyPagesAddressesCreate />}
        />
        <Route
          exact
          path="addresses/modify"
          element={<MyPagesAddressesModify />}
        />
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

export default UserMyPages;
