/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Loading from '../../components/Loading';

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

const AdminProductsModify = () => {
  const [loading, setLoading] = useState(true);
  const { prodCode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const prodBrandRef = useRef();
  const prodPriceRef = useRef();
  const prodCategoryRef = useRef();
  const prodShippingRef = useRef();
  const prodNameRef = useRef();
  const [prodContent, setProdContent] = useState('');
  const prodHostRef = useRef();
  const prodTagRef = useRef();

  const [prodTag, setProdTag] = useState('');
  const [prodPics, setProdPics] = useState([]);
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const prodPictureRef = useRef();

  useEffect(() => {
    axios
      .all([
        axios.get(`/m/products/productDetails/${prodCode}`),
        axios.get(`/m/products/pictures/${prodCode}`),
        axios.get(`/m/products/tags/${prodCode}`),
        axios.get(`/m/products/getBrandList`),
        axios.get(`/m/products/getCategoryList`),
      ])
      .then(
        axios.spread((detail, pictures, tags, brands, categories) => {
          if (detail.data === null) {
            alert('존재하지 않는 상품입니다.');
            navigate(-1, { replace: true });
          } else {
            const productData = {
              prodCode: detail.data.prodCode,
              prodBrand: detail.data.prodBrand,
              prodPrice: detail.data.prodPrice,
              prodCategory: detail.data.prodCategory,
              prodShipping: detail.data.prodShipping,
              prodName: detail.data.prodName,
              prodContent: detail.data.prodContent,
              prodHost: detail.data.prodHost,
            };
            setProduct(productData);
            setProdContent(detail.data.prodContent);
            setProdPics(pictures.data);
            setProdTag(tags.data);
            setBrands(brands.data);
            setCategories(categories.data);
          }
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodCode]);

  const imageChange = (e) => {
    const imageFiles = e.target.files;

    if (imageFiles.length > 10) {
      alert('이미지는 최대 10장까지만 업로드할 수 있습니다.');
      setImgFiles([]);
      setImgBase64([]);
      prodPictureRef.current.value = '';
      return false;
    }

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

    setImgFiles(imageFiles);

    setImgBase64([]);
    for (let i = 0; i < imageFiles.length; i++) {
      if (imageFiles[i]) {
        const imgViewer = new FileReader();

        imgViewer.readAsDataURL(imageFiles[i]);
        imgViewer.onloadend = () => {
          const base64 = imgViewer.result;

          if (base64) {
            const base64Sub = base64.toString();

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

    if (window.confirm('상품 정보를 수정하시겠습니까?')) {
      modifyProduct();
    } else {
      return false;
    }
  };

  const modifyProduct = () => {
    axios
      .patch('/m/products/modifyProduct', {
        prodCode: product.prodCode,
        prodBrand: prodBrandRef.current.value,
        prodPrice: prodPriceRef.current.value,
        prodCategory: prodCategoryRef.current.value,
        prodShipping: prodShippingRef.current.value,
        prodName: prodNameRef.current.value,
        prodContent: prodContent,
        prodHost: prodHostRef.current.value,
      })
      .then((res) => {
        if (res.data === true) {
          modifyProductTag();
        } else {
          alert('상품 정보 수정에 실패했습니다.');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const modifyProductTag = () => {
    // 연관검색어 쉼표와 공백 제거
    const str = prodTagRef.current.value;
    const arr = str
      .replace(/[,\s]+/g, ' ')
      .trim()
      .split(' ');

    axios
      .patch('/m/products/modifyProdTags', {
        prodCode: product.prodCode,
        prodTag: arr,
      })
      .then(() => {
        if (imgFiles.length === 0) {
          alert('상품 정보가 수정되었습니다.');
          navigate(`/m/products/details/${product.prodCode}`);
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
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append('uploadImg', imgFiles[i]);
    }

    axios
      .patch(`/m/products/upload/img/${product.prodCode}`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('상품 정보가 수정되었습니다.');
          navigate(`/m/products/details/${product.prodCode}`);
        } else {
          alert('상품 정보가 수정되었으나, 이미지 업로드에 실패했습니다.');
          navigate(`/m/products/details/${product.prodCode}`);
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
        상품 목록 &#62; 수정
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
              <Table sx={{ maxWidth: 1140 }}>
                <TableRow>
                  <TableCell sx={tableHeadStyle}>
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
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        color: '#000000',
                      }}
                    >
                      {product.prodCode}
                    </Typography>
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
                      defaultValue={
                        product.prodBrand === null ? 'none' : product.prodBrand
                      }
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
                      defaultValue={product.prodPrice}
                      placeholder="숫자만 입력해주세요. ex) 10000"
                      inputRef={prodPriceRef}
                      onChange={handlePriceChange}
                      sx={inputStyle}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            &#8361;
                          </InputAdornment>
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
                      defaultValue={product.prodCategory}
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
                      defaultValue={product.prodShipping}
                      placeholder="숫자만 입력해주세요. ex) 10000"
                      inputRef={prodShippingRef}
                      sx={inputStyle}
                      onChange={handleShippingChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            &#8361;
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <InputLabel htmlFor="prodName">
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
                      defaultValue={product.prodName}
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
                    {
                      // 기존 이미지, 새로 추가된 이미지 모두 없는 경우
                      prodPics.length === 0 && imgBase64.length === 0 ? (
                        <Box sx={noImageBox}>
                          <Typography color="#626262">
                            등록된 사진이 없습니다.
                          </Typography>
                        </Box>
                      ) : // 새로 추가된 이미지가 있는 경우
                      imgBase64.length !== 0 ? (
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
                      ) : (
                        // 기존 이미지가 있고, 새로 추가된 이미지는 없는 경우
                        <Swiper
                          loop={true}
                          pagination={pagination}
                          modules={[Pagination]}
                          style={swiperStyle}
                        >
                          {prodPics.map((fileName) => {
                            const fileSrc = `http://localhost:8080/m/products/upload/product/${fileName}`;
                            return (
                              <SwiperSlide
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                key={fileName}
                              >
                                <Box
                                  component="img"
                                  alt="상품 이미지"
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
                      )
                    }
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
                    <InputLabel htmlFor="prodHost">
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
                      defaultValue={product.prodHost}
                      inputRef={prodHostRef}
                      sx={inputStyle}
                    />
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <InputLabel htmlFor="prodTag">
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
                      defaultValue={prodTag}
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
                수정
              </Button>
            </Box>
          </Box>
          {/* form 끝 */}
        </>
      )}
    </Container>
  );
};

export default AdminProductsModify;
