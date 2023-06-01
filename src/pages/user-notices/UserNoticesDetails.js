import { Box, Container, Typography, Button, Paper, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import FileSaver from 'file-saver';
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

const UserNoticesDetails = () => {
  const [loading, setLoading] = useState(true);
  const { notCode } = useParams();
  const [noticeDetail, setNoticeDetail] = useState({});
  const [fileList, setFileList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const prevQuery = location.state?.queryString;

  // 공지사항 상세 조회
  useEffect(() => {
    checkNotice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 실재하는 공지사항인지 확인
  const checkNotice = () => {
    axios
      .get(`/notices/check/${notCode}`)
      .then((check) => {
        if (check.data === 0) {
          alert('존재하지 않는 공지사항입니다.');
          navigate(`/notices/lists?filter=none&pages=1`, { replace: true });
        } else {
          getNotice();
          increaseViews();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 공지사항 조회수 증가
  const increaseViews = () => {
    axios.patch(`/notices/noticeUpdateView/${notCode}`).catch((err) => {
      console.error(err);
    });
  };

  // 공지사항 상세 조회
  const getNotice = () => {
    axios
      .get(`/notices/noticeDetails/${notCode}`)
      .then((detail) => {
        setNoticeDetail(detail.data);
        getFileList();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 공지사항 파일 데이터 조회
  const getFileList = () => {
    axios
      .get(`/notices//noticeFiles/${notCode}`)
      .then((files) => {
        if (files.data.length === 1) {
          setFileList(files.data);
        } else if (files.data.length > 1) {
          setFileList(files.data);
        } else {
          setFileList([]);
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 파일 다운로드
  const fileDownload = (file) => {
    const formData = new FormData();

    formData.append('originalFileName', file.notFileOriName);
    formData.append('storedFileName', file.notFileSavName);

    axios
      .post(`/notices/download/file`, formData, { responseType: 'blob' })
      .then((res) => {
        FileSaver.saveAs(res.data, file.notFileOriName);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) {
    return <Loading height={'80vh'} />;
  } else {
    return (
      <Container sx={{ minHeight: '80vh' }}>
        {/* 공지사항 목록 글씨 표기 시작 */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mt: 5,
            mb: 1,
            pl: 2,
            pr: 1,
            fontWeight: 'bold',
            userSelect: 'none',
            fontSize: '3vh',
          }}
        >
          공지사항
        </Typography>
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
                  userSelect: 'none',
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
                title={noticeDetail.notTitle}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {noticeDetail.notTitle}
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
                  userSelect: 'none',
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
                {noticeDetail.notCategory}
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
                  userSelect: 'none',
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
                  __html: noticeDetail.notContent,
                }}
              ></div>
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
                  userSelect: 'none',
                }}
              >
                첨부파일
              </Typography>
            </LabelItem>
            <Grid
              item
              xs={10}
              sx={{
                px: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              {fileList !== null &&
                fileList.length !== 0 &&
                fileList.map((file) => {
                  return (
                    <Typography
                      key={file.notFileCode}
                      variant="h6"
                      component="h2"
                      title={file.notFileOriName}
                      sx={{
                        my: '3px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        '&:hover': {
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        },
                      }}
                      onClick={() => {
                        fileDownload(file);
                      }}
                    >
                      {file.notFileOriName}
                    </Typography>
                  );
                })}
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
                ? `/notices/lists?filter=none&pages=1`
                : `/notices/lists${prevQuery}`
            }
          >
            <StyledButton>목록</StyledButton>
          </Link>
        </Box>
      </Container>
    );
  }
};

export default UserNoticesDetails;
