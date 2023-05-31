import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import MyPageTop from '../../components/user-mypage/MyPageTop';
import { Box, Container, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MypagesOrdersRows from 'components/user-mypage/MypagesOrders/MypagesOrdersRows';

const stateBox = {
  m: 0,
  p: 0,
  width: '9%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',
  '&:hover': {
    backgroundColor: '#e3e38a80',
  },
};

const selectedStateTitle = {
  fontWeight: 'bold',
  fontSize: '1.1rem',
  color: '#000000',
};

const selectedStateCount = {
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#c3c36a',
};

const notSelectedState = {
  fontSize: '1rem',
  color: '#a4a4a4',
};

const MyPagesOrders = () => {
  const email = sessionStorage.getItem('hobbyvillage-email');

  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [odrState, setOdrState] = useState(
    searchParams.get('odrState') || 'payment-completed'
  );

  const [orderCountList, setOrderCountList] = useState([]); // 주문 상태별 주문 개수
  const [orderList, setOrderList] = useState([]); // 주문 내역

  // 주문 상태별 주문 개수 가져오기
  useEffect(() => {
    axios
      .get(`/orders/mypages/${email}/count`)
      .then((list) => {
        setOrderCountList(list.data);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 주문 내역 가져오기
  useEffect(() => {
    axios
      .get(
        `/orders/mypages/${email}/lists?odrState=${searchParams.get(
          'odrState'
        )}`
      )
      .then((list) => {
        setOrderList(list.data);
        setOdrState(searchParams.get('odrState'));
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleStateChange = (value) => {
    searchParams.set('odrState', value);
    setSearchParams(searchParams);
  };

  if (loading) {
    return <Loading height="40vh" />;
  } else {
    return (
      <>
        <MyPageTop />

        <Container
          sx={{
            minHeight: '60vh',
            mt: '40px',
            userSelect: 'none',
            width: '1100px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              margin: '30px 0 20px 0',
            }}
          >
            주문 내역
          </Typography>

          {/* 주문내역 전체 내용 */}
          <Box
            sx={{
              width: '1000px',
              mx: 'auto',
              mt: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* 주문 내역 - 주문 상태 */}
            <Box
              sx={{
                boxSizing: 'border-box',
                px: '20px',
                mb: '20px',
                width: '100%',
                height: '100px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #bdbdbd',
                borderRadius: '10px',
                boxShadow: '1px 1px 1px 0px rgba(0,0,0,0.4)',
              }}
            >
              <Box
                onClick={() => {
                  handleStateChange('payment-completed');
                }}
                sx={stateBox}
              >
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'payment-completed'
                      ? selectedStateTitle
                      : notSelectedState
                  }
                >
                  결제 완료
                </Typography>
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'payment-completed'
                      ? selectedStateCount
                      : notSelectedState
                  }
                >
                  {orderCountList[0]}건
                </Typography>
              </Box>
              <img
                width="25px"
                height="25px"
                src="https://img.icons8.com/windows/32/double-right.png"
                alt="double-right"
              />
              <Box
                onClick={() => {
                  handleStateChange('preparing-for-delivery');
                }}
                sx={stateBox}
              >
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'preparing-for-delivery'
                      ? selectedStateTitle
                      : notSelectedState
                  }
                >
                  배송 준비
                </Typography>
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'preparing-for-delivery'
                      ? selectedStateCount
                      : notSelectedState
                  }
                >
                  {orderCountList[1]}건
                </Typography>
              </Box>
              <img
                width="25px"
                height="25px"
                src="https://img.icons8.com/windows/32/double-right.png"
                alt="double-right"
              />
              <Box
                onClick={() => {
                  handleStateChange('shipping');
                }}
                sx={stateBox}
              >
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'shipping'
                      ? selectedStateTitle
                      : notSelectedState
                  }
                >
                  배송 중
                </Typography>
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'shipping'
                      ? selectedStateCount
                      : notSelectedState
                  }
                >
                  {orderCountList[2]}건
                </Typography>
              </Box>
              <img
                width="25px"
                height="25px"
                src="https://img.icons8.com/windows/32/double-right.png"
                alt="double-right"
              />
              <Box
                onClick={() => {
                  handleStateChange('delivery-completed');
                }}
                sx={stateBox}
              >
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'delivery-completed'
                      ? selectedStateTitle
                      : notSelectedState
                  }
                >
                  배송 완료
                </Typography>
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'delivery-completed'
                      ? selectedStateCount
                      : notSelectedState
                  }
                >
                  {orderCountList[3]}건
                </Typography>
              </Box>
              <img
                width="25px"
                height="25px"
                src="https://img.icons8.com/windows/32/double-right.png"
                alt="double-right"
              />
              <Box
                onClick={() => {
                  handleStateChange('returning');
                }}
                sx={stateBox}
              >
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'returning'
                      ? selectedStateTitle
                      : notSelectedState
                  }
                >
                  반납 중
                </Typography>
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'returning'
                      ? selectedStateCount
                      : notSelectedState
                  }
                >
                  {orderCountList[4]}건
                </Typography>
              </Box>
              <img
                width="25px"
                height="25px"
                src="https://img.icons8.com/windows/32/double-right.png"
                alt="double-right"
              />
              <Box
                onClick={() => {
                  handleStateChange('returned');
                }}
                sx={stateBox}
              >
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'returned'
                      ? selectedStateTitle
                      : notSelectedState
                  }
                >
                  반납 완료
                </Typography>
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'returned'
                      ? selectedStateCount
                      : notSelectedState
                  }
                >
                  {orderCountList[5]}건
                </Typography>
              </Box>

              <img
                width="25px"
                height="25px"
                src="https://img.icons8.com/ios-filled/50/thick-vertical-line.png"
                alt="thick-vertical-line"
              />

              <Box
                onClick={() => {
                  handleStateChange('cancel-request');
                }}
                sx={stateBox}
              >
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'cancel-request'
                      ? selectedStateTitle
                      : notSelectedState
                  }
                >
                  취소 요청
                </Typography>
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'cancel-request'
                      ? selectedStateCount
                      : notSelectedState
                  }
                >
                  {orderCountList[6]}건
                </Typography>
              </Box>
              <img
                width="25px"
                height="25px"
                src="https://img.icons8.com/windows/32/double-right.png"
                alt="double-right"
              />
              <Box
                onClick={() => {
                  handleStateChange('canceled');
                }}
                sx={stateBox}
              >
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'canceled'
                      ? selectedStateTitle
                      : notSelectedState
                  }
                >
                  취소 완료
                </Typography>
                <Typography
                  variant="h6"
                  sx={
                    odrState === 'canceled'
                      ? selectedStateCount
                      : notSelectedState
                  }
                >
                  {orderCountList[7]}건
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                boxSizing: 'border-box',
                px: '20px',
                mb: '100px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #bdbdbd',
                borderRadius: '10px',
                boxShadow: '1px 1px 1px 0px rgba(0,0,0,0.4)',
              }}
            >
              {orderList.length === 0 ? (
                <Typography
                  variant="h6"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    py: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  주문 내역이 없습니다.
                </Typography>
              ) : (
                orderList.map((order) => (
                  <MypagesOrdersRows key={order.opCode} order={order} />
                ))
              )}
            </Box>
          </Box>
        </Container>
      </>
    );
  }
};

export default MyPagesOrders;
