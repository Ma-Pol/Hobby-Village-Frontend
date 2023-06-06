import React, { useRef, useState } from 'react';
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
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AdminCouponsCreate = () => {
  const couponNameRef = useRef();
  const discountRef = useRef();
  const [currentCouponType, setCurrentCouponType] = useState('none');
  const [deadline, setDeadline] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (couponNameRef.current.value === '') {
      alert('쿠폰 명을 입력해주세요.');
      couponNameRef.current.focus();
      return false;
    }

    if (currentCouponType === 'none') {
      alert('쿠폰 타입을 선택해주세요.');
      return false;
    }

    if (discountRef.current.value === '') {
      alert('할인 금액을 입력해주세요.');
      discountRef.current.focus();
      return false;
    }

    if (window.confirm('쿠폰을 등록하시겠습니까?')) {
      createCoupon();
    }
  };

  // 쿠폰 등록
  const createCoupon = () => {
    const submitData = {
      couponName: couponNameRef.current.value,
      discountPer:
        currentCouponType === '퍼센트' ? discountRef.current.value : 0,
      discountFix:
        currentCouponType === '고정 금액' ? discountRef.current.value : 0,
      deadline: deadline,
    };

    axios
      .post('/m/coupons/addCoupon', submitData)
      .then((res) => {
        navigate(`/m/coupons/lists?sort=-startDate&filter=none&pages=1`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCouponTypeChange = (e) => {
    setCurrentCouponType(e.target.value);
    discountRef.current.value = '';
  };

  const discountNumCheck = () => {
    const discountNum = discountRef.current.value;

    if (currentCouponType === 'none') {
      alert('먼저 쿠폰 타입을 선택해주세요.');
      discountRef.current.value = '';
    }

    if (!/[^0-9]|^0/gi.test(discountNum)) {
      if (discountNum > 100 && currentCouponType === '퍼센트') {
        alert('할인 금액은 100%를 초과할 수 없습니다.');
        discountRef.current.value = 100;
      }
    } else {
      discountRef.current.value = discountNum.replace(/[^0-9]|^0/gi, '');
    }
  };

  const handleDeadlineChange = (value) => {
    setDeadline(value);
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
    backgroundColor: '#c3c36a',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#A9A951',
      border: '1px solid #626262',
      color: '#323232',
    },
  };

  const btnCancelStyle = {
    width: '65px',
    height: '35px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#ffffff',
      border: '1px solid #626262',
      color: '#000000',
    },
  };

  return (
    <Container sx={{ userSelect: 'none' }}>
      {/* 타이틀 */}
      <Typography
        variant="h4"
        component="h4"
        sx={{
          mt: 5,
          mb: 5,
          pl: 1,
          pr: 1,
          fontWeight: 'bold',
          fontSize: '3vh',
        }}
      >
        쿠폰 목록 &gt; 발행
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
                <InputLabel htmlFor="couponName" sx={inputLabelStyle}>
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
                <InputLabel htmlFor="couponType" sx={inputLabelStyle}>
                  쿠폰 타입
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="couponType"
                  value={currentCouponType}
                  onChange={handleCouponTypeChange}
                  select
                  size="small"
                  sx={inputStyle}
                >
                  <MenuItem value="none" disabled>
                    쿠폰 타입 선택
                  </MenuItem>
                  <MenuItem value="퍼센트">퍼센트</MenuItem>
                  <MenuItem value="고정 금액">고정 금액</MenuItem>
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel htmlFor="discountNum" sx={inputLabelStyle}>
                  할인 금액
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="discountNum"
                  fullWidth
                  size="small"
                  onChange={discountNumCheck}
                  inputRef={discountRef}
                  sx={inputStyle}
                  placeholder="숫자만 입력해주세요."
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel htmlFor="deadline" sx={inputLabelStyle}>
                  종료일
                </InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="deadline"
                    value={deadline}
                    disablePast
                    onChange={handleDeadlineChange}
                    sx={datePickerStyle}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
                <Button
                  variant="outlined"
                  sx={{
                    ...btnCancelStyle,
                    marginLeft: '15px',
                    width: '130px',
                    mt: '5px',
                    pt: '6px',
                  }}
                  onClick={() => {
                    setDeadline(null);
                  }}
                >
                  종료일 초기화
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        {/* 하단 버튼 */}
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          mt={5}
        >
          <Button variant="outlined" onClick={handleGoBack} sx={btnCancelStyle}>
            취소
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            type="submit"
            variant="outlined"
            sx={btnSubmitStyle}
            onClick={handleSubmit}
          >
            발행
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminCouponsCreate;
