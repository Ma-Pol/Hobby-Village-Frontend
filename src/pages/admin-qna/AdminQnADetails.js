import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
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

const AdminQnADetails = () => {
  const [loading, setLoading] = useState(true);
  const [questionDetail, setQuestionDetail] = useState({});
  const [answerContent, setAnswerContent] = useState();
  const { qstCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const prevQuery = location.state?.queryString;

  useEffect(() => {
    checkQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkQuestion = () => {
    axios
      .get(`/m/qnas/check/${qstCode}`)
      .then((check) => {
        if (check.data === 0) {
          alert('존재하지 않는 문의입니다.');
          navigate(`/m/qnas/lists?sort=-qstDate&filter=none&pages=1`, {
            replace: true,
          });
        } else {
          getQuestion();
          getAnswer();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getQuestion = () => {
    let qstStateCheck = false;
    axios
      .get(`/m/qnas/${qstCode}`)
      .then((detail) => {
        setQuestionDetail(detail.data);
        if (detail.data.qstState === 1) {
          qstStateCheck = true;
        }
      })
      .finally(() => {
        if (qstStateCheck) {
          getAnswer();
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAnswer = () => {
    axios
      .get(`/m/qnas/answer/${qstCode}`)
      .then((answer) => {
        setAnswerContent(answer.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const questionDelete = () => {
    if (window.confirm('문의를 삭제하시겠습니까?')) {
      axios
        .delete(`/m/qnas/${qstCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('문의가 삭제되었습니다.');
            if (prevQuery === undefined) {
              navigate(`/m/qnas/lists?sort=-qstDate&filter=none&pages=1`);
            } else {
              navigate(`/m/qnas/lists${prevQuery}`);
            }
          } else {
            alert('문의 삭제에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return false;
  };

  const insertAnswerMode = () => {
    navigate(`/m/qnas/create/${qstCode}`);
  };

  const modifyAnswerMode = () => {
    navigate(`/m/qnas/modify/${qstCode}`);
  };

  return (
    <Box style={{ maxWidth: '1150px', margin: 'auto', userSelect: 'none' }}>
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
            fontSize: '3vh',
          }}
        >
          1:1 문의 &gt; 상세
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
                  variant="body1"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목
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
                  variant="body1"
                  component="h2"
                  title={questionDetail.qstTitle}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {questionDetail.qstTitle}
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
                  variant="body1"
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
                <Typography variant="body1" component="h2">
                  {questionDetail.qstCategory}
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
                  pt: '12px',
                }}
              >
                <Typography
                  variant="body1"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;용
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
                <Typography variant="body1" component="h2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: questionDetail.qstContent,
                    }}
                  ></div>
                </Typography>
              </Grid>
            </Grid>
          </StyledPaper>

          {/* 답변이 있는 경우 */}
          {questionDetail !== null && questionDetail.qstState === 1 && (
            <>
              <hr
                style={{
                  marginTop: '50px',
                }}
              />
              <Box
                sx={{
                  my: 5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  작성한 답변
                </Typography>
              </Box>
              <StyledPaper style={{ marginTop: '30px' }}>
                <Grid container>
                  <LabelItem
                    item
                    xs={2}
                    sx={{
                      alignItems: 'flex-start',
                      pt: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;용
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
                    <Typography variant="body1" component="h2">
                      <div
                        dangerouslySetInnerHTML={{ __html: answerContent }}
                      ></div>
                    </Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </>
          )}

          <Box
            style={{
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '50px',
            }}
          >
            <Button
              onClick={questionDelete}
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
              onClick={() => {
                if (prevQuery === undefined) {
                  navigate(`/m/qnas/lists?sort=-qstDate&filter=none&pages=1`);
                } else {
                  navigate(`/m/qnas/lists${prevQuery}`);
                }
              }}
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
              onClick={
                questionDetail.qstState === 0
                  ? insertAnswerMode
                  : modifyAnswerMode
              }
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
              {questionDetail.qstState === 0 ? '답변' : '수정'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminQnADetails;
