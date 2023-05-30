import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import Loading from '../Loading';
import React, { useEffect, useState } from 'react';

const CouponModal = ({ getUserData, setCouponListModal }) => {
  const [loading, setLoading] = useState(true);
  const email = sessionStorage.getItem('hobbyvillage-email');

  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/mypages/couponList/${email}`)
      .then((list) => {
        setCouponList(list.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCoupon = (couponCode) => {
    if (window.confirm('정말 쿠폰을 삭제하시겠습니까?')) {
      axios
        .delete(`/users/mypages/couponList/${email}?couponCode=${couponCode}`)
        .then(() => {
          setCouponList(
            couponList.filter((coupon) => coupon.couponCode !== couponCode)
          );
          getUserData();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  return (
    <Container
      sx={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '25%',
        zIndex: '99999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
        maxHeight: '500px',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '3px solid #d5d5d5',
        userSelect: 'none',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          my: '20px',
          fontWeight: 'bold',
        }}
      >
        보유 쿠폰 목록
      </Typography>
      <Box
        sx={{
          m: 0,
          p: 0,
          width: '340px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'scroll',
          height: '390px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {loading ? (
          <Loading height={'100%'} />
        ) : (
          couponList.map((coupon) => {
            const deadline =
              coupon.deadline !== null ? new Date(coupon.deadline) : null;
            const today = new Date();

            const discount =
              coupon.discountPer === 0
                ? String(coupon.discountFix).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ','
                  )
                : coupon.discountPer;
            const couponType = coupon.discountPer === 0 ? '원' : '%';
            return (
              <Box
                key={coupon.couponCode}
                sx={{
                  m: 0,
                  mb: '5px',
                  p: '10px',
                  width: '310px',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '3px solid #c3c36a',
                  borderRadius: '10px',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    m: 0,
                    pr: '5px',
                    width: '270px',
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRight: '2px solid #a9a9a9',
                  }}
                >
                  <Typography
                    variant="body1"
                    title={coupon.couponName}
                    sx={{
                      m: 0,
                      mb: '5px',
                      p: 0,
                      fontSize: '0.9rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {coupon.couponName}
                  </Typography>
                  {deadline !== null && deadline < today ? (
                    <Typography
                      variant="h5"
                      sx={{
                        m: 0,
                        mb: '5px',
                        p: 0,
                        fontWeight: 'bold',
                        fontSize: '1.3rem',
                        color: '#dd0000',
                      }}
                    >
                      기간이 만료된 쿠폰입니다
                    </Typography>
                  ) : (
                    <Typography
                      variant="h5"
                      sx={{
                        m: 0,
                        mb: '5px',
                        p: 0,
                        fontWeight: 'bold',
                      }}
                    >
                      {discount + couponType} 할인
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      m: 0,
                      p: 0,
                      fontSize: '0.9rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {coupon.deadline !== null
                      ? '~ ' + coupon.deadline + ' 까지'
                      : '기간 제한 없음'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    m: 0,
                    p: 0,
                    width: '25px',
                    height: '25px',
                  }}
                >
                  <img
                    onClick={() => {
                      deleteCoupon(coupon.couponCode);
                    }}
                    width="25px"
                    height="25px"
                    src="https://img.icons8.com/ios/100/close-window--v1.png"
                    alt="close-window--v1"
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </Box>
              </Box>
            );
          })
        )}
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            setCouponListModal(false);
          }}
          sx={{
            my: 2,
            width: '90px',
            height: '35px',
            borderRadius: '10px',
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '1rem',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#000000',
            },
          }}
        >
          닫기
        </Button>
      </Box>
    </Container>
  );
};

export default CouponModal;
