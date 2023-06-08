import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Button } from '@mui/material';
import UserMypageAddressRows from '../../components/user-mypage/UserMypageAddress/UserMypageAddressRows.js';
import Loading from '../../components/Loading.js';

const MyPagesAddressesLists = () => {
  const [loading, setLoading] = useState(true);
  const { email } = useParams();
  const [addressList, setAddressList] = useState([]); // 배송지 목록

  // 배송지 조회
  useEffect(() => {
    getAddressList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const getAddressList = () => {
    axios
      .get(`/addresses/mypages/lists?email=${email}`)
      .then((list) => {
        setAddressList(list.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Container
        sx={{
          minHeight: '60vh',
          mt: '40px',
          userSelect: 'none',
          width: '1100px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            margin: '30px 0 20px 0',
          }}
        >
          배송지 관리
        </Typography>

        {loading ? (
          <Loading height={'30vh'} />
        ) : (
          <Box
            sx={{
              width: '1000px',
              mx: 'auto',
              mt: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* 배송지 목록 테이블 데이터 표기 시작 */}
            {addressList.map((address) => (
              <UserMypageAddressRows
                key={address.addressCode}
                address={address}
                getAddressList={getAddressList}
              />
            ))}

            {/* 배송지 추가 버튼 */}
            <Button
              variant="contained"
              size="large"
              href={`/mypages/${email}/addresses/create`}
              sx={{
                boxSizing: 'border-box',
                mt: '10px',
                mb: 10,
                width: '950px',
                height: '50px',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '1px solid #626262',
                borderRadius: '15px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#fafafa',
                  color: '#000000',
                },
              }}
            >
              + 배송지 추가
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default MyPagesAddressesLists;
