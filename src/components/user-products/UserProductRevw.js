import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper';
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const MyAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  margin: '0',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: '1px solid #FFFFFF',
  },
  '&:before': {
    display: 'none',
  },
}));

const MyAccordionSummary = styled((props) => <AccordionSummary {...props} />)(
  ({ theme }) => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, .05)'
          : 'rgba(0, 0, 0, .03)',
    },
  })
);

const MyAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '0',
}));

const Review = ({ review, expanded, handleChange }) => {
  const [pictureList, setPictureList] = useState([]); // 리뷰 이미지 파일명 목록
  const [isReported, setIsReported] = useState();
  const userEmail = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기

  useEffect(() => {
    getRevwPicsNames();
    checkReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 리뷰 이미지 파일명 불러오기
  const getRevwPicsNames = () => {
    axios
      .get(`/prodReview/imgName?revwCode=${review.revwCode}`)
      .then((res) => {
        const { data } = res;
        setPictureList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 리뷰 신고 여부 확인
  const checkReport = () => {
    axios
      .get(
        `/prodReview/checkReport?email=${userEmail}&revwCode=${review.revwCode}`
      )
      .then((res) => {
        setIsReported(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 리뷰 신고 버튼 클릭
  const handleReportReview = () => {
    if (isReported >= 1) {
      window.alert('이미 신고한 리뷰입니다.');
      return false;
    }

    if (window.confirm(`${review.revwWriter} 님의 리뷰를 신고하시겠습니까?`)) {
      axios
        .get(
          `/prodReview/report?email=${userEmail}&revwCode=${review.revwCode}`
        )
        .then(() => {
          alert('리뷰가 신고되었습니다. 감사합니다.');
        })
        .finally(() => {
          checkReport();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const swiperStyle = {
    width: '400px',
    height: '100px',
    padding: '0 10px',
    margin: '0',
    '--swiper-navigation-color': '#626262',
    '--swiper-navigation-size': '15pt',
    userSelect: 'none',
  };

  const btnReportStyle = {
    position: 'absolute',
    right: '5px',
    bottom: '5px',
    boxSizing: 'border-box',
    width: '70px',
    m: 0,
    p: 0,
    border: '1px solid #626262',
    borderRadius: '10px',
    backgroundColor: '#F5B8B8',
    shadow: 'none',
    fontWeight: 'bold',
    color: '#000000',
    '&:hover': {
      backgroundColor: 'tomato',
      color: '#FFFFFF',
    },
  };

  return (
    <>
      <MyAccordion
        expanded={expanded === review.revwCode}
        onChange={handleChange(review.revwCode)}
      >
        <MyAccordionSummary>
          <Box
            sx={{
              width: '1000px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              value={review.revwRate}
              size="small"
              sx={{ width: '200px' }}
              readOnly
            />
            <Typography
              variant="body1"
              title={review.revwTitle}
              sx={{
                width: '540px',
                mr: '20px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {review.revwTitle}
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: '90px', textAlign: 'center', fontSize: '14px' }}
            >
              {review.revwRegiDate}
            </Typography>
            <Box
              sx={{
                m: 0,
                p: 0,
                pl: '20px',
                width: '130px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                title={review.revwWriter}
                sx={{
                  width: '100px',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '14px',
                }}
              >
                {review.revwWriter}
              </Typography>
              <Avatar
                sx={{
                  border: '1px solid #d0d0d0',
                  boxSizing: 'border-box',
                  ml: '10px',
                  width: '25px',
                  height: '25px',
                }}
                src={`http://localhost:8080/prodReview/upload/profPic/${review.profPicture}`}
              />
            </Box>
          </Box>
        </MyAccordionSummary>

        <MyAccordionDetails>
          <Box
            sx={{
              width: '1000px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                ml: '200px',
                mr: '260px',
                my: '10px',
                p: '10px',
                width: '520px',
                backgroundColor: '#E0E0B4',
                borderRadius: '10px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Button
                variant="contained"
                sx={btnReportStyle}
                onClick={handleReportReview}
              >
                신고
              </Button>
              <Typography
                sx={{
                  width: '100%',
                  mb: pictureList.length > 0 ? '10px' : '30px',
                }}
              >
                {review.revwContent}
              </Typography>
              {pictureList.length > 0 && (
                <Swiper
                  slidesPerView={3}
                  spaceBetween={0}
                  freeMode={true}
                  navigation={true}
                  modules={[FreeMode, Navigation]}
                  style={swiperStyle}
                >
                  {pictureList.map((fileName) => {
                    const fileSrc = `http://localhost:8080/prodReview/upload/${fileName}`;
                    return (
                      <SwiperSlide key={fileName}>
                        <Box
                          component="img"
                          alt={fileName}
                          src={fileSrc}
                          sx={{
                            boxSizing: 'border-box',
                            border: '1px solid #d0d0a4',
                            position: 'relative',
                            objectFit: 'contain',
                            width: '100px',
                            height: '100px',
                          }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </Box>
          </Box>
        </MyAccordionDetails>
      </MyAccordion>
    </>
  );
};

export default Review;
