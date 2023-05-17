import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SimpleImageSlider from 'react-simple-image-slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Container,
  Box,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  InputLabel,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@mui/material';

const AdminProductsDetails = () => {
  const navigate = useNavigate();
  const { prodCode } = useParams();

  const [product, setProduct] = useState({
    prodCode: '',
    prodBrand: '',
    prodPrice: 0,
    prodCategory: '',
    prodRegiDate: '',
    prodName: '',
    rentalCount: 0,
    prodIsRental: 0,
    prodContent: '',
    revwRate: 0.0,
    prodDibs: 0,
    prodHost: '',
  });

  // 임시 이미지
  const imagesTmp = [
    {
      url: process.env.PUBLIC_URL + '/BrandLogo/arena.png',
    },
    {
      url: process.env.PUBLIC_URL + '/BrandLogo/brandyarn.png',
    },
    {
      url: process.env.PUBLIC_URL + '/BrandLogo/excider.png',
    },
  ];

  const [prodPics, setProdPics] = useState([]);
  const [prodTag, setProdTag] = useState('');

  const getProductDetail = () => {
    axios
      .get(`/m/products/getProductDetail?prodCode=${prodCode}`)
      .then((res) => {
        console.log(prodCode);
        const { data } = res;
        setProduct(data);
        console.log(res.data.revwRate);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getProdPics = () => {
    axios
      .get(`/m/products/getProdPictures?prodCode=${prodCode}`)
      .then((res) => {
        const { data } = res;
        setProdPics(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getProdTag = () => {
    axios
      .get(`/m/products/getProdTag?prodCode=${prodCode}`)
      .then((res) => {
        console.log(prodCode);
        const { data } = res;
        setProdTag(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getProductDetail();
    getProdPics();
    getProdTag();
  }, []);

  const tableHeadStyle = {
    width: 170,
    fontSize: 18,
    border: '1px solid #E0E0E0',
  };

  const tableBodyStyle = { width: 400, border: '1px solid #E0E0E0' };

  const inputReadOnlyStyle = {
    '& fieldset': {
      border: 'none',
    },
    input: { color: '#626262' },
    textarea: { color: '#626262' },
    overflow: 'auto',
  };

  const noImgaeBox = {
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    width: '220px',
    minHeight: '220px',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    width: '220px',
    minHeight: '220px',
    height: 'auto',
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const btnUploadImageStyle = {
    display: 'block',
    width: '60px',
    height: '20px',
    bgcolor: '#ECECEC',
    fontSize: '12px',
    color: '#4E4E4E',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    lineHeight: '190%',
    boxShadow: '2px 2px 2px 1px #b0b0b0',
    display: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  };

  const btnDeleteStyle = {
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

  const btnUpdateStyle = {
    width: '65px',
    height: '35px',
    bgcolor: '#c3c36a',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#A9A951',
      border: '1px solid #626262',
      color: '#323232',
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
        }}
      >
        상품 목록 &#62; 상품 상세
      </Typography>

      {/* form 시작 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TableContainer>
          <Table sx={{ maxWidth: 1140 }}>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodCode">상품 코드</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodCode"
                  value={product.prodCode}
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodBrand">브랜드</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodBrand"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.prodBrand}
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                  <InputLabel for="prodPrice">대여료</InputLabel>
                  <Typography sx={{ fontSize: '12px', color: '#646464' }}>
                    &nbsp;(7일 기준)
                  </Typography>
                </Grid>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodPrice"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&#8361;</InputAdornment>
                    ),
                  }}
                  value={product.prodPrice}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodCategory">카테고리</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodCategory"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  value={product.prodCategory}
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodRegiDate">등록일</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodRegiDate"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.prodRegiDate}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodName">상품명</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodName"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.prodName}
                ></TextField>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="rentalCount">총 대여 횟수</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="rentalCount"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.rentalCount}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodIsRental">대여현황</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodIsRental"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.prodIsRental}
                ></TextField>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel>상품 사진</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                {/* <SimpleImageSlider
                  width={220}
                  height={220}
                  images={imagesTmp}
                  showBullets={true}
                  showNavs={true}
                  navSize={15}
                  navMargin={10}
                /> */}
                {prodPics.length === 0 ? (
                  <Box sx={noImgaeBox}>
                    <Typography variant="h6" component="h2">
                      첨부 파일이 없습니다.
                    </Typography>
                  </Box>
                ) : (
                  <Swiper
                    pagination={{
                      type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Navigation, Pagination]}
                    style={swiperStyle}
                  >
                    {prodPics.map((prodPicture) => {
                      const fileSrc = `/Users/neung/desktop/devStudy/KDTProject/Hobby-Village/Uploaded/ProductsImage/${prodPicture}`; // 여기에 이미지 요청 경로 넣기
                      console.log(prodPicture);
                      console.log(prodPics);
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
                            alt={prodCode}
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
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodContent">상품 설명</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodContent"
                  fullWidth
                  multiline
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.prodContent}
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="revwRateAvg">평균 별점</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="revwRateAvg"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.revwRate}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodDibs">관심 수</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodDibs"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.prodDibs}
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodHost">대여자(닉네임)</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodHost"
                  fullWidth
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.prodHost}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodTag">연관검색어</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodTag"
                  fullWidth
                  multiline
                  size="small"
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={prodTag}
                ></TextField>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        {/* 하단 버튼 */}
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          mt={5}
        >
          <Button variant="outlined" sx={btnDeleteStyle}>
            삭제
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="outlined"
            sx={btnListStyle}
            onClick={() =>
              navigate(
                `/m/products/lists?sort=-prodRegiDate&filter=none&pages=1`
              )
            }
          >
            목록
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="outlined"
            sx={btnUpdateStyle}
            onClick={() => navigate(`/m/products/modify/${product.prodCode}`)}
          >
            수정
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminProductsDetails;
