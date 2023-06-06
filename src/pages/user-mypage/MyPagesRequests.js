import { React, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MyPageTop from '../../components/user-mypage/MyPageTop';
import MyRequest from '../../components/user-mypage/MyRequest';
import Loading from '../../components/Loading';
import {
  Container,
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
} from '@mui/material';

const btnFilter = [
  {
    name: '전체',
    value: 'none',
  },
  {
    name: '1차 심사 중',
    value: '1st-assessing',
  },
  {
    name: '2차 심사 대기',
    value: 'waiting-2nd-assess',
  },
  {
    name: '2차 심사 중',
    value: '2nd-assessing',
  },
  {
    name: '완료',
    value: 'completed',
  },
  {
    name: '심사 탈락',
    value: 'failed',
  },
  {
    name: '위탁 철회 요청',
    value: 'cancel-request',
  },
  {
    name: '철회 진행 중',
    value: 'canceling',
  },
  {
    name: '철회 완료',
    value: 'canceled',
  },
];

// 기본 페이지 url
// http://localhost:3000/mypages/${email}/requests/lists?filter=none&pages=1

const MyPagesRequests = () => {
  const { email } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [requestList, setRequestList] = useState([]); // 판매/위탁 목록
  const [filter, setFilter] = useState('none'); // 현재 필터
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

  useEffect(() => {
    getRequestList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const getRequestList = () => {
    axios
      .all([
        axios.get(
          `/requests/mypages/count?email=${email}&filter=${searchParams.get(
            'filter'
          )}`
        ),
        axios.get(
          `/requests/mypages/lists?email=${email}&filter=${searchParams.get(
            'filter'
          )}&pages=${searchParams.get('pages')}`
        ),
      ])
      .then(
        axios.spread((count, list) => {
          setTotalPage(Math.ceil(count.data / 5));
          setRequestList(list.data);
          setCurrentPage(searchParams.get('pages'));
          setFilter(searchParams.get('filter'));
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [expanded, setExpanded] = useState(0);

  const handleAccordionChange = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCategoryChange = (e, value) => {
    if (value !== null) {
      searchParams.set('filter', value);
      setSearchParams(searchParams);
      setFilter(value);
      setExpanded(0);
    }
  };

  const handlePaging = (e, value) => {
    window.scrollTo({ left: 0, top: 1000, behavior: 'smooth' });
    searchParams.set('pages', value);
    setSearchParams(searchParams);
  };

  const btnRequestStyle = {
    width: '70px',
    border: '1px solid #626262',
    marginLeft: '20px',
    borderRadius: '10px',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: '1.0rem',
    backgroundColor: '#c3c36a',
    '&:hover': {
      backgroundColor: '#c3c36a',
      color: '#ffffff',
    },
  };

  const filterStyle = {
    padding: '0 10px 0 10px',
    marginBottom: '20px',
    color: '#828282',
    fontSize: '0.8rem',
    transition: 'all 0.25s',
    border: 'none',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#c3c36a',
      color: '#ffffff',
    },
    '&.Mui-selected': {
      backgroundColor: '#c3c36a',
      color: '#000000',
      textDecoration: 'underline',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#c3c36a',
      textDecoration: 'underline',
      color: '#ffffff',
    },
    '&.MuiToggleButtonGroup-grouped': {
      borderRadius: '10px !important',
      mx: 1,
      border: '1px solid white !important',
    },
  };

  return (
    <>
      <MyPageTop />

      <Container
        sx={{
          userSelect: 'none',
          width: '1100px',
          minHeight: '60vh',
        }}
      >
        <Box
          sx={{
            mt: '30px',
            mb: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
            }}
          >
            물품 판매/위탁
          </Typography>
          <Button size="small" sx={btnRequestStyle} href="/requests">
            신청
          </Button>
        </Box>

        {loading ? (
          <Loading height={'40vh'} />
        ) : (
          <Box
            sx={{
              width: '1000px',
              m: '20px auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ToggleButtonGroup
              onChange={handleCategoryChange}
              value={filter}
              exclusive
              sx={{
                mt: '20px',
                p: 0,
                width: '1000px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {btnFilter.map((filter) => {
                return (
                  <ToggleButton
                    key={filter.name}
                    value={filter.value}
                    sx={filterStyle}
                  >
                    {filter.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>

            {requestList.length === 0 ? (
              <Typography
                variant="h6"
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  py: '30px',
                  fontWeight: 'bold',
                }}
              >
                판매/위탁 내역이 없습니다.
              </Typography>
            ) : (
              requestList.map((request) => {
                return (
                  <MyRequest
                    key={request.reqCode}
                    request={request}
                    expanded={expanded}
                    handleAccordionChange={handleAccordionChange}
                    getRequestList={getRequestList}
                  />
                );
              })
            )}

            <Box display="flex" alignItems="center" justifyContent="center">
              <Pagination
                count={Number(totalPage || 0)}
                page={Number(currentPage)}
                onChange={handlePaging}
                showFirstButton
                showLastButton
                sx={{ margin: '30px 0 100px 0' }}
              />
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default MyPagesRequests;
