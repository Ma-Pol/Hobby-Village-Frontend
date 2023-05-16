import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
} from '@mui/material'; // Divider import
import { styled } from '@mui/system';
import UserFooter from '../../components/UserFooter';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 950,
  boxShadow: 'none',
  minHeight: '300px',
}));

const LabelItem = styled(Grid)(({ theme }) => ({
  minHeight: '50px',
  display: 'flex',
  paddingLeft: '10px',
}));

const CategorySelect = styled(Select)({
  width: '150px',
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

const UserQnACreate = () => {
  // const email = sessionStorage.getItem('email'); // 이메일을 세션에서 가져오기
  const email = 'bae@naver.com'; // 임시 이메일

  const location = useLocation();
  const prevQuery = location.state?.queryString;
  const navigate = useNavigate();
  const [category, setCategory] = useState('none');
  const [content, setContent] = useState('');
  const titleRef = useRef();

  const onSubmit = () => {
    if (category === 'none') {
      alert('카테고리를 선택해주세요.');
      return false;
    }
    if (titleRef.current.value === '' || titleRef.current.value === null) {
      alert('제목을 입력해주세요.');
      return false;
    }
    if (content === '') {
      alert('내용을 입력해주세요.');
      return false;
    }

    axios
      .post(`/cs/qna/create`, {
        email: email,
        qstCategory: category,
        qstTitle: titleRef.current.value,
        qstContent: content,
      })
      .then((res) => {
        if (res.data === 1) {
          alert('문의가 등록되었습니다.');
          if (prevQuery === undefined) {
            navigate(`/cs/qna/${email}/lists?filter=none&pages=1`);
          } else {
            navigate(`/cs/qna/${email}/lists${prevQuery}`);
          }
        } else {
          alert('문의 등록에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const categoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Box style={{ maxWidth: '1150px', margin: 'auto' }}>
      <Box
        sx={{
          my: 5,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.6rem',
          }}
        >
          1:1 문의
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
              inputRef={titleRef}
              size="small"
              placeholder="제목을 입력해주세요."
              sx={{
                width: '100%',
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
              }}
            />
          </Grid>

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
              defaultValue="none"
              onChange={categoryChange}
              size="small"
            >
              <MenuItem value="none" disabled>
                선택
              </MenuItem>
              <MenuItem value="상품 문의">상품 문의</MenuItem>
              <MenuItem value="로그인/정보">로그인/정보</MenuItem>
              <MenuItem value="판매/위탁">판매/위탁</MenuItem>
              <MenuItem value="결제">결제</MenuItem>
              <MenuItem value="배송 문의">배송 문의</MenuItem>
              <MenuItem value="기타">기타</MenuItem>
            </CategorySelect>
          </Grid>

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
                padding: '0 0 40px 0',
                height: '500px',
                width: '100%',
                backgroundColor: 'white',
                border: '1px solid #000000',
              }}
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </Grid>
        </Grid>
      </StyledPaper>

      <Box
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{
            mx: 3,
            width: '100px',
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #000000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#000000',
            },
          }}
          onClick={() => {
            if (prevQuery === undefined) {
              navigate(`/cs/qna/${email}/lists?filter=none&pages=1`);
            } else {
              navigate(`/cs/qna/${email}/lists${prevQuery}`);
            }
          }}
        >
          취소
        </Button>

        <Button
          onClick={() => {
            onSubmit();
          }}
          sx={{
            mx: 3,
            width: '100px',
            backgroundColor: '#c3c36a',
            color: '#000000',
            border: '1px solid #000000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#c3c36a',
              color: '#ffffff',
            },
          }}
        >
          등록
        </Button>
      </Box>
      <UserFooter />
    </Box>
  );
};

export default UserQnACreate;
