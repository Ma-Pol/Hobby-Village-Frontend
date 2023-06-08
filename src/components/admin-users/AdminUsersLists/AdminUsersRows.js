import { Grid, Typography, Button, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const AdminUsersRows = ({
  userCode,
  email,
  name,
  nickname,
  profPicture,
  checkRequest,
  queryString,
  isLast,
}) => {
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
      <Grid className="userEmail" item xs={6}>
        <Typography sx={tableData}>
          <Link
            component={RouterLink}
            to={userLink}
            state={{ queryString: queryString }}
            title={email + '\n회원 상세 페이지'}
            underline="hover"
            sx={{ color: '#000000', cursor: 'pointer' }}
          >
            {email}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography title={name} sx={tableData}>
          <Link
            component={RouterLink}
            to={userLink}
            state={{ queryString: queryString }}
            title={email + '\n회원 상세 페이지'}
            underline="hover"
            sx={{ color: '#000000', cursor: 'pointer' }}
          >
            {name}
          </Link>
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          textAlign: 'center',
        }}
      >
        <Button
          onClick={() => {
            checkRequest(email, nickname, profPicture);
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

export default AdminUsersRows;
