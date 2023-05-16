import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  handleChange,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminNoticesCreate = () => {
  const [notCategory, setNotCategory] = useState();

  const handleChange = (event) => {
    setNotCategory(event.target.value);
  };

  const noticeTitleRef = useRef();
  const noticeContentRef = useRef();

  const navigate = useNavigate();

  const insertNotice = () => {
    if (notCategory === '전체') {
      alert('카테고리를 선택해주세요!');
      return false;
      // 카테고리 선택 후 등록 가능하게 if문 사용
    }
    if (
      noticeTitleRef.current.value === null ||
      noticeTitleRef.current.value === undefined ||
      noticeTitleRef.current.value === ''
    ) {
      alert('제목을 입력해주세요!');
      return false;
    }
    if (
      noticeContentRef.current.value === null ||
      noticeContentRef.current.value === undefined ||
      noticeContentRef.current.value === ''
    ) {
      alert('내용을 입력해주세요!');
      return false;
    }
    axios
      .post(`/m/notices/noticeCreate`, {
        notTitle: noticeTitleRef.current.value, // 현재 공지사항 제목 값을 저장
        notCategory: notCategory,
        notContent: noticeContentRef.current.value,
      })
      .then((response) => {
        console.log(response);
        if (response.data === 1) {
          // 입력 받은 데이터가 정상적으로 들어왔으면(값이 1이면) navigate를 통해 페이지 이동
          navigate('/m/notices/lists?sort=-notDate&filter=none&pages=1');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const noticeRow = {
    minWidth: '120px',
    display: 'flex',
  };

  const noticeFirstCell = {
    width: '100px',
    display: 'flex',
    alignItems: 'center',
    // 세로 가운데정렬
    // justifyContents: 'center' - 가로 가운데정렬
  };

  const noticeContentCell = {
    width: '100px',
    display: 'flex',
  };

  return (
    <Container>
      {/* 공지사항 등록 글씨 표기 시작 */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 5,
          mb: 1,
          pl: 2,
          pr: 1,
          fontWeight: 'bold',
          userSelect: 'none',
        }}
      >
        공지사항 &#62; 등록
      </Typography>

      {/* 공지사항 제목 테이블 표기 시작 */}
      <Box sx={noticeRow}>
        <Box sx={noticeFirstCell}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            제목
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-size-small"
              size="small"
              inputRef={noticeTitleRef}
            />
          </div>
        </Box>
      </Box>

      {/* 공지사항 카테고리 테이블 표기 시작 */}
      <Box sx={noticeRow}>
        <Box sx={noticeFirstCell}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            카테고리
          </Typography>
        </Box>
        <FormControl
          sx={{
            width: '15ch',
            mx: 1,
          }}
        >
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={notCategory}
            label="전체"
            onChange={handleChange}
          >
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="안내">안내</MenuItem>
            <MenuItem value="이벤트">이벤트</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 공지사항 내용 테이블 표기 시작 */}
      <Box sx={noticeRow}>
        <Box sx={noticeContentCell}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            내용
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-size-small"
              size="small"
              multiline
              rows={6}
              inputRef={noticeContentRef}
            />
          </div>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'Center',
        }}
      >
        {/* 취소 버튼 */}
        <Button
          variant="contained"
          size="small"
          href="/m/notices/create"
          sx={{
            mt: 1,
            mr: 1,
            height: '25px',
            float: 'center',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid #000000',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          취소
        </Button>

        {/* 등록 버튼 */}
        <Button
          variant="contained"
          size="small"
          onClick={insertNotice} // 클릭 시 insertNotice 함수 호출
          sx={{
            mt: 1,
            mr: 1,
            height: '25px',
            float: 'center',
            backgroundColor: '#C3C36A',
            color: '#000000',
            border: '1px solid #000000',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          등록
        </Button>
      </Box>
    </Container>
  );
};

export default AdminNoticesCreate;
