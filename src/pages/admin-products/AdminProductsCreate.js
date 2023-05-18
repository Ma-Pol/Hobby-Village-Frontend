import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  MenuItem,
  Button,
  Input,
  InputAdornment,
  Grid,
} from '@mui/material';

const AdminProductsCreate = () => {
  const prodCodeRef = useRef();
  const prodBrandRef = useRef();
  const prodPriceRef = useRef();
  const prodCategoryRef = useRef();
  const prodShippingRef = useRef(); // 배송비
  const prodNameRef = useRef();
  const prodContentRef = useRef();
  const prodHostRef = useRef();

  const [imgBase64, setImgBase64] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const filesRef = useRef();

  const prodPictureRef = useRef();
  const prodTagRef = useRef();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const getBrandList = () => {
    axios
      .get(`/m/products/getBrandList`)
      .then((res) => {
        const { data } = res;
        setBrands(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getCategoryList = () => {
    axios
      .get(`/m/products/getCategoryList`)
      .then((res) => {
        const { data } = res;
        setCategories(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getBrandList();
    getCategoryList();
  }, []);

  // 이미지 미리보기
  // 파일 업로드 버튼 클릭 후 파일 선택 시 실행되는 함수
  const imageChange = (e) => {
    // input에 저장된 파일 목록을 가져옴
    const imageFiles = e.target.files;

    // 만약 이미지 파일만을 저장하고 싶은 경우, 확장자 명을 확인할 것
    // 예시문) jpg, png, jpeg만 저장하고, 파일명의 특수문자를 체크하는 for문
    // 파일명 특문체크는 필수입니다!
    for (let i = 0; i < imageFiles.length; i++) {
      let check = false;
      const regExp = /[\[\]\{\}\/\?\\\*\|\<\>\"\'\:\;\`\^]/g;
      const imageFileType = imageFiles[i].name.split('.').at(-1).toLowerCase();

      if (regExp.test(imageFiles[i].name)) {
        alert('파일 이름에 특수문자가 포함되어 있습니다.');
        check = true;
      } else if (
        imageFileType !== 'jpg' &&
        imageFileType !== 'png' &&
        imageFileType !== 'jpeg'
      ) {
        alert('이미지 파일만 업로드 가능합니다.');
        check = true;
      }
      if (check) {
        filesRef.current.value = '';
        setImgBase64([]);
        return false;
      }
    }

    // 가져온 파일 목록을 imgFile에 저장
    setImgFiles(imageFiles); // 여기까지는 이미지 업로드만을 위한 코드

    //
    // 여기부터는 이미지 미리보기를 위한 코드
    setImgBase64([]); // 기존에 미리보기가 있었다면 그 목록을 비워야 함

    // input에 저장된 파일 개수만큼 반복
    for (let i = 0; i < imageFiles.length; i++) {
      // 비어있는 파일이 아니라면(파일이 읽힌다면)
      if (imageFiles[i]) {
        const imgViewer = new FileReader(); // FileReader 객체 생성

        imgViewer.readAsDataURL(imageFiles[i]); // 파일을 읽어서
        imgViewer.onloadend = () => {
          // 읽기가 끝났을 때
          const base64 = imgViewer.result; // 파일의 내용물을 base64 형태로 저장

          // base64가 있으면
          if (base64) {
            const base64Sub = base64.toString(); // base64를 문자열로 변환

            // ImgBase64에 base64Sub를 추가
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  // 이미지 업로드
  const imageUpload = () => {
    console.log(imgFiles);
    // <form></form> 형식으로 데이터를 보내기 위해 사용
    const formData = new FormData();

    // imgFile에 저장된 파일 목록을 formData에 저장
    for (let i = 0; i < imgFiles.length; i++) {
      formData.append('uploadImg', imgFiles[i]);
    }

    // 이미지 업로드 요청
    axios
      .post(`/m//products/upload/img`, prodCodeRef.current.value, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('이미지 업로드 성공!');
          setImgBase64([]);
          filesRef.current.value = '';
        } else {
          alert('이미지 업로드 실패!');
          setImgBase64([]);
          filesRef.current.value = '';
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    axios
      .post('/m/products/addProduct', {
        prodCode: prodCodeRef.current.value,
        prodBrand: prodBrandRef.current.value,
        prodPrice: prodPriceRef.current.value,
        prodCategory: prodCategoryRef.current.value,
        prodShipping: prodShippingRef.current.value,
        prodName: prodNameRef.current.value,
        prodContent: prodContentRef.current.value,
        prodHost: prodHostRef.current.value,
      })
      .catch((e) => {
        console.log(prodCodeRef.current.value);
        console.error(e);
      });
    // 연관검색어 쉼표와 공백 제거
    let str = prodTagRef.current.value;
    const arr = str
      .replace(/[,\s]+/g, ' ')
      .trim()
      .split(' ');
    console.log(arr); // test
    axios
      .post('/m/products/addProdTags', {
        prodCode: prodCodeRef.current.value,
        prodTag: arr,
      })
      .then((res) => {
        navigate(`/m/products/details/${prodCodeRef.current.value}`);
      })
      .catch((e) => {
        console.log(prodCodeRef.current.value);
        console.error(e);
      });
  };

  const tableHeadStyle = {
    width: 170,
    fontSize: 18,
    border: '1px solid #E0E0E0',
  };

  const tableBodyStyle = { width: 400, border: '1px solid #E0E0E0' };

  const tableBodyImageStyle = {
    width: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: '#c3c36a',
      },
    },
  };

  const noImageBox = {
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    width: '350px',
    minHeight: '220px',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    width: '350px',
    minHeight: '220px',
    height: '350px',
    display: 'flex',
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
    '&:hover': {
      cursor: 'pointer',
    },
  };

  const btnSubmitStyle = {
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

  const btnCancelStyle = {
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

  const images = [
    {
      url: "process.env.PUBLIC_URL + '/arena.png'",
    },
    {
      url: "process.env.PUBLIC_URL + '/brandyarn.png'",
    },
    {
      url: "process.env.PUBLIC_URL + '/excider.png'",
    },
  ];

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
        상품 목록 &#62; 상품 등록
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
                  fullWidth
                  size="small"
                  inputRef={prodCodeRef}
                  sx={inputStyle}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodBrand">브랜드</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodBrand"
                  select
                  label="브랜드 선택"
                  fullWidth
                  size="small"
                  inputRef={prodBrandRef}
                  sx={inputStyle}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </TextField>
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
                  inputRef={prodPriceRef}
                  sx={inputStyle}
                  label="숫자만 입력"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&#8361;</InputAdornment>
                    ),
                  }}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodCategory">카테고리</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodCategory"
                  select
                  label="카테고리 선택"
                  fullWidth
                  size="small"
                  inputRef={prodCategoryRef}
                  sx={inputStyle}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodShipping">배송비</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodShipping"
                  fullWidth
                  size="small"
                  inputRef={prodShippingRef}
                  sx={inputStyle}
                  label="숫자만 입력"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&#8361;</InputAdornment>
                    ),
                  }}
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
                  inputRef={prodNameRef}
                  sx={inputStyle}
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel>상품 사진</InputLabel>
                {/* 파일선택 버튼: label로 연결, 실제 input은 숨김 */}
                <InputLabel
                  id="btnUploadImage"
                  for="prodPicture"
                  sx={btnUploadImageStyle}
                >
                  파일선택
                </InputLabel>
                <Input
                  id="prodPicture"
                  inputRef={prodPictureRef}
                  type="file"
                  accept="image/*"
                  onChange={imageChange}
                  inputProps={{ multiple: true }}
                  sx={{ display: 'none' }}
                ></Input>
                <Button onClick={imageUpload}>업로드</Button>
              </TableCell>
              <TableCell sx={tableBodyImageStyle}>
                {imgBase64.length === 0 ? (
                  <Box sx={noImageBox}>
                    <Typography color="#626262">
                      등록된 사진이 없습니다.
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
                    {imgBase64.map((img, index) => {
                      return (
                        <SwiperSlide
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          key={index}
                        >
                          <Box
                            component="img"
                            alt="첨부된 사진이 없습니다"
                            src={img}
                            sx={{
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
                  size="small"
                  inputRef={prodContentRef}
                  sx={inputStyle}
                  multiline
                  inputProps={{ style: { height: '200px' } }}
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
                  inputRef={prodHostRef}
                  sx={inputStyle}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodTag">연관검색어</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodTag"
                  fullWidth
                  size="small"
                  inputRef={prodTagRef}
                  sx={inputStyle}
                  multiline
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
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="outlined"
            mr={3}
            sx={btnSubmitStyle}
          >
            등록
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="outlined" onClick={handleGoBack} sx={btnCancelStyle}>
            취소
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminProductsCreate;
