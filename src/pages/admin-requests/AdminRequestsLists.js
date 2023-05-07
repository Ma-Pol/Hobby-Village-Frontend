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
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import AdminRequestsRows from '../../components/admin-requests/AdminRequestsLists/AdminRequestsRows';
import AdminRequestsFilterSell from '../../components/admin-requests/AdminRequestsLists/AdminRequestsFilterSell';
import AdminRequestsFilterConsign from '../../components/admin-requests/AdminRequestsLists/AdminRequestsFilterConsign';

const AdminRequestsLists = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기
  const location = useLocation(); // 현재 URL 정보 가져오기
  const { category } = useParams(); // 현재 카테고리 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const [requestList, setRequestList] = useState([]); // 신청 목록
  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(searchParams.get('pages')); // 현재 페이지
  const [currentCategory, setCurrentCategory] = useState(
    location.pathname.split('/')[3]
  ); // 현재 카테고리
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get('filter')
  ); // 현재 필터
  const sortRef = useRef(); // 현재 정렬 기준
  const conditionRef = useRef(); // 현재 검색 조건
  const keywordRef = useRef(); // 현재 검색 키워드

  // 페이지 접근 시 신청 목록 가져오기
  useEffect(() => {
    // 검색 조건이 없을 때
    if (searchParams.get('keyword') === null) {
      // 다중 요청(페이지네이션을 위한 전체 신청 수 요청, 신청 목록 요청)
      axios
        .all([
          axios.get(
            `/m/requests/${category}/count?filter=${searchParams.get('filter')}`
          ),
          axios.get(
            `/m/requests/${category}?sort=${searchParams.get(
              'sort'
            )}&filter=${searchParams.get('filter')}&pages=${searchParams.get(
              'pages'
            )}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10)); // 전체 페이지 수 설정
            setRequestList(list.data); // 신청 목록 설정
            setCurrentPage(searchParams.get('pages')); // 현재 페이지 설정
            setCurrentCategory(category); // 현재 카테고리 설정
            setCurrentFilter(searchParams.get('filter')); // 현재 필터 설정
            sortRef.current.value = searchParams.get('sort'); // 현재 정렬 기준 설정
            conditionRef.current.value = 'u.nickname'; // 현재 검색 조건 기본값 설정
            keywordRef.current.value = ''; // 현재 검색 키워드 기본값 설정
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
    // 검색 조건이 있을 때
    else {
      axios
        .all([
          axios.get(
            `/m/requests/${category}/count?condition=${searchParams.get(
              'condition'
            )}&keyword=${searchParams.get('keyword')}&filter=${searchParams.get(
              'filter'
            )}`
          ),
          axios.get(
            `/m/requests/${category}?condition=${searchParams.get(
              'condition'
            )}&keyword=${searchParams.get('keyword')}&sort=${searchParams.get(
              'sort'
            )}&filter=${searchParams.get('filter')}&pages=${searchParams.get(
              'pages'
            )}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10));
            setRequestList(list.data);
            setCurrentPage(searchParams.get('pages'));
            setCurrentCategory(category);
            setCurrentFilter(searchParams.get('filter'));
            sortRef.current.value = searchParams.get('sort');
            conditionRef.current.value = searchParams.get('condition');
            keywordRef.current.value = searchParams.get('keyword');
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchParams, category]);

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
    if (keyword === '') {
      navigate(
        `/m/requests/${currentCategory}/lists?sort=${sort}&filter=${currentFilter}&pages=1`
      );
    } else {
      navigate(
        `/m/requests/${currentCategory}/lists?condition=${condition}&keyword=${keyword}&sort=${sort}&filter=${currentFilter}&pages=1`
      );
    }
  };

  // 정렬 기준 변경 시
  const sortChange = () => {
    const sort = sortRef.current.value;
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };

  // 카테고리 변경 시
  const categoryChange = (e, value) => {
    if (value !== null) {
      setCurrentCategory(value);
      const filter = searchParams.get('filter');
      const sort = searchParams.get('sort');
      const condition = searchParams.get('condition');
      const keyword = searchParams.get('keyword');
      let nextURL = `/m/requests/${value}/lists?`; // 공통 URL

      // 검색한 상태가 아니면서 위탁 철회 관련 필터를 선택한 상태에서 카테고리를 변경하는 경우
      if (
        (filter === 'cancel-request' ||
          filter === 'canceling' ||
          filter === 'canceled') &&
        keyword === null
      ) {
        nextURL += `sort=${sort}&filter=none&pages=1`;
      }
      // 검색한 상태면서 위탁 철회 관련 필터를 선택한 상태에서 카테고리를 변경하는 경우
      else if (
        (filter === 'cancel-request' ||
          filter === 'canceling' ||
          filter === 'canceled') &&
        keyword !== null
      ) {
        nextURL += `condition=${condition}&keyword=${keyword}&sort=${sort}&filter=none&pages=1`;
      }
      // 검색한 상태가 아니면서 위탁 철회 관련 필터를 선택하지 않은 상태에서 카테고리를 변경하는 경우
      else if (keyword === null) {
        nextURL += `sort=${sort}&filter=${filter}&pages=1`;
      }
      // 검색한 상태면서 위탁 철회 관련 필터를 선택하지 않은 상태에서 카테고리를 변경하는 경우
      else {
        nextURL += `condition=${condition}&keyword=${keyword}&sort=${sort}&filter=${filter}&pages=1`;
      }
      navigate(nextURL);
    }
  };

  // 필터 변경 시
  const filterChange = (e, value) => {
    if (value !== null) {
      searchParams.set('filter', value);
      setSearchParams(searchParams);
      setCurrentFilter(value);
    }
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

  const tableHead = {
    fontWeight: 'bold',
    textAlign: 'center',
    px: 1,
    py: 0.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  return (
    <Container>
      {/* 신청 목록 글씨 표기 시작 */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 5,
          mb: 1,
          pl: 1,
          pr: 1,
          fontWeight: 'bold',
          userSelect: 'none',
        }}
      >
        신청 목록
      </Typography>
      {/* 신청 목록 글씨 표기 끝 */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        {/* 카테고리 선택용 Toggle Button 표기 시작 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}
        >
          <Box
            sx={{
              float: 'left',
              pl: 1,
              mb: 1,
            }}
          >
            <ToggleButtonGroup
              value={String(currentCategory)}
              exclusive
              onChange={categoryChange}
            >
              <ToggleButton value="sell" sx={filterBox}>
                판매
              </ToggleButton>
              <ToggleButton value="consign" sx={filterBox}>
                위탁
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        {/* 카테고리 선택용 Toggle Button 표기 끝 */}

        {/* 필터 및 정렬 기준 표기 시작 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          {/* 필터 선택용 Toggle Button 표기 시작 */}
          <Box sx={{ float: 'right', pr: 3, mb: 1 }}>
            {currentCategory === 'sell' ? (
              <AdminRequestsFilterSell
                currentFilter={currentFilter}
                filterChange={filterChange}
                filterBox={filterBox}
              />
            ) : (
              <AdminRequestsFilterConsign
                currentFilter={currentFilter}
                filterChange={filterChange}
                filterBox={filterBox}
              />
            )}
          </Box>
          {/* 필터 선택용 Toggle Button 표기 끝 */}

          {/* 정렬 기준 선택용 Select Box 표기 시작 */}
          <Box sx={{ float: 'right', pr: 1, mb: 1 }}>
            <InputLabel
              sx={{
                fontSize: '0.8rem',
              }}
              variant="standard"
              htmlFor="adminRequestListSort"
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
              defaultValue="-reqDate"
              inputProps={{
                name: 'sort',
                id: 'adminRequestListSort',
              }}
            >
              <option value="-reqDate">최근 신청 순</option>
              <option value="reqDate">오래된 신청 순</option>
            </NativeSelect>
          </Box>
          {/* 정렬 기준 선택용 Select Box 표기 끝 */}
        </Box>
        {/* 필터 및 정렬 기준 표기 끝 */}
      </Box>
      {/* 신청 목록 테이블 표기 시작 */}
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        {/* 신청 목록 테이블 컬럼명 표기 시작 */}
        <Grid
          container
          sx={{
            px: 1,
            py: 0.5,
            borderTop: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <Grid item xs={1}>
            <Typography sx={tableHead}>구분</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography sx={tableHead}>카테고리</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={tableHead}>신청 물품 명</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>판매 신청자</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>진행 상황</Typography>
          </Grid>
        </Grid>
        {/* 신청 목록 테이블 컬럼명 표기 끝 */}

        {/* 신청 목록 테이블 데이터 표기 시작 */}
        {requestList.length === 0 ? (
          // 신청 데이터가 없을 경우
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            신청 데이터가 존재하지 않습니다.
          </Typography>
        ) : (
          // 신청 데이터가 있을 경우
          requestList.map((request, index, row) => (
            <AdminRequestsRows
              key={request.reqCode}
              reqCode={request.reqCode}
              reqSort={request.reqSort}
              reqCategory={request.reqCategory}
              reqTitle={request.reqTitle}
              reqProgress={request.reqProgress}
              userCode={request.userCode}
              nickname={request.nickname}
              isLast={index + 1 === row.length} // 마지막 데이터인지 확인
            />
          ))
        )}
        {/* 신청 목록 테이블 데이터 표기 끝 */}
      </Box>
      {/* 신청 목록 테이블 표기 끝 */}

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
          defaultValue="u.nickname"
          inputProps={{
            name: 'condition',
            id: 'adminRequestListCondition',
          }}
        >
          <option value="u.nickname">신청자 닉네임</option>
        </NativeSelect>
        <TextField
          inputRef={keywordRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
          id="adminRequestListKeyword"
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

export default AdminRequestsLists;
