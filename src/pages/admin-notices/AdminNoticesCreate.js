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

  const [files, setFiles] = useState([]);
  const filesRef = useRef();

  // 파일 업로드 버튼 클릭 후 파일 선택 시 실행되는 함수
  const fileChange = (e) => {
    // input에 저장된 파일 목록을 가져옴
    const notFiles = e.target.files;

    // 만약 이미지 파일만을 저장하고 싶은 경우, 확장자 명을 확인할 것
    // 예시문) jpg, png, jpeg만 저장하고, 파일명의 특수문자를 체크하는 for문
    // 파일명 특문체크는 필수입니다!
    for (let i = 0; i < notFiles.length; i++) {
      let check = false;
      const regExp = /[\[\]\{\}\/\?\\\*\|\<\>\"\'\:\;\`\^]/g;

      if (regExp.test(notFiles[i].name)) {
        alert('파일 이름에 특수문자가 포함되어 있습니다.');
        check = true;
      }

      if (check) {
        filesRef.current.value = '';
        return false;
      }
    }

    // 가져온 파일 목록을 imgFile에 저장
    setFiles(notFiles); // 여기까지는 이미지 업로드만을 위한 코드
  };

  const notFilesUpload = (notCode) => {
    console.log(files);
    // <form></form> 형식으로 데이터를 보내기 위해 사용
    const formData = new FormData();

    // imgFile에 저장된 파일 목록을 formData에 저장
    for (let i = 0; i < files.length; i++) {
      formData.append('uploadImg', files[i]);
    }

    // 이미지 업로드 요청
    axios
      .post(`/m/notices/upload/img/${notCode}`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('이미지 업로드 성공!');

          filesRef.current.value = '';
        } else {
          alert('이미지 업로드 실패!');

          filesRef.current.value = '';
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
        if (response.data !== 0) {
          // 입력 받은 데이터가 정상적으로 들어왔으면(값이 1이면) navigate를 통해 페이지 이동
          notFilesUpload(response.data);
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

      {/* 공지사항 제목 테이블 표기 시작 */}
      <Box sx={noticeRow}>
        <Box sx={noticeFirstCell}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            첨부파일
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
            <input type="file" multiple onChange={fileChange} />
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
