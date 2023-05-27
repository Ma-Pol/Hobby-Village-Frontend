import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  Button,
  Link,
} from '@mui/material';
import Loading from 'components/Loading';

const pagination = {
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className}"></span>`;
  },
};

const AdminProductsDetails = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { prodCode } = useParams();
  const location = useLocation();
  const prevQuery = location.state?.queryString;

  const [product, setProduct] = useState({});

  const [prodPics, setProdPics] = useState([]);
  const [prodTag, setProdTag] = useState('');

  useEffect(() => {
    checkProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkProduct = () => {
    axios.get(`/m/products/check/${prodCode}`).then((check) => {
      if (check.data === 0) {
        alert('존재하지 않는 상품입니다.');
        navigate(`/m/products/lists?sort=-prodRegiDate&filter=none&pages=1`, {
          replace: true,
        });
      } else {
        getProductData();
      }
    });
  };

  const getProductData = () => {
    axios
      .all([
        axios.get(`/m/products/productDetails/${prodCode}`),
        axios.get(`/m/products/pictures/${prodCode}`),
        axios.get(`/m/products/tags/${prodCode}`),
      ])
      .then(
        axios.spread((detail, pictures, tags) => {
          setProduct(detail.data);
          setProdPics(pictures.data);
          setProdTag(tags.data);
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = () => {
    if (window.confirm('정말 해당 상품을 삭제하시겠습니까?')) {
      axios
        .delete(`/m/products/delete?prodCode=${prodCode}`)
        .then(() => {
          alert('상품이 삭제되었습니다.');
          navigate(`/m/products/lists?sort=-prodRegiDate&filter=none&pages=1`);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      return false;
    }
  };

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

  const btnUpdateStyle = {
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
        상품 목록 &#62; 상세
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
                      상품 코드
                    </Typography>
                  </TableCell>

                  <TableCell sx={tableBodyStyle}>
                    <Link
                      title="해당 상품의 주문 목록으로 이동"
                      href={`/m/orders/lists?condition=op.prodCode&keyword=${prodCode}&sort=-odrDate&filter=none&pages=1`}
                      underline="none"
                      sx={{ color: '#000000', textDecoration: 'underline' }}
                    >
                      <Typography variant="h6" component="h2">
                        {product.prodCode}
                      </Typography>
                    </Link>
                  </TableCell>

                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      브랜드
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {product.prodBrand === null ? '-' : product.prodBrand}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableHeadStyle}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 'bold' }}
                      >
                        대여료
                      </Typography>
                      <Typography
                        sx={{ ml: '8px', fontSize: '12px', color: '#646464' }}
                      >
                        (7일 기준)
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {String(product?.prodPrice).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ','
                      ) + ' 원'}
                    </Typography>
                  </TableCell>

                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      카테고리
                    </Typography>
                  </TableCell>

                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {product.prodCategory}
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
                      등록일
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {product.prodRegiDate}
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      상품명
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography
                      title={product.prodName}
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
                      {product.prodName}
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
                      총 대여 횟수
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {product.rentalCount + '회'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      대여 현황
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {product.prodIsRental === 1 ? '대여중' : '미대여'}
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
                      상품 사진
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyImageStyle}>
                    {prodPics.length === 0 ? (
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
                        {prodPics.map((fileName) => {
                          const fileSrc = `http://localhost:8080/m/products/upload/${fileName}`; // 여기에 이미지 요청 경로 넣기
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
                      상품 설명
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '350px',
                        overflow: 'auto',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.prodContent,
                        }}
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableHeadStyle}>
                    <Link
                      title="상품 리뷰 목록으로 이동"
                      href={`/m/reviews/lists?condition=prodCode&keyword=${prodCode}&sort=-revwRegiDate&filter=none&pages=1`}
                      underline="none"
                      sx={{ color: '#000000', textDecoration: 'underline' }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: 'bold',
                          color: '#000000',
                        }}
                      >
                        평균 별점
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" component="h2">
                      {product.revwRate === null
                        ? '리뷰 없음'
                        : product.revwRate}
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      관심 수
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {product.prodDibs}
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
                      상품 제공자
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {product.prodHost}
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableHeadStyle}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      연관 검색어
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    <Typography variant="h6" component="h2">
                      {prodTag}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>

            {/* 하단 버튼 */}
            <Box sx={{ display: 'flex', alignItems: 'center', my: 5 }}>
              {product.prodDeleted === 0 && (
                <Button
                  disabled={product.prodIsRental === 1 ? true : false}
                  variant="outlined"
                  sx={btnDeleteStyle}
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              )}

              <Button
                variant="outlined"
                sx={btnListStyle}
                onClick={() => {
                  if (prevQuery === undefined) {
                    navigate(
                      `/m/products/lists?sort=-prodRegiDate&filter=none&pages=1`
                    );
                  } else {
                    navigate(`/m/products/lists${prevQuery}`);
                  }
                }}
              >
                목록
              </Button>

              {product.prodDeleted === 0 && (
                <Button
                  disabled={product.prodIsRental === 1 ? true : false}
                  variant="outlined"
                  sx={btnUpdateStyle}
                  onClick={() =>
                    navigate(`/m/products/modify/${product.prodCode}`)
                  }
                >
                  수정
                </Button>
              )}
            </Box>
          </Box>
          {/* form 끝 */}
        </>
      )}
    </Container>
  );
};

export default AdminProductsDetails;
