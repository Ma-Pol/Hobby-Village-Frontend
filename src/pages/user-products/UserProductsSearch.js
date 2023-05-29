import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  NativeSelect,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import Product from '../../components/user-products/UserProductCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// 예시 페이지 주소
// http://localhost:3000/products/lists/search?category=all&sort=all&array=recent&keyword=수영&pages=1

const UserProductsSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기

  // 카테고리(category), 분류(sort)-전체/대여중/미대여,
  // 정렬(array)-최신(regiDate)/평점(리뷰)/인기(찜기준)/고가/저가, 페이징(page)

  const [category, setCategory] = useState('all'); // 현재 카테고리

  const [count, setCount] = useState(); // 검색 결과 개수
  const [productList, setProductList] = useState([]); // 상품 목록

  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const sortRef = useRef(); // 대여 여부
  const arrayRef = useRef(); // 정렬
  const keywordRef = useRef(); // 현재 검색 키워드

  // ---------------------------------------------------------------------------------------------
  // 상품 목록 불러오기 시작
  const getProductList = () => {
    axios
      .all([
        axios.get(
          // 상품 개수
          `/products/lists/count?category=${searchParams.get(
            'category'
          )}&sort=${searchParams.get('sort')}&keyword=${searchParams.get(
            'keyword'
          )}`
        ),
        axios.get(
          // 상품 목록
          `/products/lists?category=${searchParams.get(
            'category'
          )}&sort=${searchParams.get('sort')}&array=${searchParams.get(
            'array'
          )}&pages=${searchParams.get('pages')}&keyword=${searchParams.get(
            'keyword'
          )}`
        ),
      ])
      .then(
        // category v, sort, array v, pages v, keyword v
        axios.spread((count, lists) => {
          setCount(count.data);
          setTotalPage(Math.ceil(count.data / 12)); // 전체 페이지 수
          setProductList(lists.data); // 상품 목록
          setCurrentPage(searchParams.get('pages')); // 현재 페이지
          setCategory(searchParams.get('category')); // 현재 카테고리
        })
      )
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getProductList();
  }, [searchParams]);

  // 상품 목록 불러오기 끝 ---------------------------------------------------------------------------------------------

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

  // 검색 클릭 -- 헤더에 적용 필요
  const handleSearch = () => {
    const sort = sortRef.current.value;
    const array = arrayRef.current.value;
    const keyword = keywordRef.current.value;
    if (keyword === null || keyword === ' ') {
      window.alert('검색어를 입력하세요');
    } else {
      if (searchParams.get('category') == null) {
        searchParams.set('category', 'all');
      }
      navigate(
        `/products/lists/search?category=${category}&sort=${sort}&array=${array}&pages=1&keyword=${keyword}`
      );
    }
  };

  // 스타일
  const sentenceStyle = {
    color: '#7C7C7C',
    fontSize: '1.2rem',
  };

  const keywordStyle = {
    display: 'inline',
    color: '#C3C36A',
    fontSize: '1.2rem',
    fontWeight: 'Bold',
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
    <Container fixed>
      {/* 검색결과 */}
      <Box>
        <Typography sx={sentenceStyle}>
          '&nbsp;
          <Typography sx={keywordStyle}>
            {searchParams.get('keyword')}
          </Typography>
          &nbsp;' 검색 결과 : 총&nbsp;
          <Typography sx={keywordStyle}>{count}&nbsp;건</Typography>이
          검색되었습니다.
        </Typography>
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
  );
};

export default UserProductsSearch;
