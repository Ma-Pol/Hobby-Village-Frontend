import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AdminStatsMonthOrder from '../../components/admin-stats/AdminStatsMonthOrder';
import Loading from '../../components/Loading';
import AdminStatsMonthRequest from '../../components/admin-stats/AdminStatsMonthRequest';
import AdminStatsMonthReview from '../../components/admin-stats/AdminStatsMonthReview';
import AdminStatsMonthlyUser from '../../components/admin-stats/AdminStatsMonthUser';

const AdminStats = () => {
  const [loading, setLoading] = useState(true);
  const [todayOrderPrice, setTodayOrderPrice] = useState(0); // 오늘 주문 금액
  const [todayOrderCount, setTodayOrderCount] = useState(0); // 오늘 주문 건수
  const [monthlyOrderData, setMonthlyOrderData] = useState([]); // 월별 주문 건수
  const [monthlyRequestData, setMonthlyRequestData] = useState([]); // 월별 문의 건수
  const [monthlyReviewData, setMonthlyReviewData] = useState([]); // 월별 리뷰 건수
  const [monthlyUserData, setMonthlyUserData] = useState([]); // 일별 가입/탈퇴 수

  useEffect(() => {
    axios
      .all([
        axios.get('/m/stats/today-order-price'),
        axios.get('/m/stats/today-order-count'),
        axios.get('/m/stats/monthly-order'),
        axios.get('/m/stats/monthly-request'),
        axios.get('/m/stats/monthly-review'),
        axios.get('/m/stats/monthly-user'),
      ])
      .then(
        axios.spread((price, count, order, request, review, user) => {
          const odrData = order.data;
          const reqData = request.data;
          const revwData = review.data;
          const userData = user.data;

          for (let i = 0; i < odrData.length; i++) {
            odrData[i].주문 = odrData[i].orderCount;
            delete odrData[i].orderCount;
            odrData[i].추가주문 = odrData[i].exOrderCount;
            delete odrData[i].exOrderCount;
          }

          for (let i = 0; i < reqData.length; i++) {
            reqData[i].판매신청 = reqData[i].sellRequestCount;
            delete reqData[i].sellRequestCount;
            reqData[i].위탁신청 = reqData[i].consignRequestCount;
            delete reqData[i].consignRequestCount;
          }

          for (let i = 0; i < revwData.length; i++) {
            revwData[i].리뷰 = revwData[i].reviewCount;
            delete revwData[i].reviewCount;
          }

          for (let i = 0; i < userData.length; i++) {
            userData[i].가입회원 = userData[i].joinCount;
            delete userData[i].joinCount;
            userData[i].탈퇴회원 = userData[i].leaveCount;
            delete userData[i].leaveCount;
          }

          setTodayOrderPrice(price.data);
          setTodayOrderCount(count.data);
          setMonthlyOrderData(odrData);
          setMonthlyRequestData(reqData);
          setMonthlyReviewData(revwData);
          setMonthlyUserData(userData);
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Container sx={{ userSelect: 'none' }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          mt: 5,
          mb: 1,
          pl: 1,
          pr: 1,
          fontWeight: 'bold',
          fontSize: '3vh',
        }}
      >
        서비스 이용 통계
      </Typography>
      <Box
        sx={{
          m: '30px auto',
          width: '1000px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading ? (
          <Loading height={'80vh'} />
        ) : (
          <>
            {/* 총 주문 금액 및 주문 건수 시작 */}
            <Box
              sx={{
                display: 'flex',
                mb: 5,
              }}
            >
              <Box sx={{ width: '300px', mr: 20 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    mt: 1,
                    mb: 1,
                    fontWeight: 'bold',
                    fontSize: '2vh',
                  }}
                >
                  오늘 총 주문 금액
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    ml: 2,
                    p: 1,
                    border: '1px solid #000000',
                    borderRadius: '8px',
                    width: '250px',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.5vh',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {todayOrderPrice} 원
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: '300px' }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    mt: 1,
                    mb: 1,
                    fontWeight: 'bold',
                    fontSize: '2vh',
                  }}
                >
                  오늘 총 주문 건수
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    ml: 2,
                    p: 1,
                    border: '1px solid #000000',
                    borderRadius: '8px',
                    width: '150px',
                    position: 'relative',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.5vh',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {todayOrderCount} 건
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* 총 주문 금액 및 주문 건수 끝 */}

            {/* 월별 주문 현황 */}
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mt: 1,
                mb: 1,
                fontWeight: 'bold',
                fontSize: '2vh',
              }}
            >
              월별 주문 현황
            </Typography>
            <AdminStatsMonthOrder orderData={monthlyOrderData} />

            {/* 월별 판매/위탁 신청 현황  */}
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mt: 1,
                mb: 1,
                fontWeight: 'bold',
                fontSize: '2vh',
              }}
            >
              월별 판매/위탁 신청 현황
            </Typography>
            <AdminStatsMonthRequest requestData={monthlyRequestData} />

            {/* 월별 리뷰 현황  */}
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mt: 1,
                mb: 1,
                fontWeight: 'bold',
                fontSize: '2vh',
              }}
            >
              월별 리뷰 작성 현황
            </Typography>
            <AdminStatsMonthReview reviewData={monthlyReviewData} />

            {/* 월별 가입/탈퇴 회원 수 현황 */}
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mt: 1,
                mb: 1,
                fontWeight: 'bold',
                fontSize: '2vh',
              }}
            >
              월별 가입/탈퇴 회원 수 현황
            </Typography>
            <AdminStatsMonthlyUser userData={monthlyUserData} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default AdminStats;
