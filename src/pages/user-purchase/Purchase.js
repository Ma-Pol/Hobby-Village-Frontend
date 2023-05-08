import { Box, Container, TextField } from '@mui/material';
import React from 'react';

const Purchase = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          height: '40px',
          // mx: 'auto',
          my: '10px',
          pb: '10px',
          borderBottom: '1px solid #bcb5b5',
        }}
      ></Box>
      <Container
        sx={{
          width: '100px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            // width: '1100px',
            height: '40px',
            // mx: 'auto',
            my: '10px',
            pb: '10px',
            borderBottom: '1px solid #bcb5b5',
          }}
        >
          <TextField
            id="adminProductListKeyword"
            variant="standard"
            size="small"
            sx={{
              mx: 1,
              width: '400px',
              // outlined 인풋 박스 아웃라인 설정
              '& .MuiOutlinedInput-root': {
                // 기본 상태
                '& fieldset': {
                  border: '1px solid #0000ff',
                },
                // 마우스 호버 상태
                '&:hover fieldset': {
                  border: '1px solid #ff0000',
                },
                // 포커스 상태
                '&.Mui-focused fieldset': {
                  border: '1px solid #00ff00',
                },
              },
              // standard 인풋 박스 밑줄 설정
              '& .MuiInput-root': {
                // 기본 밑줄
                '&:before': {
                  borderBottom: '2px solid #0000ff',
                },
                // 마우스 호버 시 밑줄
                '&:hover:before': {
                  borderBottom: '2px solid #ff0000',
                },
                // 포커스 시 밑줄
                '&:after': {
                  borderBottom: '2px solid #00ff00',
                  transition: 'none', // 밑줄 애니메이션 제거할 때 사용
                },
              },
            }}
          />
        </Box>
      </Container>
    </Container>
  );
};

export default Purchase;
