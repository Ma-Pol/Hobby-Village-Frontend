import { Box, Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const requestDataRow = {
  py: 2,
  borderBottom: '1px solid #d8d8d8',
  display: 'flex',
  alignItems: 'flex-start',
  height: 'auto',
  userSelect: 'none',
};

const requestDataNameCol = {
  px: '10px',
  py: '1px',
  width: '150px',
  minHeight: '40px',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
};

const requestDataValueCol = {
  px: '10px',
  py: '1px',
  backgroundColor: '#f1f1f1',
  borderRadius: '5px',
  width: 'calc(100% - 190px)',
  minHeight: '40px',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
};

const requestFileValueCol = {
  px: '10px',
  py: '1px',
  backgroundColor: '#f1f1f1',
  borderRadius: '5px',
  width: 'calc(100% - 170px)',
  minHeight: '40px',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

const reqProgressExact = {
  color: '#dd0000',
  fontWeight: 'bold',
};

const reqProgressNotExact = {
  color: '#525252',
};

const AdminRequestsDetails = () => {
  const location = useLocation();
  const prevCategory = location.state?.category;
  const prevQuery = location.state?.queryString;
  const navigate = useNavigate();
  const { reqCode } = useParams();
  const [requestDetail, setRequestDetail] = useState([]);
  const [reqFileList, setReqFileList] = useState([]);

  useEffect(() => {
    checkRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkRequest = () => {
    axios
      .get(`/m/requests/check/${reqCode}`)
      .then((check) => {
        if (check.data === 0) {
          alert('존재하지 않는 신청글입니다.');
          navigate('/m/requests/sell/lists?sort=-reqDate&filter=none&pages=1', {
            replace: true,
          });
        } else {
          getRequestData(reqCode);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRequestData = () => {
    axios
      .all([
        axios.get(`/m/requests/requestDetails/${reqCode}`),
        axios.get(`/m/requests/requestFileList/${reqCode}`),
      ])
      .then(
        axios.spread((detail, fileList) => {
          setRequestDetail(detail.data);
          setReqFileList(fileList.data);
        })
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const updateProgress = () => {
    if (window.confirm('진행 상황을 업데이트하시겠습니까?')) {
      axios
        .patch(`/m/requests/updateProgress/${reqCode}`, {
          reqProgress: requestDetail.reqProgress,
        })
        .then((res) => {
          if (res.data === 1) {
            alert('진행 상황이 업데이트되었습니다.');
            getRequestData(reqCode);
          } else if (res.data === 100) {
            alert(
              '최종 심사가 완료되었습니다.\n상품 등록 페이지로 이동합니다.'
            );
            navigate(`/m/products/create`, {
              state: {
                requestDetail: requestDetail,
              },
            });
          } else {
            alert('진행 상황 업데이트에 실패했습니다.');
          }
        });
    } else {
      return false;
    }
  };

  const rejectProgress = () => {
    if (window.confirm('정말 탈락 처리하시겠습니까?')) {
      axios
        .patch(`/m/requests/rejectProgress/${reqCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('탈락 처리되었습니다.');
            getRequestData(reqCode);
          } else {
            alert('탈락 처리에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  const cancelProgress = () => {
    if (window.confirm('위탁 철회 요청을 승인하시겠습니까?')) {
      axios
        .patch(`/m/requests/cancelProgress/${reqCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('위탁 철회 요청을 승인했습니다.');
            getRequestData(reqCode);
          } else {
            alert('위탁 철회 요청 승인 처리에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  const rejectCancelProgress = () => {
    if (window.confirm('위탁 철회 요청을 거부하시겠습니까?')) {
      axios
        .patch(`/m/requests/rejectCancelProgress/${reqCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('위탁 철회 요청을 거부했습니다.');
            getRequestData(reqCode);
          } else {
            alert('위탁 철회 요청 거부 처리에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  if (!requestDetail) {
    return <div></div>;
  } else {
    return (
      <Container>
        {/* 신청 상세 글씨 표기 시작 */}
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
          물품 판매/위탁 신청 목록 &gt; 신청 상세
        </Typography>
        {/* 신청 상세 글씨 표기 끝 */}

        <Container
          sx={{
            width: '1100px',
          }}
        >
          <Grid container sx={{ mb: 4 }}>
            {/* 신청자 표기 시작 */}
            <Grid item xs={12} sx={requestDataRow}>
              <Box sx={requestDataNameCol}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  신청 회원
                </Typography>
              </Box>
              <Box sx={requestDataValueCol}>
                <Typography variant="h6" component="h2">
                  {requestDetail.nickname + ' (' + requestDetail.reqEmail + ')'}
                </Typography>
              </Box>
            </Grid>
            {/* 신청자 표기 끝 */}

            {/* 신청 타입 표기 시작 */}
            <Grid item xs={12} sx={requestDataRow}>
              <Box sx={requestDataNameCol}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  신청 타입
                </Typography>
              </Box>
              <Box sx={requestDataValueCol}>
                <Typography variant="h6" component="h2">
                  {requestDetail.reqSort}
                </Typography>
              </Box>
            </Grid>
            {/* 신청 타입 표기 끝 */}

            {/* 물품 카테고리 표기 시작 */}
            <Grid item xs={12} sx={requestDataRow}>
              <Box sx={requestDataNameCol}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  물품 카테고리
                </Typography>
              </Box>
              <Box sx={requestDataValueCol}>
                <Typography variant="h6" component="h2">
                  {requestDetail.reqCategory}
                </Typography>
              </Box>
            </Grid>
            {/* 물품 카테고리 표기 끝 */}

            {/* 상품 명 표기 시작 */}
            <Grid item xs={12} sx={requestDataRow}>
              <Box sx={requestDataNameCol}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  물품 명
                </Typography>
              </Box>
              <Box sx={requestDataValueCol}>
                <Typography variant="h6" component="h2">
                  {requestDetail.reqTitle}
                </Typography>
              </Box>
            </Grid>
            {/* 상품 명 표기 끝 */}

            {/* 물품 설명 표기 시작 */}
            <Grid item xs={12} sx={requestDataRow}>
              <Box sx={requestDataNameCol}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  물품 설명
                </Typography>
              </Box>
              <Box sx={requestDataValueCol}>
                <Typography variant="h6" component="h2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: requestDetail.reqContent,
                    }}
                  ></div>
                </Typography>
              </Box>
            </Grid>
            {/* 물품 설명 표기 끝 */}

            {/* 첨부파일 표기 시작 */}
            <Grid item xs={12} sx={requestDataRow}>
              <Box sx={requestDataNameCol}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  첨부 파일
                </Typography>
              </Box>

              {/* 첨부파일 출력부 시작 */}
              {reqFileList.length === 0 ? (
                <Box sx={requestDataValueCol}>
                  <Typography variant="h6" component="h2">
                    첨부 파일이 없습니다.
                  </Typography>
                </Box>
              ) : (
                <Swiper
                  pagination={{
                    type: 'fraction',
                  }}
                  loop={true}
                  navigation={true}
                  modules={[Navigation, Pagination]}
                  style={requestFileValueCol}
                >
                  {reqFileList.map((fileName) => {
                    const fileSrc = `http://localhost:8080/m/requests/upload/${fileName}`; // 여기에 이미지 요청 경로 넣기
                    return (
                      <SwiperSlide
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          component="img"
                          alt={fileName}
                          src={fileSrc}
                          sx={{
                            my: 5,
                            width: '90%',
                            height: '90%',
                          }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}

              {/* 첨부파일 출력부 끝 */}
            </Grid>
            {/* 첨부파일 표기 끝 */}

            {/* 현재 진행 상황 표기 시작 */}
            <Grid item xs={12} sx={requestDataRow}>
              <Box sx={requestDataNameCol}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  현재 진행 상황
                </Typography>
              </Box>
              <Box sx={requestDataValueCol}>
                {requestDetail.reqProgress === '1차 심사 중' ||
                requestDetail.reqProgress === '2차 심사 대기' ||
                requestDetail.reqProgress === '2차 심사 중' ||
                requestDetail.reqProgress === '완료' ? (
                  <>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={
                        requestDetail.reqProgress === '1차 심사 중'
                          ? reqProgressExact
                          : reqProgressNotExact
                      }
                    >
                      1차 심사 중
                    </Typography>
                    &nbsp;&gt;&nbsp;
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={
                        requestDetail.reqProgress === '2차 심사 대기'
                          ? reqProgressExact
                          : reqProgressNotExact
                      }
                    >
                      2차 심사 대기
                    </Typography>
                    &nbsp;&gt;&nbsp;
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={
                        requestDetail.reqProgress === '2차 심사 중'
                          ? reqProgressExact
                          : reqProgressNotExact
                      }
                    >
                      2차 심사 중
                    </Typography>
                    &nbsp;&gt;&nbsp;
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={
                        requestDetail.reqProgress === '완료'
                          ? reqProgressExact
                          : reqProgressNotExact
                      }
                    >
                      완료
                    </Typography>
                  </>
                ) : requestDetail.reqProgress === '심사 탈락' ? (
                  <>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={reqProgressExact}
                    >
                      심사 탈락
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={
                        requestDetail.reqProgress === '위탁 철회 요청'
                          ? reqProgressExact
                          : reqProgressNotExact
                      }
                    >
                      위탁 철회 요청
                    </Typography>
                    &nbsp;&gt;&nbsp;
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={
                        requestDetail.reqProgress === '철회 진행 중'
                          ? reqProgressExact
                          : reqProgressNotExact
                      }
                    >
                      철회 진행 중
                    </Typography>
                    &nbsp;&gt;&nbsp;
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={
                        requestDetail.reqProgress === '철회 완료'
                          ? reqProgressExact
                          : reqProgressNotExact
                      }
                    >
                      철회 완료
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>
            {/* 현재 진행 상황 표기 끝 */}
          </Grid>
        </Container>

        {/* 하단 버튼 표기 시작 */}
        <Box
          sx={{
            my: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {requestDetail.reqProgress === '심사 탈락' ||
          requestDetail.reqProgress === '철회 진행 중' ||
          requestDetail.reqProgress === '철회 완료' ||
          requestDetail.reqProgress === '완료' ? (
            <></>
          ) : requestDetail.reqProgress === '위탁 철회 요청' ? (
            <Button
              onClick={rejectCancelProgress}
              variant="contained"
              sx={{
                mx: 2,
                width: '130px',
                height: '30px',
                backgroundColor: '#f5b8b8',
                borderRadius: '15px',
                border: '1px solid #626262',
                color: '#000000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'tomato',
                  color: '#ffffff',
                },
              }}
            >
              위탁 철회 거부
            </Button>
          ) : (
            <Button
              onClick={rejectProgress}
              variant="contained"
              sx={{
                mx: 2,
                width: '100px',
                height: '30px',
                backgroundColor: '#f5b8b8',
                borderRadius: '15px',
                border: '1px solid #626262',
                color: '#000000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'tomato',
                  color: '#ffffff',
                },
              }}
            >
              심사 탈락
            </Button>
          )}

          <Button
            onClick={() => {
              if (prevQuery === undefined) {
                navigate(
                  '/m/requests/sell/lists?sort=-reqDate&filter=none&pages=1'
                );
              } else {
                navigate(`/m/requests/${prevCategory}/lists${prevQuery}`);
              }
            }}
            variant="contained"
            sx={{
              mx: 2,
              width: '100px',
              height: '30px',
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              border: '1px solid #626262',
              color: '#000000',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#000000',
              },
            }}
          >
            신청 목록
          </Button>
          {requestDetail.reqProgress === '완료' ||
          requestDetail.reqProgress === '철회 완료' ||
          requestDetail.reqProgress === '심사 탈락' ? (
            <></>
          ) : requestDetail.reqProgress === '위탁 철회 요청' ? (
            <Button
              variant="contained"
              onClick={cancelProgress}
              sx={{
                mx: 2,
                width: '130px',
                height: '30px',
                backgroundColor: '#c3c36a',
                borderRadius: '15px',
                border: '1px solid #626262',
                color: '#000000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#c3c36a',
                  color: '#ffffff',
                },
              }}
            >
              위탁 철회 승인
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={updateProgress}
              sx={{
                mx: 2,
                width: '160px',
                height: '30px',
                backgroundColor: '#c3c36a',
                borderRadius: '15px',
                border: '1px solid #626262',
                color: '#000000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#c3c36a',
                  color: '#ffffff',
                },
              }}
            >
              진행 상황 업데이트
            </Button>
          )}
        </Box>
        {/* 하단 버튼 표기 끝 */}
      </Container>
    );
  }
};

export default AdminRequestsDetails;
