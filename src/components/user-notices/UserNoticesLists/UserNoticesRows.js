import { Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const UserNoticesRows = ({
  notCode,
  notCategory,
  notTitle,
  notDate,
  notFiles,
  notView,
  queryString,
  isLast,
}) => {
  const notLink = `/notices/details/${notCode}`;

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
        <Typography sx={tableData}>{notCategory}</Typography>
      </Grid>

      <Grid item xs={8}>
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
            to={notLink}
            state={{ queryString: queryString }}
            title={notTitle}
            underline="hover"
            sx={{ color: '#000000', cursor: 'pointer' }}
          >
            {notTitle}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>{notDate}</Typography>
      </Grid>

      <Grid item xs={1}>
        <Typography sx={tableData}>{notView}</Typography>
      </Grid>
    </Grid>
  );
};

export default UserNoticesRows;
