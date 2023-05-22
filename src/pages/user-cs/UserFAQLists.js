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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import UserCsTitle from '../../components/user-cs/UserCsTitle';
import UserFAQRows from '../../components/user-cs/UserFAQRows';

const UserFAQLists = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기
  const location = useLocation(); // 현재 URL 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const [faqList, setFaqList] = useState([]);
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
          axios.get(`/cs/faq/count?filter=${searchParams.get('filter')}`),
          axios.get(
            `/cs/faq?filter=${searchParams.get(
              'filter'
            )}&pages=${searchParams.get('pages')}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10));
            setFaqList(list.data);
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
            `/cs/faq/count?keyword=${searchParams.get(
              'keyword'
            )}&filter=${searchParams.get('filter')}`
          ),
          axios.get(
            `/cs/faq?keyword=${searchParams.get(
              'keyword'
            )}&filter=${searchParams.get('filter')}&pages=${searchParams.get(
              'pages'
            )}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10));
            setFaqList(list.data);
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
      navigate(`/cs/faq/lists?filter=${currentFilter}&pages=1`);
    } else {
      navigate(
        `/cs/faq/lists?keyword=${keyword}&filter=${currentFilter}&pages=1`
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

  return (
    <>
      <UserCsTitle />

      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
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
        </Box>
        {/* FAQ 목록 테이블 표기 시작 */}
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
          {/* FAQ 목록 테이블 컬럼명 표기 시작 */}
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
              <Typography sx={tableHead}>구분</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography sx={tableHead}>FAQ 제목</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={tableHead}>작성일</Typography>
            </Grid>
          </Grid>
          {/* FAQ 목록 테이블 컬럼명 표기 끝 */}

          {/* FAQ 목록 테이블 데이터 표기 시작 */}
          {faqList.length === 0 ? (
            // FAQ 데이터가 없을 경우
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
              FAQ 데이터가 존재하지 않습니다.
            </Typography>
          ) : (
            // FAQ 데이터가 있을 경우
            faqList.map((faq, index, row) => (
              <UserFAQRows
                key={faq.faqCode}
                faqCode={faq.faqCode}
                faqCategory={faq.faqCategory}
                faqTitle={faq.faqTitle}
                faqDate={faq.faqDate}
                queryString={location.search}
                isLast={index + 1 === row.length} // 마지막 데이터인지 확인
              />
            ))
          )}
          {/* FAQ 목록 테이블 데이터 표기 끝 */}
        </Box>
        {/* FAQ 목록 테이블 표기 끝 */}

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
            defaultValue="title-content"
          >
            <option
              value="title-content"
              style={{
                textAlign: 'center',
              }}
            >
              제목 + 내용
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

export default UserFAQLists;
