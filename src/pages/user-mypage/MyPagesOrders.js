import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPagesOrders = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>사용자 마이페이지 주문 목록</div>
      <br />
      <button
        onClick={() => {
          navigate(`/purchase`, {
            state: {
              prevPage: 'mypages',
              products: [
                {
                  prodCode: 'TRN1234',
                  prodName: '테니스 라켓',
                  prodPrice: 10000,
                  prodShipping: 0,
                  prodHost: 'kim12',
                  prodPicture: 'trn123401.png',
                  period: 7,
                },
              ],
            },
          });
        }}
      >
        임시로 만든 결제 페이지 이동 버튼(주문 목록 - 구독 기간 연장 결제)
      </button>
    </div>
  );
};

export default MyPagesOrders;
