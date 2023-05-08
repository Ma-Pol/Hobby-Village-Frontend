import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleImageSlider from 'react-simple-image-slider';
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
  Input,
  Grid,
} from '@mui/material';

const AdminProductsDetails = () => {
  const prodCodeRef = useRef();
  const prodBrandRef = useRef();
  const prodPriceRef = useRef();
  const prodCategoryRef = useRef();
  const prodRegiDateRef = useRef();
  const prodNameRef = useRef();
  const rentalCountRef = useRef();
  const prodIsRentalRef = useRef();
  const prodPictureRef = useRef();
  const prodContentRef = useRef();
  const revwRateAvgRef = useRef();
  const prodDibsRef = useRef();
  const prodHostRef = useRef();
  const prodTagRef = useRef();

  const navigate = useNavigate();

  const tableHeadStyle = {
    width: 170,
    fontSize: 18,
    border: '1px solid #E0E0E0',
  };

  const tableBodyStyle = { width: 400, border: '1px solid #E0E0E0' };

  const inputReadOnlyStyle = {
    '& fieldset': {
      border: 'none',
    },
    input: { color: '#626262' },
    textarea: { color: '#626262' },
    overflow: 'auto',
  };

  const btnUploadImageStyle = {
    display: 'block',
    width: '60px',
    height: '20px',
    bgcolor: '#ECECEC',
    fontSize: '12px',
    color: '#4E4E4E',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    lineHeight: '190%',
    boxShadow: '2px 2px 2px 1px #b0b0b0',
    display: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
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
      color: '#000000',
    },
  };

  const btnListStyle = {
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

  const btnUpdateStyle = {
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

  const images = [
    {
      url: "process.env.PUBLIC_URL + '/arena.png'",
    },
    {
      url: "process.env.PUBLIC_URL + '/brandyarn.png'",
    },
    {
      url: "process.env.PUBLIC_URL + '/excider.png'",
    },
  ];

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
        상품 목록 &#62; 상품 상세
      </Typography>

      {/* form 시작 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TableContainer>
          <Table sx={{ maxWidth: 1140 }}>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodCode">상품 코드</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodCode"
                  fullWidth
                  size="small"
                  ref={prodCodeRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="ABC0001"
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodBrand">브랜드</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodBrand"
                  defaultValue={1}
                  fullWidth
                  size="small"
                  ref={prodBrandRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="아레나"
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                  <InputLabel for="prodPrice">대여료</InputLabel>
                  <Typography sx={{ fontSize: '12px', color: '#646464' }}>
                    &nbsp;(7일 기준)
                  </Typography>
                </Grid>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodPrice"
                  fullWidth
                  size="small"
                  ref={prodPriceRef}
                  sx={inputReadOnlyStyle}
                  value="&#8361;&nbsp;30000"
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodCategory">카테고리</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodCategory"
                  fullWidth
                  size="small"
                  ref={prodCategoryRef}
                  sx={inputReadOnlyStyle}
                  value="등산"
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodRegiDate">등록일</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodRegiDate"
                  fullWidth
                  size="small"
                  ref={prodRegiDateRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="2023.01.01"
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodName">상품명</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodName"
                  fullWidth
                  size="small"
                  ref={prodNameRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="레몬 수영복"
                ></TextField>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="rentalCount">총 대여 횟수</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="rentalCount"
                  fullWidth
                  size="small"
                  ref={rentalCountRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="11"
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodIsRental">대여현황</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodIsRental"
                  fullWidth
                  size="small"
                  ref={prodIsRentalRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="대여중"
                ></TextField>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel>상품 사진</InputLabel>
                {/* 파일선택 버튼: label로 연결, 실제 input은 숨김 */}
                <InputLabel
                  id="btnUploadImage"
                  for="prodPicture"
                  sx={btnUploadImageStyle}
                >
                  파일선택
                </InputLabel>
                <Input
                  id="prodPicture"
                  ref={prodPictureRef}
                  type="file"
                  accept="image/*"
                  inputProps={{ multiple: true }}
                  sx={{ display: 'none' }}
                ></Input>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <SimpleImageSlider
                  width={220}
                  height={220}
                  images={images}
                  showBullets={true}
                  showNavs={true}
                  navSize={15}
                  navMargin={10}
                />
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodContent">상품 설명</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodContent"
                  fullWidth
                  multiline
                  size="small"
                  ref={prodContentRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="흔하지 않고 귀여운 디자인. 수영장 베스트 드레서 가능."
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="revwRateAvg">평균 별점</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="revwRateAvg"
                  fullWidth
                  size="small"
                  ref={revwRateAvgRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="4.8"
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodDibs">관심 수</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodDibs"
                  fullWidth
                  size="small"
                  ref={prodDibsRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="88"
                ></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodHost">대여자(닉네임)</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodHost"
                  fullWidth
                  size="small"
                  ref={prodHostRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="초록바다"
                ></TextField>
              </TableCell>
              <TableCell sx={tableHeadStyle}>
                <InputLabel for="prodTag">연관검색어</InputLabel>
              </TableCell>
              <TableCell sx={tableBodyStyle}>
                <TextField
                  id="prodTag"
                  fullWidth
                  multiline
                  size="small"
                  ref={prodTagRef}
                  sx={inputReadOnlyStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value="수영, 수영복, 아레나, 레몬"
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
          <Button variant="outlined" sx={btnListStyle}>
            목록
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="outlined" sx={btnUpdateStyle}>
            수정
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminProductsDetails;
