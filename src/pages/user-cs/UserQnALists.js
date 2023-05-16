import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  NativeSelect,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import UserCsTitle from '../../components/user-cs/UserCsTitle';
import UserFooter from '../../components/UserFooter';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: 'none',
  borderTop: '1px solid black',
  '& table': {
    borderCollapse: 'collapse',
    borderRadius: '0',
    borderSpacing: '0',
  },
  '&.MuiPaper-root': {
    borderRadius: '0',
  },
}));

const StyledTableHeadRow = styled(TableRow)({
  '& th': {
    borderBottom: '1px solid black',
    fontWeight: 'bold',
  },
});

const StyledTableRow = styled(TableRow)({
  '&:first-child td': {
    borderTop: '1px solid black',
  },
  '&:last-child td': {
    borderBottom: '1px solid black',
  },
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const UserQnALists = () => {
  // const email = sessionStorage.getItem('email'); // 이메일을 세션에서 가져오기
  const email = 'bae@naver.com'; // 임시 이메일
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

  const filters = [
    { name: '전체', value: 'none' },
    { name: '상품 문의', value: 'product' },
    { name: '로그인/정보', value: 'login-about' },
    { name: '판매/위탁', value: 'sell-consign' },
    { name: '결제', value: 'payment' },
    { name: '배송 문의', value: 'shipping' },
    { name: '기타', value: 'etc' },
  ];

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
            console.log(count.data);
            setTotalPage(Math.ceil(count.data / 10));
            setQuestionList(list.data);
            setCurrentPage(searchParams.get('pages'));
            setCurrentFilter(searchParams.get('filter'));
            keywordRef.current.value = searchParams.get('keyword');
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchParams]);

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

  return (
    <>
      <UserCsTitle />
      <div style={{ maxWidth: '1150px', margin: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <Box sx={{ float: 'right', my: 2 }}>
            <ToggleButtonGroup
              value={String(currentFilter)}
              exclusive
              onChange={filterChange}
            >
              {filters.map((filter) => {
                return (
                  <ToggleButton
                    key={filter.name}
                    value={filter.value}
                    sx={filterBox}
                  >
                    {filter.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
        </Box>
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableHeadRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">카테고리</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작성일</TableCell>
                <TableCell align="center">처리 상태</TableCell>
              </StyledTableHeadRow>
            </TableHead>

            {questionList.length !== 0 &&
              questionList.map((question, index) => (
                <TableBody key={index}>
                  <StyledTableRow>
                    <TableCell align="center">{question.qstCode}</TableCell>
                    <TableCell align="center">{question.qstCategory}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <StyledLink
                        title={question.qstTitle}
                        to={`/cs/qna/${email}/details/${question.qstCode}`}
                        state={{
                          queryString: location.search,
                        }}
                        sx={{
                          textDecoration: 'none',
                          color: '#000000',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {question.qstTitle}
                      </StyledLink>
                    </TableCell>
                    <TableCell align="center">{question.qstDate}</TableCell>
                    <TableCell align="center">
                      {question.qstState === 1 ? '답변 완료' : '답변 대기'}
                    </TableCell>
                  </StyledTableRow>
                </TableBody>
              ))}
          </Table>
        </StyledTableContainer>
        {searchParams.get('keyword') !== null && questionList.length === 0 && (
          <Box>
            <Typography
              variant="h5"
              component="h6"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5,
                mb: 5,
              }}
            >
              검색 결과가 없습니다.
            </Typography>
          </Box>
        )}

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
                navigate(`/cs/qna/create`);
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
        <UserFooter />
      </div>
    </>
  );
};

export default UserQnALists;
