import { Grid, Typography, Link } from '@mui/material';
import React from 'react';

const AdminOrdersRows = ({
  odrCode,
  odrNumber,
  prodCode,
  odrEmail,
  userCode,
  deliDate,
  rentalPeriod,
  deadline,
  odrState,
  isLast,
}) => {
  const orderLink = `/m/orders/details/${odrCode}`;
  const productLink = `/m/products/details/${prodCode}`;
  const userLink = `/m/users/details/${userCode}`;

  const today = new Date();
  const deliDateObj = new Date(deliDate);
  const deadlineObj = new Date(deadline);

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

  // [0]: 잔여 일수 1일 이상
  // [1]: 잔여 일수 0일 이하 및 반납 기한 남음
  // [2]: 반납 기한 지남
  const tableData = [
    {
      px: 1,
      py: 0.5,
      textAlign: 'center',
      color: '#000000',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '& > a': {
        color: '#000000',
      },
    },
    {
      px: 1,
      py: 0.5,
      textAlign: 'center',
      color: '#8F00FF',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '& > a': {
        color: '#8F00FF',
      },
    },
    {
      px: 1,
      py: 0.5,
      textAlign: 'center',
      color: '#FF0000',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '& > a': {
        color: '#FF0000',
      },
    },
  ];

  return (
    <Grid container sx={isLast ? tableLineBottom : tableLine}>
      <Grid item xs={2}>
        <Typography
          title={odrNumber + '\n주문 상세 페이지'}
          sx={
            // 잔여 일수가 1 이상이면 검은색 글씨
            rentalPeriod -
              Math.floor((today - deliDateObj) / (1000 * 60 * 60 * 24)) >
              0 ||
            deliDate === '1000-01-01' ||
            odrState === '반납 완료'
              ? tableData[0]
              : // 잔여 일수가 0 이하면서 반납 기한이 지나지 않았으면 보라색 글씨
              Math.floor((deadlineObj - today) / (1000 * 60 * 60 * 24)) > 0
              ? tableData[1]
              : // 잔여 일수가 0 이하면서 반납 기한이 지났으면 빨간색 글씨
                tableData[2]
          }
        >
          <Link href={orderLink} underline="hover" sx={{ cursor: 'pointer' }}>
            {odrNumber}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography
          title={prodCode + '\n상품 상세 페이지'}
          sx={
            // 잔여 일수가 1 이상이면 검은색 글씨
            rentalPeriod -
              Math.floor((today - deliDateObj) / (1000 * 60 * 60 * 24)) >
              0 ||
            deliDate === '1000-01-01' ||
            odrState === '반납 완료'
              ? tableData[0]
              : // 잔여 일수가 0 이하면서 반납 기한이 지나지 않았으면 보라색 글씨
              Math.floor((deadlineObj - today) / (1000 * 60 * 60 * 24)) > 0
              ? tableData[1]
              : // 잔여 일수가 0 이하면서 반납 기한이 지났으면 빨간색 글씨
                tableData[2]
          }
        >
          <Link href={productLink} underline="hover" sx={{ cursor: 'pointer' }}>
            {prodCode}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography
          title={odrEmail + '\n회원 상세 페이지'}
          sx={
            // 잔여 일수가 1 이상이면 검은색 글씨
            rentalPeriod -
              Math.floor((today - deliDateObj) / (1000 * 60 * 60 * 24)) >
              0 ||
            deliDate === '1000-01-01' ||
            odrState === '반납 완료'
              ? tableData[0]
              : // 잔여 일수가 0 이하면서 반납 기한이 지나지 않았으면 보라색 글씨
              Math.floor((deadlineObj - today) / (1000 * 60 * 60 * 24)) > 0
              ? tableData[1]
              : // 잔여 일수가 0 이하면서 반납 기한이 지났으면 빨간색 글씨
                tableData[2]
          }
        >
          <Link href={userLink} underline="hover" sx={{ cursor: 'pointer' }}>
            {odrEmail}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography
          sx={
            // 잔여 일수가 1 이상이면 검은색 글씨
            rentalPeriod -
              Math.floor((today - deliDateObj) / (1000 * 60 * 60 * 24)) >
              0 ||
            deliDate === '1000-01-01' ||
            odrState === '반납 완료'
              ? tableData[0]
              : // 잔여 일수가 0 이하면서 반납 기한이 지나지 않았으면 보라색 글씨
              Math.floor((deadlineObj - today) / (1000 * 60 * 60 * 24)) > 0
              ? tableData[1]
              : // 잔여 일수가 0 이하면서 반납 기한이 지났으면 빨간색 글씨
                tableData[2]
          }
        >
          {
            // 배송 전이면 대여일수 그대로 표시
            deliDate === '1000-01-01'
              ? rentalPeriod
              : rentalPeriod -
                  Math.floor((today - deliDateObj) / (1000 * 60 * 60 * 24)) >
                0
              ? // 배송 후면 대여일수 - (오늘 - 배송일) 표시
                rentalPeriod -
                  Math.floor((today - deliDateObj) / (1000 * 60 * 60 * 24)) >
                0
              : // 잔여 일수가 0일 이하면 0으로 표시
                0
          }
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography
          sx={
            // 잔여 일수가 1 이상이면 검은색 글씨
            rentalPeriod -
              Math.floor((today - deliDateObj) / (1000 * 60 * 60 * 24)) >
              0 ||
            deliDate === '1000-01-01' ||
            odrState === '반납 완료'
              ? tableData[0]
              : // 잔여 일수가 0 이하면서 반납 기한이 지나지 않았으면 보라색 글씨
              Math.floor((deadlineObj - today) / (1000 * 60 * 60 * 24)) > 0
              ? tableData[1]
              : // 잔여 일수가 0 이하면서 반납 기한이 지났으면 빨간색 글씨
                tableData[2]
          }
        >
          {deadline === '1000-01-01' ? '-' : deadline}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AdminOrdersRows;
