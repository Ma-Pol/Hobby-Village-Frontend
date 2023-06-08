import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  Button,
  Container,
} from '@mui/material';
import { CheckCircleRounded } from '@mui/icons-material';
import UserCartItems from './UserCartItems';
import axios from 'axios';
import Loading from '../../../components/Loading';

const categoryButtonStyle = {
  mr: '5px',
  px: '20px',
  border: 'none',
  height: '35px',
  backgroundColor: 'none',
  color: '#828282',
  fontSize: '1.2rem',
  fontWeight: 'Regular',
  transition: 'all 0.25s',
  '&:hover': {
    backgroundColor: '#FFFFFF',
    color: '#85CF65',
  },
  '&.Mui-selected': {
    backgroundColor: '#FFFFFF',
    color: '#85CF65',
    fontWeight: 'bold',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#FFFFFF',
    color: '#85CF65',
    fontWeight: 'bold',
  },
};

const categoryButtonInnerCircleStyle = {
  marginLeft: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#EBEBA9',
  fontSize: '0.8rem',
};

const categoryButtonDividerStyle = {
  lineHeight: '35px',
  color: '#b0b0b0',
};

const checkboxStyle = {
  color: '#CECECE',
  p: 0,
  mr: 1,
  '&.Mui-checked': {
    color: '#C3C36A',
    backgroundColor: '#7f7f7f',
    p: 0,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    width: '22px',
    height: '22px',
  },
};

