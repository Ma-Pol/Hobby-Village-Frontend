import { Grid, Typography, Button, Link } from '@mui/material';
import React from 'react';

const AdminUsersRows = ({
  userCode,
  userEmail,
  userName,
  userDelete,
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
            href={userLink}
            title={userEmail}
            underline="hover"
            sx={{ color: '#000000', cursor: 'pointer' }}
          >
            {userEmail}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography title={userName} sx={tableData}>
          {userName}
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
            userDelete(userCode);
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
