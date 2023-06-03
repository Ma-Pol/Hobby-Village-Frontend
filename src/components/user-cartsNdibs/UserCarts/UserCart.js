import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  Paper,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import UserCartItems from './UserCartItems';
import axios from 'axios';

const UserCart = () => {
  const { email } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentcategory, setCurrentCategory] = useState(
    searchParams.get('category')
  );
  const [lists, setLists] = useState([]);

  // 장바구니 목록 조회
  useEffect(() => {
    axios
      .get(`/carts/${email}/lists?category=${searchParams.get('category')}`)
      .then((res) => {
        setLists(res.data);
        if (searchParams.get('category') !== currentcategory) {
          setCurrentCategory(searchParams.get('category'));
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchParams, email]);

  // 카테고리 변경
  const categoryChange = (e, value) => {
    if (value !== null) {
      searchParams.set('category', value);
      setSearchParams(searchParams);
      setCurrentCategory(value);
    }
  };

  // 장바구니 개별 삭제
  const cartDelete = (cartCode) => {
    if (window.confirm('해당 품목을 장바구니에서 삭제하시겠습니까?')) {
      axios
        .delete(`/carts/delete/${cartCode}`)
        .then(() => {
          alert('품목이 삭제되었습니다.');
          navigate(`/carts/${email}/lists/category`);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  // 장바구니 선택 물품 삭제
  const cartSelectedDelete = (cartCode) => {
    if (window.confirm('해당 품목을 장바구니에서 삭제하시겠습니까?')) {
      axios
        .delete(`/carts/delete/lists/${cartCode}`, {
          data: {
            cartCode: selectedProducts.cartCode,
          },
        })
        .then(() => {
          alert('품목이 삭제되었습니다.');
          navigate(`/carts/${email}/lists/category`);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  // 전체선택, 부분선택
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);

    if (e.target.checked) {
      setSelectedProducts(lists);
    } else {
      setSelectedProducts([]);
    }
  };
  // 선택된 상품 목록을 저장하기 위한 state입니다.
  // 상품이 체크될 때마다 이 곳에 해당 상품 정보가 저장됩니다.
  const [selectedProducts, setSelectedProducts] = useState([]);
  // 결제 페이지로 이동
  // 결제 페이지 이동 버튼 함수입니다.
  // 선택된 상품 목록을 결제 페이지로 넘겨줍니다.

  const navigate = useNavigate();

  const payProcess = () => {
    navigate('/purchase', {
      state: {
        prevPage: 'carts',
        products: selectedProducts,
      },
    });
    console.log(selectedProducts);
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

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`/carts/${email}/lists/item`)
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // 일반상품 품목 갯수 구하기
  const getProductCount = () => {
    const CartItem = items.filter((items) => items.prodBrand === null);
    return CartItem.length;
  };
  // 브랜드 상품 품목 갯수 구하기
  const getBrandCount = () => {
    const CartItem = items.filter((items) => items.prodBrand !== null);
    return CartItem.length;
  };
  // 전체 품목 갯수 구하기
  const getCartItemCount =
    parseFloat(getProductCount()) + parseFloat(getBrandCount());

  // MUI 스타일
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:hover': {
        backgroundColor: '#FFFFFF',
        color: '#85CF65',
      },
      '&.Mui-selected': {
        backgroundColor: '#FFFFFF',
        textDecoration: 'underline',
        color: '#85CF65',
      },
      '&.Mui-selected:hover': {
        backgroundColor: '#FFFFFF',
        textDecoration: 'underline',
        color: '#85CF65',
      },
    },
    width: '100%',
  }));

  const payBtnStyle = {
    mt: 1.5,
    height: '60px',
    width: '270px',
    borderRadius: '10px',
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

  const ChipStyle = {
    ml: 0.5,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    fontSize: '12px',
    underline: 'none',
    color: '#000000',
    backgroundColor: '#EBEBA9',
    textDecoration: 'none',
    '&:selected': {
      color: '#85CF65',
    },
  };

  return (
    <div>
      <Box style={{ margin: 'auto' }}>
        <Box sx={{ my: 2, height: '50px', borderBottom: '1px solid #B7B7B7' }}>
          <Typography
            variant="h5"
            sx={{
              fontweight: 'bold',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.6rem',
              ml: '100px',
            }}
          >
            장바구니
          </Typography>
        </Box>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            border: (theme) => `0px ${theme.palette.divider}`,
            flexWrap: 'wrap',
          }}
        >
          <StyledToggleButtonGroup
            value={String(currentcategory)}
            exclusive
            onChange={categoryChange}
            sx={{
              ml: '100px',
            }}
          >
            <ToggleButton key="전체" value="none">
              전체
              <Chip
                label={getCartItemCount}
                variant="filled"
                size="small"
                sx={ChipStyle}
              ></Chip>
            </ToggleButton>
            <Typography
              sx={{
                fontweight: 'light',
                fontSize: '1.6rem',
                color: '#DADADA',
                m: 1,
              }}
            >
              |
            </Typography>
            <ToggleButton key="일반 상품" value="product">
              일반 상품
              <Chip
                label={getProductCount()}
                variant="filled "
                size="small"
                sx={ChipStyle}
              ></Chip>
            </ToggleButton>
            <Typography
              sx={{ fontweight: 'light', fontSize: '1.6rem', color: '#DADADA' }}
            >
              |
            </Typography>
            <ToggleButton key="브랜드관" value="brand">
              브랜드관
              <Chip
                label={getBrandCount()}
                variant="filled "
                size="small"
                sx={ChipStyle}
              ></Chip>
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
        <Box
          sx={{
            width: 'fullWidth',
            my: 2,
            height: 'auto',
            pt: 3,
            pb: 8,
            bgcolor: '#F4F4F4',
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                ml: '100px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
              }}
            >
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
                icon={<CheckCircleOutlineOutlined />}
                checkedIcon={<CheckCircleOutlineOutlined />}
                sx={{
                  color: '#CECECE',
                  p: 0,
                  mr: 1,
                  '&.Mui-checked': {
                    color: '#000000',
                    backgroundColor: '#C3C36A',
                    p: 0,
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px',
                    width: '22px',
                    height: '22px',
                  },
                }}
              ></Checkbox>
              전체 선택
              <Divider
                sx={{ my: 0.5, mx: 2 }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Button onClick={cartSelectedDelete}>선택 상품 삭제</Button>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', flexGrow: 0.5 }}
            >
              {lists.map((li) => {
                const category = li.prodBrand === null ? '일반' : '브랜드관';
                return (
                  <UserCartItems
                    key={li.cartCode}
                    cartCode={li.cartCode}
                    prodCode={li.prodCode}
                    prodName={li.prodName}
                    prodContent={li.prodContent}
                    prodShipping={li.prodShipping}
                    prodPrice={li.prodPrice}
                    period={li.period}
                    cartDelete={cartDelete}
                    category={category}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    length={lists.length}
                  />
                );
              })}
            </Box>
            <Paper
              elevation={3}
              sx={{
                width: '300px',
                height: '350px',
                borderRadius: '10px',
                mb: 70.3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}
              >
                결제 정보
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{ ml: 1, mt: 3, textAlign: 'left', color: '#595959' }}
                >
                  상품 수
                </Typography>
                <Typography
                  sx={{ mr: 1, mt: 3, textAlign: 'right', fontWeight: 'bold' }}
                >
                  {selectedProducts.length}개
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{ ml: 1, mt: 3, textAlign: 'left', color: '#595959' }}
                >
                  상품 금액
                </Typography>
                <Typography
                  sx={{ mr: 1, mt: 3, textAlign: 'right', fontWeight: 'bold' }}
                >
                  {TotalCartPrice().toLocaleString()}원
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{ ml: 1, mt: 3, textAlign: 'left', color: '#595959' }}
                >
                  배송비
                </Typography>
                <Typography
                  sx={{ mr: 1, mt: 3, textAlign: 'right', fontWeight: 'bold' }}
                >
                  {TotalCartShipping().toLocaleString()}원
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Divider sx={{ width: '90%', bgcolor: '#8F8F8F', mt: 3 }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{
                    ml: 1,
                    mt: 3,
                    textAlign: 'left',
                    color: '#595959',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  총 결제 금액
                </Typography>
                <Typography
                  sx={{
                    mr: 1,
                    mt: 3,
                    textAlign: 'right',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  {TotalPrice.toLocaleString()}원
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={payProcess} sx={payBtnStyle}>
                  결제
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default UserCart;