const purchaseBoxRowStyle = {
  mb: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const purchaseBoxTitleStyle = {
  width: '100px',
  fontSize: '1.1rem',
};

const purchaseBoxContentStyle = {
  width: '150px',
  fontSize: '1.1rem',
  textAlign: 'right',
};

const UserCart = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState(
    searchParams.get('category')
  );

  const [count, setCount] = useState({
    none: 0,
    product: 0,
    brand: 0,
  });
  const [cartList, setCartList] = useState([]);

  const [selectAll, setSelectAll] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // 장바구니 목록 조회
  useEffect(() => {
    getCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, email]);

  const getCartData = () => {
    axios
      .all([
        axios.get(`/carts/count?email=${email}`),
        axios.get(
          `/carts/lists?email=${email}&category=${searchParams.get('category')}`
        ),
      ])
      .then(
        axios.spread((count, list) => {
          setCount(count.data);
          setCartList(list.data);
          setSelectedProducts(list.data);
          setSelectAll(true);
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 필터 변경
  const categoryChange = (e, value) => {
    if (value !== null) {
      searchParams.set('category', value);
      setSearchParams(searchParams);
      setCurrentCategory(value);
    }
  };

  // 장바구니 개별 삭제
  const cartDelete = (cartCode) => {
    if (window.confirm('해당 물품을 장바구니에서 삭제하시겠습니까?')) {
      axios
        .delete(`/carts/products?cartCode=${cartCode}`)
        .then(() => {
          getCartData();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  // 장바구니 선택 물품 삭제
  const cartSelectedDelete = () => {
    if (window.confirm('선택된 물품을 장바구니에서 삭제하시겠습니까?')) {
      axios
        .post(`/carts/lists`, selectedProducts)
        .then(() => {
          getCartData();
          setSelectedProducts([]);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setSelectedProducts(e.target.checked ? cartList : []);
  };

  const gotoPurchasePage = () => {
    if (selectedProducts.length === 0) {
      alert('결제할 상품을 선택해주세요.');
      return false;
    } else if (!selectedProducts.some((prod) => prod.prodIsRental === 1)) {
      navigate('/purchase', {
        state: {
          prevPage: 'carts',
          products: selectedProducts,
        },
      });
    } else {
      alert('현재 대여 중인 상품은 구매할 수 없습니다.');
      return false;
    }
  };

  // 전체 상품 금액
  const TotalCartPrice = () => {
    let total = 0;
    for (let a = 0; a < selectedProducts.length; a++) {
      let b = selectedProducts[a].prodPrice * (selectedProducts[a].period / 7);
      total += b;
    }
    return total;
  };

  // 전체 상품 총 배송비
  const TotalCartShipping = () => {
    let total = 0;
    for (let a = 0; a < selectedProducts.length; a++) {
      let b = selectedProducts[a].prodShipping;
      total += b;
    }
    return total;
  };

  // 총 결제 금액
  const TotalPrice =
    parseFloat(TotalCartPrice()) + parseFloat(TotalCartShipping());

  // MUI 스타일
  const purchaseBtnStyle = {
    mt: 2,
    height: '55px',
    width: '250px',
    borderRadius: '15px',
    backgroundColor: '#c3c36a',
    color: '#000000',
    border: '1px solid #000000',
    fontSize: '20px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#c3c36a',
      color: '#ffffff',
    },
  };

  return (
    <>
      <Container
        sx={{
          userSelect: 'none',
          width: '1100px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            margin: '30px 0 20px 0',
          }}
        >
          장바구니
        </Typography>
        <ToggleButtonGroup
          value={String(currentCategory)}
          exclusive
          onChange={categoryChange}
          sx={{
            ml: '-10px',
          }}
        >
          <ToggleButton disableRipple value="all" sx={categoryButtonStyle}>
            전체
            <div style={categoryButtonInnerCircleStyle}>{count.all}</div>
          </ToggleButton>
          <Typography sx={categoryButtonDividerStyle}>|</Typography>
          <ToggleButton disableRipple value="product" sx={categoryButtonStyle}>
            일반 상품
            <div style={categoryButtonInnerCircleStyle}>{count.product}</div>
          </ToggleButton>
          <Typography sx={categoryButtonDividerStyle}>|</Typography>
          <ToggleButton
            disableRipple
            value="brand"
            sx={{ ...categoryButtonStyle, border: 0 }}
          >
            브랜드관
            <div style={categoryButtonInnerCircleStyle}>{count.brand}</div>
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>

      <Box
        sx={{
          mt: 2,
          pb: 10,
          width: '100%',
          minHeight: '60vh',
          backgroundColor: '#F4F4F4',
        }}
      >
        {loading ? (
          <Loading height={'60vh'} />
        ) : (
          <Container
            sx={{
              width: '1100px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* 전체 선택, 선택 상품 삭제 시작 */}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                userSelect: 'none',
              }}
            >
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
                id="selectAll"
                icon={<CheckCircleRounded />}
                checkedIcon={<CheckCircleRounded />}
                sx={checkboxStyle}
              />
              <label htmlFor="selectAll">
                <Typography
                  variant="h5"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  전체 선택
                </Typography>
              </label>
              <Typography sx={{ lineHeight: '35px', color: '#b0b0b0', mx: 2 }}>
                |
              </Typography>
              <Typography
                variant="h5"
                onClick={cartSelectedDelete}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                선택 상품 삭제
              </Typography>
            </Box>
            {/* 전체 선택, 선택 상품 삭제 끝 */}

            {/* 장바구니 상품, 결제 정보 시작 */}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {/* 장바구니 상품 시작 */}
              <Box sx={{ width: '750px' }}>
                {cartList.length === 0 ? (
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 2,
                      width: '100%',
                      height: 'calc(100% - 16px)',
                      userSelect: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: '15px',
                      boxShadow: '2px 4px 5px #00000040',
                    }}
                  >
                    장바구니에 담긴 상품이 없습니다.
                  </Typography>
                ) : (
                  cartList.map((product) => {
                    return (
                      <UserCartItems
                        key={product.cartCode}
                        product={product}
                        cartDelete={cartDelete}
                        cartList={cartList}
                        setCartList={setCartList}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        length={cartList.length}
                      />
                    );
                  })
                )}
              </Box>
              {/* 장바구니 상품 끝 */}

              {/* 결제 정보 시작 */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  width: '250px',
                  height: '100%',
                  userSelect: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '2px 4px 5px #00000040',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 5,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '1.4rem',
                  }}
                >
                  결제 정보
                </Typography>
                {/* 상품 수 시작 */}
                <Box sx={purchaseBoxRowStyle}>
                  <Typography variant="h5" sx={purchaseBoxTitleStyle}>
                    상품 수
                  </Typography>
                  <Typography variant="h5" sx={purchaseBoxContentStyle}>
                    {selectedProducts.length}개
                  </Typography>
                </Box>
                {/* 상품 수 끝 */}

                {/* 상품 금액 시작 */}
                <Box sx={purchaseBoxRowStyle}>
                  <Typography variant="h5" sx={purchaseBoxTitleStyle}>
                    상품 금액
                  </Typography>
                  <Typography variant="h5" sx={purchaseBoxContentStyle}>
                    {TotalCartPrice().toLocaleString()}원
                  </Typography>
                </Box>
                {/* 상품 금액 끝 */}

                {/* 배송비 시작 */}
                <Box sx={{ ...purchaseBoxRowStyle, m: 0 }}>
                  <Typography variant="h5" sx={purchaseBoxTitleStyle}>
                    배송비
                  </Typography>
                  <Typography variant="h5" sx={purchaseBoxContentStyle}>
                    {TotalCartShipping().toLocaleString()}원
                  </Typography>
                </Box>
                {/* 배송비 끝 */}

                {/* 구분선 */}
                <Box
                  sx={{
                    my: 4,
                    width: '100%',
                    height: '0px',
                    borderRadius: '1px',
                    border: '1px solid #d0d0d0',
                  }}
                />

                {/* 총 결제 금액 시작 */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      width: '100px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                    }}
                  >
                    총 결제금액
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      width: '150px',
                      fontWeight: 'bold',
                      fontSize: '1.3rem',
                      textAlign: 'right',
                    }}
                  >
                    {String(TotalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                  </Typography>
                </Box>
                {/* 총 결제 금액 끝 */}
                <Button onClick={gotoPurchasePage} sx={purchaseBtnStyle}>
                  결제
                </Button>
              </Box>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default UserCart;
