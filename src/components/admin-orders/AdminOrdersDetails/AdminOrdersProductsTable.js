import { Box, Button, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';

const tableRow = {
  display: 'flex',
  height: '50px',
  m: 0,
  p: 0,
  borderLeft: '1px solid #7a7a7a',
  borderTop: '1px solid #7a7a7a',
  borderRight: '1px solid #7a7a7a',
};

const tableRowBottom = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  m: 0,
  p: 0,
  border: '1px solid #7a7a7a',
};

const table4RowFirstCell = {
  minWidth: '140px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const table4RowSecondCell = {
  minWidth: '410px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
  overflow: 'hidden',
};

const table4RowThirdCell = {
  minWidth: '100px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const table4RowFourthCell = {
  minWidth: '127px',
  padding: '0 15px',
  overflow: 'hidden',
};

const tableHead = {
  lineHeight: '50px',
  fontWeight: 'bold',
  userSelect: 'none',
};

const tableBody = {
  lineHeight: '50px',
  userSelect: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const AdminOrdersProductsTable = ({
  getOrderProductLists,
  orderProduct,
  odrNumber,
  weekday,
}) => {
  const {
    opCode,
    prodCode,
    deliDate,
    rentalPeriod,
    deadline,
    odrState,
    prodCategory,
    prodName,
    prodPrice,
    prodShipping,
  } = orderProduct;
  const prodLink = `/m/products/details/${prodCode}`;

  const productReturn = () => {
    if (window.confirm('해당 상품을 반납 완료 처리 하시겠습니까?')) {
      axios
        .patch(`/m/orders/return`, {
          opCode: opCode,
          prodCode: prodCode,
        })
        .then((res) => {
          if (res.data === 1) {
            alert('반납 완료 처리 되었습니다.');
            getOrderProductLists(odrNumber);
          } else {
            alert('반납 완료 처리에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  return (
    <Grid
      container
      sx={{
        mx: 'auto',
        my: 2,
        width: '900px',
      }}
    >
      {/* 1행 시작 */}
      <Grid item xs={12} sx={tableRow}>
        {/* 1행 1열 시작 */}
        <Box sx={table4RowFirstCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            상품 번호
          </Typography>
        </Box>
        {/* 1행 1열 끝 */}

        {/* 1행 2열 시작 */}
        <Box sx={table4RowSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            <Link
              href={prodLink}
              title={prodCode + '\n상품 상세 페이지'}
              underline="hover"
              sx={{ color: '#000000', cursor: 'pointer' }}
            >
              {prodCode}
            </Link>
          </Typography>
        </Box>
        {/* 1행 2열 끝 */}

        {/* 1행 3열 시작 */}
        <Box sx={table4RowThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            주문 상태
          </Typography>
        </Box>
        {/* 1행 3열 끝 */}

        {/* 1행 4열 시작 */}
        <Box sx={table4RowFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {odrState}
          </Typography>
        </Box>
        {/* 1행 4열 끝 */}
      </Grid>
      {/* 1행 끝 */}

      {/* 2행 시작 */}
      <Grid item xs={12} sx={tableRow}>
        {/* 2행 1열 시작 */}
        <Box sx={table4RowFirstCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            상품 명
          </Typography>
        </Box>
        {/* 2행 1열 끝 */}

        {/* 2행 2열 시작 */}
        <Box sx={table4RowSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {prodName}
          </Typography>
        </Box>
        {/* 2행 2열 끝 */}

        {/* 2행 3열 시작 */}
        <Box sx={table4RowThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            카테고리
          </Typography>
        </Box>
        {/* 2행 3열 끝 */}

        {/* 2행 4열 시작 */}
        <Box sx={table4RowFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {prodCategory}
          </Typography>
        </Box>
        {/* 2행 4열 끝 */}
      </Grid>
      {/* 2행 끝 */}

      {/* 3행 시작 */}
      <Grid item xs={12} sx={tableRow}>
        {/* 3행 1열 시작 */}
        <Box sx={table4RowFirstCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            상품 가격
          </Typography>
        </Box>
        {/* 3행 1열 끝 */}

        {/* 3행 2열 시작 */}
        <Box sx={table4RowSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {prodPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;원
          </Typography>
        </Box>
        {/* 3행 2열 끝 */}

        {/* 3행 3열 시작 */}
        <Box sx={table4RowThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            배송비
          </Typography>
        </Box>
        {/* 3행 3열 끝 */}

        {/* 3행 4열 시작 */}
        <Box sx={table4RowFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {prodShipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            &nbsp;원
          </Typography>
        </Box>
        {/* 3행 4열 끝 */}
      </Grid>
      {/* 3행 끝 */}

      {/* 4행 시작 */}
      <Grid item xs={12} sx={tableRow}>
        {/* 4행 1열 시작 */}
        <Box sx={table4RowFirstCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            상품 배송일
          </Typography>
        </Box>
        {/* 4행 1열 끝 */}

        {/* 4행 2열 시작 */}
        <Box sx={table4RowSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {deliDate === '1000-01-01'
              ? '-'
              : deliDate + ' (' + weekday[new Date(deliDate).getDay()] + ')'}
          </Typography>
        </Box>
        {/* 4행 2열 끝 */}

        {/* 4행 3열 시작 */}
        <Box sx={table4RowThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            구독 기간
          </Typography>
        </Box>
        {/* 4행 3열 끝 */}

        {/* 4행 4열 시작 */}
        <Box sx={table4RowFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {rentalPeriod}&nbsp;일
          </Typography>
        </Box>
        {/* 4행 4열 끝 */}
      </Grid>
      {/* 4행 끝 */}

      {/* 5행 시작 */}
      <Grid item xs={12} sx={tableRow}>
        {/* 5행 1열 시작 */}
        <Box sx={table4RowFirstCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            반납 기한일
          </Typography>
        </Box>
        {/* 5행 1열 끝 */}

        {/* 5행 2열 시작 */}
        <Box sx={table4RowSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {deadline === '1000-01-01'
              ? '-'
              : deadline + ' (' + weekday[new Date(deadline).getDay()] + ')'}
          </Typography>
        </Box>
        {/* 5행 2열 끝 */}

        {/* 5행 3열 시작 */}
        <Box sx={table4RowThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            잔여 일수
          </Typography>
        </Box>
        {/* 5행 3열 끝 */}

        {/* 5행 4열 시작 */}
        <Box sx={table4RowFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {
              // 상품 배송일이 설정되지 않은 경우
              deliDate === '1000-01-01'
                ? // rentalPeriod 값을 출력
                  rentalPeriod
                : // 상품 배송일이 설정되어 있고, 남은 기한이 1보다 큰 경우
                rentalPeriod -
                    Math.floor(
                      (new Date() - new Date(deliDate)) / (1000 * 60 * 60 * 24)
                    ) >
                  0
                ? // 남은 기한을 출력
                  rentalPeriod -
                  Math.floor(
                    (new Date() - new Date(deliDate)) / (1000 * 60 * 60 * 24)
                  )
                : // 남은 기한이 0이하인 경우 0을 출력
                  '0'
            }
            &nbsp;일
          </Typography>
        </Box>
        {/* 5행 4열 끝 */}
      </Grid>
      {/* 5행 끝 */}

      {/* 6행 시작 */}
      <Grid item xs={12} sx={tableRowBottom}>
        {odrState === '결제 완료' && (
          <Button
            variant="contained"
            sx={{
              mx: 1,
              width: '100px',
              height: '30px',
              backgroundColor: '#f5b8b8',
              borderRadius: '15px',
              border: '1px solid #626262',
              color: '#000000',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'tomato',
                color: '#ffffff',
              },
            }}
          >
            주문 취소
          </Button>
        )}

        {odrState === '반납 중' && (
          <Button
            variant="contained"
            sx={{
              mx: 1,
              width: '100px',
              height: '30px',
              backgroundColor: '#c3c36a',
              borderRadius: '15px',
              border: '1px solid #626262',
              color: '#000000',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#c3c36a',
                color: '#ffffff',
              },
            }}
          >
            반납 완료
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default AdminOrdersProductsTable;
