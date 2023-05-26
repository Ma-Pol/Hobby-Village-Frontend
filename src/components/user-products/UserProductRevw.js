import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
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
} from '@mui/material';

const Review = ({ review }) => {
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
        console.log('이미지 파일명 불러오기 성공~~');
      })
      .catch((e) => {
        console.log('이미지 파일명 불러오기 실패!!!');
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

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      <Box>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={2.5}>
            <Rating
              name="read-only"
              value={review.revwRate}
              size="small"
              readOnly
            />
          </Grid>
          <Grid item xs={5.5}>
            <Typography variant="body1" component="body1">
              {review.revwTitle}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" component="body1">
              {review.revwRegiDate}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Stack direction="row" spacing={0.5}>
              <Typography display="inline" variant="body1" component="body1">
                {review.revwWriter}
              </Typography>
              <Avatar
                display="inline"
                sx={{ bgcolor: '#ABCDEF', width: 30, height: 30 }}
                src={profPicFile}
              ></Avatar>
            </Stack>
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={2.5}></Grid>
          <Grid item xs={5.2}>
            <TextField
              multiline
              sx={{ mt: 1 }}
              fullWidth
              rows={7}
              disabled
              value={review.revwContent}
            ></TextField>
          </Grid>
          <Grid item xs={2.3}></Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Swiper slidesPerView={3} spaceBetween={10} style={swiperStyle}>
          {pictureList.map((fileName) => {
            const fileSrc = `http://localhost:8080/prodReview/upload/${fileName}`;
            return (
              <SwiperSlide
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Box
                  component="img"
                  alt={review.revwCode}
                  src={fileSrc}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Box
          sx={{
            maxWidth: 1080,
            height: 1.1,
            backgroundColor: '#DFDFDF',
            mt: 2.5,
            mb: 2.5,
          }}
        ></Box>
        <Button onClick={handleReportReview}>신고</Button>
      </Box>
    </>
  );
};

export default Review;
