import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';

// Styled Link component
const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: '#797979',
  '&.active': {
    color: '#C3C36A',
    textDecoration: 'underline',
  },
}));

const UserCsTitle = () => {
  // const email = sessionStorage.getItem('email'); // 이메일을 세션에서 가져오기
  const email = 'bae@naver.com'; // 테스트용 임시 메일
  const location = useLocation(); // 현재 URL 위치 확인
  const pathName = location.pathname.split('/')[2];

  // 페이지에 따라 색상 결정
  const isFaqPage = pathName === 'faq';
  const isQnaPage = pathName === 'qna';

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}
      >
        <Toolbar
          sx={{
            maxWidth: 1150,
            width: '100%',
            margin: '0 auto',
            justifyContent: 'space-between',
            padding: '16px 0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 'bold', color: 'black', marginRight: 2 }}
            >
              고객센터
            </Typography>
            <PhoneIcon sx={{ color: 'black' }} />
            <Typography variant="h6" sx={{ color: 'black', marginLeft: 1 }}>
              1544-1234
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <hr
        style={{
          borderTop: '0.5px solid #BCB5B5',
          width: '1150px',
          margin: '0 auto',
          marginTop: '-8px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: 5,
          alignItems: 'center',
        }}
      >
        <StyledLink
          to="/cs/faq/lists?filter=none&pages=1"
          className={isFaqPage ? 'active' : ''}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: 3 }}>
            FAQ 자주 묻는 질문
          </Typography>
        </StyledLink>
        <hr
          style={{
            borderTop: '0.5px solid #BCB5B5',
            height: '30px',
            margin: '0 20px',
          }}
        />
        <StyledLink
          to={`/cs/qna/${email}/lists?filter=none&pages=1`}
          className={isQnaPage ? 'active' : ''}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginLeft: 3 }}>
            1:1 문의
          </Typography>
        </StyledLink>
      </Box>
    </>
  );
};

export default UserCsTitle;
