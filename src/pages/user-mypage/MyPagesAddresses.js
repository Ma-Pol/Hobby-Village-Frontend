import React from 'react';
import { Route, Routes } from 'react-router';
import MyPagesAddressesLists from './MyPagesAddressesLists';
import MyPagesAddressesCreate from './MyPagesAddressesCreate';
import MyPagesAddressesModify from './MyPagesAddressesModify';
import MyPageTop from '../../components/user-mypage/MyPageTop';

const MyPagesAddresses = () => {
  return (
    <>
      <MyPageTop />
      <Routes>
        <Route exact path="lists" element={<MyPagesAddressesLists />} />
        <Route exact path="create" element={<MyPagesAddressesCreate />} />
        <Route
          exact
          path="modify/:addressCode"
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

export default MyPagesAddresses;
