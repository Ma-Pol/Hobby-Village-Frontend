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
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AdminQnARows from '../../components/admin-qna/AdminQnALists/AdminQnARows';
import Loading from 'components/Loading';

const AdminQnALists = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const [questionList, setQuestionList] = useState([]); // 질문 목록
  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(searchParams.get('pages')); // 현재 페이지
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get('filter')
  ); // 현재 필터
  const sortRef = useRef(); // 현재 정렬 기준
  const conditionRef = useRef(); // 현재 검색 조건
  const keywordRef = useRef(); // 현재 검색 키워드

  // 페이지 접근 시 질문 목록 가져오기
  useEffect(() => {
    // 검색 조건이 없을 때
    if (searchParams.get('keyword') === null) {
      // 다중 요청(페이지네이션을 위한 전체 질문 수 요청, 질문 목록 요청)
      axios
        .all([
          axios.get(`/m/qnas/count?filter=${searchParams.get('filter')}`),
          axios.get(
            `/m/qnas?sort=${searchParams.get('sort')}&filter=${searchParams.get(
              'filter'
            )}&pages=${searchParams.get('pages')}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10)); // 전체 페이지 수 설정
            setQuestionList(list.data); // 질문 목록 설정
            setCurrentPage(searchParams.get('pages')); // 현재 페이지 설정
            setCurrentFilter(searchParams.get('filter')); // 현재 필터 설정
            sortRef.current.value = searchParams.get('sort'); // 현재 정렬 기준 설정
            conditionRef.current.value = 'qstTitle'; // 현재 검색 조건 기본값 설정
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
            `/m/qnas/count?condition=${searchParams.get(
              'condition'
            )}&keyword=${searchParams.get('keyword')}&filter=${searchParams.get(
              'filter'
            )}`
          ),
          axios.get(
            `/m/qnas?condition=${searchParams.get(
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
            setQuestionList(list.data);
            setCurrentPage(searchParams.get('pages'));
            setCurrentFilter(searchParams.get('filter'));
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
    if (keyword === '') {
      navigate(`/m/qnas/lists?sort=${sort}&filter=${currentFilter}&pages=1`);
    } else {
      navigate(
        `/m/qnas/lists?condition=${condition}&keyword=${keyword}&sort=${sort}&filter=${currentFilter}&pages=1`
      );
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
      {/* 질문 목록 글씨 표기 시작 */}
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
        1:1 문의 목록
      </Typography>
      {/* 질문 목록 글씨 표기 끝 */}

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
            <ToggleButton value="product" sx={filterBox}>
              상품 문의
            </ToggleButton>
            <ToggleButton value="login-about" sx={filterBox}>
              로그인/정보
            </ToggleButton>
            <ToggleButton value="sell-consign" sx={filterBox}>
              판매/위탁
            </ToggleButton>
            <ToggleButton value="payment" sx={filterBox}>
              결제
            </ToggleButton>
            <ToggleButton value="shipping" sx={filterBox}>
              배송 문의
            </ToggleButton>
            <ToggleButton value="other" sx={filterBox}>
              기타
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
            htmlFor="adminQnaListSort"
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
            defaultValue="-qstDate"
            inputProps={{
              name: 'sort',
              id: 'adminQnaListSort',
            }}
          >
            <option value="-qstDate">최근 작성 순</option>
            <option value="qstDate">오래된 작성 순</option>
          </NativeSelect>
        </Box>
        {/* 정렬 기준 선택용 Select Box 표기 끝 */}
      </Box>

      {/* 질문 목록 테이블 표기 시작 */}
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
        {/* 질문 목록 테이블 컬럼명 표기 시작 */}
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
            <Typography sx={tableHead}>번호</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>구분</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={tableHead}>문의 제목</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>닉네임</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>등록일</Typography>
          </Grid>
        </Grid>
        {/* 질문 목록 테이블 컬럼명 표기 끝 */}

        {/* 질문 목록 테이블 데이터 표기 시작 */}
        {loading ? (
          <Box sx={{ m: 0, borderBottom: '2px solid #000000', width: '100%' }}>
            <Loading height={'436px'} />
          </Box>
        ) : questionList.length === 0 ? (
          // 질문 데이터가 없을 경우
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
            질문 데이터가 존재하지 않습니다.
          </Typography>
        ) : (
          // 질문 데이터가 있을 경우
          questionList.map((question, index, row) => (
            <AdminQnARows
              key={question.qstCode}
              qstCode={question.qstCode}
              qstCategory={question.qstCategory}
              qstTitle={question.qstTitle}
              qstWriter={question.qstWriter}
              qstDate={question.qstDate}
              qstState={question.qstState}
              userCode={question.userCode}
              isLast={index + 1 === row.length} // 마지막 데이터인지 확인
            />
          ))
        )}
        {/* 질문 목록 테이블 데이터 표기 끝 */}
      </Box>
      {/* 질문 목록 테이블 표기 끝 */}

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
          defaultValue="qstTitle"
          inputProps={{
            name: 'condition',
            id: 'adminQnaListCondition',
          }}
        >
          <option value="qstTitle">제목</option>
          <option value="qstWriter">닉네임</option>
        </NativeSelect>
        <TextField
          inputRef={keywordRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
          id="adminQnaListKeyword"
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

export default AdminQnALists;
