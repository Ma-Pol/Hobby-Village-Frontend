import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  Box,
  Container,
  MenuItem,
  Button,
  Chip,
  Typography,
  Avatar,
  Fab,
  Select,
} from '@mui/material';
import Review from '../../components/user-products/UserProductRevw';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loading from 'components/Loading';

const UserProductsDetails = () => {
  const [loading, setLoading] = useState(true);
  const userEmail = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기

  const navigate = useNavigate();
  const { prodCode } = useParams();
  const [period, setPeriod] = useState(0);

  const [product, setProduct] = useState({});
  const [brandImg, setBrandImg] = useState();
  const brandLogo = process.env.PUBLIC_URL + `/BrandLogo/${brandImg}`;
  const [prodPictures, setProdPictures] = useState([]);
  const [revwCount, setRevwCount] = useState();
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    checkProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 상품 실재 여부 확인
  const checkProduct = () => {
    axios
      .get(`/products/lists/checkProduct?prodCode=${prodCode}`)
      .then((res) => {
        if (res.data === 0) {
          alert('존재하지 않는 상품입니다.');
          navigate(-1);
        } else {
          getProductDetail();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 상품 상세 정보
  const getProductDetail = () => {
    axios
      .get(`/products/lists/getProductDetail?prodCode=${prodCode}`)
      .then((res) => {
        setProduct(res.data);
      })
      .finally(() => {
        getReviewList();
        getProdImg();
        getBrandImgName();
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
        setProdPictures(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 브랜드 이미지 파일명
  const getBrandImgName = () => {
    axios
      .get(`/products/lists/getBrandImgName?prodCode=${prodCode}`)
      .then((res) => {
        setBrandImg(res.data);
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
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 찜등록
  const updateDibs = () => {
    if (userEmail === null) {
      alert('로그인 후 이용해주세요.');
    } else {
      axios
        .get(
          `/products/lists/checkDibs?email=${userEmail}&prodCode=${prodCode}`
        )
        .then((res) => {
          if (res.data >= 1) {
            alert('이미 찜한 물품입니다.');
            return;
          } else {
            axios
              .get(
                `/products/lists/updateDibs?email=${userEmail}&prodCode=${prodCode}`
              )
              .then(() => {
                alert('찜 목록에 추가되었습니다.');
                getProductDetail();
              });
          }
        });
    }
  };

  // 장바구니 추가
  const addCart = () => {
    if (userEmail === null) {
      alert('로그인 후 이용해주세요.');
    } else {
      axios
        .get(
          `/products/lists/checkCart?email=${userEmail}&prodCode=${prodCode}`
        )
        .then((res) => {
          if (res.data >= 1) {
            alert('이미 장바구니에 존재하는 물품입니다.');
            return;
          } else {
            axios
              .get(
                `/products/lists/addCart?email=${userEmail}&prodCode=${prodCode}&period=${period}`
              )
              .then(() => {
                if (
                  window.confirm(
                    '장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?'
                  )
                ) {
                  navigate(`/carts/${userEmail}/lists/all`);
                }
              });
          }
        });
    }
  };

  // 지금 빌리기(결제 페이지로)
  const goPurchase = () => {
    if (userEmail === null) {
      alert('로그인 후 이용해주세요.');
    } else {
      axios
        .get(
          `/products/lists/checkOrders?email=${userEmail}&prodCode=${prodCode}`
        )
        .then((res) => {
          if (res.data !== 0) {
            alert('이미 대여 중인 물품입니다.');
            return false;
          } else {
            navigate(`/purchase`, {
              state: {
                prevPage: 'details',
                products: [
                  {
                    prodCode: prodCode,
                    prodName: product.prodName,
                    prodPrice: product.prodPrice,
                    prodShipping: Number(product.prodShipping),
                    prodHost: product.prodHost,
                    prodPicture: prodPictures[0],
                    period: period,
                  },
                ],
              },
            });
          }
        });
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const brandLogoStyle = {
    width: 'auto',
    height: '45px',
  };

  const swiperStyle = {
    boxSizing: 'border-box',
    width: '400px',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const categoryColor = {
    fontSize: '14px',
    px: '5px',
    width: 'auto',
    height: '30px',
    fontWeight: 'bold',
    backgroundColor:
      product.prodCategory === '등산' ||
      product.prodCategory === '캠핑' ||
      product.prodCategory === '테니스'
        ? '#BEDCB1'
        : product.prodCategory === '뜨개' ||
          product.prodCategory === '사진' ||
          product.prodCategory === '악기'
        ? '#CB9869'
        : product.prodCategory === '수영'
        ? '#69D2E9'
        : product.prodCategory === '웨이트'
        ? '#C1C1C1'
        : '#C3C36A',
  };

  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (loading) {
    return <Loading height={'80vh'} />;
  } else {
    return (
      <Container
        sx={{
          width: '1150px',
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: '100px',
        }}
      >
        {/* 브랜드 로고 표시 */}
        {product.prodBrand !== null && (
          <Box
            sx={{
              m: 0,
              p: 0,
              mt: '30px',
              width: '1000px',
              boxSizing: 'border-box',
              userSelect: 'none',
            }}
          >
            <Box
              component="img"
              alt={product.prodBrand}
              src={brandLogo}
              sx={brandLogoStyle}
            />
          </Box>
        )}

        {/* 상품 전체 설명 시작 */}
        <Box
          sx={{
            m: 0,
            p: 0,
            mt: product.prodBrand !== null ? '10px' : '30px',
            mb: '120px',
            width: '1000px',
            height: '400px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            userSelect: 'none',
          }}
        >
          {/* 상품 이미지 시작 */}
          <Box
            sx={{
              boxSizing: 'border-box',
              backgroundColor: '#fdfdfd',
              width: '400px',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Swiper
              loop={true}
              modules={[Pagination]}
              pagination={true}
              style={swiperStyle}
            >
              {prodPictures.map((prodPicture, index) => {
                const imgSrc = `http://localhost:8080/products/lists/upload/${prodPicture}`;
                return (
                  <SwiperSlide key={index}>
                    <Box
                      component="img"
                      alt={product.prodName}
                      src={imgSrc}
                      sx={{
                        boxSizing: 'border-box',
                        border: '1px solid #bfbfbf',
                        width: '400px',
                        height: '400px',
                        objectFit: 'contain',
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
          {/* 상품 이미지 끝 */}

          {/* 상품 설명 시작 */}
          <Box
            sx={{
              boxSizing: 'border-box',
              width: '500px',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* 상품 카테고리 */}
            <Box
              sx={{
                boxSizing: 'border-box',
                width: '100%',
                height: '30px',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Chip
                label={product.prodCategory}
                size="small"
                sx={categoryColor}
              />
            </Box>

            {/* 상품 제목, 금액, 찜 */}
            <Box
              sx={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '80px',
              }}
            >
              <Box
                sx={{
                  m: 0,
                  p: 0,
                  width: '400px',
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  title={product.prodName}
                  sx={{
                    m: 0,
                    p: 0,
                    width: '400px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {product.prodName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    m: 0,
                    p: 0,
                    fontWeight: 'bold',
                  }}
                >
                  {String(product.prodPrice).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ','
                  )}
                  원 / 7일
                </Typography>
              </Box>

              <Box
                sx={{
                  m: 0,
                  p: 0,
                  width: '100px',
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
              >
                <Fab aria-label="like" size="small" sx={{ mb: '10px' }}>
                  <FavoriteIcon onClick={updateDibs} />
                </Fab>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  관심 {product.prodDibs}
                </Typography>
              </Box>
            </Box>

            {/* 상품 설명 */}
            <Box
              sx={{
                m: 0,
                boxSizing: 'border-box',
                position: 'relative',
                width: '100%',
                height: '230px',
                border: '2px solid #d0d0d0',
                borderRadius: '10px',
              }}
            >
              <Box
                sx={{
                  m: 0,
                  p: '0px 10px 0px 10px',
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '180px',
                  overflow: 'auto',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: product.prodContent }}
                />
              </Box>

              {/* 상품 호스트 */}
              <Box
                sx={{
                  m: 0,
                  p: 0,
                  width: '100%',
                  height: '50px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    mr: '10px',
                    color: '#777777',
                    fontSize: '1.1rem',
                  }}
                >
                  by. {product.prodHost}
                </Typography>
                {product.prodHost !== '취미빌리지' && (
                  <Avatar
                    sx={{
                      mx: '10px',
                      width: '35px',
                      height: '35px',
                    }}
                    src={`http://localhost:8080/profPicture/${product.profPicture}`}
                  />
                )}
              </Box>
            </Box>
            {/* 상품 설명 끝 */}

            {/* 상품 구매 시작 */}
            <Box
              sx={{
                m: 0,
                p: 0,
                boxSizing: 'border-box',
                width: '100%',
                height: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Select
                value={period}
                onChange={handlePeriodChange}
                size="small"
                sx={{
                  width: '150px',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#c3c36a',
                  },
                }}
              >
                <MenuItem value={0} disabled>
                  대여기간 선택
                </MenuItem>
                <MenuItem value={7}>7일 대여</MenuItem>
                <MenuItem value={14}>14일 대여</MenuItem>
                <MenuItem value={21}>21일 대여</MenuItem>
                <MenuItem value={28}>28일 대여</MenuItem>
              </Select>

              <Button
                disabled={period === 0}
                variant="contained"
                sx={{
                  boxSizing: 'border-box',
                  m: 0,
                  p: 0,
                  width: '150px',
                  height: '40px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  border: '1px solid #626262',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                  },
                }}
                onClick={addCart}
              >
                장바구니 담기
              </Button>
              <Button
                disabled={period === 0 || product.prodIsRental === 1}
                variant="contained"
                sx={{
                  boxSizing: 'border-box',
                  m: 0,
                  p: 0,
                  width: '150px',
                  height: '40px',
                  backgroundColor: '#c3c36a',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  border: '1px solid #626262',
                  '&:hover': {
                    backgroundColor: '#c3c36a',
                    color: '#ffffff',
                  },
                }}
                onClick={goPurchase}
              >
                즉시 대여하기
              </Button>
            </Box>
          </Box>
        </Box>

        {/* 대여 리뷰 */}

        <Box
          sx={{
            m: 0,
            p: 0,
            mb: '20px',
            width: '1000px',
            height: 'auto',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              m: 0,
              p: 0,
              mb: '10px',
              width: '100%',
              height: '40px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{
                fontWeight: 'bold',
                color: '#c3c36a',
              }}
            >
              대여 리뷰&nbsp;
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#a0a0a0',
              }}
            >
              ({revwCount})
            </Typography>
          </Box>
          {/* 리뷰 목록 출력 */}
          {reviewList.length === 0 ? (
            <Box
              sx={{
                m: 0,
                p: 0,
                borderTop: '1px solid #d0d0d0',
                borderBottom: '1px solid #d0d0d0',
                width: '100%',
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                리뷰가 없습니다.
              </Typography>
            </Box>
          ) : (
            reviewList.map((review, index, row) => {
              return (
                <Review
                  key={review.revwCode}
                  review={review}
                  expanded={expanded}
                  handleChange={handleChange}
                  isLast={index === row.length - 1}
                />
              );
            })
          )}
        </Box>
      </Container>
    );
  }
};

export default UserProductsDetails;
