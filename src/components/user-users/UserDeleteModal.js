import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

const UserDeleteModal = ({ setModalHandler, userDelete }) => {
  return (
    <Container
      sx={{
        backgroundColor: '#ffffff',
        display: 'block',
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '30%',
        borderRadius: '15px',
        border: '2px solid #000000',
        width: '600px',
        height: 'auto',
        zIndex: '99999',
      }}
    >
      <Box
        sx={{
          m: 0,
          pt: 3,
          pb: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
          }}
        >
          회원 탈퇴
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
          회원 탈퇴를 진행하시겠습니까?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            color: '#ff0000',
          }}
        >
          탈퇴할 경우 철회되지 않은 위탁 물품은
          <br />
          자동으로 <strong>본 플랫폼에 귀속</strong>됩니다.
        </Typography>
        <br />
        <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
          탈퇴 시 회원님의 모든 정보는 <strong>즉시 삭제</strong>되며,
          <br />
          복구가 <strong>불가능</strong>합니다.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 3,
          }}
        >
          <Button
            onClick={() => {
              setModalHandler(false);
            }}
            variant="contained"
            sx={{
              width: '80px',
              height: '35px',
              borderRadius: '10px',
              border: '1px solid #000000',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1rem',
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#000000',
              },
            }}
          >
            닫기
          </Button>
          <Button
            onClick={userDelete}
            variant="contained"
            sx={{
              ml: 2,
              width: '80px',
              height: '35px',
              borderRadius: '10px',
              border: '1px solid #000000',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1rem',
              backgroundColor: '#f5b8b8',
              '&:hover': {
                backgroundColor: 'tomato',
                color: '#ffffff',
              },
            }}
          >
            탈퇴
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserDeleteModal;
