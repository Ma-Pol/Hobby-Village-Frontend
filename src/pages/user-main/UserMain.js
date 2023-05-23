import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';

const UserMain = () => {
  return (
    <>
      <UserHeader />
      <Container>
        임시 사용자 메인 페이지
        <br />
        <Link to="/m">관리자 메인 페이지로</Link>
        <br />
      </Container>
      <UserFooter />
    </>
  );
};

export default UserMain;
