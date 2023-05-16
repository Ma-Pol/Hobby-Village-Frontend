import { Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const AdminRequestsRows = ({
  reqCode,
  reqSort,
  reqCategory,
  reqTitle,
  reqProgress,
  userCode,
  nickname,
  category,
  queryString,
  isLast,
}) => {
  const reqLink = `/m/requests/details/${reqCode}`;
  const userLink = `/m/users/details/${userCode}`;

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
      <Grid item xs={1}>
        <Typography sx={tableData}>{reqSort}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography sx={tableData}>{reqCategory}</Typography>
      </Grid>

      <Grid item xs={6}>
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
            component={RouterLink}
            to={reqLink}
            state={{
              category: category,
              queryString: queryString,
            }}
            title={reqTitle + '\n신청 상세 페이지'}
            underline="hover"
            sx={{ color: '#000000', cursor: 'pointer' }}
          >
            {reqTitle}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>
          <Link
            href={userLink}
            title={nickname + '\n회원 상세 페이지'}
            underline="hover"
            sx={{ color: '#000000', cursor: 'pointer' }}
          >
            {nickname}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>{reqProgress}</Typography>
      </Grid>
    </Grid>
  );
};

export default AdminRequestsRows;
