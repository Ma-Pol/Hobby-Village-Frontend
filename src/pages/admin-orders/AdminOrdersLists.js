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
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AdminOrdersLists = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const [userList, setUserList] = useState([]); // 회원 목록
  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(searchParams.get('pages')); // 현재 페이지
  const sortRef = useRef(); // 현재 정렬 기준
  const conditionRef = useRef(); // 현재 검색 조건
  const keywordRef = useRef(); // 현재 검색 키워드

  // 정렬 기준 변경 시
  const sortChange = () => {
    const sort = sortRef.current.value;
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };
  return (
    <Container>
      {/* 주문 목록 글씨 표기 시작 */}
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
        주문 목록
      </Typography>
      {/* 주문 목록 글씨 표기 끝 */}

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
          defaultValue="-userCode"
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
    </Container>
  );
};

export default AdminOrdersLists;
