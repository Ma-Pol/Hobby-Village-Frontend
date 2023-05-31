import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper';
import {
  Box,
  Link,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Rating,
  Stack,
  Avatar,
  TextField,
  Button,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const MyAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
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
  padding: '0 0 20px 300px',
}));

const Review = ({ review, expanded, handleChange }) => {
  const [pictureList, setPictureList] = useState([]); // 리뷰 이미지 파일명 목록
  const [profPic, setProfPic] = useState(); // 프로필 이미지
  const profPicFile = `http://localhost:8080/prodReview/upload/profPic/${profPic}`;
  const [isReported, setIsReported] = useState();
  // const userEmail = sessionStorage.getItem(email); // 이메일 가져오기
  const userEmail = '취미빌리지';

  // 이미지 파일명 불러오기
  const getRevwPicsNames = (revwCode) => {
    axios
      .get(`/prodReview/imgName?revwCode=${revwCode}`)
      .then((res) => {
        const { data } = res;
        setPictureList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 프로필 사진 파일명 불러오기
  const getProfPicsName = (revwWriter) => {
    axios
      .get(`/prodReview/profPic?revwWriter=${revwWriter}`)
      .then((res) => {
        setProfPic(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getRevwPicsNames(review.revwCode);
    getProfPicsName(review.revwWriter);
  }, []);

  // 리뷰 신고
  const handleReportReview = () => {
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
    if (isReported >= 1) {
      window.alert('이미 신고한 리뷰입니다.');
      return;
    }
    if (window.confirm(`${review.revwWriter} 님의 리뷰를 신고하시겠습니까?`)) {
      axios
        .get(
          `/prodReview/report?email=${userEmail}&revwCode=${review.revwCode}`
        )
        .then(() => {
          alert('리뷰가 신고되었습니다. 감사합니다.');
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const profPicStyle = {
    bgcolor: '#C3C36A',
    width: '30',
    height: '30',
    '&.MuiAvatar-root': {
      position: 'relative',
      right: -70,
    },
  };

  const swiperStyle = {
    width: '350px',
    height: '100px',
    padding: '0',
    margin: '0',
    '--swiper-navigation-color': '#626262',
    '--swiper-navigation-size': '15pt',
  };

  const btnReportStyle = {
    width: '40px',
    minWidth: '40px',
    height: '25px',
    minHeight: '25px',
    fontSize: '13px',
    border: '1px solid #626262',
    borderRadius: '10px',
    margin: '0',
    padding: '0',
    color: '#000000',
    bgcolor: '#F5B8B8',
    shadow: 'none',
    '&:hover': {
      bgcolor: '#FC4D4D',
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
          <Rating
            name="read-only"
            value={review.revwRate}
            size="small"
            sx={{ width: '200px', ml: '-15px' }}
            readOnly
          />
          <Box display="flex">
            <Typography
              variant="body1"
              component="body1"
              sx={{ width: '550px' }}
            >
              {review.revwTitle}
            </Typography>
            <Typography variant="body1" component="body1">
              {review.revwRegiDate}
            </Typography>
          </Box>
          <Chip
            variant="plain"
            avatar={
              <Avatar
                display="inline"
                sx={profPicStyle}
                src={profPicFile}
              ></Avatar>
            }
            label={review.revwWriter}
            sx={{
              bgcolor: '#FFFFFF',
              fontSize: '15px',
            }}
          />
        </MyAccordionSummary>
        <MyAccordionDetails>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{
              width: '520px',
              height: 'auto',
              borderRadius: '10px',
              backgroundColor: '#E0E0B4',
              padding: '15px',
            }}
          >
            <Typography
              dangerouslySetInnerHTML={{
                __html: review.revwContent,
              }}
              sx={{ color: '#3E3E3E', mb: '10px' }}
            ></Typography>
            {/* 리뷰이미지 및 신고버튼 */}
            <Box
              display="flex"
              flex-direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
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
                    <SwiperSlide>
                      <Box
                        component="img"
                        alt={review.revwCode}
                        src={fileSrc}
                        sx={{
                          position: 'relative',
                          minWidht: '100px',
                          width: '100px',
                          height: '100px',
                          minHeight: '100px',
                        }}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Button
                variant="contained"
                sx={btnReportStyle}
                onClick={handleReportReview}
              >
                신고
              </Button>
            </Box>
          </Box>
        </MyAccordionDetails>
      </MyAccordion>
    </>
  );
};

export default Review;
