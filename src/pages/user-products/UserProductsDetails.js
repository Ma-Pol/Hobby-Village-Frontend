import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {
  Box,
  Container,
  Grid,
  Link,
  MenuItem,
  Select,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Typography,
  TextField,
  Rating,
  Stack,
  Avatar,
} from '@mui/material';
import Review from '../../components/user-products/UserProductRevw';

const UserProductsDetails = () => {
  const navigate = useNavigate();
  const { prodCode } = useParams();

  const [product, setProduct] = useState({});
  const [brandImg, setBrandImg] = useState();
  const [pictures, setPictures] = useState([]);
  const profPicFile = `http://localhost:8080/prodReview/upload/profPic/${product.profPicture}`;
  const [revwCount, setRevwCount] = useState();
  const [reviewList, setReviewList] = useState([]);

  // 상품 상세 정보
  const getProductDetail = () => {
    axios
      .get(`/products/lists/getProductDetail?prodCode=${prodCode}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 상품 이미지
  const getProdImg = () => {
    axios
      .get(`/products/lists/getProdPictures?prodCode=${prodCode}`)
      .then((res) => {
        setPictures(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 리뷰 개수 + 리뷰 목록 구하기
  const getReviewList = () => {
    axios
      .all([
        axios.get(`/prodReview/count?prodCode=${prodCode}`),
        axios.get(`/prodReview/list?prodCode=${prodCode}`),
      ])
      .then(
        axios.spread((count, list) => {
          setRevwCount(count.data);
          setReviewList(list.data);
        })
      )
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getProductDetail();
    getProdImg();
    getReviewList();
  }, []);

  // 브랜드 이미지 파일명
  const getBrandImgName = () => {
    axios
      .get(`/products/lists/getBrandImgName?brand=${product.prodBrand}`)
      .then((res) => {
        setBrandImg(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getBrandImgName();
  }, []);

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    width: '400px',
    minHeight: '400px',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Container>
      {/* 브랜드 로고 표시 */}
      <Box></Box>
      {/* 상품 정보 */}
      <Box></Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Swiper
              pagination={{
                type: 'fraction',
              }}
              navigation={true}
              modules={[Navigation, Pagination]}
              style={swiperStyle}
            >
              {pictures.map((fileName) => {
                const fileSrc = `http://localhost:8080/products/lists/upload/${fileName}`; // 여기에 이미지 요청 경로 넣기
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
                        width: '90%',
                        height: '90%',
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Chip label={product.prodCategory} sx={{ height: '30px' }} />
            </Box>
            <Grid item xs={6}>
              <Typography variant="h5" component="h2" mt={1} display="inline">
                {product.prodName}
              </Typography>
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
              <Typography>관심 {product.prodDibs}</Typography>
            </Grid>
            <Box mb={1}>
              <Typography display="inline">{product.prodPrice}원</Typography>
              <Typography display="inline"> / 7일</Typography>
            </Box>
            <TextField
              disabled
              multiline
              rows={9}
              value={product.prodContent}
              sx={{ width: '450px' }}
            ></TextField>
            <Typography>{product.prodHost}</Typography>
            <Avatar
              display="inline"
              sx={{ bgcolor: '#ABCDEF', width: 30, height: 30 }}
              src={profPicFile}
            ></Avatar>
            <Box id="buttons" mt={2}>
              <TextField
                select
                defaultValue={0}
                size="small"
                sx={{ width: 150 }}
              >
                <MenuItem key={0} value="0">
                  대여기간 선택
                </MenuItem>
                <MenuItem key={7} value="7">
                  7일
                </MenuItem>
                <MenuItem key={14} value="14">
                  14일
                </MenuItem>
                <MenuItem key={21} value="21">
                  21일
                </MenuItem>
                <MenuItem key={28} value="28">
                  28일
                </MenuItem>
              </TextField>
              <Button
                variant="contained"
                color="success"
                sx={{ width: 130, mx: 2.5 }}
              >
                장바구니 담기
              </Button>
              <Button variant="contained" color="info" sx={{ width: 130 }}>
                지금 빌리기
                {/* 이미 대여중일 경우 '현재 대여 중인 상품입니다' 멘트를 버튼 대신 보여주기 */}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box mt={20}>
          <Grid item>
            <Typography display="inline" variant="h5" component="h5">
              대여 리뷰
            </Typography>
            <Typography display="inline"> {revwCount} </Typography>
            <Box
              sx={{
                maxWidth: 1080,
                height: 1.1,
                backgroundColor: '#DFDFDF',
                mt: 2.5,
                mb: 2.5,
              }}
            ></Box>
          </Grid>
          {/* 리뷰목록 */}
          {reviewList.map((review) => {
            return <Review key={review.revwCode} review={review}></Review>;
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProductsDetails;
