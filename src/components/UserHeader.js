import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  InputBase,
  Avatar,
  Box,
  Container,
} from '@mui/material';
import { styled, alpha } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Search = styled('div')({
  position: 'relative',
  borderRadius: '12px',
  border: '1px solid #000000',
  backgroundColor: alpha('#ffffff', 0.15),
  marginRight: '2rem',
  width: 'auto',
});

const SearchInput = styled(InputBase)({
  color: '#000000',
  '& > input': {
    padding: '12px 20px 12px 20px',
    height: '15px',
    width: '230px',
  },
});

const BlackTextTypography = styled(Typography)({
  color: '#000000',
});

const SmallTextTypography = styled(Typography)({
  fontSize: '0.75rem',
  color: '#000000',
});

// 임시 이미지
const profileImageUrl = 'https://via.placeholder.com/150';

function UserHeader() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기
  const nickname = sessionStorage.getItem('hobbyvillage-usernickname'); // 닉네임을 세션에서 가져오기
  const profPicture = sessionStorage.getItem('hobbyvillage-profile'); // 프로필 사진명을 세션에서 가져오기

  return (
    <>
      <Container>
        <Box
          sx={{
            mt: 1,
            pb: 2,
            width: '1150px',
            height: '90px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            userSelect: 'none',
          }}
        >
          {/* 로그인/로그아웃 고객센터 링크 시작 */}
          <Box
            sx={{
              height: '20px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
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
          {/* 로그인/로그아웃 고객센터 링크 끝 */}

          {/* 로고, 내비, 검색창, 장바구니, 닉네임, 프로필 사진 시작 */}
          <Box
            sx={{
              height: '70px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            {/* 로고, 내비 시작 */}
            <Box
              sx={{
                height: '60px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '160px',
                }}
              >
                <BlackTextTypography
                  style={{
                    color: '#C3C36A',
                    fontWeight: 900,
                    fontSize: '1.5rem',
                    marginRight: '2rem',
                    textShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
                  }}
                  variant="h6"
                >
                  취미빌리지
                </BlackTextTypography>
              </Link>

              <Box
                sx={{
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  width: '400px',
                }}
              >
                <Button
                  component={Link}
                  to="/products/lists"
                  style={{
                    height: '50px',
                    margin: '0 1rem 0 1rem',
                    color: '#000000',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                  disableRipple
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  취미 물품
                </Button>
                <Button
                  component={Link}
                  to="/products/brand/lists"
                  style={{
                    height: '50px',
                    margin: '0 1rem 0 1rem',
                    color: '#000000',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                  disableRipple
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  브랜드관
                </Button>
                <Button
                  component={Link}
                  to="/recommend"
                  style={{
                    height: '50px',
                    margin: '0 1rem 0 1rem',
                    color: '#000000',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                  disableRipple
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  내 취미 찾기
                </Button>
              </Box>
            </Box>
            {/* 로고, 내비 끝 */}

            {/* 검색창, 장바구니, 닉네임, 프로필 사진 시작 */}
            <Box
              sx={{
                height: '46px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '550px',
              }}
            >
              {/* 검색창 시작 */}
              <Search>
                <SearchInput
                  placeholder="물품 또는 취미를 검색해보세요"
                  style={{ color: '#3a3a3a' }}
                />
              </Search>
              {/* 검색창 끝 */}

              {/* 장바구니 시작 */}
              {email !== null && (
                <Link
                  to={`/carts/${email}/lists/all`}
                  style={{ textDecoration: 'none', marginRight: '1rem' }}
                >
                  <ShoppingCartIcon style={{ color: '#000000' }} />
                </Link>
              )}

              {/* 장바구니 끝 */}

              {/* 닉네임 시작 */}
              <Link
                to={email !== null ? `/mypages/${email}/orders` : '/login'}
                style={{
                  textDecoration: 'none',
                  marginRight: '1rem',
                  maxWidth: '150px',
                }}
              >
                <BlackTextTypography
                  title={nickname !== null && nickname}
                  variant="subtitle1"
                  sx={{
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {nickname !== null && nickname}
                </BlackTextTypography>
              </Link>

              {/* 닉네임 끝 */}

              {/* 프로필 사진 시작 */}
              <Link
                to={email !== null ? `/mypages/${email}/orders` : '/login'}
                style={{ textDecoration: 'none' }}
              >
                <Avatar
                  src={
                    profPicture !== null &&
                    'http://localhost:8080/profPicture/' + profPicture
                  }
                />
              </Link>
              {/* 프로필 사진 끝 */}
            </Box>
            {/* 검색창, 장바구니, 닉네임, 프로필 사진 끝 */}
          </Box>
          {/* 로고, 내비, 검색창, 장바구니, 닉네임, 프로필 사진 끝 */}
        </Box>
      </Container>
      <Box
        sx={{
          mb: '10px',
          borderBottom: '1px solid #BCB5B5',
        }}
      />
    </>
  );
}

export default UserHeader;
