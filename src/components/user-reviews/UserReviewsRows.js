import { Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const UserReviewsRows = ({
  revwCode,
  prodCode,
  prodName,
  revwRate,
  revwTitle,
  revwRegiDate,
  revwReport,
  queryString,
  isLast,
}) => {
  const sessionEmail = sessionStorage.getItem('hobbyvillage-email');
  const prodLink = `/products/details/${prodCode}`;
  const revwLink = `/mypages/${sessionEmail}/reviews/details/${revwCode}`;

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

  const tableData = [
    {
      px: 1,
      py: 0.5,
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '& > a': {
        color: '#000000',
        cursor: 'pointer',
      },
    },
    {
      px: 1,
      py: 0.5,
      textAlign: 'center',
      color: '#ff0000',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '& > a': {
        color: '#ff0000',
        cursor: 'pointer',
      },
    },
  ];

  const tableTitleData = [
    {
      px: 1,
      py: 0.5,
      textAlign: 'left',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '& > a': {
        color: '#000000',
        cursor: 'pointer',
      },
    },
    {
      px: 1,
      py: 0.5,
      textAlign: 'left',
      color: '#ff0000',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '& > a': {
        color: '#ff0000',
        cursor: 'pointer',
      },
    },
  ];

  return (
    <Grid container sx={isLast ? tableLineBottom : tableLine}>
      <Grid item xs={2}>
        <Typography
          sx={revwReport >= 5 ? tableTitleData[1] : tableTitleData[0]}
        >
          <Link
            href={prodLink}
            title={prodName + '\n상품 상세 페이지'}
            underline="hover"
          >
            {prodName}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={revwReport >= 5 ? tableData[1] : tableData[0]}>
          {revwRate === 1
            ? '★☆☆☆☆'
            : revwRate === 2
            ? '★★☆☆☆'
            : revwRate === 3
            ? '★★★☆☆'
            : revwRate === 4
            ? '★★★★☆'
            : '★★★★★'}
        </Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography
          sx={revwReport >= 5 ? tableTitleData[1] : tableTitleData[0]}
        >
          <Link
            component={RouterLink}
            to={revwLink}
            state={{ queryString: queryString }}
            title={revwTitle + '\n리뷰 상세 페이지'}
            underline="hover"
          >
            {revwTitle}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={revwReport >= 5 ? tableData[1] : tableData[0]}>
          {revwRegiDate}
        </Typography>
      </Grid>

      <Grid item xs={1}>
        <Typography sx={revwReport >= 5 ? tableData[1] : tableData[0]}>
          {revwReport}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserReviewsRows;
