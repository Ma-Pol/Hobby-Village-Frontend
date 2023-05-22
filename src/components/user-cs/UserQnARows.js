import { Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const AdminQnARows = ({
  qstCode,
  qstCategory,
  qstTitle,
  qstWriter,
  qstDate,
  qstState,
  userCode,
  queryString,
  isLast,
}) => {
  // const email = sessionStorage.getItem('email'); // 이메일을 세션에서 가져오기
  const email = 'bae@naver.com'; // 임시 이메일
  const qnaLink = `/cs/qna/${email}/details/${qstCode}`;

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
    color: qstState === 0 ? '#000000' : '#9a9a9a',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
  return (
    <Grid container sx={isLast ? tableLineBottom : tableLine}>
      <Grid item xs={2}>
        <Typography sx={tableData}>{qstCategory}</Typography>
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
            to={qnaLink}
            state={{ queryString: queryString }}
            title={qstTitle}
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
        <Typography sx={tableData}>{qstDate}</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>
          {qstState === 0 ? '답변 대기' : '답변 완료'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AdminQnARows;
