import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserFAQLists from './UserFAQLists';
import UserQnALists from './UserQnALists';
import UserFAQDetails from './UserFAQDetails';
import UserQnADetails from './UserQnADetails';
import UserQnACreate from './UserQnACreate';
import { Container } from '@mui/material';
import UserCsTitle from '../../components/user-cs/UserCsTitle';
import UserHeader from '../../components/UserHeader';

const UserCs = () => {
  return (
    <>
      <Container>
        <UserHeader />
        <UserCsTitle />
        <Routes>
          <Route exact path="faq/lists" element={<UserFAQLists />} />
          <Route exact path="qna/:email/lists" element={<UserQnALists />} />
          <Route
            exact
            path="faq/details/:faqCode"
            element={<UserFAQDetails />}
          />
          <Route
            exact
            path="qna/:email/details/:qstCode"
            element={<UserQnADetails />}
          />
          <Route exact path="qna/create" element={<UserQnACreate />} />
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
    </>
  );
};

export default UserCs;
