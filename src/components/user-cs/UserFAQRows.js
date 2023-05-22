import { Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const UserFAQRows = ({
  faqCode,
  faqCategory,
  faqTitle,
  faqDate,
  queryString,
  isLast,
}) => {
  const faqLink = `/cs/faq/details/${faqCode}`;

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
        <Typography sx={tableData}>{faqCategory}</Typography>
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
            to={faqLink}
            state={{ queryString: queryString }}
            title={faqTitle}
            underline="hover"
            sx={{ color: '#000000', cursor: 'pointer' }}
          >
            {faqTitle}
          </Link>
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography sx={tableData}>{faqDate}</Typography>
      </Grid>
    </Grid>
  );
};

export default UserFAQRows;
