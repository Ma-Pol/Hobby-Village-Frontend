import { React, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  NativeSelect,
  Grid,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BrandAds from '../../components/user-products/BrandAds';
import UserBrandProductCard from '../../components/user-products/UserBrandProductCard';
import Loading from '../../components/Loading';

// 대표 페이지
// http://localhost:3000/products/brand/lists?brand=all&sort=all&array=recent&pages=1

const UserProductsBrandList = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기

  const [brandList, setBrandList] = useState([]); // 브랜드 목록
  const [brand, setBrand] = useState(); // 현재 브랜드

  const [productList, setProductList] = useState([]); // 상품 목록

  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(); // 현재 페이지

  const sortRef = useRef(); // 대여 여부
  const arrayRef = useRef(); // 정렬

  // 브랜드 불러오기
  const getBrands = () => {
    axios
      .get('/products/lists/brands')
      .then((res) => {
        const { data } = res;
        setBrandList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  // 상품목록 불러오기
  const getProductList = () => {
    axios
      .all([
        axios.get(
          // 상품 개수
          `/products/lists//brandProdCount?brand=${searchParams.get(
            'brand'
          )}&sort=${searchParams.get('sort')}`
        ),
        axios.get(
          // 상품 목록
          `/products/lists//brandProdList?brand=${searchParams.get(
            'brand'
          )}&sort=${searchParams.get('sort')}&array=${searchParams.get(
            'array'
          )}&pages=${searchParams.get('pages')}`
        ),
      ])
      .then(
        // category v, sort, array v, pages v, keyword v
        axios.spread((count, lists) => {
          setTotalPage(Math.ceil(count.data / 12)); // 전체 페이지 수
          setProductList(lists.data); // 상품 목록
          setCurrentPage(searchParams.get('pages')); // 현재 페이지
          setBrand(searchParams.get('brand')); // 현재 카테고리
          if (searchParams.get('sort') === null) {
            sortRef.current.value = 'recent';
          } else {
            sortRef.current.value = searchParams.get('sort');
          }
          if (searchParams.get('array') === null) {
            arrayRef.current.value = 'all';
          } else {
            arrayRef.current.value = searchParams.get('array');
          }
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleBrandChange = (e, value) => {
    if (value !== null) {
      searchParams.set('brand', value);
      setSearchParams(searchParams);
      setBrand(value);
      getBrands();
    }
  };

  // array 변경
  const handleArrayChange = () => {
    const array = arrayRef.current.value;
    searchParams.set('array', array);
    setSearchParams(searchParams);
  };

  // sort 변경
  const handleSortChange = () => {
    const sort = sortRef.current.value;
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };

  // 페이징 클릭
  const handlePaging = (e, value) => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    searchParams.set('pages', value);
    setSearchParams(searchParams);
  };

  // 스타일

  const brandStyle = {
    mr: '5px',
    border: 'none',
    height: '30px',
    backgroundColor: 'none',
    color: '#000000',
    fontSize: '1rem',
    fontWeight: 'Regular',
    transition: 'all 0.25s',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      fontWeight: 'Bold',
    },
    '&.Mui-selected': {
      backgroundColor: '#FFFFFF',
      color: '#C3C36A',
      fontSize: '1.2rem',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#FFFFFF',
      color: '#C3C36A',
      fontSize: '1.2rem',
    },
  };

  const filterStyle = {
    width: '130px',
    border: '1px solid #575757',
    borderRadius: '5px',
    fontSize: '0.95rem',
    color: '#575757',
    margin: '10px 0 0 20px',
    '&.MuiNativeSelect-iconOutlined': {
      padding: '0',
      margin: '0',
    },
  };

  return (
    <>
      <BrandAds />
      <Container
        sx={{
          minHeight: '80vh',
          userSelect: 'none',
        }}
      >
        {/* 브랜드 리스트 */}
        <Box
          sx={{
            m: 0,
            mt: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ToggleButtonGroup
            onChange={handleBrandChange}
            color="primary"
            value={brand}
            exclusive
            sx={{
              width: '1150px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <ToggleButton
              value="all"
              sx={{ ...brandStyle, mr: 'calc(100% - 70px)', mb: '10px' }}
            >
              전체
            </ToggleButton>
            {/* 카테고리 불러오기 */}
            {brandList.map((brand) => {
              return (
                <ToggleButton key={brand} value={brand} sx={brandStyle}>
                  {brand}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Box>

        {/* 필터링 */}
        <Box sx={{ float: 'right' }}>
          <NativeSelect
            inputRef={arrayRef}
            onChange={handleArrayChange}
            sx={filterStyle}
            variant="outlined"
            defaultValue="recent"
            inputProps={{
              name: 'array',
              style: { textAlign: 'center' },
            }}
            disableUnderline
            IconComponent={KeyboardArrowDownIcon}
          >
            <option value="recent">최신 순</option>
            <option value="revwRate">평점 순</option>
            <option value="popular">인기 순</option>
            <option value="expensive">가격 높은 순</option>
            <option value="cheap">가격 낮은 순</option>
          </NativeSelect>
          <NativeSelect
            inputRef={sortRef}
            onChange={handleSortChange}
            sx={filterStyle}
            variant="outlined"
            defaultValue="all"
            inputProps={{
              name: 'sort',
              style: { textAlign: 'center' },
            }}
            disableUnderline
            IconComponent={KeyboardArrowDownIcon}
          >
            <option value="all">전체</option>
            <option value="available">미대여</option>
            <option value="rented">대여중</option>
          </NativeSelect>
        </Box>

        {/* 상품목록 */}
        {loading ? (
          <Loading height="38vh" />
        ) : (
          <Box
            sx={{
              mt: '50px',
              pt: '30px',
              mx: 'auto',
              width: '1100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid container>
              {productList.length === 0 ? (
                <Box
                  sx={{
                    height: '33vh',
                    mx: 'auto',
                    width: '1100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    상품이 없습니다.
                  </Typography>
                </Box>
              ) : (
                productList.map((product) => {
                  return (
                    <Grid
                      item
                      key={product.prodCode}
                      xs={3}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 4,
                      }}
                    >
                      <UserBrandProductCard
                        key={product.prodCode}
                        product={product}
                      />
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Box>
        )}

        {/* 페이징 */}
        <Box
          sx={{
            mt: 2,
            mb: 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pagination
            count={Number(totalPage || 0)}
            page={Number(currentPage)}
            onChange={handlePaging}
            showFirstButton
            showLastButton
          />
        </Box>
      </Container>
    </>
  );
};

export default UserProductsBrandList;
