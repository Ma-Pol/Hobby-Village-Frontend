import React from 'react';
import { Link } from 'react-router-dom';

const UserProductsList = () => {
  return (
    <div>
      <div>사용자 상품 목록 페이지</div>
      <br />
      <Link to="/products/details/1">상품 상세 페이지로 이동</Link>
    </div>
  );
};

export default UserProductsList;
