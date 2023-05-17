import React from 'react';
import { useNavigate } from 'react-router';

const UserCarts = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate(`/purchase`, {
              state: {
                prevPage: 'carts',
                products: [
                  {
                    prodCode: 'SAN8800',
                    prodName: '풀부이 땅콩 기본형',
                    prodPrice: 100,
                    prodShipping: 0,
                    prodHost: 'lee01',
                    prodPicture: 'san880001.png',
                    period: 14,
                  },
                  // {
                  //   prodCode: 'TBN0005',
                  //   prodName: '테니스공 10pc',
                  //   prodPrice: 7000,
                  //   prodShipping: 0,
                  //   prodHost: 'baeMu',
                  //   prodPicture: 'tbn000501.png',
                  //   period: 7,
                  // },
                  // {
                  //   prodCode: 'TRN1234',
                  //   prodName: '테니스 라켓',
                  //   prodPrice: 10000,
                  //   prodShipping: 0,
                  //   prodHost: 'kim12',
                  //   prodPicture: 'trn123401.png',
                  //   period: 7,
                  // },
                  // {
                  //   prodCode: 'WGE1000',
                  //   prodName: '홈짐 미니랙',
                  //   prodPrice: 10000,
                  //   prodShipping: 5000,
                  //   prodHost: '취미빌리지',
                  //   prodPicture: 'wge100001.png',
                  //   period: 7,
                  // },
                ],
              },
            });
          }}
        >
          임시로 만든 결제 페이지 이동 버튼
        </button>
      </div>
    </div>
  );
};

export default UserCarts;
