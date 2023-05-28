import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import axios from 'axios';
import { Box, Grid, Paper, Button, Typography } from '@mui/material';
import Loading from '../../components/Loading';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 950,
  boxShadow: 'none',
  backgroundColor: '#f1f1f1',
}));

const LabelItem = styled(Grid)(({ theme }) => ({
  minHeight: '50px',
  display: 'flex',
  paddingLeft: '10px',
}));

const buttonStyle = {
  mx: 2,
  width: '65px',
  height: '30px',
  borderRadius: '15px',
  border: '1px solid #626262',
  color: '#000000',
  fontWeight: 'bold',
};

const AdminFAQDetails = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const prevQuery = location.state?.queryString;
  const [detail, setDetail] = useState();
  const { faqCode } = useParams();

  useEffect(() => {
    axios
      .get(`/m/faqs/check/${faqCode}`)
      .then((check) => {
        if (check.data === 0) {
          alert('존재하지 않는 FAQ입니다.');
          navigate(`/m/faqs/lists?sort=-faqDate&filter=none&pages=1`, {
            replace: true,
          });
        } else {
          getDetails();
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqCode]);

  const getDetails = () => {
    axios
      .get(`/m/faqs/faqDetails/${faqCode}`)
      .then((detail) => {
        setDetail(detail.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteFaq = () => {
    if (window.confirm('이 FAQ 항목을 삭제하시겠습니까?')) {
      axios
        .delete(`/m/faqs/delete/${detail.faqCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('삭제에 성공했습니다.');
            handleList();
          } else {
            alert('삭제에 실패했습니다.');
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      return false;
    }
  };

  const handleList = () => {
    if (prevQuery === undefined) {
      navigate(`/m/faqs/lists?sort=-faqDate&filter=none&pages=1`);
    } else {
      navigate(`/m/faqs/lists${prevQuery}`);
    }
  };

  return (
    <Box style={{ maxWidth: '1150px', margin: 'auto' }}>
      <Box
        sx={{
          my: 5,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mt: 5,
            mb: 1,
            pl: 1,
            pr: 1,
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          FAQ 자주 묻는 질문 &gt; 상세
        </Typography>
      </Box>

      {loading ? (
        <Loading height={'70vh'} />
      ) : (
        <>
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
                  제목
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
                  title={detail.faqTitle}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {detail.faqTitle}
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
                  카테고리
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
                  {detail.faqCategory}
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
                  내용
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
                <div
                  style={{
                    fontSize: '1.1rem',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: detail.faqContent,
                  }}
                ></div>
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
            <Button
              onClick={deleteFaq}
              variant="contained"
              sx={{
                ...buttonStyle,
                backgroundColor: '#f5b8b8',
                '&:hover': {
                  backgroundColor: 'tomato',
                  color: '#ffffff',
                },
              }}
            >
              삭제
            </Button>
            <Button
              onClick={handleList}
              variant="contained"
              sx={{
                ...buttonStyle,
                backgroundColor: '#ffffff',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#000000',
                },
              }}
            >
              목록
            </Button>
            <Button
              onClick={() => {
                navigate(`/m/faqs/modify/${detail.faqCode}`);
              }}
              variant="contained"
              sx={{
                ...buttonStyle,
                backgroundColor: '#c3c36a',
                '&:hover': {
                  backgroundColor: '#c3c36a',
                  color: '#ffffff',
                },
              }}
            >
              수정
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminFAQDetails;
