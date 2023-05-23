import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  footerContainer: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    padding: '1rem',
    width: '1150px',
    marginTop: '0.3rem',
    marginLeft: '15rem',
  },
  line: {
    borderTop: '1px solid #BCB5B5',
    marginTop: '10px',
  },
  left: {
    textAlign: 'left',
  },
  middle: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'left',
  },
  phoneIcon: {
    verticalAlign: 'bottom',
    marginRight: '0.3rem',
  },
  textColor: {
    color: '#555555',
    textDecoration: 'none',
  },
  linkText: {
    color: '#555555',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const UserFooter = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.line} />
      <Container
        sx={{
          mt: 2,
          mb: 5,
          userSelect: 'none',
        }}
      >
        <Box
          sx={{
            mx: 'auto',
            width: '950px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '200px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                mr: 1,
              }}
            >
              <Typography variant="body2" className={classes.textColor}>
                취미빌려조
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  mr: 1,
                }}
              >
                <Typography variant="body2" className={classes.textColor}>
                  김지훈
                </Typography>
                <Typography variant="body2" className={classes.textColor}>
                  배효능
                </Typography>
                <Typography variant="body2" className={classes.textColor}>
                  이준영
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" className={classes.textColor}>
                  노현진
                </Typography>
                <Typography variant="body2" className={classes.textColor}>
                  이승현
                </Typography>
                <Typography variant="body2" className={classes.textColor}>
                  이진영
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: '200px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              to="/notices/lists?filter=none&pages=1"
              className={classes.linkText}
            >
              <Typography variant="body2">공지사항</Typography>
            </Link>
            <Link to="/guide" className={classes.linkText}>
              <Typography variant="body2">구독 서비스 안내</Typography>
            </Link>
            <a
              href="mailto:hobbyvillage@example.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.textColor}
            >
              <Typography variant="body2" className={classes.linkText}>
                입점ㆍ제휴ㆍ광고문의
              </Typography>
            </a>
          </Box>

          <Box
            sx={{
              width: '200px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              to="/cs/faq/lists?filter=none&pages=1"
              className={classes.linkText}
            >
              <Typography variant="body2">고객센터</Typography>
            </Link>
            <Typography variant="body2" className={classes.textColor}>
              <PhoneIcon className={classes.phoneIcon} />
              1544-1234
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UserFooter;
