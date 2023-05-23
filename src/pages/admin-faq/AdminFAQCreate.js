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

const AdminFAQCreate = () => {
  const navigate = useNavigate();
  const selectList = [
    '상품 문의',
    '로그인/정보',
    '판매/위탁',
    '결제',
    '배송 문의',
    '기타',
  ];
  const [currentCategory, setCurrentCategory] = useState('none');
  const faqTitleRef = useRef();
  const [faqContent, setFaqContent] = useState('');

  const createFaqBtn = () => {
    if (currentCategory === 'none') {
      alert('카테고리를 선택해주세요.');
      return false;
    }

    if (!faqTitleRef.current.value) {
      alert('제목을 입력해주세요.');
      return false;
    }

    if (!faqContent) {
      alert('내용을 입력해주세요.');
      return false;
    }

    if (window.confirm('등록하시겠습니까?')) {
      createFaq();
    }
  };

  const createFaq = () => {
    axios
      .post(`/m/faqs/create`, {
        faqTitle: faqTitleRef.current.value,
        faqCategory: currentCategory,
        faqContent: faqContent,
      })
      .then((res) => {
        if (res.data === -1) {
          alert('중복되는 FAQ가 존재합니다.');
        } else if (res.data !== 0) {
          alert('등록에 성공했습니다.');
          navigate(`/m/faqs/details/${res.data}`);
        } else {
          alert('등록에 실패했습니다.');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const categoryChange = (e) => {
    setCurrentCategory(e.target.value);
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
          FAQ 자주 묻는 질문 &gt; 등록
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
              inputRef={faqTitleRef}
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
              value={currentCategory}
              onChange={categoryChange}
              size="small"
            >
              <MenuItem value="none" disabled>
                카테고리 선택
              </MenuItem>
              {selectList.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
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
              value={faqContent}
              onChange={setFaqContent}
            />
          </Grid>
        </Grid>
      </StyledPaper>

      <Box
        style={{
          textAlign: 'center',
          marginTop: '20px',
          marginBottom: '50px',
        }}
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
          onClick={createFaqBtn}
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

export default AdminFAQCreate;
