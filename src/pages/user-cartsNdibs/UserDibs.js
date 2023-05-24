import React from 'react';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';
import { Navigate } from 'react-router-dom';

const UserDibs = () => {
  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기

  if (email === null) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <UserHeader />
      <div></div>
      <UserFooter />
    </>
  );
};

export default UserDibs;
