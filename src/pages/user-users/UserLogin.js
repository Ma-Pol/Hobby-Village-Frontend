import React from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';

const UserLogin = () => {
  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    if (
      emailRef.current.value === null ||
      emailRef.current.value === '' ||
      emailRef.current.value === undefined
    ) {
      alert('이메일을 입력해주세요.');
      emailRef.current.focus();
      return false;
    }
    if (
      passwordRef.current.value === null ||
      passwordRef.current.value === '' ||
      passwordRef.current.value === undefined
    ) {
      alert('비밀번호를 입력해주세요.');
      passwordRef.current.focus();
      return false;
    }

    axios
      .post('/loginCheck', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.data.nickname !== '취미빌리지') {
          window.sessionStorage.setItem(
            'hobbyvillage-email',
            emailRef.current.value
          );
          window.sessionStorage.setItem(
            'hobbyvillage-usernickname',
            res.data.nickname
          );
          window.sessionStorage.setItem(
            'hobbyvillage-profile',
            res.data.profPicture
          );
          navigate('/');
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
          emailRef.current.focus();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const inputStyle = {
    my: 1,
    width: '450px',
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
  };

  if (email !== null) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <UserHeader />
      <Container
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            mt: '50px',
            mb: '50px',
          }}
        >
          로그인
        </Typography>

        <Box>
          <TextField
            label="이메일"
            variant="standard"
            autoFocus
            inputRef={emailRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                passwordRef.current.focus();
              }
            }}
            sx={inputStyle}
          />
        </Box>

        <Box>
          <TextField
            label="비밀번호"
            type="password"
            variant="standard"
            inputRef={passwordRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            sx={inputStyle}
          />
        </Box>

        <Box
          sx={{
            m: 0,
            mt: 5,
            mb: 10,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/signup`);
            }}
            sx={{
              mr: 3,
              width: '170px',
              height: '45px',
              borderRadius: '10px',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#000000',
              },
            }}
          >
            회원가입
          </Button>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              ml: 3,
              width: '170px',
              height: '45px',
              borderRadius: '10px',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              backgroundColor: '#c3c36a',
              '&:hover': {
                backgroundColor: '#c3c36a',
                color: '#ffffff',
              },
            }}
          >
            로그인
          </Button>
        </Box>
      </Container>
      <UserFooter />
    </>
  );
};

export default UserLogin;
