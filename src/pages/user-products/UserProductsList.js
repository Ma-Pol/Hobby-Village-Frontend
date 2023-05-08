import React from 'react';
import { Box, TextField } from '@mui/material';

const UserProductsList = () => {
  return (
    <Box>
      <Box name="category">
        <TextField>전체</TextField>
        <TextField>등산 수영 웨이트 캠핑 테니스 뜨개 사진 악기 기타</TextField>
      </Box>
      <Box name="filter"></Box>
      <Box name="produccts"></Box>
    </Box>
  );
};

export default UserProductsList;
