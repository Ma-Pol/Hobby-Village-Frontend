import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from 'components/Loading';

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

const AdminQnACreate = () => {
  const [loading, setLoading] = useState(true);
  const [questionDetail, setQuestionDetail] = useState({});
  const [answerContent, setAnswerContent] = useState();
  const { qstCode } = useParams();
  const navigate = useNavigate();

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
          navigate(-1, { replace: true });
        } else {
          getQuestion();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getQuestion = () => {
    axios
      .get(`/m/qnas/${qstCode}`)
      .then((detail) => {
        setQuestionDetail(detail.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const answerCreate = () => {
    if (answerContent) {
      if (window.confirm('답변을 등록하시겠습니까?')) {
        axios
          .post(`/m/qnas/create`, {
            qstCode: qstCode,
            aswContent: answerContent,
          })
          .then((res) => {
            if (res.data === 1) {
              alert('답변이 등록되었습니다.');
              navigate(`/m/qnas/details/${qstCode}`);
            } else {
              alert('답변 등록에 실패했습니다.');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      alert('답변을 입력해주세요.');
    }
    return false;
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
          1:1 문의 &gt; 답변 작성
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
                    __html: questionDetail.qstContent,
                  }}
                ></div>
              </Grid>
            </Grid>
          </StyledPaper>

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
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                }}
              >
                답변 작성
              </Typography>
            </Box>
            <StyledPaper
              style={{ marginTop: '30px' }}
              sx={{
                backgroundColor: '#ffffff',
              }}
            >
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
                  <ReactQuill
                    style={{
                      padding: '0 0 40px 0',
                      height: '500px',
                      width: '100%',
                      backgroundColor: 'white',
                      border: '1px solid #000000',
                    }}
                    placeholder="내용을 입력해주세요."
                    theme="snow"
                    value={answerContent}
                    onChange={setAnswerContent}
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </>

          <Box
            style={{
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '50px',
            }}
          >
            <Button
              onClick={() => {
                navigate(`/m/qnas/details/${qstCode}`);
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
              취소
            </Button>
            <Button
              onClick={answerCreate}
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
              등록
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminQnACreate;
