import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserNoticesLists from './UserNoticesLists';
import UserNoticesDetails from './UserNoticesDetails';
import UserHeader from '../../components/UserHeader';
import { Container } from '@mui/material';
import UserFooter from '../../components/UserFooter';

const UserNotices = () => {
  return (
    <>
      <UserHeader />
      <Container>
        <Routes>
          <Route exact path="lists" element={<UserNoticesLists />} />
          <Route
            exact
            path="details/:notCode"
            element={<UserNoticesDetails />}
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
      </Container>
      <UserFooter />
    </>
  );
};

export default UserNotices;
