/* eslint-disable no-useless-escape */
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 950,
  boxShadow: 'none',
  backgroundColor: '#ffffff',
}));

const LabelItem = styled(Grid)(({ theme }) => ({
  minHeight: '50px',
  display: 'flex',
  paddingLeft: '10px',
}));

const textField = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid #000000',
    },
    '&:hover fieldset': {
      border: '1px solid #000000',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #000000',
    },
  },
};

const CategorySelect = styled(Select)({
  width: '200px',
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid #000000',
  },
  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #000000',
  },
  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '2px solid #000000',
  },
});

const buttonStyle = {
  mx: 2,
  width: '65px',
  height: '30px',
  borderRadius: '15px',
  border: '1px solid #626262',
  color: '#000000',
  fontWeight: 'bold',
};

const AdminNoticesCreate = () => {
  const [notContent, setNotContent] = useState();
  const [notCategory, setNotCategory] = useState('none');
  const notTitleRef = useRef();
  const filesRef = useRef();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const fileChange = (e) => {
    const currentFiles = e.target.files;

    for (let i = 0; i < currentFiles.length; i++) {
      let check = false;
      const regExp = /[\[\]\{\}\/\?\\\*\|\<\>\"\'\:\;\`\^]/g;

      if (regExp.test(currentFiles[i].name)) {
        alert('파일 이름에 특수문자가 포함되어 있습니다.');
        check = true;
      }

      if (check) {
        filesRef.current.value = '';
        return false;
      }
    }

    setFiles(currentFiles);
  };

  const createNoticeBtn = () => {
    // 카테고리 선택 체크
    if (notCategory === 'none') {
      alert('카테고리를 선택해주세요.');
      return false;
    }

    if (!notTitleRef.current.value) {
      alert('제목을 입력해주세요.');
      return false;
    }

    if (!notContent) {
      alert('내용을 입력해주세요.');
      return false;
    }

    if (window.confirm('등록하시겠습니까?')) {
      createNotice();
    }
  };

  const createNotice = () => {
    axios
      .post(`/m/notices/create`, {
        notTitle: notTitleRef.current.value,
        notCategory: notCategory,
        notContent: notContent,
      })
      .then((res) => {
        if (res.data !== 0) {
          if (files.length > 0) {
            fileUpload(res.data);
          } else {
            alert('공지사항이 등록되었습니다.');
            navigate('/m/notices/lists?sort=-notDate&filter=none&pages=1');
          }
        } else {
          alert('공지사항 등록에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fileUpload = (notCode) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('uploadFile', files[i]);
    }

    axios
      .post(`/m/notices/upload/file/${notCode}`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('공지사항이 등록되었습니다.');
        } else {
          alert('파일 업로드에 실패했습니다.');
        }
        navigate('/m/notices/lists?sort=-notDate&filter=none&pages=1');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const categoryChange = (e) => {
    setNotCategory(e.target.value);
  };

  return (
    <Box style={{ maxWidth: '1150px', margin: 'auto' }}>
      <Box
        sx={{
          my: 5,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mt: 5,
            mb: 1,
            pl: 1,
            pr: 1,
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          공지사항 &gt; 등록
        </Typography>
      </Box>

      <StyledPaper style={{ marginTop: '40px' }}>
        <Grid container>
          <LabelItem
            item
            xs={2}
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 'bold',
              }}
            >
              제목
            </Typography>
          </LabelItem>
          <Grid
            item
            xs={10}
            sx={{
              px: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              inputRef={notTitleRef}
              size="small"
              placeholder="제목을 입력해주세요."
              sx={{ ...textField, width: '100%' }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              my: 1,
              height: '1px',
              borderBottom: '1px solid #7d7d7d',
            }}
          ></Grid>

          <LabelItem
            item
            xs={2}
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 'bold',
              }}
            >
              카테고리
            </Typography>
          </LabelItem>
          <Grid
            item
            xs={10}
            sx={{
              px: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CategorySelect
              value={notCategory}
              onChange={categoryChange}
              size="small"
            >
              <MenuItem value="none" disabled>
                카테고리 선택
              </MenuItem>
              <MenuItem value="안내">안내</MenuItem>
              <MenuItem value="이벤트">이벤트</MenuItem>
            </CategorySelect>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              my: 1,
              height: '1px',
              borderBottom: '1px solid #7d7d7d',
            }}
          ></Grid>

          <LabelItem
            item
            xs={2}
            sx={{
              alignItems: 'flex-start',
              pt: 1,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 'bold',
              }}
            >
              내용
            </Typography>
          </LabelItem>
          <Grid
            item
            xs={10}
            sx={{
              px: 1,
              pt: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ReactQuill
              style={{
                marginTop: '10px',
                padding: '0 0 40px 0',
                height: '500px',
                width: '100%',
                backgroundColor: 'white',
                border: '1px solid #000000',
                fontSize: '1.2rem',
              }}
              placeholder="내용을 입력해주세요."
              theme="snow"
              value={notContent}
              onChange={setNotContent}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              mt: 3,
              mb: 1,
              height: '1px',
              borderBottom: '1px solid #7d7d7d',
            }}
          ></Grid>

          <LabelItem
            item
            xs={2}
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 'bold',
              }}
            >
              첨부파일
            </Typography>
          </LabelItem>
          <Grid
            item
            xs={10}
            sx={{
              px: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input type="file" ref={filesRef} multiple onChange={fileChange} />
          </Grid>
        </Grid>
      </StyledPaper>

      <Box
        style={{ textAlign: 'center', marginTop: '20px', marginBottom: '50px' }}
      >
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variant="contained"
          sx={{
            ...buttonStyle,
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#000000',
            },
          }}
        >
          취소
        </Button>
        <Button
          onClick={createNoticeBtn}
          variant="contained"
          sx={{
            ...buttonStyle,
            backgroundColor: '#c3c36a',
            '&:hover': {
              backgroundColor: '#c3c36a',
              color: '#ffffff',
            },
          }}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default AdminNoticesCreate;
