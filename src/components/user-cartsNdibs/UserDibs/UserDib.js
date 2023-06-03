import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  Container,
} from '@mui/material';
import { CheckCircleRounded } from '@mui/icons-material';
import UserDibItems from './UserDibItems';
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

const UserDib = () => {
  const { email } = useParams();
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
  const [dibList, setDibList] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // 찜 목록 조회
  useEffect(() => {
    getDibData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, email]);

  const getDibData = () => {
    axios
      .all([
        axios.get(`/dibs/count?email=${email}`),
        axios.get(
          `/dibs/lists?email=${email}&category=${searchParams.get('category')}`
        ),
      ])
      .then(
        axios.spread((count, list) => {
          setCount(count.data);
          setDibList(list.data);
          setSelectedProducts([]);
          setSelectAll(false);
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

  // 찜 개별 삭제
  const dibDelete = (dibCode) => {
    if (window.confirm('해당 물품을 찜 목록에서 삭제하시겠습니까?')) {
      axios
        .delete(`/dibs/products?dibCode=${dibCode}`)
        .then(() => {
          getDibData();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  // 찜 선택 물품 삭제
  const dibSelectedDelete = () => {
    if (window.confirm('선택된 물품을 찜 목록에서 삭제하시겠습니까?')) {
      axios
        .post(`/dibs/lists`, selectedProducts)
        .then(() => {
          getDibData();
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
    setSelectedProducts(e.target.checked ? dibList : []);
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
          찜 목록
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
                onClick={dibSelectedDelete}
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

            {/* 찜 상품, 결제 정보 시작 */}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* 찜 상품 시작 */}
              <Box sx={{ width: '950px' }}>
                {dibList.length === 0 ? (
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 2,
                      width: '100%',
                      height: '230px',
                      userSelect: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: '15px',
                      boxShadow: '2px 4px 5px #00000040',
                    }}
                  >
                    찜한 상품이 없습니다.
                  </Typography>
                ) : (
                  dibList.map((product) => {
                    return (
                      <UserDibItems
                        key={product.dibCode}
                        product={product}
                        dibDelete={dibDelete}
                        dibList={dibList}
                        setDibList={setDibList}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        length={dibList.length}
                      />
                    );
                  })
                )}
              </Box>
              {/* 찜 상품 끝 */}
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default UserDib;
