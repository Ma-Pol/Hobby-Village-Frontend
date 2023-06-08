import React from 'react';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';
import { Navigate, useParams } from 'react-router-dom';
import UserDib from '../../components/user-cartsNdibs/UserDibs/UserDib';

const UserDibs = () => {
  const sessionEmail = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기
  const { email } = useParams();

  if (email === null) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to="/login" replace={true} />;
  }

  if (sessionEmail !== email) {
    alert('접근 권한이 없습니다.');
    const url = `/dibs/${sessionEmail}/lists/all`;
    return <Navigate to={url} replace={true} />;
  }

  return (
    <>
      <UserHeader />
      <UserDib />
      <UserFooter />
    </>
  );
};

export default UserDibs;
