/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
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
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const pagination = {
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className}"></span>`;
  },
};

const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link'],
      ['clean'],
    ],
  },
};

const AdminProductsCreate = () => {
  const prodCodeRef = useRef();
  const prodBrandRef = useRef();
  const prodPriceRef = useRef();
  const prodCategoryRef = useRef();
  const prodShippingRef = useRef(); // 배송비
  const prodNameRef = useRef();
  const [prodContent, setProdContent] = useState('');
  const prodHostRef = useRef();

  const [imgBase64, setImgBase64] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);

  const prodPictureRef = useRef();
  const prodTagRef = useRef();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getBrandList();
    getCategoryList();
  }, []);

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
        prodPictureRef.current.value = '';
        setImgFiles([]);
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

  const handlePriceChange = () => {
    const price = prodPriceRef.current.value;
    prodPriceRef.current.value = price.replace(/[^0-9]|^0/gi, '');
  };

  const handleShippingChange = () => {
    const shipping = prodShippingRef.current.value;
    prodShippingRef.current.value = shipping.replace(/[^0-9]/gi, '');
  };

  const handleSubmit = () => {
    if (prodCodeRef.current.value === '') {
      alert('상품 코드를 입력해주세요.');
      prodCodeRef.current.focus();
      return false;
    }
    if (prodBrandRef.current.value === '선택') {
      alert('브랜드를 선택해주세요.');
      prodBrandRef.current.focus();
      return false;
    }

    if (prodPriceRef.current.value === '') {
      alert('가격을 입력해주세요.');
      prodPriceRef.current.focus();
      return false;
    }

    if (prodCategoryRef.current.value === 'none') {
      alert('카테고리를 선택해주세요.');
      prodCategoryRef.current.focus();
      return false;
    }

    if (prodShippingRef.current.value === '') {
      alert('배송비를 입력해주세요.');
      prodShippingRef.current.focus();
      return false;
    }

    if (prodNameRef.current.value === '') {
      alert('상품명을 입력해주세요.');
      prodNameRef.current.focus();
      return false;
    }

    if (prodContent === '') {
      alert('상품 설명을 입력해주세요.');
      return false;
    }

    if (prodHostRef.current.value === '') {
      alert('상품 제공자를 입력해주세요.');
      prodHostRef.current.focus();
      return false;
    }

    if (imgFiles.length === 0) {
      alert('상품 이미지를 등록해주세요.');
      return false;
    }

    if (window.confirm('상품을 등록하시겠습니까?')) {
      addProduct();
    } else {
      return false;
    }
  };

  const addProduct = () => {
    axios
      .post('/m/products/addProduct', {
        prodCode: prodCodeRef.current.value,
        prodBrand: prodBrandRef.current.value,
        prodPrice: prodPriceRef.current.value,
        prodCategory: prodCategoryRef.current.value,
        prodShipping: prodShippingRef.current.value,
        prodName: prodNameRef.current.value,
        prodContent: prodContent,
        prodHost: prodHostRef.current.value,
      })
      .then(() => {
        addProductTag();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const addProductTag = () => {
    // 연관검색어 쉼표와 공백 제거
    const str = prodTagRef.current.value;
    const arr = str
      .replace(/[,\s]+/g, ' ')
      .trim()
      .split(' ');

    axios
      .post('/m/products/addProdTags', {
        prodCode: prodCodeRef.current.value,
        prodTag: arr,
      })
      .then((res) => {
        if (imgFiles.length === 0) {
          alert('상품이 등록되었습니다.');
          navigate(`/m/products/details/${prodCodeRef.current.value}`);
        } else {
          imageUpload();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 이미지 업로드
  const imageUpload = () => {
    // <form></form> 형식으로 데이터를 보내기 위해 사용
    const formData = new FormData();

    // imgFile에 저장된 파일 목록을 formData에 저장
    for (let i = 0; i < imgFiles.length; i++) {
      formData.append('uploadImg', imgFiles[i]);
    }

    // 이미지 업로드 요청
    axios
      .post(`/m//products/upload/img/${prodCodeRef.current.value}`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('상품이 등록되었습니다.');
          navigate(`/m/products/details/${prodCodeRef.current.value}`);
        } else {
          alert('상품이 등록되었으나, 이미지 업로드에 실패했습니다.');
          navigate(`/m/products/details/${prodCodeRef.current.value}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const tableHeadStyle = {
    width: 170,
    fontSize: 18,
    border: '1px solid #E0E0E0',
  };

  const tableBodyStyle = {
    width: 400,
    border: '1px solid #E0E0E0',
  };

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
    height: '350px',
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
    width: '80px',
    height: '20px',
    bgcolor: '#ECECEC',
    fontSize: '12px',
    color: '#4E4E4E',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    lineHeight: '190%',
    boxShadow: '2px 2px 2px 1px #b0b0b0',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  };

  const btnSubmitStyle = {
    mx: 2,
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
    <Container
      sx={{
        userSelect: 'none',
      }}
    >
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
        상품 목록 &#62; 등록
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
                <InputLabel htmlFor="prodCode">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    상품 코드
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodCode"
                  fullWidth
                  size="small"
                  placeholder="상품 코드를 입력해주세요."
                  inputRef={prodCodeRef}
                  sx={inputStyle}
                />
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel htmlFor="prodBrand">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    브랜드
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodBrand"
                  select
                  fullWidth
                  size="small"
                  defaultValue="선택"
                  inputRef={prodBrandRef}
                  sx={inputStyle}
                >
                  <MenuItem value="선택" disabled>
                    브랜드 선택
                  </MenuItem>
                  <MenuItem value="none">없음</MenuItem>
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
                <InputLabel
                  htmlFor="prodPrice"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '123px',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    대여료
                  </Typography>
                  <Typography
                    sx={{ ml: '8px', fontSize: '12px', color: '#646464' }}
                  >
                    (7일 기준)
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodPrice"
                  fullWidth
                  size="small"
                  placeholder="숫자만 입력해주세요. ex) 10000"
                  inputRef={prodPriceRef}
                  onChange={handlePriceChange}
                  sx={inputStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&#8361;</InputAdornment>
                    ),
                  }}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel htmlFor="prodCategory">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    카테고리
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodCategory"
                  select
                  fullWidth
                  size="small"
                  defaultValue="none"
                  inputRef={prodCategoryRef}
                  sx={inputStyle}
                >
                  <MenuItem value="none" disabled>
                    카테고리 선택
                  </MenuItem>
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
                <InputLabel htmlFor="prodShipping">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    배송비
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodShipping"
                  fullWidth
                  size="small"
                  placeholder="숫자만 입력해주세요. ex) 10000"
                  inputRef={prodShippingRef}
                  sx={inputStyle}
                  onChange={handleShippingChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&#8361;</InputAdornment>
                    ),
                  }}
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodName">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    상품명
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodName"
                  fullWidth
                  size="small"
                  placeholder="상품명을 입력해주세요."
                  inputRef={prodNameRef}
                  sx={inputStyle}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: '#000000',
                    fontWeight: 'bold',
                    mb: '5px',
                  }}
                >
                  상품 사진
                </Typography>
                {/* 파일선택 버튼: label로 연결, 실제 input은 숨김 */}
                <InputLabel htmlFor="prodPicture" sx={btnUploadImageStyle}>
                  파일 선택
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
                    loop={true}
                    pagination={pagination}
                    modules={[Pagination]}
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
                            alt="상품 이미지"
                            src={img}
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
                <InputLabel htmlFor="prodContent">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    상품 설명
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <ReactQuill
                  style={{
                    marginTop: '10px',
                    padding: '0 0 41px 0',
                    height: '286px',
                    width: '100%',
                    backgroundColor: 'white',
                    border: '1px solid #000000',
                    fontSize: '1rem',
                  }}
                  modules={modules}
                  placeholder="상품 설명을 입력해주세요."
                  theme="snow"
                  value={prodContent}
                  onChange={setProdContent}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodHost">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    상품 제공자
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodHost"
                  fullWidth
                  size="small"
                  placeholder="상품 제공자를 입력해주세요."
                  defaultValue="취미빌리지"
                  inputRef={prodHostRef}
                  sx={inputStyle}
                />
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodTag">
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: '#000000',
                      fontWeight: 'bold',
                    }}
                  >
                    연관 검색어
                  </Typography>
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodTag"
                  fullWidth
                  size="small"
                  placeholder="ex) 수영복, 여름, 수영, 휴가"
                  inputRef={prodTagRef}
                  sx={inputStyle}
                  multiline
                />
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        {/* 하단 버튼 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            my: 5,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
            sx={btnCancelStyle}
          >
            취소
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="outlined"
            sx={btnSubmitStyle}
          >
            등록
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminProductsCreate;
