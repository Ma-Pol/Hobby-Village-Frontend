import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  InputLabel,
  TextField,
  MenuItem,
  Button,
  InputAdornment
} from '@mui/material';

const AdminCouponsDetails = () => {
  const couponNameRef = useRef();
  const couponTypeRef = useRef();
  const discountPerRef = useRef();
  const discountFixRef = useRef();
  const startDateRef = useRef();
  const deadlineRef = useRef();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const tableHeadStyle = {
    width: 200,
    border: '1px solid #FFFFFF'
  };

  const tableBodyStyle = { width: 500, border: '1px solid #FFFFFF' };

  const inputLabelStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000'
  };

  const inputReadOnlyStyle = {
    width: 500,
    '& .MuiInputBase-input': {
      overflow: 'visible'
    },
    '& fieldset': {
      border: 'none'
    },
    input: { color: '#000000', fontSize: 20, padding: 0 }
  };

  const btnDeleteStyle = {
    width: '65px',
    height: '35px',
    bgcolor: '#F5B8B8',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#FE8484',
      border: '1px solid #626262',
      color: '#000000'
    }
  };

  const btnCancelStyle = {
    width: '65px',
    height: '35px',
    bgcolor: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#ffffff',
      border: '1px solid #626262',
      color: '#000000'
    }
  };

  return (
    <Container>
      {/* 타이틀 */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 5,
          mb: 5,
          pl: 1,
          pr: 1,
          fontWeight: 'bold'
        }}
      >
        쿠폰 목록 &#62; 쿠폰 상세
      </Typography>
      {/* form 시작 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <TableContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Table sx={{ width: 800 }}>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="couponName" sx={inputLabelStyle}>
                  쿠폰명
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="couponName"
                  size="small"
                  ref={couponNameRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true
                  }}
                  value="[2023] 봄 맞이 기념 할인 쿠폰"
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="couponType" sx={inputLabelStyle}>
                  할인 종류
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="couponType"
                  size="small"
                  ref={couponTypeRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true
                  }}
                  value="퍼센트"
                >
                  <MenuItem key={0} value={0}>
                    할인 종류 선택
                  </MenuItem>
                  <MenuItem key="퍼센트" value="퍼센트">
                    퍼센트
                  </MenuItem>
                  <MenuItem key="고정금액" value="고정금액">
                    고정 금액
                  </MenuItem>
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="discountNum" sx={inputLabelStyle}>
                  할인 금액
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="discountNum"
                  size="small"
                  // ref= : 할인 종류 선택 값에 따라 ref 달라짐
                  sx={inputReadOnlyStyle}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">&#8361;</InputAdornment>
                  //   ),
                  // }} : 할인종류 선택값에 따라 원화 기호 (position start) 또는 퍼센트 기호 (position end) 변경
                  value="15%"
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="startDate" sx={inputLabelStyle}>
                  발행일
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="couponName"
                  size="small"
                  ref={startDateRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true
                  }}
                  value="2023-03-26"
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="deadline" sx={inputLabelStyle}>
                  종료일
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="deadline"
                  size="small"
                  ref={deadlineRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true
                  }}
                  value="2023-04-26"
                ></TextField>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        {/* 하단 버튼 */}
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          mt={5}
        >
          <Button variant="outlined" sx={btnDeleteStyle}>
            삭제
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="outlined" onClick={handleGoBack} sx={btnCancelStyle}>
            목록
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminCouponsDetails;
