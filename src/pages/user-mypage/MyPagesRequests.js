import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MyPageTop from '../../components/user-mypage/MyPageTop';
import MyRequest from '../../components/user-mypage/MyRequest';
import {
  Container,
  Box,
  Divider,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
} from '@mui/material';

// 기본 페이지 url
// http://localhost:3000/mypages/ryu@naver.com/requests/lists?filter=%EC%A0%84%EC%B2%B4&pages=1

const MyPagesRequests = () => {
  // const userEmail = sessionStorage.getItem(email); // 이메일 정보 가져오기
  const userEmail = 'ryu@naver.com'; // 테스트용
  const testreqcode = 1;

  const [searchParams, setSearchParams] = useSearchParams();

  const btnFilter = [
    '전체',
    '1차 심사 중',
    '2차 심사 대기',
    '2차 심사 중',
    '완료',
    '심사 탈락',
    '철회 요청',
    '철회 진행 중',
    '철회 완료',
  ];
  const [filter, setFilter] = useState(); // 현재 필터

  const [requestList, setRequestList] = useState([]); // 판매/위탁 목록

  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(); // 현재 페이지

  const [expanded, setExpanded] = useState('0');

  const handleChange = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getRequestList = () => {
    axios
      .all([
        axios.get(
          `/users/mypages/request/count?userEmail=${userEmail}&filter=${searchParams.get(
            'filter'
          )}`
        ),
        axios.get(
          `/users/mypages/request/list?userEmail=${userEmail}&filter=${searchParams.get(
            'filter'
          )}&pages=${searchParams.get('pages')}`
        ),
        axios.get(`/users/mypages/request/pictures?reqCode=${testreqcode}`),
      ])
      .then(
        axios.spread((count, list, test) => {
          setTotalPage(Math.ceil(count.data / 5));
          setRequestList(list.data);
          setCurrentPage(searchParams.get('pages'));
          setFilter(searchParams.get('filter'));
          console.log(count.data);
          console.log(list.data);
          console.log(test.data);
        })
      )
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getRequestList();
  }, [searchParams]);

  const handleCategoryChange = (e, value) => {
    if (value !== null) {
      searchParams.set('filter', value);
      setSearchParams(searchParams);
      setFilter(value);
    }
  };

  const handlePaging = (e, value) => {
    window.scrollTo({ left: 0, top: 1000, behavior: 'smooth' });
    searchParams.set('pages', value);
    setSearchParams(searchParams);
  };

  const btnRequestStyle = {
    minWidth: '50px',
    width: '50px',
    minHeight: '30px',
    height: '30px',
    border: '1px solid #626262',
    borderRadius: '10px',
    bgcolor: '#c3c36a',
    color: 'black',
    fontSize: '13pt',
    marginTop: '5pt',
    marginLeft: '10pt',
    '&:hover': {
      bgcolor: '#9B9B5A',
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
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              margin: '30px 0 20px 0',
            }}
          >
            물품 판매/위탁
          </Typography>
          <Button sx={btnRequestStyle} href="/requests">
            신청
          </Button>
        </Box>

        <ToggleButtonGroup
          onChange={handleCategoryChange}
          color="primary"
          value={filter}
          exclusive
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '-10px',
          }}
        >
          {btnFilter.map((filter) => {
            return (
              <ToggleButton key={filter} value={filter} sx={filterStyle}>
                {filter}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>

        {requestList.map((request) => {
          return (
            <MyRequest
              key={request.reqCode}
              request={request}
              expanded={expanded}
              handleChange={handleChange}
            ></MyRequest>
          );
        })}
        <Divider />
        <Box display="flex" alignItems="center" justifyContent="center">
          <Pagination
            count={Number(totalPage || 0)}
            page={Number(currentPage)}
            onChange={handlePaging}
            showFirstButton
            showLastButton
            sx={{ margin: '50px 0 100px 0' }}
          />
        </Box>
      </Container>
    </>
  );
};

export default MyPagesRequests;
