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
import UserProductCard from '../../components/user-products/UserProductCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Loading from '../../components/Loading';

// 기본 페이지 주소
// http://localhost:3000/products/lists?category=all&sort=all&array=recent&pages=1

const UserProductsList = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기

  // 카테고리(category), 분류(sort)-전체/대여중/미대여,
  // 정렬(array)-최신(regiDate)/평점(리뷰)/인기(찜기준)/고가/저가, 페이징(page)

  const [categories, setCategories] = useState([]); // 카테고리 목록
  const [category, setCategory] = useState('all'); // 현재 카테고리

  const [productList, setProductList] = useState([]); // 상품 목록

  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

  const sortRef = useRef(); // 대여 여부
  const arrayRef = useRef(); // 정렬

  // 카테고리 불러오기
  const getCategories = () => {
    axios
      .get('/products/lists/category')
      .then((res) => {
        const { data } = res;
        setCategories(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          setTotalPage(Math.ceil(count.data / 12)); // 전체 페이지 수
          setProductList(lists.data); // 상품 목록
          setCurrentPage(searchParams.get('pages')); // 현재 페이지
          setCategory(searchParams.get('category')); // 현재 카테고리
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

  // 상품 목록 불러오기 끝 ---------------------------------------------------------------------------------------------

  // category 변경
  const handleCategoryChange = (e, value) => {
    if (value !== null) {
      setLoading(true);
      searchParams.set('category', value);
      setSearchParams(searchParams);
      setCategory(value);
      getCategories();
    }
  };

  // array 변경
  const handleArrayChange = () => {
    setLoading(true);
    const array = arrayRef.current.value;
    searchParams.set('array', array);
    setSearchParams(searchParams);
  };

  // sort 변경
  const handleSortChange = () => {
    setLoading(true);
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
  const categoryStyle = {
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
    <Container
      sx={{
        minHeight: '80vh',
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          m: 0,
          p: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        {/* 카테고리 리스트 */}
        <Box
          sx={{
            m: 0,
            mt: '20px',
            width: '850px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ToggleButtonGroup
            onChange={handleCategoryChange}
            color="primary"
            value={category}
            exclusive
            sx={{
              display: 'flex',
              width: '850px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <ToggleButton
              value="all"
              sx={{ ...categoryStyle, mr: 'calc(100% - 70px)', mb: '10px' }}
            >
              전체
            </ToggleButton>
            {/* 카테고리 불러오기 */}
            {categories.map((category) => {
              return (
                <ToggleButton
                  key={category}
                  value={category}
                  sx={categoryStyle}
                >
                  {category}
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
      </Box>

      {/* 상품목록 */}
      {loading ? (
        <Loading height="38vh" />
      ) : (
        <Box
          sx={{
            mt: '0px',
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
                      mb: '25px',
                    }}
                  >
                    <UserProductCard key={product.prodCode} product={product} />
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
  );
};

export default UserProductsList;
