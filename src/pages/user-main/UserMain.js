import { Container } from '@mui/material';
import React from 'react';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';
import { Link } from 'react-router-dom';

const UserMain = () => {
  return (
    <Container>
      <UserHeader />
      임시 사용자 메인 페이지
      <br />
      <Link to="/m">관리자 메인 페이지로</Link>
      <br />
      <UserFooter />
    </Container>
  );
};

export default UserMain;
