import { Grid, Typography, Button, Link } from '@mui/material';
import React from 'react';

const AdminCouponsRows = ({
  couponCode,
  couponName,
  startDate,
  deadline,
  isLast,
  couponDelete,
}) => {
  const couponLink = `/m/coupons/details/${couponCode}`;

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

  const tableData = {
    px: 1,
    py: 0.5,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  return (
    <Grid container sx={isLast ? tableLineBottom : tableLine}>
      <Grid item xs={2}>
        <Typography sx={tableData}>{couponCode}</Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography
          sx={{
            px: 1,
            py: 0.5,
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Link
            href={couponLink}
            title={couponName + '\n쿠폰 상세 페이지'}
            underline="hover"
            sx={{ color: '#000000', cursor: 'pointer' }}
          >
            {couponName}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>{startDate}</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>{deadline}</Typography>
      </Grid>

      <Grid item xs={1}>
        <Button
          onClick={() => {
            couponDelete(couponCode);
          }}
          variant="contained"
          sx={{
            width: '65px',
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
          삭제
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdminCouponsRows;
