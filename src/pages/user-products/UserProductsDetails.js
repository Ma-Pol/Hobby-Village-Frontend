import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  Box,
  Container,
  Link,
  MenuItem,
  Button,
  Chip,
  Typography,
  TextField,
  Avatar,
  Divider,
  Fab,
} from '@mui/material';
import Review from '../../components/user-products/UserProductRevw';
import FavoriteIcon from '@mui/icons-material/Favorite';

const UserProductsDetails = () => {
  // const userEmail = sessionStorage.getItem(email); // 이메일 가져오기
  const userEmail = '취미빌리지'; // 테스트용

  const navigate = useNavigate();
  const { prodCode } = useParams();
  const periodRef = useRef();

  const [product, setProduct] = useState({});
  const [brandImg, setBrandImg] = useState();
  const brandLogo = process.env.PUBLIC_URL + `/BrandLogo/${brandImg}`;
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
    getProductDetail();
    getProdImg();
    getReviewList();
    getBrandImgName();
  }, []);

  // 찜등록
  const updateDibs = () => {
    axios
      .get(`/products/lists/checkDibs?email=${userEmail}&prodCode=${prodCode}`)
      .then((res) => {
        if (res.data >= 1) {
          window.alert('이미 찜한 상품입니다.');
          return;
        } else {
          axios
            .get(
              `/products/lists/updateDibs?email=${userEmail}&prodCode=${prodCode}`
            )
            .then(window.alert('찜 목록에 추가되었습니다.'));
        }
      });
  };

  // 장바구니 추가
  const addCart = () => {
    axios
      .get(`/products/lists/checkCart?email=${userEmail}&prodCode=${prodCode}`)
      .then((res) => {
        if (res.data >= 1) {
          window.alert('장바구니에 이미 존재하는 상품입니다.');
          return;
        } else {
          axios
            .get(
              `/products/lists/addCart?email=${userEmail}&prodCode=${prodCode}&period=${periodRef.current.value}`
            )
            .then(() => {
              window.alert('장바구니에 추가되었습니다.');
              if (window.confirm('장바구니로 이동하시겠습니까?')) {
                navigate(`/carts/${userEmail}/lists/all`);
              }
            });
        }
      });
  };

  // 지금 빌리기 (결제 페이지로 -- 현재 시점에 결제 페이지 없어서 장바구니로 이동)
  const goPay = () => {
    axios
      .get(`/products/lists/checkCart?email=${userEmail}&prodCode=${prodCode}`)
      .then((res) => {
        if (res.data < 1) {
          axios.get(
            `/products/lists/addCart?email=${userEmail}&prodCode=${prodCode}&period=${periodRef.current.value}`
          );
        }
        navigate(`/carts/${userEmail}/lists/all`);
      });
  };

  const brandLogoStyle = {
    width: '80px',
    height: 'auto',
    marginBottom: '15px',
  };

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    border: '1px solid #f1f1f1',
    width: '400px',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '--swiper-pagination-color': '#C3C36A',
  };

  let categoryColor = {
    width: '50px',
    height: '25px',
    fontWeight: 'bold',
  };

  if (
    product.prodCategory === '등산' ||
    product.prodCategory === '캠핑' ||
    product.prodCategory === '테니스'
  ) {
    categoryColor = {
      ...categoryColor,
      backgroundColor: '#BEDCB1',
    };
  } else if (
    product.prodCategory === '뜨개' ||
    product.prodCategory === '사진' ||
    product.prodCategory === '악기'
  ) {
    categoryColor = {
      ...categoryColor,
      backgroundColor: '#CB9869',
    };
  } else if (product.prodCategory === '수영') {
    categoryColor = {
      ...categoryColor,
      backgroundColor: '#69D2E9',
    };
  } else if (product.prodCategory === '웨이트') {
    categoryColor = {
      ...categoryColor,
      backgroundColor: '#C1C1C1',
    };
  } else {
    categoryColor = {
      ...categoryColor,
      backgroundColor: '#C3C36A',
    };
  }

  const prodMainStyle = {
    height: '220px',
    border: '1px solid #bfbfbf',
    borderRadius: '10px',
    margin: '5px 0',
    padding: '15px',
  };

  const profPicStyle = {
    bgcolor: '#C3C36A',
    width: '30',
    height: '30',
    '&.MuiAvatar-root': {
      position: 'relative',
      right: -90,
    },
  };

  const selectStyle = {
    width: '160px',
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: '#c3c36a',
      },
    },
  };

  const cartBtnStyle = {
    width: '160px',
    border: '1px solid #626262',
    borderRadius: '10px',
    bgcolor: '#C3C36A',
    fontSize: '1.2rem',
    color: 'black',
    padding: '0',
    margin: '0',
    '&:hover': {
      bgcolor: '#a1a155',
    },
    transition: 'all 0.5s',
  };

  const rentBtnStyle = {
    width: '160px',
    border: '1px solid #626262',
    borderRadius: '10px',
    bgcolor: '#ffffff',
    fontSize: '1.2rem',
    color: 'black',
    padding: '0',
    margin: '0',
    '&:hover': {
      bgcolor: '#8f8f8f',
    },
    transition: 'all 0.5s',
  };

  const [expanded, setExpanded] = useState('0');

  const handleChange = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container>
      {/* 브랜드 로고 표시 */}
      {product.prodBrand ? (
        <Box
          component="img"
          alt={product.prodBrand}
          src={brandLogo}
          sx={brandLogoStyle}
        ></Box>
      ) : null}

      {/* 상품 시작 */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ mb: '150px' }}
      >
        {/* 상품 이미지 */}
        <Box>
          <Swiper
            loop={true}
            modules={[Pagination]}
            pagination={true}
            style={swiperStyle}
          >
            {pictures.map((fileName) => {
              const fileSrc = `http://localhost:8080/products/lists/upload/${fileName}`;
              return (
                <SwiperSlide>
                  <Box
                    component="img"
                    alt={fileName}
                    src={fileSrc}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
        {/* 상품 정보 */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ width: '500px' }}
        >
          <Chip label={product.prodCategory} size="small" sx={categoryColor} />
          <Box display="flex" justifyContent="space-between">
            {/* 상품명 & 가격 */}
            <Box>
              <Typography
                component="h1"
                variant="h5"
                sx={{ mt: '10px', fontWeight: 'bold' }}
              >
                {product.prodName}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography component="h2" variant="h6">
                  {product.prodPrice}원&nbsp;
                </Typography>
                <Typography variant="body1">/ 7일</Typography>
              </Box>
            </Box>
            {/* 찜 아이콘 & 관심 수 */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Fab aria-label="like" size="small" sx={{ mb: '5px' }}>
                <FavoriteIcon onClick={updateDibs} />
              </Fab>
              <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                관심 {product.prodDibs}
              </Typography>
            </Box>
          </Box>
          {/* 상품 설명 box */}
          <Box sx={prodMainStyle}>
            <Typography
              sx={{ width: '450px', height: '200px' }}
              dangerouslySetInnerHTML={{
                __html: product.prodContent,
              }}
            ></Typography>
            {/* 호스트 닉네임 */}
            <Box
              display="flex"
              justifyContent="right"
              alignItems="center"
              sx={{ mr: '10px' }}
            >
              <Chip
                variant="plain"
                avatar={
                  <Avatar
                    display="inline"
                    src={profPicFile}
                    sx={profPicStyle}
                  ></Avatar>
                }
                label={product.prodHost}
                sx={{ bgcolor: '#FFFFFF', color: '#bfbfbf', ml: '-20px' }}
              />
            </Box>
          </Box>
          {/* 버튼 */}
          <Box display="flex" justifyContent="space-between">
            <TextField
              id="period"
              select
              defaultValue={0}
              size="small"
              sx={selectStyle}
              inputRef={periodRef}
            >
              <MenuItem key={0} disabled value="0">
                대여기간 선택
              </MenuItem>
              <MenuItem key={7} value={7}>
                7일 대여
              </MenuItem>
              <MenuItem key={14} value={14}>
                14일 대여
              </MenuItem>
              <MenuItem key={21} value={21}>
                21일 대여
              </MenuItem>
              <MenuItem key={28} value={28}>
                28일 대여
              </MenuItem>
            </TextField>
            <Button variant="contained" sx={cartBtnStyle} onClick={addCart}>
              장바구니 담기
            </Button>
            <Button variant="contained" sx={rentBtnStyle} onClick={goPay}>
              지금 빌리기
              {/* 이미 대여중일 경우 '현재 대여 중인 상품입니다' 멘트를 버튼 대신 보여주기 */}
            </Button>
          </Box>
        </Box>
      </Box>
      {/* 대여 리뷰 */}
      <Box display="flex" sx={{ mb: '20px' }}>
        <Typography variant="h5" component="h5">
          대여 리뷰&nbsp;
        </Typography>
        <Typography variant="h6" sx={{ color: '#a0a0a0' }}>
          ({revwCount})
        </Typography>
      </Box>
      {/* <Divider sx={{ mt: '20px' }}></Divider> */}
      {/* 리뷰 목록 출력 */}
      {reviewList.map((review) => {
        return (
          <Review
            key={review.revwCode}
            review={review}
            expanded={expanded}
            handleChange={handleChange}
          ></Review>
        );
      })}
    </Container>
  );
};

export default UserProductsDetails;
