import { Container } from '@mui/material';
import React from 'react';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';

const UserMain = () => {
  return (
    <Container>
      <UserHeader />
      임시 사용자 메인 페이지
      <UserFooter />
    </Container>
  );
};

export default UserMain;
