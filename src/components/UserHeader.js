import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Avatar, Box, Container, TextField } from '@mui/material';
import { styled } from '@mui/system';

const BlackTextTypography = styled(Typography)({
  color: '#000000',
});

const SmallTextTypography = styled(Typography)({
  fontSize: '0.75rem',
  color: '#000000',
});

const UserHeader = () => {
  const navigate = useNavigate();

  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기
  const nickname = sessionStorage.getItem('hobbyvillage-usernickname'); // 닉네임을 세션에서 가져오기
  const profPicture = sessionStorage.getItem('hobbyvillage-profile'); // 프로필 사진명을 세션에서 가져오기

  const searchRef = useRef();
  const [searchMode, setSearchMode] = useState(false);

  return (
    <>
      <Container
        sx={{
          userSelect: 'none',
        }}
      >
        {/* 헤더 전체 시작 */}
        <Box
          sx={{
            mt: 1,
            pb: 2,
            width: '1150px',
            height: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            userSelect: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 로그인/로그아웃, 고객센터 시작 */}
          <Box
            sx={{
              height: '20px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              position: 'absolute',
              top: '0',
              right: '0',
            }}
          >
            <SmallTextTypography
              onClick={() => {
                if (email !== null) {
                  if (window.confirm('로그아웃 하시겠습니까?')) {
                    sessionStorage.removeItem('hobbyvillage-email');
                    sessionStorage.removeItem('hobbyvillage-usernickname');
                    sessionStorage.removeItem('hobbyvillage-profile');
                    navigate('/login');
                  }
                } else {
                  navigate('/login');
                }
              }}
              sx={{
                mr: 2,
                '&:hover': {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                },
              }}
            >
              {email !== null ? '로그아웃' : '로그인'}
            </SmallTextTypography>

            <Link
              to="/cs/faq/lists?filter=none&pages=1"
              style={{ textDecoration: 'none' }}
            >
              <SmallTextTypography
                sx={{
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                고객센터
              </SmallTextTypography>
            </Link>
          </Box>
          {/* 로그인/로그아웃, 고객센터 끝 */}

          {/* 헤더 좌측부 - 취미 물품, 브랜드관, 내 취미 찾기 시작 */}
          <Box
            sx={{
              pr: '50px',
              width: '350px',
              height: '60px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              to="/products/lists?category=all&sort=all&array=recent&pages=1"
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#000000',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#c3c36a',
                  },
                }}
              >
                취미 물품
              </Typography>
            </Link>

            <Link
              to="/products/brand/lists?brand=all&sort=all&array=recent&pages=1"
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#000000',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#c3c36a',
                  },
                }}
              >
                브랜드관
              </Typography>
            </Link>

            <Link
              to="/recommend"
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#000000',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#c3c36a',
                  },
                }}
              >
                내 취미 찾기
              </Typography>
            </Link>
          </Box>
          {/* 헤더 좌측부 - 취미 물품, 브랜드관, 내 취미 찾기 끝 */}

          {/* 헤더 중앙부 - 로고 시작 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              onClick={() => {
                navigate('/');
              }}
              component="img"
              src={`${process.env.PUBLIC_URL}/headers/Hobby-Village.png`}
              sx={{
                width: '300px',
                cursor: 'pointer',
              }}
            />
          </Box>
          {/* 헤더 중앙부 - 로고 끝 */}

          {/* 헤더 우측부 - 검색, 장바구니, 닉네임, 프로필 사진 시작 */}
          <Box
            sx={{
              pl: '50px',
              width: '350px',
              height: '60px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* 검색 아이콘, 검색바 시작 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Box
                onClick={() => {
                  if (searchMode) {
                    setSearchMode(false);
                  } else {
                    searchRef.current.value = '';
                    setSearchMode(true);
                  }
                }}
                sx={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/headers/SearchIcon.png)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  mr: '15px',
                  width: '25px',
                  height: '25px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundImage: searchMode
                      ? `url(${process.env.PUBLIC_URL}/headers/SearchIconClose.gif)`
                      : `url(${process.env.PUBLIC_URL}/headers/SearchIconOpen.gif)`,
                  },
                }}
              />

              {/* 검색창 시작 */}
              <TextField
                variant="standard"
                inputRef={searchRef}
                placeholder="물품 또는 취미를 검색해보세요"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(
                      `/products/lists/search?sort=all&array=recent&keyword=${searchRef.current.value}&pages=1`
                    );
                  }
                }}
                sx={{
                  width: searchMode ? '300px' : '0px',
                  transition: 'all 0.4s',
                  '& .MuiInput-root': {
                    '&:after': {
                      borderBottom: '2px solid #c3c36a',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#c3c36a',
                    },
                  },
                }}
              />
            </Box>
            {/* 검색 아이콘, 검색바 끝 */}

            {/* 장바구니, 닉네임, 프로필 사진 시작 */}
            <Box
              sx={{
                width: '320px',
                transition: 'all 0.4s',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'absolute',
                right: !searchMode ? '0px' : '-320px',
              }}
            >
              {email !== null && (
                <Link
                  to={`/carts/${email}/lists/all`}
                  style={{
                    textDecoration: 'none',
                    marginRight: '2rem',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#000000',
                      transition: 'all 0.2s',
                      '&:hover': {
                        color: '#c3c36a',
                      },
                    }}
                  >
                    장바구니
                  </Typography>
                </Link>
              )}
              <Link
                to={
                  email !== null
                    ? `/mypages/${email}/orders?odrState=payment-completed`
                    : '/login'
                }
                style={{
                  textDecoration: 'none',
                  marginRight: '1rem',
                  maxWidth: '140px',
                }}
              >
                <BlackTextTypography
                  title={nickname !== null && nickname}
                  variant="subtitle1"
                  sx={{
                    maxWidth: '150px',
                    fontSize: '16px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: '#c3c36a',
                    },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {nickname !== null && nickname}
                </BlackTextTypography>
              </Link>
              <Link
                to={
                  email !== null
                    ? `/mypages/${email}/orders?odrState=payment-completed`
                    : '/login'
                }
                style={{ textDecoration: 'none' }}
              >
                <Avatar
                  src={
                    profPicture !== null
                      ? 'http://localhost:8080/profPicture/' + profPicture
                      : `${process.env.PUBLIC_URL}/assets/photo.png`
                  }
                />
              </Link>
            </Box>
            {/* 장바구니, 닉네임, 프로필 사진 끝 */}
          </Box>
          {/* 헤더 우측부 - 검색, 장바구니, 닉네임, 프로필 사진 끝 */}
        </Box>
        {/* 헤더 전체 끝 */}
      </Container>
      <Box
        sx={{
          // mb: '5px',
          borderBottom: '1px solid #d5d5d5',
        }}
      />
    </>
  );
};

export default UserHeader;
