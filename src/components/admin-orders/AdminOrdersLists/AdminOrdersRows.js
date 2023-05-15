import { Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const AdminOrdersRows = ({ order, queryString, isLast }) => {
  const {
    odrNumber,
    prodCode,
    deliDate,
    rentalPeriod,
    deadline,
    odrState,
    userCode,
    nickname,
  } = order;
  const orderLink = `/m/orders/details/${odrNumber}`;
  const productLink = `/m/products/details/${prodCode}`;
  const userLink = `/m/users/details/${userCode}`;

  const today = new Date();
  const deliDateObj = new Date(deliDate);
  const deadlineObj = new Date(deadline);
  const remainingDays =
    rentalPeriod - Math.floor((today - deliDateObj) / (1000 * 60 * 60 * 24));

  const tableLine = {
    px: 1,
    py: 0.5,
    borderTop: '1px solid #d8d8d8',
    borderBottom: '1px solid #d8d8d8',
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  };

  const tableLineBottom = {
    px: 1,
    py: 0.5,
    borderTop: '1px solid #d8d8d8',
    borderBottom: '2px solid #000000',
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  };

  // 첫 번째: 주문 취소 처리 된 경우: 회색 글씨 + 취소선
  // 두 번째: 반납 완료인 경우: 회색 글씨
  // 세 번째: 잔여 일수가 1일 이상 또는 상품 도착 전인 경우: 검은색 글씨
  // 네 번째: 잔여 일수가 0일 이하이면서 반납 기한이 지나지 않은 경우: 보라색 글씨
  // 다섯 번째: 잔여 일수가 0일 이하이면서 반납 기한이 지난 경우: 빨간색 글씨
  const tableData = {
    px: 1,
    py: 0.5,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color:
      odrState === '반납 완료' || odrState === '취소 처리 완료'
        ? '#bfbfbf'
        : remainingDays > 0 || deliDate === '1000-01-01'
        ? '#000000'
        : today < deadlineObj
        ? '#8f00ff'
        : '#ff0000',
    textDecoration: odrState === '취소 처리 완료' ? 'line-through' : 'none',

    '& > a': {
      color:
        odrState === '반납 완료' || odrState === '취소 처리 완료'
          ? '#bfbfbf'
          : remainingDays > 0 || deliDate === '1000-01-01'
          ? '#000000'
          : today < deadlineObj
          ? '#8f00ff'
          : '#ff0000',
      textDecoration: odrState === '취소 처리 완료' ? 'line-through' : 'none',
    },
  };

  return (
    <Grid container sx={isLast ? tableLineBottom : tableLine}>
      <Grid item xs={4}>
        <Typography title={odrNumber + '\n주문 상세 페이지'} sx={tableData}>
          <Link
            component={RouterLink}
            to={orderLink}
            state={{
              queryString: queryString,
            }}
            underline="hover"
            sx={{ cursor: 'pointer' }}
          >
            {odrNumber}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography title={prodCode + '\n상품 상세 페이지'} sx={tableData}>
          <Link href={productLink} underline="hover" sx={{ cursor: 'pointer' }}>
            {prodCode}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography title={nickname + '\n회원 상세 페이지'} sx={tableData}>
          <Link href={userLink} underline="hover" sx={{ cursor: 'pointer' }}>
            {nickname}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>
          {
            // 배송 전이면 대여일수 그대로 표시
            deliDate === '1000-01-01'
              ? rentalPeriod
              : remainingDays > 0
              ? // 배송 후면 [대여일수 - (오늘 - 배송일)] 표시
                remainingDays > 0
              : // 잔여 일수가 0일 이하면 0으로 표시
                0
          }
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>
          {deadline === '1000-01-01' ? '-' : deadline}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AdminOrdersRows;
