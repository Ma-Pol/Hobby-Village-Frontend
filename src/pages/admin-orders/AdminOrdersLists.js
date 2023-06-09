import {
  Box,
  Container,
  Grid,
  NativeSelect,
  Typography,
  Button,
  InputLabel,
  Pagination,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AdminOrdersRows from '../../components/admin-orders/AdminOrdersLists/AdminOrdersRows';
import Loading from '../../components/Loading';

const AdminOrdersLists = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기
  const location = useLocation(); // 현재 전체 쿼리스트링 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const [orderList, setOrderList] = useState([]); // 주문 목록
  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(searchParams.get('pages')); // 현재 페이지
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get('filter')
  ); // 현재 필터
  const sortRef = useRef(); // 현재 정렬 기준
  const conditionRef = useRef(); // 현재 검색 조건
  const keywordRef = useRef(); // 현재 검색 키워드

  // 페이지 접근 시 주문 목록 가져오기
  useEffect(() => {
    // 검색 조건이 없을 때
    if (searchParams.get('keyword') === null) {
      // 다중 요청(페이지네이션을 위한 전체 주문 수 요청, 주문 목록 요청)
      axios
        .all([
          axios.get(
            `/m/orders/count?sort=${searchParams.get(
              'sort'
            )}&filter=${searchParams.get('filter')}`
          ),
          axios.get(
            `/m/orders?sort=${searchParams.get(
              'sort'
            )}&filter=${searchParams.get('filter')}&pages=${searchParams.get(
              'pages'
            )}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10)); // 전체 페이지 수 설정
            setOrderList(list.data); // 주문 목록 설정
            setCurrentPage(searchParams.get('pages')); // 현재 페이지 설정
            sortRef.current.value = searchParams.get('sort'); // 현재 정렬 기준 설정
            conditionRef.current.value = 'op.odrNumber'; // 현재 검색 조건 기본값 설정
            keywordRef.current.value = ''; // 현재 검색 키워드 기본값 설정
          })
        )
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // 검색 조건이 있을 때
    else {
      axios
        .all([
          axios.get(
            `/m/orders/count?condition=${searchParams.get(
              'condition'
            )}&keyword=${searchParams.get('keyword')}&sort=${searchParams.get(
              'sort'
            )}&filter=${searchParams.get('filter')}`
          ),
          axios.get(
            `/m/orders?condition=${searchParams.get(
              'condition'
            )}&keyword=${searchParams.get('keyword')}&sort=${searchParams.get(
              'sort'
            )}&filter=${searchParams.get('filter')}&pages=${searchParams.get(
              'pages'
            )}
            
            `
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10));
            setOrderList(list.data);
            setCurrentPage(searchParams.get('pages'));
            sortRef.current.value = searchParams.get('sort');
            conditionRef.current.value = searchParams.get('condition');
            keywordRef.current.value = searchParams.get('keyword');
          })
        )
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchParams]);

  // 페이지네이션 클릭 시
  const pageChange = (e, value) => {
    searchParams.set('pages', value);
    setSearchParams(searchParams);
  };

  // 검색 버튼 클릭 시
  const search = () => {
    const sort = sortRef.current.value;
    const condition = conditionRef.current.value;
    const keyword = keywordRef.current.value;
    if (keyword.match(/^$|^[0-9가-힣a-zA-Z\s-]+$/) === null) {
      alert('검색 키워드는 한글, 영문, 숫자, 공백, -만 입력 가능합니다.');
    } else {
      if (keyword === '') {
        navigate(
          `/m/orders/lists?sort=${sort}&filter=${currentFilter}&pages=1`
        );
      } else {
        navigate(
          `/m/orders/lists?condition=${condition}&keyword=${keyword}&sort=${sort}&filter=${currentFilter}&pages=1`
        );
      }
    }
  };

  // 정렬 기준 변경 시
  const sortChange = () => {
    const sort = sortRef.current.value;
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };

  // 필터 변경 시
  const filterChange = (e, value) => {
    if (value !== null) {
      searchParams.set('filter', value);
      setSearchParams(searchParams);
      setCurrentFilter(value);
    }
  };

  const tableHead = {
    fontWeight: 'bold',
    textAlign: 'center',
    px: 1,
    py: 0.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const filterBox = {
    height: '30px',
    backgroundColor: '#ffffff',
    color: '#828282',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    transition: 'all 0.25s',
    '&:hover': {
      backgroundColor: '#c3c36a',
      color: '#ffffff',
    },
    '&.Mui-selected': {
      backgroundColor: '#c3c36a',
      textDecoration: 'underline',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#c3c36a',
      textDecoration: 'underline',
      color: '#ffffff',
    },
  };

  return (
    <Container sx={{ userSelect: 'none' }}>
      {/* 주문 목록 글씨 표기 시작 */}
      <Typography
        variant="h4"
        component="h4"
        sx={{
          mt: 5,
          mb: 1,
          pl: 1,
          pr: 1,
          fontWeight: 'bold',
          fontSize: '3vh',
        }}
      >
        주문 목록
      </Typography>
      {/* 주문 목록 글씨 표기 끝 */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        {/* 필터 선택용 Toggle Button 표기 시작 */}
        <Box sx={{ float: 'right', pr: 3, mb: 1 }}>
          <ToggleButtonGroup
            value={String(currentFilter)}
            exclusive
            onChange={filterChange}
          >
            <ToggleButton value="none" sx={filterBox}>
              전체
            </ToggleButton>
            <ToggleButton value="payment-completed" sx={filterBox}>
              결제 완료
            </ToggleButton>
            <ToggleButton value="preparing-for-delivery" sx={filterBox}>
              배송 준비 중
            </ToggleButton>
            <ToggleButton value="shipping" sx={filterBox}>
              배송 중
            </ToggleButton>
            <ToggleButton value="delivery-completed" sx={filterBox}>
              배송 완료
            </ToggleButton>
            <ToggleButton value="returning" sx={filterBox}>
              반납 중
            </ToggleButton>
            <ToggleButton value="returned" sx={filterBox}>
              반납 완료
            </ToggleButton>
            <ToggleButton value="cancel-request" sx={filterBox}>
              취소 요청
            </ToggleButton>
            <ToggleButton value="canceled" sx={filterBox}>
              취소 처리 완료
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {/* 필터 선택용 Toggle Button 표기 끝 */}

        {/* 정렬 기준 선택용 Select Box 표기 시작 */}
        <Box sx={{ float: 'right', pr: 1, mb: 1 }}>
          <InputLabel
            sx={{
              fontSize: '0.8rem',
            }}
            variant="standard"
            htmlFor="adminOrderListSort"
          >
            정렬 기준
          </InputLabel>
          <NativeSelect
            inputRef={sortRef}
            onChange={sortChange}
            sx={{
              px: 1,
              hover: {
                backgroundColor: '#ffffff',
              },
              focus: {
                backgroundColor: '#fffffff',
              },
            }}
            defaultValue="-odrDate"
            inputProps={{
              name: 'sort',
              id: 'adminOrderListSort',
            }}
          >
            <option value="-odrDate">최근 주문 순</option>
            <option value="odrDate">오래된 주문 순</option>
            <option value="deadline">반납 기한 순</option>
          </NativeSelect>
        </Box>
        {/* 정렬 기준 선택용 Select Box 표기 끝 */}
      </Box>

      {/* 주문 목록 테이블 표기 시작 */}
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          cursor: 'default',
        }}
      >
        {/* 주문 목록 테이블 컬럼명 표기 시작 */}
        <Grid
          container
          sx={{
            px: 1,
            py: 0.5,
            borderTop: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <Grid item xs={4}>
            <Typography sx={tableHead}>주문 번호</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>상품 번호</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>주문 닉네임</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>잔여 일수</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>반납 기한</Typography>
          </Grid>
        </Grid>
        {/* 주문 목록 테이블 컬럼명 표기 끝 */}

        {/* 주문 목록 테이블 데이터 표기 시작 */}
        {loading ? (
          <Box sx={{ m: 0, borderBottom: '2px solid #000000', width: '100%' }}>
            <Loading height={'436px'} />
          </Box>
        ) : orderList.length === 0 ? (
          // 주문 데이터가 없을 경우
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            주문 데이터가 존재하지 않습니다.
          </Typography>
        ) : (
          // 주문 데이터가 있을 경우
          orderList.map((order, index, row) => (
            <AdminOrdersRows
              key={order.opCode}
              order={order}
              queryString={location.search}
              isLast={index + 1 === row.length} // 마지막 데이터인지 확인
            />
          ))
        )}
        {/* 주문 목록 테이블 데이터 표기 끝 */}
      </Box>
      {/* 주문 목록 테이블 표기 끝 */}

      {/* 페이지네이션 표기 시작 */}
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={Number(totalPage || 0)}
          page={Number(currentPage)}
          onChange={pageChange}
          showFirstButton
          showLastButton
        />
      </Box>
      {/* 페이지네이션 표기 끝 */}

      {/* 검색 바 표기 시작 */}
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NativeSelect
          inputRef={conditionRef}
          size="normal"
          sx={{
            mx: 1,
            px: 1,
            outline: '1px solid #000000',
            hover: {
              backgroundColor: '#ffffff',
            },
            focus: {
              backgroundColor: '#fffffff',
            },
          }}
          defaultValue="op.odrNumber"
          inputProps={{
            name: 'condition',
            id: 'adminOrderListCondition',
          }}
        >
          <option value="op.odrNumber">주문 번호</option>
          <option value="op.prodCode">상품 번호</option>
          <option value="u.nickname">주문 닉네임</option>
        </NativeSelect>
        <TextField
          inputRef={keywordRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
          id="adminOrderListKeyword"
          variant="outlined"
          size="small"
          sx={{
            mx: 1,
            width: '400px',
          }}
        />
        <Button
          variant="contained"
          onClick={search}
          sx={{
            mx: 1,
            width: '65px',
            backgroundColor: '#c3c36a',
            color: '#000000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#c3c36a',
              color: '#ffffff',
            },
          }}
        >
          검색
        </Button>
      </Box>
      {/* 검색 바 표기 끝 */}
    </Container>
  );
};

export default AdminOrdersLists;
