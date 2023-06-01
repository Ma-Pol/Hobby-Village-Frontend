import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Button } from '@mui/material';
import UserMypageAddressRows from '../../components/user-mypage/UserMypageAddress/UserMypageAddressRows.js';

const MyPagesAddressesLists = () => {
  const { email } = useParams();
  const [addressList, setAddressList] = useState([]); // 배송지 목록
  const mypageRow = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const mypageCategoryRow = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  // 배송지 조회
  useEffect(() => {
    getAddressList();
  }, [email]);

  const getAddressList = () => {
    axios
      .get(`/mypages/${email}/addresses`)
      .then((detail) => {
        setAddressList(detail.data);
        console.log(detail.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useState(() => {});

  return (
    <Container>
      <Box>
        {/* My Page 등록 글씨 표기 시작 */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mt: 5,
            mb: 1,
            pl: 2,
            pr: 1,
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          My page
        </Typography>

        <Box sx={mypageRow}>
          <Box>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
              취미마스터
            </Typography>
            <div>회원정보 변경</div>
            <a href={`/mypages/${email}/addresses/lists`}>배송지 관리</a>
          </Box>

          {/* 마이페이지 카테고리 아이콘 */}
          <Box sx={{ width: '800px' }}>
            <Box sx={mypageCategoryRow}>
              <Box sx={{ width: '300px' }}>적립금 관리 &#62;</Box>
              <Box sx={{ width: '225px' }}>주문 내역 &#62;</Box>
              <Box sx={{ width: '225px' }}>리뷰 관리 &#62;</Box>
            </Box>
            <Box sx={mypageCategoryRow}>
              <Box sx={{ width: '300px' }}>쿠폰 관리 &#62;</Box>
              <Box sx={{ width: '225px' }}>찜 목록 &#62;</Box>
              <Box sx={{ width: '225px' }}>물품 판매/위탁 &#62;</Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        {/* 배송지 관리 글씨 표기 시작 */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mt: 5,
            mb: 1,
            pl: 2,
            pr: 1,
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          배송지 관리
        </Typography>

        <Box>
          {/* 배송지 목록 테이블 데이터 표기 시작 */}
          {addressList.length === 0 ? (
            // 배송지 데이터가 없을 경우
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
              배송지 데이터가 존재하지 않습니다.
            </Typography>
          ) : (
            // 배송지 데이터가 있을 경우
            addressList.map((address, index, row) => (
              <UserMypageAddressRows
                addressCode={address.addressCode}
                receiver={address.receiver}
                zipCode={address.zipCode}
                address1={address.address1}
                address2={address.address2}
                phone={address.phone}
                deliRequest={address.deliRequest}
                email={address.email}
                isDefault={address.isDefault}
                getAddressList={getAddressList}
                isLast={index + 1 === row.length} // 마지막 데이터인지 확인
              />
            ))
          )}
        </Box>
        {/* 배송지 목록 테이블 데이터 표기 끝 */}
      </Box>

      {/* 배송지 추가 버튼 */}
      <Button
        variant="contained"
        size="large"
        href={`/mypages/${email}/addresses/create`}
        sx={{
          mt: 1,
          mr: 1,
          width: '1100px',
          float: 'center',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          border: '1px solid #626262',
          '&:hover': {
            backgroundColor: '#c6c6c6',
            color: '#000000',
          },
        }}
      >
        + 배송지 추가
      </Button>
    </Container>
  );
};

export default MyPagesAddressesLists;
