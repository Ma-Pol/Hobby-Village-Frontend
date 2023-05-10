import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCarts = () => {
  const navigate = useNavigate();

  const goToPurchase = () => {
    navigate('/purchase', {
      state: {
        products: [
          {
            prodCode: 'SAN8800',
            period: 14,
            prodName: '풀부이 땅콩 기본형',
            prodPrice: 2000,
            prodShipping: 1000,
            prodHost: 'lee01',
            prodPicture: 'san880001.png',
          },
          {
            prodCode: 'SSA2458',
            period: 7,
            prodName: '레몬 수영복',
            prodPrice: 10000,
            prodShipping: 0,
            prodHost: 'park7',
            prodPicture: 'ssa245801.png',
          },
          {
            prodCode: 'PBN1010',
            period: 21,
            prodName: '필라테스 바렐',
            prodPrice: 15000,
            prodShipping: 0,
            prodHost: 'ryu87',
            prodPicture: 'pbn101001.png',
          },
        ],
      },
    });
  };
  return (
    <div>
      <div>
        <button onClick={goToPurchase}>결제 페이지로 이동</button>
      </div>
    </div>
  );
};

export default UserCarts;
