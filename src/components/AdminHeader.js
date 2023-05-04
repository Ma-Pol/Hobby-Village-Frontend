import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  borderBottom: '1px solid #BCB5B5',
  marginBottom: '1rem',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '1150px',
  margin: '0 auto',
  width: '100%',
  padding: '1.5rem 1rem 0.5rem 1rem',
});

const MenuItems = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const BlackTextTypography = styled(Typography)({
  color: '#000000',
});

const UserInfo = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  right: '2rem',
});

const SmallTextTypography = styled(Typography)({
  fontSize: '0.75rem',
  color: '#000000',
});

function AdminHeader() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <MenuItems>
          <Link to="/m" style={{ textDecoration: 'none' }}>
            <BlackTextTypography
              style={{
                color: '#C3C36A',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                marginRight: '4rem',
              }}
              variant="h6"
            >
              관리자 페이지
            </BlackTextTypography>
          </Link>
          <Button
            component={Link}
            to="/m/users/lists?sort=-userCode&pages=1"
            style={{
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
            회원
          </Button>
          <Button
            component={Link}
            to="/m/coupons"
            style={{
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
            쿠폰
          </Button>
          <Button
            component={Link}
            to="/m/products"
            style={{
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
            상품목록
          </Button>
          <Button
            component={Link}
            to="/m/orders"
            style={{
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
            주문
          </Button>
          <Button
            component={Link}
            to="/m/reviews"
            style={{
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
            리뷰
          </Button>
          <Button
            component={Link}
            to="/m/requests"
            style={{
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
            물품 판매/위탁
          </Button>
          <Button
            component={Link}
            to="/m/notices"
            style={{
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
            공지사항
          </Button>
          <Button
            component={Link}
            to="/m/faqs/lists?sort=-faqDate&filter=none&pages=1"
            style={{
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
            FAQ
          </Button>
          <Button
            component={Link}
            to="/m/qnas"
            style={{
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
            1:1 문의
          </Button>
        </MenuItems>
        <BlackTextTypography
          variant="subtitle1"
          style={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
          }}
        >
          관리자01
        </BlackTextTypography>
        <UserInfo>
          <SmallTextTypography>로그아웃</SmallTextTypography>
        </UserInfo>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default AdminHeader;
