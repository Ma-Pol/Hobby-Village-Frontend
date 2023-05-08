import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  Input,
  NativeSelect,
  Grid,
  Button,
} from '@mui/material';

const AdminProductsCreate = () => {
  const prodCodeRef = useRef();
  const prodBrandRef = useRef();
  const prodPriceRef = useRef();
  const prodCategoryRef = useRef();
  const prodShippingRef = useRef(); // 배송비
  const prodNameRef = useRef();
  const prodPictureRef = useRef();
  const prodContentRef = useRef();
  const prodHostRef = useRef();
  const prodTagRef = useRef();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const btnSubmitStyle = {};

  const btnCancelStyle = {};

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
          userSelect: 'none',
        }}
      >
        상품 목록 &#62; 상품 등록
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
              <TableCell sx={{ fontSize: 18 }}>카테고리</TableCell>
              <TableCell>
                <NativeSelect
                  defaultValue={0}
                  fullWidth
                  inputProps={{
                    name: 'category',
                    id: 'uncontrolled-native',
                  }}
                  ref={prodCategoryRef}
                  required
                >
                  {/* prodCode: 카테고리-물품종류-브랜드명-고유번호4자리 */}
                  <option value={0}>카테고리 선택</option>
                  <option value="등산">등산</option>
                  <option value="뜨개">뜨개</option>
                  <option value="사진">사진</option>
                  <option value="수영">수영</option>
                  <option value="악기">악기</option>
                  <option value="웨이트">웨이트</option>
                  <option value="캠핑">캠핑</option>
                  <option value="테니스">테니스</option>
                  <option value="기타">기타</option>
                </NativeSelect>
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>브랜드</TableCell>
              <TableCell>
                <Input fullWidth ref={prodBrandRef} required />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>상품코드</TableCell>
              <TableCell>
                <Input fullWidth ref={prodCodeRef} required />
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>상품명</TableCell>
              <TableCell>
                <Input fullWidth ref={prodNameRef} required />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>대여자 닉네임</TableCell>
              <TableCell>
                <Input fullWidth ref={prodHostRef} required />
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>
                대여가격{' '}
                <Typography sx={{ fontSize: 15 }}>&#40;7일기준&#41;</Typography>
              </TableCell>
              <TableCell>
                <Input
                  fullWidth
                  type="number"
                  placeholder="숫자만 입력"
                  endAdornment="원"
                  ref={prodPriceRef}
                  required
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>상품 사진</TableCell>
              <TableCell>
                <Input fullWidth type="image" ref={prodPictureRef} required />
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>상품 설명</TableCell>
              <TableCell>
                <Input fullWidth multiline ref={prodContentRef} required />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>연관검색어</TableCell>
              <TableCell colSpan={3}>
                <Input fullWidth ref={prodTagRef} required />
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        {/* 하단 버튼 */}
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Button type="submit" variant="outlined">
            등록
          </Button>
          <Button variant="outlined" onClick={handleGoBack}>
            취소
          </Button>
        </Box>
      </Box>
      {/* form 끝 */}
    </Container>
  );
};

export default AdminProductsCreate;
