import { React, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  NativeSelect,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import UserProductCard from '../../components/user-products/UserProductCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Loading from '../../components/Loading';

// 예시 페이지 주소
// http://localhost:3000/products/lists/search?sort=all&array=recent&keyword=수영&pages=1

const UserProductsSearch = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기

  // 분류(sort)-전체/대여중/미대여,
  // 정렬(array)-최신(regiDate)/평점(리뷰)/인기(찜기준)/고가/저가, 페이징(page)
  const [count, setCount] = useState(); // 검색 결과 개수
  const [productList, setProductList] = useState([]); // 상품 목록

  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const sortRef = useRef(); // 대여 여부
  const arrayRef = useRef(); // 정렬

  // ---------------------------------------------------------------------------------------------
  // 상품 목록 불러오기 시작
  const getProductList = () => {
    axios
      .all([
        axios.get(
          // 상품 개수
          `/products/lists/count?category=all&sort=${searchParams.get(
            'sort'
          )}&keyword=${searchParams.get('keyword')}`
        ),
        axios.get(
          // 상품 목록
          `/products/lists?category=all&sort=${searchParams.get(
            'sort'
          )}&array=${searchParams.get('array')}&pages=${searchParams.get(
            'pages'
          )}&keyword=${searchParams.get('keyword')}`
        ),
      ])
      .then(
        // sort, array v, pages v, keyword v
        axios.spread((count, lists) => {
          setCount(count.data);
          setTotalPage(Math.ceil(count.data / 12)); // 전체 페이지 수
          setProductList(lists.data); // 상품 목록
          setCurrentPage(searchParams.get('pages')); // 현재 페이지
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
      {/* 검색결과 */}
      <Box
        sx={{
          m: 0,
          mt: 2,
          p: 0,
          width: '100%',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
            {productList.map((product) => {
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
                  <UserProductCard key={product.prodCode} product={product} />
                </Grid>
              );
            })}
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

export default UserProductsSearch;
