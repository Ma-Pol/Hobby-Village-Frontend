import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Button,
} from '@mui/material';

const AdminCouponsDetails = () => {
  const navigate = useNavigate();
  const { couponCode } = useParams();

  const [coupon, setCoupon] = useState({
    couponCode: 0,
    couponName: '',
    discountPer: 0,
    discountFix: 0,
    startDate: '',
    deadline: '',
  });

  const [discountType, setDiscountType] = useState();
  const [discount, setDiscount] = useState();

  const getCouponDetail = () => {
    axios
      .get(`/m/coupons/getCouponDetails?couponCode=${couponCode}`)
      .then((res) => {
        const { data } = res;
        setCoupon(data);

        if (data.discountPer === 0) {
          setDiscountType('고정 금액');
          setDiscount('₩ ' + data.discountFix);
        } else {
          setDiscountType('퍼센트');
          setDiscount(data.discountPer + ' %');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleDelete = () => {
    if (window.confirm('정말 해당 쿠폰을 삭제하시겠습니까?')) {
      axios
        .delete(`/m/coupons/delete?couponCode=${couponCode}`)
        .then(() => {
          alert('쿠폰이 삭제되었습니다.');
          navigate(`/m/coupons/lists?sort=-startDate&filter=none&pages=1`);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      return false;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getCouponDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const inputReadOnlyStyle = {
    width: 500,
    '& .MuiInputBase-input': {
      overflow: 'visible',
    },
    '& fieldset': {
      border: 'none',
    },
    input: { color: '#000000', fontSize: 20, padding: 0 },
  };

  const btnDeleteStyle = {
    width: '65px',
    height: '35px',
    backgroundColor: '#F5B8B8',
    borderRadius: '20px',
    border: '1px solid #626262',
    color: '#323232',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#FE8484',
      border: '1px solid #626262',
      color: '#000000',
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
    <Container
      sx={{
        userSelect: 'none',
      }}
    >
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
        쿠폰 목록 &#62; 쿠폰 상세
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
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={coupon.couponName}
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
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={discountType}
                ></TextField>
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
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={discount}
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
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={coupon.startDate}
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
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={coupon.deadline === null ? '무기한' : coupon.deadline}
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
          <Button variant="outlined" sx={btnDeleteStyle} onClick={handleDelete}>
            삭제
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="outlined" sx={btnCancelStyle} onClick={handleGoBack}>
            목록
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminCouponsDetails;
