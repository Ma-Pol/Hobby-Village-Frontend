import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  linkText: {
    color: '#555555',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const UserFooter = () => {
  const mainText = {
    color: '#000000',
    fontSize: '1.1rem',
    marginBottom: '7px',
  };

  const linkText = {
    color: '#555555',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  };

  return (
    <>
      <Box
        sx={{
          // mt: '5px',
          mb: 2,
          borderTop: '1px solid #d5d5d5',
        }}
      />
      <Container
        sx={{
          userSelect: 'none',
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: '1150px',
            height: '100px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* 서비스 명 시작 */}
          <Box sx={{ m: 0 }}>
            <Typography variant="body1" sx={mainText}>
              Hobby Village
            </Typography>
          </Box>
          {/* 서비스 명 끝 */}

          {/* 팀 정보 시작 */}
          <Box sx={{ m: 0, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1" sx={mainText}>
              ABOUT TEAM
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#444444',
              }}
            >
              김지훈&nbsp;&nbsp;&nbsp;&nbsp;노현진
              <br />
              배효능&nbsp;&nbsp;&nbsp;&nbsp;이승현
              <br />
              이준영&nbsp;&nbsp;&nbsp;&nbsp;이진영
            </Typography>
          </Box>
          {/* 팀 정보 끝 */}

          {/* 사용자 서비스 시작 */}
          <Box sx={{ m: 0, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1" sx={mainText}>
              CUSTOMER SERVICE
            </Typography>

            <Link to="/notices/lists?filter=none&pages=1" style={linkText}>
              <Typography
                variant="body2"
                sx={{
                  color: '#444444',
                }}
              >
                공지사항
              </Typography>
            </Link>

            <Link
              to="/guide"
              style={linkText}
              onClick={() => {
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#444444',
                }}
              >
                구독 서비스 안내
              </Typography>
            </Link>
            <a
              href="mailto:hobbyvillage@example.com"
              target="_blank"
              rel="noopener noreferrer"
              style={linkText}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#444444',
                }}
              >
                입점ㆍ제휴ㆍ광고문의
              </Typography>
            </a>
          </Box>
          {/* 사용자 서비스 끝 */}

          {/* CONTACT 시작 */}
          <Box sx={{ m: 0, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1" sx={mainText}>
              CONTACT US
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#444444',
              }}
            >
              TEL) 1544-1234
            </Typography>
          </Box>
          {/* CONTACT 끝 */}
        </Box>
      </Container>
    </>
  );
};

export default UserFooter;
