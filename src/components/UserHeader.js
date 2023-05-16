import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Avatar,
  Box,
} from '@mui/material';
import { styled, alpha, display } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  borderBottom: 'none',
  marginBottom: '1rem',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '1150px',
  margin: '0',
  padding: '1.5rem 0 0 0',
});

const MenuItems = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  width: '1150px',
});

const Search = styled('div')({
  position: 'relative',
  borderRadius: '12px',
  backgroundColor: alpha('#000', 0.1),
  marginRight: '2rem',
  width: 'auto',
});

const SearchInput = styled(InputBase)({
  color: 'inherit',
  '& > input': {
    padding: '12px 20px 12px 20px',
    height: '15px',
    width: '230px',
  },
});

const BlackTextTypography = styled(Typography)({
  color: '#000000',
});

const UserInfo = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
  position: 'absolute',
  top: 0,
  right: '2rem',
});

const SmallTextTypography = styled(Typography)({
  fontSize: '0.75rem',
  color: '#000000',
});

// 임시 이미지
const profileImageUrl = 'https://via.placeholder.com/150';

function UserHeader() {
  const email = sessionStorage.getItem('email'); // 이메일을 세션에서 가져오기

  return (
    <>
      <Box
        sx={{
          mt: 1,
          mb: 2,
          pb: 2,
          width: '1150px',
          height: '90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          userSelect: 'none',
          borderBottom: '1px solid #BCB5B5',
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
            sx={{
              mr: 2,
            }}
          >
            로그아웃
          </SmallTextTypography>

          <Link
            to="/cs/faq/lists?filter=none&pages=1"
            style={{ textDecoration: 'none' }}
          >
            <SmallTextTypography>고객센터</SmallTextTypography>
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
            <Link
              to={`/carts/${email}/lists/all`}
              style={{ textDecoration: 'none', marginRight: '1rem' }}
            >
              <ShoppingCartIcon style={{ color: '#000000' }} />
            </Link>
            {/* 장바구니 끝 */}

            {/* 닉네임 시작 */}
            <Link
              to={`/mypages/${email}/orders`}
              style={{
                textDecoration: 'none',
                marginRight: '1rem',
                maxWidth: '150px',
              }}
            >
              <BlackTextTypography
                title="닉네임"
                variant="subtitle1"
                sx={{
                  maxWidth: '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                닉네임
              </BlackTextTypography>
            </Link>
            {/* 닉네임 끝 */}

            {/* 프로필 사진 시작 */}
            <Link
              to={`/mypages/${email}/orders`}
              style={{ textDecoration: 'none' }}
            >
              <Avatar alt="프로필" src={profileImageUrl} />
            </Link>
            {/* 프로필 사진 끝 */}
          </Box>
          {/* 검색창, 장바구니, 닉네임, 프로필 사진 끝 */}
        </Box>
        {/* 로고, 내비, 검색창, 장바구니, 닉네임, 프로필 사진 끝 */}
      </Box>
      {/* 
      <StyledAppBar position="static">
        <StyledToolbar>
          <MenuItems>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <BlackTextTypography
                style={{
                  color: '#C3C36A',
                  fontWeight: 900,
                  fontSize: '1.5rem',
                  // marginRight: '7rem',
                  textShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
                }}
                variant="h6"
              >
                취미빌리지
              </BlackTextTypography>
            </Link>
            
          </MenuItems>

          <MenuItems>
            <Search>
              <SearchInput
                placeholder="물품 또는 취미를 검색해보세요"
                inputProps={{ 'aria-label': 'search' }}
                style={{ color: '#333' }}
              />
            </Search>
            <Link
              to={`/carts/${email}/lists/all`}
              style={{ textDecoration: 'none' }}
            >
              <ShoppingCartIcon style={{ color: '#000000' }} />
            </Link>
            <Link
              to={`/mypages/${email}/orders`}
              style={{ textDecoration: 'none' }}
            >
              <BlackTextTypography variant="subtitle1">
                닉네임
              </BlackTextTypography>
            </Link>
            <Link
              to={`/mypages/${email}/orders`}
              style={{ textDecoration: 'none' }}
            >
              <Avatar alt="프로필 이미지" src={profileImageUrl} />
            </Link>
          </MenuItems>
          <UserInfo>
            <SmallTextTypography>로그아웃</SmallTextTypography>
            <Link
              to="/cs/faq/lists?filter=none&pages=1"
              style={{ textDecoration: 'none' }}
            >
              <SmallTextTypography>고객센터</SmallTextTypography>
            </Link>
          </UserInfo>
        </StyledToolbar>
      </StyledAppBar> */}
    </>
  );
}

export default UserHeader;
