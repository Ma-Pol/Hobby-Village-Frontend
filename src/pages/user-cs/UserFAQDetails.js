import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid, Divider } from '@mui/material'; // Divider import
import { styled } from '@mui/system';
import UserFooter from '../../components/UserFooter';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 950,
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
  minHeight: '50px',
  display: 'flex',
  justifyContent: 'center',
}));

const UserFAQDetail = () => {
  const [faqDetail, setFaqDetail] = useState({});
  const { faqCode } = useParams();
  const location = useLocation();
  const prevQuery = location.state?.queryString;

  useEffect(() => {
    axios
      .get(`/cs/faq/${faqCode}`)
      .then((detail) => {
        setFaqDetail(detail.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [faqCode]);

  if (!faqDetail) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box style={{ maxWidth: '1150px', margin: 'auto' }}>
        <StyledPaper style={{ marginTop: '40px' }}>
          <Grid container>
            <LabelItem
              item
              xs={2}
              sx={{
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                카테고리 <Divider orientation="vertical" flexItem />
              </Typography>
            </LabelItem>
            <Grid
              item
              xs={10}
              sx={{
                px: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="h2">
                {faqDetail.faqCategory}
              </Typography>
            </Grid>

            <LabelItem
              item
              xs={2}
              sx={{
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                제목 <Divider orientation="vertical" flexItem />
              </Typography>
            </LabelItem>
            <Grid
              item
              xs={10}
              sx={{
                px: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                title={faqDetail.faqTitle}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {faqDetail.faqTitle}
              </Typography>
            </Grid>

            <LabelItem
              item
              xs={2}
              sx={{
                alignItems: 'flex-start',
                pt: 1,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                내용 <Divider orientation="vertical" flexItem />
              </Typography>
            </LabelItem>
            <Grid
              item
              xs={10}
              sx={{
                px: 1,
                pt: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="h2">
                {/* {faqDetail.faqContent} */}
                <div
                  dangerouslySetInnerHTML={{ __html: faqDetail.faqContent }}
                ></div>
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        <Box style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link
            to={
              prevQuery === undefined
                ? `/cs/faq/lists?filter=none&pages=1`
                : `/cs/faq/lists${prevQuery}`
            }
          >
            <StyledButton>목록</StyledButton>
          </Link>
        </Box>
        <UserFooter />
      </Box>
    );
  }
};

export default UserFAQDetail;
