import { Container } from '@mui/material';
import React from 'react';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';

const UserGuide = () => {
  return (
    <Container>
      <UserHeader />
      임시 이용 가이드 페이지
      <UserFooter />
    </Container>
  );
};

export default UserGuide;
