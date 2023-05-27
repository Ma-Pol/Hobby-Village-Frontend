import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
  },
  box1: {
    backgroundColor: '#E4E58E',
  },
  box2: {
    backgroundColor: '#EFF0AA',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gridGap: '16px',
    width: '600px',
    height: '600px',
    margin: '0 auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const AdminMain = () => {
  const classes = useStyles();
  const urls = [
    '/m/users/lists?sort=-userCode&pages=1',
    '/m/coupons/lists?sort=-startDate&filter=none&pages=1',
    '/m/products/lists?sort=-prodRegiDate&filter=none&pages=1',
    '/m/orders/lists?sort=-odrDate&filter=none&pages=1',
    '/m/reviews/lists?sort=-revwRegiDate&filter=none&pages=1',
    '/m/requests/sell/lists?sort=-reqDate&filter=none&pages=1',
    '/m/notices/lists?sort=-notDate&filter=none&pages=1',
    '/m/faqs/lists?sort=-faqDate&filter=none&pages=1',
    '/m/qnas/lists?sort=-qstDate&filter=none&pages=1',
  ];

  const texts = [
    '회원관리',
    '쿠폰 관리',
    '상품목록 관리',
    '주문 관리',
    '물품리뷰 관리',
    '물품 판매/위탁\n신청목록 관리',
    '공지사항 관리',
    'FAQ 관리',
    '1:1 문의 관리',
  ];

  const renderBox = (url, index, text) => {
    const boxClass = index % 2 === 0 ? classes.box1 : classes.box2;

    return (
      <Link
        key={index}
        component={RouterLink}
        to={url}
        style={{ textDecoration: 'none' }}
      >
        <Box className={`${classes.box} ${boxClass}`}>
          <Typography
            variant="h6"
            align="center"
            style={{ fontWeight: 'bold', color: 'black' }}
          >
            {' '}
            {/* Black text and increased size */}
            {text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Box>
      </Link>
    );
  };

  return (
    <Box
      className={classes.container}
      sx={{
        userSelect: 'none',
      }}
    >
      {urls.map((url, index) => renderBox(url, index, texts[index]))}
      <button
        onClick={() => {
          window.location.href = '/';
        }}
      >
        사용자 메인 페이지
      </button>
    </Box>
  );
};

export default AdminMain;
