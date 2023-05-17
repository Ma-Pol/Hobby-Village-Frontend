import React from 'react';
import { useNavigate } from 'react-router';

const UserProductsDetails = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate(`/purchase`, {
              state: {
                prevPage: 'details',
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
                ],
              },
            });
          }}
        >
          임시로 만든 결제 페이지 이동 버튼(상품 상세)
        </button>
      </div>
    </div>
  );
};

export default UserProductsDetails;
