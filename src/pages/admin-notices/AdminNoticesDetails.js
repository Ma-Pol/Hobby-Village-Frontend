import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import FileSaver from 'file-saver';
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

const AdminNoticesDetails = () => {
  const [loading, setLoading] = useState(true);
  const [noticeDetail, setNoticeDetail] = useState({});
  const [fileList, setFileList] = useState([]);
  const { notCode } = useParams();
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
      .get(`/m/notices/check/${notCode}`)
      .then((check) => {
        if (check.data === 0) {
          alert('존재하지 않는 공지사항입니다.');
          navigate(`/m/notices/lists?sort=-notDate&filter=none&pages=1`, {
            replace: true,
          });
        } else {
          getNotice();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 공지사항 상세 조회
  const getNotice = () => {
    axios
      .get(`/m/notices/noticeDetails/${notCode}`)
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
      .get(`/m/notices//noticeFiles/${notCode}`)
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
      .post(`/m/notices/download/file`, formData, { responseType: 'blob' })
      .then((res) => {
        FileSaver.saveAs(res.data, file.notFileOriName);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 공지사항 삭제
  const deleteNotice = () => {
    if (window.confirm('이 공지사항을 삭제하시겠습니까?')) {
      axios
        .delete(`/m/notices/delete/${notCode}`)
        .then((res) => {
          if (res.data === 1) {
            // 입력 받은 데이터가 정상적으로 들어왔으면(값이 1이면) navigate를 통해 페이지 이동
            alert('삭제가 완료되었습니다.');
            navigate('/m/notices/lists?sort=-notDate&filter=none&pages=1');
          } else {
            alert('삭제에 실패하였습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
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
          component="h4"
          sx={{
            mt: 5,
            mb: 1,
            pl: 1,
            pr: 1,
            fontWeight: 'bold',
            fontSize: '3vh',
          }}
        >
          공지사항 &gt; 상세
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
            <Button
              onClick={deleteNotice}
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
                  navigate(
                    `/m/notices/lists?sort=-notDate&filter=none&pages=1`
                  );
                } else {
                  navigate(`/m/notices/lists${prevQuery}`);
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
              onClick={() => {
                navigate(`/m/notices/modify/${notCode}`);
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

export default AdminNoticesDetails;
