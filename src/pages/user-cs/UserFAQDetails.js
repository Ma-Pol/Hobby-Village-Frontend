import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid, Divider } from '@mui/material'; // Divider import
import { styled } from '@mui/system';
import Loading from '../../components/Loading';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 950,
  boxShadow: 'none',
  backgroundColor: '#f1f1f1',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  border: '1px solid black',
  color: 'black',
  fontSize: '1.0rem',
  height: '35px',
  fontWeight: 'bold',
  padding: theme.spacing(1),
}));

const LabelItem = styled(Grid)(({ theme }) => ({
  minHeight: '50px',
  display: 'flex',
  paddingLeft: '10px',
}));

const UserFAQDetail = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [faqDetail, setFaqDetail] = useState({});
  const { faqCode } = useParams();
  const location = useLocation();
  const prevQuery = location.state?.queryString;

  useEffect(() => {
    axios
      .get(`/cs/faq/check/${faqCode}`)
      .then((check) => {
        if (check.data === 0) {
          alert('존재하지 않는 FAQ입니다.');
          navigate(`/cs/faq/lists?filter=none&pages=1`, { replace: true });
        } else {
          getFaqDetail();
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqCode]);

  const getFaqDetail = () => {
    axios
      .get(`/cs/faq/${faqCode}`)
      .then((detail) => {
        setFaqDetail(detail.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  if (loading) {
    return <Loading height={'80vh'} />;
  } else {
    return (
      <Box style={{ maxWidth: '1150px', margin: 'auto', minHeight: '80vh' }}>
        <Box
          sx={{
            my: 5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.6rem',
            }}
          >
            FAQ 자주 묻는 질문
          </Typography>
        </Box>

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

            <Grid
              item
              xs={12}
              sx={{
                my: 1,
                height: '1px',
                borderBottom: '1px solid #7d7d7d',
              }}
            ></Grid>

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

            <Grid
              item
              xs={12}
              sx={{
                my: 1,
                height: '1px',
                borderBottom: '1px solid #7d7d7d',
              }}
            ></Grid>

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
                <div
                  dangerouslySetInnerHTML={{ __html: faqDetail.faqContent }}
                ></div>
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        <Box
          style={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '50px',
          }}
        >
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
      </Box>
    );
  }
};

export default UserFAQDetail;
