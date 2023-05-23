import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';

const AdminLogin = () => {
  const idRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력해주세요.');
      idRef.current.focus();
      return false;
    }
    if (
      passwordRef.current.value === '' ||
      passwordRef.current.value === undefined
    ) {
      alert('비밀번호를 입력해주세요.');
      passwordRef.current.focus();
      return false;
    }

    axios
      .post('/m/loginCheck', {
        id: idRef.current.value,
        password: passwordRef.current.value,
      })
      .then((nickname) => {
        if (nickname.data !== 'disabled') {
          window.sessionStorage.setItem('hobbyvillage-id', idRef.current.value);
          window.sessionStorage.setItem('hobbyvillage-nickname', nickname.data);
          navigate('/m');
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const inputBoxStyle = {
    my: 3,
    width: '70%',
    '& .MuiInput-root': {
      '&:after': {
        borderBottom: '2px solid #c3c36a',
      },
    },
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          mt: 8,
          p: 3,
          width: '400px',
          height: 'auto',
          border: '1px solid #000000',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 5, fontWeight: 'bold' }}>
          로그인
        </Typography>
        <TextField
          variant="standard"
          autoFocus
          placeholder="아이디"
          inputRef={idRef}
          sx={inputBoxStyle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              passwordRef.current.focus();
            }
          }}
        />
        <TextField
          type="password"
          variant="standard"
          placeholder="비밀번호"
          inputRef={passwordRef}
          sx={inputBoxStyle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 5,
            mb: 2,
            width: '170px',
            height: '45px',
            borderRadius: '10px',
            border: '1px solid #626262',
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
  );
};

export default AdminLogin;
