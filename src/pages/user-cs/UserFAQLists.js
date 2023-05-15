import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { styled } from '@mui/system';
import UserHeader from '../../components/UserHeader';
import UserCsTitle from '../../components/user-cs/UserCsTitle';
import FaqSearchBar from '../../components/user-cs/FaqSearchBar';
import { Link } from 'react-router-dom';

const UserFAQLists = () => {
  const [faqs, setFaqs] = useState([]);
  const [filter, setFilter] = useState('none');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState('');

  const filters = [
    { name: '전체', value: 'none' },
    { name: '상품 문의', value: 'product' },
    { name: '로그인/정보', value: 'login-about' },
    { name: '판매/위탁', value: 'sell-consign' },
    { name: '결제', value: 'payment' },
    { name: '배송 문의', value: 'shipping' },
    { name: '기타', value: 'etc' },
  ];

  const StyledButton = styled(Button)(({ theme }) => ({
    color: '#000000',
    backgroundColor: '#ffffff',
    border: 'none',
    fontSize: '0.8rem',
    padding: '6px 12px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#C3C36A',
      color: '#000000',
    },
    '&.Mui-selected': {
      backgroundColor: '#C3C36A',
      color: '#000000',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#C3C36A',
    },
  }));

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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

  useEffect(() => {
    axios
      .get('/cs/faq', {
        params: {
          filter: filter,
          sort: 'faqCode DESC',
          pages: page,
        },
      })
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });

    axios
      .get('/cs/faq/count', {
        params: {
          filter: filter,
        },
      })
      .then((response) => {
        setCount(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [filter, page]);

  const handleSearch = () => {
    axios
      .get('/cs/faq', {
        params: {
          filter: filter,
          sort: 'faqCode DESC',
          pages: page,
          keyword: keyword,
        },
      })
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div style={{ maxWidth: '1150px', margin: 'auto' }}>
      <UserHeader />
      <UserCsTitle />
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        {filters.map((f) => (
          <StyledButton
            key={f.value}
            onClick={() => setFilter(f.value)}
            selected={filter === f.value}
          >
            {f.name}
          </StyledButton>
        ))}
      </Box>
      <StyledTableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableHeadRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">카테고리</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">날짜</TableCell>
            </StyledTableHeadRow>
          </TableHead>
          <TableBody>
            {faqs.map((row, index) => (
              <StyledTableRow key={index}>
                <TableCell align="center">{row.faqCode}</TableCell>
                <TableCell align="center">{row.faqCategory}</TableCell>
                <TableCell align="center">
                  <StyledLink to={`/cs/faq/details/${row.faqCode}`}>
                    {row.faqTitle}
                  </StyledLink>
                </TableCell>
                <TableCell align="center">{row.faqDate}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Box display="flex" justifyContent="center" m={2}>
        <Pagination
          count={Math.ceil(count / 10)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Box display="flex" justifyContent="center" m={4}>
        <FaqSearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
        />
      </Box>
    </div>
  );
};

export default UserFAQLists;
