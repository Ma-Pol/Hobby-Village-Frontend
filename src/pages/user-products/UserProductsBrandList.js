import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  NativeSelect,
  Grid,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BrandAds from '../../components/user-products/BrandAds';
import Product from '../../components/user-products/UserBrandProductCard';

// 대표 페이지
// http://localhost:3000/products/brand/lists?brand=all&sort=all&array=recent&pages=1

const UserProductsBrandList = () => {
  const navigate = useNavigate();
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
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProductList();
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
    searchParams.set('pages', value);
    setSearchParams(searchParams);
  };

  // 스타일

  const brandStyle = {
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
      // fontSize: '1.3rem',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#FFFFFF',
      color: '#C3C36A',
      // fontSize: '1.3rem',
    },
  };

  const filterStyle = {
    width: 100,
    height: 35,
    border: '1px solid #575757',
    borderRadius: '5px',
    fontSize: '0.95rem',
    color: '#575757',
    margin: '20px 0 0 20px',
    '&.MuiNativeSelect-iconOutlined': {
      padding: '0',
      margin: '0',
    },
    // '&.Mui-selected': {
    //   backgroundColor: '#C3C36A',
    // },
  };

  return (
    <>
      <Box>
        <BrandAds></BrandAds>
      </Box>
      <Container fixed>
        {/* 브랜드 목록 */}
        <Box sx={{ mt: '50px' }}>
          <ToggleButtonGroup
            onChange={handleBrandChange}
            color="primary"
            value={brand}
            exclusive
            aria-label="brand"
          >
            <ToggleButton
              value="all"
              onClick={handleBrandChange}
              sx={brandStyle}
            >
              전체
            </ToggleButton>
            {brandList.map((brand) => {
              return (
                <ToggleButton value={brand} sx={brandStyle}>
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
            <option value="recent">최신순</option>
            <option value="revwRate">평점순</option>
            <option value="popular">인기순</option>
            <option value="expensive">가격높은순</option>
            <option value="cheap">가격낮은순</option>
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
        <Grid container spacing={12} sx={{ mt: '0.1rem' }}>
          {productList.map((product) => {
            return (
              <Grid item xs={6} sm={3}>
                <Product key={product.prodCode} product={product}></Product>
              </Grid>
            );
          })}
        </Grid>
        {/* 페이징 */}
        <Box
          sx={{
            mt: '5rem',
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
