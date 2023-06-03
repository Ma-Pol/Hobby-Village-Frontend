import { Typography, Box, Checkbox } from '@mui/material';
import { CheckCircleRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const UserDibItems = ({
  product,
  dibDelete,
  selectedProducts,
  setSelectedProducts,
  selectAll,
  setSelectAll,
  length,
}) => {
  const {
    dibCode,
    prodCode,
    prodCategory,
    prodBrand,
    prodName,
    prodDibs,
    prodPrice,
    prodShipping,
    prodIsRental,
    prodPicture,
  } = product;
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시, 전체 선택 체크박스 상태 변경 시 수행
  useEffect(() => {
    setChecked(selectedProducts.some((prod) => prod.dibCode === dibCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAll]);

  // 체크박스 선택
  const handleCheck = (e) => {
    const newSelectedProducts = e.target.checked
      ? [...selectedProducts, product]
      : selectedProducts.filter((prod) => prod.dibCode !== dibCode);

    setSelectedProducts(newSelectedProducts);
    setChecked(e.target.checked);
    setSelectAll(newSelectedProducts.length === length);
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
          width: '950px',
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
            dibDelete(dibCode);
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
            width: '170px',
            height: '170px',
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
                width: '170px',
                height: '170px',
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
              width: '170px',
              height: '170px',
            }}
            src={`http://localhost:8080/carts/image/${prodPicture}`}
          />
        </Box>
        {/* 상품 구분 - 카테고리, 상품명 출력 */}
        <Box
          sx={{
            ml: '30px',
            width: '320px',
            height: '170px',
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
              fontSize: '1.2rem',
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
        {/* 상품 찜 개수 출력 */}
        <Box
          sx={{
            ml: '25px',
            width: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
          }}
        >
          <FavoriteBorderIcon
            style={{
              color: '#1C1B1F',
              position: 'absolute',
              fontSize: 60,
            }}
          />
          <Typography
            sx={{
              fontSize: '18px',
              color: '#1C1B1F',
              position: 'absolute',
            }}
          >
            찜
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#A0A0A0',
              mt: 10,
            }}
          >
            관심 {prodDibs}
          </Typography>
        </Box>
        <Box
          sx={{
            ml: '15px',
            pr: '25px',
            width: '185px',
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
              fontSize: '1.3rem',
            }}
          >
            {String(prodPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
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

export default UserDibItems;
