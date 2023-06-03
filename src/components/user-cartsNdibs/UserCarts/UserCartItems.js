import { Typography, Box, Checkbox } from '@mui/material';
import { CheckCircleRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const changeDateBtnStyle = {
  m: 0,
  p: 0,
  boxSizing: 'border-box',
  width: '25px',
  height: '25px',
  borderRadius: '50%',
  color: '#000000',
  textAlign: 'center',
  border: '1px solid #d0d0d0',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontSize: '0.8rem',
  lineHeight: '25px',
  '&:hover': {
    backgroundColor: '#e1e1e1',
  },
};

const UserCartItems = ({
  product,
  cartDelete,
  cartList,
  setCartList,
  selectedProducts,
  setSelectedProducts,
  selectAll,
  setSelectAll,
  length,
}) => {
  const {
    cartCode,
    prodCode,
    period,
    prodCategory,
    prodBrand,
    prodName,
    prodPrice,
    prodShipping,
    prodIsRental,
    prodPicture,
  } = product;
  const [currentPeriod, setCurrentPeriod] = useState(period);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시, 전체 선택 체크박스 상태 변경 시 수행
  useEffect(() => {
    setChecked(selectedProducts.some((prod) => prod.cartCode === cartCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAll]);

  // 체크박스 선택
  const handleCheck = (e) => {
    const newSelectedProducts = e.target.checked
      ? [...selectedProducts, product]
      : selectedProducts.filter((prod) => prod.cartCode !== cartCode);

    setSelectedProducts(newSelectedProducts);
    setChecked(e.target.checked);
    setSelectAll(newSelectedProducts.length === length);
  };

  // 대여기간 변경
  const changePeriod = (value) => {
    const nextPeriod = currentPeriod + value;

    if (nextPeriod >= 7 && nextPeriod <= 28) {
      setCartList(
        cartList.map((cart) =>
          cart.cartCode === cartCode ? { ...cart, period: nextPeriod } : cart
        )
      );
      setCurrentPeriod(nextPeriod);
      modifyPeriod(nextPeriod);
      // 체크된 상태라면 저장된 상품정보도 변경
      if (checked) {
        changeSelectedProductPeriod(nextPeriod);
      }
    } else {
      alert('대여기간은 최소 7일에서 최대 28일까지만 가능합니다.');
      return false;
    }
  };

  // 대여기간 DB 수정
  const modifyPeriod = (nextPeriod) => {
    axios
      .patch(`/carts/period`, {
        cartCode: cartCode,
        period: nextPeriod,
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 저장된 상품정보의 대여기간 변경
  const changeSelectedProductPeriod = (nextPeriod) => {
    const newSelectedProducts = selectedProducts.map((product) =>
      product.prodCode === prodCode
        ? { ...product, period: nextPeriod }
        : product
    );
    setSelectedProducts(newSelectedProducts);
  };

  const checkboxStyle = {
    position: 'absolute',
    p: 0,
    color: '#CECECE',
    top: '8px',
    left: '8px',
    '&.Mui-checked': {
      color: '#C3C36A',
      backgroundColor: '#7f7f7f',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '20px',
      width: '22px',
      height: '22px',
    },
  };

  return (
    <>
      <Box
        sx={{
          my: 2,
          width: '750px',
          backgroundColor: '#FFFFFF',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          boxShadow: '2px 4px 5px #00000040',
        }}
      >
        <img
          onClick={() => {
            cartDelete(cartCode);
          }}
          width="22px"
          height="22px"
          src="https://img.icons8.com/ios/50/949494/cancel.png"
          alt="delete"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        />
        <Checkbox
          checked={checked}
          onChange={handleCheck}
          id="selectAll"
          icon={<CheckCircleRounded />}
          checkedIcon={<CheckCircleRounded />}
          sx={checkboxStyle}
        />
        {/* 상품 이미지 출력 */}
        <Box
          sx={{
            position: 'relative',
            userSelect: 'none',
            boxSizing: 'border-box',
            border: '1px solid #d0d0d0',
            width: '120px',
            height: '120px',
            m: '30px 0px 30px 30px',
          }}
        >
          {prodIsRental === 1 && (
            <Box
              sx={{
                position: 'absolute',
                boxSizing: 'border-box',
                top: '0px',
                left: '0px',
                width: '120px',
                height: '120px',
                backgroundColor: '#00000070',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                zIndex: '1',
              }}
            >
              <p>대여중</p>
            </Box>
          )}
          <Box
            component="img"
            sx={{
              boxSizing: 'border-box',
              backgroundColor: '#dddddd',
              objectFit: 'contain',
              width: '120px',
              height: '120px',
            }}
            src={`http://localhost:8080/carts/image/${prodPicture}`}
          />
        </Box>
        {/* 상품 구분 - 카테고리, 상품명 출력 */}
        <Box
          sx={{
            ml: '25px',
            width: '275px',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: '10px',
              fontSize: '0.9rem',
            }}
          >
            [{prodBrand !== null ? prodBrand : '일반 상품'} - {prodCategory}]
          </Typography>
          <Typography
            title={prodName}
            variant="h6"
            onClick={() => {
              navigate(`/products/details/${prodCode}`);
            }}
            sx={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              '&:hover': {
                cursor: 'pointer',
                textDecoration: 'underline',
              },
            }}
          >
            {prodName}
          </Typography>
        </Box>
        {/* 상품 대여일수 출력 */}
        <Box
          sx={{
            ml: '15px',
            width: '125px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
          }}
        >
          <Box
            onClick={() => {
              changePeriod(-7);
            }}
            sx={changeDateBtnStyle}
          >
            -7
          </Box>

          <Typography
            sx={{
              width: '55px',
              height: '25px',
              textAlign: 'center',
              lineHeight: '25px',
              fontSize: '0.9rem',
            }}
          >
            {currentPeriod}일
          </Typography>

          <Box
            onClick={() => {
              changePeriod(7);
            }}
            sx={changeDateBtnStyle}
          >
            +7
          </Box>
        </Box>
        <Box
          sx={{
            ml: '15px',
            mr: '25px',
            width: '120px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            {String((prodPrice * currentPeriod) / 7).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ','
            )}
            원
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            right: '25px',
            bottom: '10px',
            fontSize: '0.9rem',
          }}
        >
          배송비{' '}
          <strong>
            {String(prodShipping).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </strong>
        </Typography>
      </Box>
    </>
  );
};

export default UserCartItems;
