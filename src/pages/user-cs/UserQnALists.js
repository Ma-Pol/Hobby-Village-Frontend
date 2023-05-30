import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Box,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  NativeSelect,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import UserQnARows from '../../components/user-cs/UserQnARows';
import UserCsTitleBottom from '../../components/user-cs/UserCsTitleBottom';
import Loading from '../../components/Loading';

const UserQnALists = () => {
  const [loading, setLoading] = useState(true);
  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const location = useLocation(); // 현재 URL 정보
  const [questionList, setQuestionList] = useState([]);
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(searchParams.get('pages'));
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get('filter')
  );
  const keywordRef = useRef(); // 현재 검색 키워드

  useEffect(() => {
    // 검색 조건이 없을 때
    if (searchParams.get('keyword') === null) {
      axios
        .all([
          axios.get(
            `/cs/qna/${email}/count?filter=${searchParams.get('filter')}`
          ),
          axios.get(
            `/cs/qna/${email}?filter=${searchParams.get(
              'filter'
            )}&pages=${searchParams.get('pages')}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10));
            setQuestionList(list.data);
            setCurrentPage(searchParams.get('pages'));
            setCurrentFilter(searchParams.get('filter'));
            keywordRef.current.value = '';
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
            `/cs/qna/${email}/count?keyword=${searchParams.get(
              'keyword'
            )}&filter=${searchParams.get('filter')}`
          ),
          axios.get(
            `/cs/qna/${email}?keyword=${searchParams.get(
              'keyword'
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
  }, [email, searchParams]);

  const filterChange = (e, value) => {
    if (value !== null) {
      searchParams.set('filter', value);
      setSearchParams(searchParams);
      setCurrentFilter(value);
    }
  };

  const pageChange = (e, value) => {
    searchParams.set('pages', value);
    setSearchParams(searchParams);
  };

  const search = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    const keyword = keywordRef.current.value;
    if (keyword === '') {
      navigate(`/cs/qna/${email}/lists?filter=${currentFilter}&pages=1`);
    } else {
      navigate(
        `/cs/qna/${email}/lists?keyword=${keyword}&filter=${currentFilter}&pages=1`
      );
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

  if (email === null) {
    alert('1:1 문의는 로그인 후 이용할 수 있습니다.');
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <UserCsTitleBottom />
      <Container sx={{ minHeight: '80vh' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          {/* 필터 선택용 Toggle Button 표기 시작 */}
          <Box sx={{ float: 'right', mb: 1 }}>
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
          <Grid
            container
            sx={{
              px: 1,
              py: 0.5,
              borderTop: '2px solid #000000',
              borderBottom: '2px solid #000000',
            }}
          >
            <Grid item xs={2}>
              <Typography sx={tableHead}>카테고리</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={tableHead}>문의 제목</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={tableHead}>작성일</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={tableHead}>처리 상태</Typography>
            </Grid>
          </Grid>

          {loading ? (
            <Box
              sx={{ m: 0, borderBottom: '2px solid #000000', width: '100%' }}
            >
              <Loading height={'416px'} />
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
              <UserQnARows
                key={question.qstCode}
                qstCode={question.qstCode}
                qstCategory={question.qstCategory}
                qstTitle={question.qstTitle}
                qstWriter={question.qstWriter}
                qstDate={question.qstDate}
                qstState={question.qstState}
                userCode={question.userCode}
                queryString={location.search}
                isLast={index + 1 === row.length} // 마지막 데이터인지 확인
              />
            ))
          )}
          {/* 질문 목록 테이블 데이터 표기 끝 */}
        </Box>
        {/* 질문 목록 테이블 표기 끝 */}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '120px',
            }}
          ></Box>

          <Box
            sx={{
              mt: 2,
              width: '700px',
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
          <Box
            sx={{
              width: 'auto',
            }}
          >
            <Button
              variant="contained"
              sx={{
                my: 2,
                width: '110px',
                height: '30px',
                backgroundColor: '#c3c36a',
                color: '#000000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#c3c36a',
                  color: '#ffffff',
                },
              }}
              onClick={() => {
                navigate(`/cs/qna/create`, {
                  state: { queryString: location.search },
                });
              }}
            >
              문의 남기기
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            mb: 12,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <NativeSelect
            disabled
            size="normal"
            sx={{
              mx: 1,
              px: 1,
              width: '120px',
              outline: '1px solid #000000',
              hover: {
                backgroundColor: '#ffffff',
              },
              focus: {
                backgroundColor: '#fffffff',
              },
            }}
            defaultValue="title"
          >
            <option
              value="title"
              style={{
                textAlign: 'center',
              }}
            >
              제목
            </option>
          </NativeSelect>
          <TextField
            inputRef={keywordRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                search();
              }
            }}
            variant="outlined"
            size="small"
            sx={{
              mx: 1,
              width: '400px',
              '&:focus': {
                outline: 'none',
              },
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
      </Container>
    </>
  );
};

export default UserQnALists;
