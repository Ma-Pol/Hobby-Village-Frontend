import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import React from 'react';

// Styled Link component
const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: '#797979',
  '&.active': {
    color: '#C3C36A',
    textDecoration: 'underline',
  },
}));

const UserCsTitleBottom = () => {
  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기
  const location = useLocation(); // 현재 URL 위치 확인
  const pathName = location.pathname.split('/')[2];

  // 페이지에 따라 색상 결정
  const isFaqPage = pathName === 'faq';
  const isQnaPage = pathName === 'qna';

  return (
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
        onClick={() => {
          window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }}
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
        onClick={() => {
          window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginLeft: 3 }}>
          1:1 문의
        </Typography>
      </StyledLink>
    </Box>
  );
};

export default UserCsTitleBottom;
