import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
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

const UserQnADetails = () => {
  // const email = sessionStorage.getItem('email'); // 이메일을 세션에서 가져오기
  const email = 'bae@naver.com'; // 임시 이메일
  const [questionDetail, setQuestionDetail] = useState({});
  const [answerContent, setAnswerContent] = useState();
  const { qstCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const prevQuery = location.state?.queryString;

  useEffect(() => {
    axios
      .all([
        axios.get(`/cs/qna/${email}/${qstCode}/writerCheck`),
        axios.get(`/cs/qna/${email}/${qstCode}`),
        axios.get(`/cs/qna/answer/${qstCode}`),
      ])
      .then(
        axios.spread((writerCheck, detail, answer) => {
          if (writerCheck.data === 0) {
            alert('접근 권한이 없습니다.');
            navigate(-1, { replace: true });
          } else {
            setQuestionDetail(detail.data);
            setAnswerContent(answer.data);
          }
        })
      )
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [qstCode, navigate]);

  if (!questionDetail) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box style={{ maxWidth: '1150px', margin: 'auto' }}>
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
            1:1 문의
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
                variant="h5"
                sx={{
                  // fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                }}
              >
                관리자의 답변
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
                    dangerouslySetInnerHTML={{ __html: answerContent }}
                  ></div>
                </Grid>
              </Grid>
            </StyledPaper>
          </>
        )}

        <Box style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link
            to={
              prevQuery === undefined
                ? `/cs/qna/${email}/lists?filter=none&pages=1`
                : `/cs/qna/${email}/lists${prevQuery}`
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

export default UserQnADetails;
