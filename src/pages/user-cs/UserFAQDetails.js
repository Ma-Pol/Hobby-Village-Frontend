import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid, Divider } from '@mui/material'; // Divider import
import { styled } from '@mui/system';
import UserHeader from '../../components/UserHeader';
import UserCsTitle from '../../components/user-cs/UserCsTitle';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 700,
  boxShadow: 'none',
  backgroundColor: '#f5f5f5',
  minHeight: '300px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  border: '1px solid black',
  color: 'black',
  fontSize: 'large',
  fontWeight: 'bold',
  padding: theme.spacing(1),
}));

const LabelItem = styled(Grid)(({ theme }) => ({
  paddingRight: theme.spacing(1),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(4), 
  fontWeight: 'bold', 
}));

const UserFAQDetail = () => {
  const [faq, setFaq] = useState({});
  const { faqCode } = useParams();

  useEffect(() => {
    axios
      .get(`/cs/faq/${faqCode}`)
      .then((response) => {
        setFaq(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [faqCode]);

  if (!faq) {
    return <div>Loading...</div>;
  }

  return (
    <Box style={{ maxWidth: '1150px', margin: 'auto' }}>
      <UserHeader />
      <UserCsTitle />
      <StyledPaper style={{ marginTop: '30px' }}>
        <Grid container spacing={3}>
          <LabelItem item xs={2}>
          <StyledTypography variant="body1">제목 <Divider orientation="vertical" flexItem /></StyledTypography>
          </LabelItem>
          <Grid item xs={10}>
            <Typography variant="body1">{faq.faqTitle}</Typography>
          </Grid>
          <LabelItem item xs={2}>
            <StyledTypography variant="body1">구분 <Divider orientation="vertical" flexItem /></StyledTypography>
          </LabelItem>
          <Grid item xs={10}>
            <Typography color="textSecondary">{faq.faqCategory}</Typography>
          </Grid>
          <LabelItem item xs={2}>
            <StyledTypography variant="body1">내용 <Divider orientation="vertical" flexItem /></StyledTypography>
          </LabelItem>
          <Grid item xs={10}>
            <Typography variant="body1">{faq.faqContent}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
      <Box style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/cs/faq/lists">
          <StyledButton>목록</StyledButton>
        </Link>
      </Box>
    </Box>
  );
};

export default UserFAQDetail;
