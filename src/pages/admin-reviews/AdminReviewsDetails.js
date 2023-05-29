import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  Button,
  Container,
  TableContainer,
  Rating,
} from '@mui/material';
import Loading from '../../components/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const pagination = {
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className}"></span>`;
  },
};

const AdminReviewsDetail = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const prevQuery = location.state?.queryString;
  const { revwCode } = useParams();
  const [detail, setDetail] = useState(null);
  const [reviewImages, setReviewImages] = useState([]);

  useEffect(() => {
    checkReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revwCode]);

  const checkReview = () => {
    axios
      .get(`/m/reviews/check/${revwCode}`)
      .then((check) => {
        if (check.data === 1) {
          getReviewDetail();
        } else {
          alert(`존재하지 않는 리뷰입니다.`);
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getReviewDetail = () => {
    axios
      .get(`/m/reviews/reviewDetails/${revwCode}`)
      .then((res) => {
        setDetail(res.data);
      })
      .finally(() => {
        getReviewImages();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getReviewImages = () => {
    axios
      .get(`/m/reviews/reviewImage/${revwCode}`)
      .then((images) => {
        if (images.data !== null) {
          if (images.data.length === 1) {
            setReviewImages([images.data]);
          } else {
            setReviewImages(images.data);
          }
        } else {
          setReviewImages([]);
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const reviewsDelete = () => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      axios
        .delete(`/m/reviews/delete/${revwCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('리뷰가 삭제되었습니다.');
            navigate(`/m/reviews/lists?sort=-revwRegiDate&filter=none&pages=1`);
          } else {
            alert('리뷰 삭제에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return false;
  };

  // MUI 스타일
  const tableHeadStyle = {
    width: 170,
    fontSize: 18,
    border: '1px solid #E0E0E0',
    userSelect: 'none',
  };

  const tableBodyStyle = { width: 400, border: '1px solid #E0E0E0' };

  const tableBodyImageStyle = {
    width: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  };

  const noImageBox = {
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    width: '350px',
    minHeight: '382.8px',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    width: '350px',
    minHeight: '382.8px',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const btnDeleteStyle = {
    mx: 2,
    width: '65px',
    height: '35px',
    bgcolor: '#F5B8B8',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#FE8484',
      border: '1px solid #626262',
      color: '#000000',
    },
  };

  const btnListStyle = {
    mx: 2,
    width: '65px',
    height: '35px',
    bgcolor: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#ffffff',
      border: '1px solid #626262',
      color: '#000000',
    },
  };

  return (
    <Container>
      {/* 타이틀 */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 5,
          mb: 5,
          pl: 1,
          pr: 1,
          fontWeight: 'bold',
          userSelect: 'none',
        }}
      >
        리뷰 목록 &#62; 상세
      </Typography>

      {loading ? (
        <Loading height={'70vh'} />
      ) : (
        <>
          {/* form 시작 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TableContainer>
              <Table sx={{ width: 1140 }}>
                <TableRow>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      리뷰 코드
                    </Typography>
                  </TableCell>

                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {detail.revwCode}
                    </Typography>
                  </TableCell>

                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      작성일
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {detail.revwRegiDate}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      상품 코드
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {detail.prodCode}
                    </Typography>
                  </TableCell>

                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      상품 명
                    </Typography>
                  </TableCell>

                  <TableCell sx={tableBodyStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      title={detail.prodName}
                      sx={{
                        mr: 0,
                        width: '320px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {detail.prodName}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      별점
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Rating value={detail.revwRate} readOnly />
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      작성자
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        mr: 0,
                        width: '320px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {detail.revwWriter}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      누적 신고 수
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {detail.revwReport}
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      리뷰 제목
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      title={detail.revwTitle}
                      sx={{
                        mr: 0,
                        width: '320px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {detail.revwTitle}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      첨부 사진
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyImageStyle}>
                    {reviewImages.length === 0 ? (
                      <Box sx={noImageBox}>
                        <Typography variant="h6" component="h2" color="#626262">
                          등록된 사진이 없습니다.
                        </Typography>
                      </Box>
                    ) : (
                      <Swiper
                        loop={true}
                        pagination={pagination}
                        modules={[Pagination]}
                        style={swiperStyle}
                      >
                        {reviewImages.map((fileName) => {
                          const fileSrc = `http://localhost:8080/m/reviews/images/${fileName}`;
                          return (
                            <SwiperSlide
                              key={fileName}
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
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: '100%',
                                }}
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    )}
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      리뷰 본문
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        display: 'flex',
                        height: '350px',
                        overflow: 'auto',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {detail.revwContent}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>

            {/* 하단 버튼 */}
            <Box sx={{ display: 'flex', alignItems: 'center', my: 5 }}>
              <Button
                variant="outlined"
                sx={btnDeleteStyle}
                onClick={reviewsDelete}
              >
                삭제
              </Button>

              <Button
                variant="outlined"
                sx={btnListStyle}
                onClick={() => {
                  if (prevQuery === undefined) {
                    navigate(
                      `/m/reviews/lists?sort=-revwRegiDate&filter=none&pages=1`
                    );
                  } else {
                    navigate(`/m/reviews/lists${prevQuery}`);
                  }
                }}
              >
                목록
              </Button>
            </Box>
          </Box>
          {/* form 끝 */}
        </>
      )}
    </Container>
  );
};

export default AdminReviewsDetail;
