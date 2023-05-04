import { Grid, Typography, Link } from '@mui/material';
import React from 'react';

const AdminQnARows = ({
  qstCode,
  qstCategory,
  qstTitle,
  qstWriter,
  qstDate,
  qstState,
  userCode,
  isLast,
}) => {
  const qnaLink = `/m/qnas/details/${qstCode}`;
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

  const tableData = [
    {
      px: 1,
      py: 0.5,
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    {
      px: 1,
      py: 0.5,
      textAlign: 'center',
      color: '#9a9a9a',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  ];

  return (
    <Grid container sx={isLast ? tableLineBottom : tableLine}>
      <Grid item xs={1}>
        <Typography sx={qstState === 0 ? tableData[0] : tableData[1]}>
          {qstCode}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={qstState === 0 ? tableData[0] : tableData[1]}>
          {qstCategory}
        </Typography>
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
            href={qnaLink}
            title={qstTitle + '\n문의 상세 페이지'}
            underline="hover"
            sx={
              qstState === 0
                ? { color: '#000000', cursor: 'pointer' }
                : { color: '#9a9a9a', cursor: 'pointer' }
            }
          >
            {qstTitle}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={qstState === 0 ? tableData[0] : tableData[1]}>
          <Link
            href={userLink}
            title={qstWriter + '\n회원 상세 페이지'}
            underline="hover"
            sx={
              qstState === 0
                ? { color: '#000000', cursor: 'pointer' }
                : { color: '#9a9a9a', cursor: 'pointer' }
            }
          >
            {qstWriter}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={qstState === 0 ? tableData[0] : tableData[1]}>
          {qstDate}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AdminQnARows;
