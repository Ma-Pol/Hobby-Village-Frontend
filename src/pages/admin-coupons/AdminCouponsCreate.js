import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  InputAdornment,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const AdminCouponsCreate = () => {
  const couponNameRef = useRef();
  const couponTypeRef = useRef();
  const discountRef = useRef();
  const deadlineRef = useRef();

  const navigate = useNavigate();

  // 쿠폰 등록
  const handleSubmit = () => {
    if (couponTypeRef.current.value == '고정금액') {
      axios
        .post('/m/coupons/addCouponFix', {
          couponName: couponNameRef.current.value,
          discountPer: 0,
          discountFix: discountRef.current.value,
          deadline: deadlineRef.current.value,
        })
        .then((res) => {
          navigate(`/m/coupons/lists?sort=-startDate&filter=none&pages=1`);
        })
        .catch((e) => {
          console.log(couponNameRef.current.value);
          console.error(e);
        });
    } else {
      axios
        .post('/m/coupons/addCouponPer', {
          couponName: couponNameRef.current.value,
          discountPer: discountRef.current.value,
          discountFix: 0,
          deadline: deadlineRef.current.value,
        })
        .then((res) => {
          navigate(`/m/coupons/lists?sort=-startDate&filter=none&pages=1`);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const tableHeadStyle = {
    width: 200,
    border: '1px solid #FFFFFF',
  };

  const tableBodyStyle = { width: 500, border: '1px solid #FFFFFF' };

  const inputLabelStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  };

  const inputCouponNameStyle = {
    width: 500,
    '& .MuiFormLabel-root': {
      color: '#bbbbbb',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: '#c3c36a',
      },
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#c3c36a',
    },
  };

  const inputStyle = {
    width: 200,
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: '#c3c36a',
      },
    },
    '& .MuiFormLabel-root': {
      color: '#bbbbbb',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#c3c36a',
    },
  };

  const datePickerStyle = {
    '& .MuiInputBase-input': {
      width: '120px',
      height: '20px',
      padding: '10px 15px',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: '#c3c36a',
      },
    },
  };

  const btnSubmitStyle = {
    width: '65px',
    height: '35px',
    bgcolor: '#c3c36a',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#A9A951',
      border: '1px solid #626262',
      color: '#323232',
    },
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
      color: '#000000',
    },
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
          fontWeight: 'bold',
        }}
      >
        쿠폰 목록 &#62; 쿠폰 발행
      </Typography>
      {/* form 시작 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TableContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
                  inputRef={couponNameRef}
                  sx={inputCouponNameStyle}
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
                  select
                  label="할인 종류 선택"
                  size="small"
                  inputRef={couponTypeRef}
                  sx={inputStyle}
                >
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
                  fullWidth
                  size="small"
                  inputRef={discountRef}
                  sx={inputStyle}
                  label="숫자만 입력"
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="deadline"
                    inputRef={deadlineRef}
                    sx={datePickerStyle}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        {/* 하단 버튼 */}
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          mt={5}
        >
          <Button
            type="submit"
            variant="outlined"
            sx={btnSubmitStyle}
            onClick={handleSubmit}
          >
            발행
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="outlined" onClick={handleGoBack} sx={btnCancelStyle}>
            취소
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminCouponsCreate;
