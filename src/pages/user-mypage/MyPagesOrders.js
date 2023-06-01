import React from 'react';

import { Box, Container, Typography } from '@mui/material';

const MyPagesOrders = () => {
  const email = 'kim@naver.com'; // 임시

  const userOrderListRow = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  };

  const mypageRow = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const mypageCategoryRow = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <Container>
      <Box>
        {/* My Page 등록 글씨 표기 시작 */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mt: 5,
            mb: 1,
            pl: 2,
            pr: 1,
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          My page
        </Typography>

        <Box sx={mypageRow}>
          {/* 사용자 아이콘 */}
          <Box>
            {' '}
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
              취미마스터
            </Typography>
            <div>회원정보 변경</div>
            <a href={`/mypages/${email}/addresses/lists`}>배송지 관리</a>
          </Box>

          {/* 마이페이지 카테고리 아이콘 */}
          <Box sx={{ width: '800px' }}>
            <Box sx={mypageCategoryRow}>
              <Box sx={{ width: '300px' }}>적립금 관리 &#62;</Box>
              <Box sx={{ width: '225px' }}>주문 내역 &#62;</Box>
              <Box sx={{ width: '225px' }}>리뷰 관리 &#62;</Box>
            </Box>
            <Box sx={mypageCategoryRow}>
              <Box sx={{ width: '300px' }}>쿠폰 관리 &#62;</Box>
              <Box sx={{ width: '225px' }}>찜 목록 &#62;</Box>
              <Box sx={{ width: '225px' }}>물품 판매/위탁 &#62;</Box>
            </Box>
          </Box>
        </Box>

        {/* 주문내역 */}
        <Box>
          {/* 주문 내역 글씨 표기 시작 */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mt: 5,
              mb: 1,
              pl: 2,
              pr: 1,
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            주문 내역
          </Typography>
          {/* 주문 상태 표시 바 */}

          <Box sx={userOrderListRow}>
            <Box>
              결제완료<br></br>0
            </Box>
            <Box>&#62;</Box>
            <Box>
              배송준비<br></br>0
            </Box>
            <Box>&#62;</Box>
            <Box>
              배송중<br></br>1
            </Box>
            <Box>&#62;</Box>
            <Box>
              배송완료<br></br>0
            </Box>
            <Box>&#62;</Box>
            <Box>
              반납중<br></br>0
            </Box>
            <Box>&#62;</Box>
            <Box>
              반납완료<br></br>23
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MyPagesOrders;
