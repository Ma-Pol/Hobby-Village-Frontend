/* eslint-disable no-useless-escape */
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  tooltipClasses,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import Terms from '../../components/user-request/Terms';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';

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

const BankSelect = styled(Select)({
  width: '100%',
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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#6f6f6f',
    color: '#ffffff',
    maxWidth: '300px',
    border: '1px solid #6f6f6f',
  },
}));

const filterBox = {
  width: '100px',
  height: '38px',
  border: '1px solid #000000',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  color: '#828282',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'all 0.25s',
  '&:hover': {
    backgroundColor: '#d6d67c',
    color: '#ffffff',
  },
  '&.Mui-selected': {
    backgroundColor: '#c3c36a',
    textDecoration: 'underline',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#c3c36a',
    textDecoration: 'underline',
    color: '#ffffff',
  },
};

const tableLines = {
  display: 'flex',
  alignItems: 'center',
  height: '60px',
};

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

const button = {
  mx: 3,
  width: '100px',
  color: '#000000',
  border: '1px solid #000000',
  fontWeight: 'bold',
};

const UserRequests = () => {
  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기

  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('none');
  const [sellConsign, setSellConsign] = useState('sell');
  const titleRef = useRef();
  const [content, setContent] = useState('');
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const filesRef = useRef();
  const [bank, setBank] = useState('none');
  const accountRef = useRef();
  const ckbAgreeRef = useRef();

  const bankList = [
    'KB국민은행',
    '신한은행',
    '우리은행',
    '하나은행',
    'SC제일은행',
    '한국씨티은행',
    '케이뱅크',
    '카카오뱅크',
    '기업은행',
    'NH농협은행',
    'IBK기업은행',
    '수협은행',
    '대구은행',
    '부산은행',
    '광주은행',
    '제주은행',
    '전북은행',
    '경남은행',
  ];

  useEffect(() => {
    axios
      .get('/requests/categories')
      .then((list) => {
        setCategoryList(list.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onSubmit = () => {
    // 판매/위탁 여부, 물품 카테고리, 물품 명, 물품 설명, 이미지, 은행, 계좌번호, 동의 여부

    if (category === 'none') {
      alert('물품 카테고리를 선택해주세요.');
      return false;
    }

    if (titleRef.current.value === '') {
      alert('물품명을 입력해주세요.');
      titleRef.current.focus();
      return false;
    }

    if (content === '') {
      alert('물품 설명을 입력해주세요.');
      return false;
    }

    if (sellConsign === 'consign') {
      if (bank === 'none') {
        alert('은행을 선택해주세요.');
        return false;
      }

      if (accountRef.current.value === '') {
        alert('계좌번호를 입력해주세요.');
        accountRef.current.focus();
        return false;
      }
    }

    if (imgFiles.length < 2) {
      alert('물품에 대한 사진을 2장 이상 첨부해주세요.');
      return false;
    }

    if (!ckbAgreeRef.current.checked) {
      alert('약관에 동의해주세요.');
      return false;
    }

    if (window.confirm('신청글을 등록하시겠습니까?')) {
      createRequest();
    }
  };

  const createRequest = () => {
    const sendData =
      sellConsign === 'sell'
        ? {
            reqSort: '판매',
            reqEmail: email,
            reqCategory: category,
            reqTitle: titleRef.current.value,
            reqContent: content,
          }
        : {
            reqSort: '위탁',
            reqEmail: email,
            reqBank: bank,
            reqAccountNum: accountRef.current.value,
            reqCategory: category,
            reqTitle: titleRef.current.value,
            reqContent: content,
          };

    axios
      .post(`/requests/create`, sendData)
      .then((reqCode) => {
        if (reqCode.data !== 0) {
          imageUpload(reqCode.data);
        } else {
          alert('신청글 등록에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const imageChange = (e) => {
    const imageFiles = Array.from(e.target.files);

    for (let i = 0; i < imageFiles.length; i++) {
      let check = false;

      const regExp = /[\[\]\{\}\/\?\\\*\|\<\>\"\'\:\;\`\^]/g;
      const imageFileType = imageFiles[i].name.split('.').at(-1).toLowerCase();

      if (regExp.test(imageFiles[i].name)) {
        alert('파일 이름에 특수문자가 포함되어 있습니다.');
        check = true;
      } else if (
        imageFileType !== 'jpg' &&
        imageFileType !== 'png' &&
        imageFileType !== 'jpeg'
      ) {
        alert('jpg, jpeg, png 파일만 업로드 가능합니다.');
        check = true;
      }

      if (imageFiles[i].size > 100000000) {
        alert('100MB 이상의 파일은 업로드할 수 없습니다.');
        check = true;
      }

      if (check) {
        imageFiles.splice(i, 1);
        i--;
      }
    }

    if (imgFiles.length + imageFiles.length > 10) {
      alert('이미지는 최대 10장까지만 업로드할 수 있습니다.');
      imageFiles.splice(10 - imgFiles.length);
    }

    const newImgFiles = [...imgFiles, ...imageFiles];
    setImgFiles(newImgFiles);

    // 이미지 미리보기
    for (let i = 0; i < imageFiles.length; i++) {
      if (imageFiles[i]) {
        const imgViewer = new FileReader();

        imgViewer.readAsDataURL(imageFiles[i]);
        imgViewer.onloadend = () => {
          const base64 = imgViewer.result;

          if (base64) {
            const base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  // 이미지 삭제
  const imageDelete = (index) => {
    const newImgFiles = [...imgFiles];
    const newImgBase64 = [...imgBase64];

    newImgFiles.splice(index, 1);
    newImgBase64.splice(index, 1);

    setImgFiles(newImgFiles);
    setImgBase64(newImgBase64);
  };

  // 이미지 업로드 함수(위탁 신청 등록 후 사용)
  const imageUpload = (reqCode) => {
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append('uploadImg', imgFiles[i]);
    }

    axios
      .post(`/requests/upload/img/${reqCode}`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('신청글 등록에 성공했습니다.');
        } else {
          alert('신청글 등록에는 성공했으나 이미지 업로드에 실패했습니다.');
        }
        navigate(`/mypages/${email}/requests/lists?filter=none&pages=1`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sellConsignChange = (e, value) => {
    setBank('none');
    setSellConsign(value);
  };

  const categoryChange = (e) => {
    setCategory(e.target.value);
  };

  const bankChange = (e) => {
    setBank(e.target.value);
  };

  const accountChange = () => {
    const accountNum = accountRef.current.value;

    if (/[^0-9]/gi.test(accountNum)) {
      alert('숫자만 입력해주세요.');
      accountRef.current.value = accountNum.replace(/[^0-9]/gi, '');
    }
  };

  if (email === null) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <UserHeader />
      <Container
        sx={{
          userSelect: 'none',
        }}
      >
        {/* 물품 판매/위탁 신청 헤더 시작 */}
        <Box
          sx={{
            my: 5,
            py: 2,
            borderBottom: '1px solid #3f3f3f',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.9rem',
            }}
          >
            물품 판매/위탁 신청
          </Typography>
        </Box>
        {/* 물품 판매/위탁 신청 헤더 끝 */}

        {/* 물품 판매/위탁 신청 내용 시작 */}
        <Grid
          container
          sx={{
            mx: 'auto',
            my: 5,
            width: '90%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* 판매/위탁 여부 선택 라인 시작 */}
          <Grid item xs={2} sx={tableLines}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
              }}
            >
              판매/위탁 여부
            </Typography>
          </Grid>
          <Grid item xs={10} sx={tableLines}>
            <ToggleButtonGroup
              value={String(sellConsign)}
              exclusive
              onChange={sellConsignChange}
            >
              <ToggleButton value="sell" sx={filterBox}>
                판매
              </ToggleButton>
              <ToggleButton value="consign" sx={filterBox}>
                위탁
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* 판매/위탁 여부 선택 라인 끝 */}

          {/* 물품 카테고리 선택 라인 시작 */}
          <Grid item xs={2} sx={tableLines}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
              }}
            >
              물품 카테고리
            </Typography>
          </Grid>
          <Grid item xs={10} sx={tableLines}>
            <CategorySelect
              value={category}
              onChange={categoryChange}
              size="small"
            >
              <MenuItem value="none" disabled>
                카테고리 선택
              </MenuItem>
              {categoryList.length !== 0 &&
                categoryList.map((category) => {
                  return (
                    <MenuItem
                      key={category}
                      value={category}
                      sx={{ textAlign: 'center' }}
                    >
                      {category}
                    </MenuItem>
                  );
                })}
            </CategorySelect>
          </Grid>
          {/* 물품 카테고리 선택 라인 끝 */}

          {/* 물품 명 라인 시작 */}
          <Grid item xs={2} sx={tableLines}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
              }}
            >
              물품 명
            </Typography>
          </Grid>
          <Grid item xs={10} sx={tableLines}>
            <TextField
              inputRef={titleRef}
              size="small"
              placeholder="물품 명을 입력해주세요."
              sx={{ ...textField, width: '100%' }}
            />
          </Grid>
          {/* 물품 명 라인 끝 */}

          {/* 물품 설명 라인 시작 */}
          <Grid item xs={2} sx={tableLines}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
              }}
            >
              물품 설명
            </Typography>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              height: '560px',
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
              placeholder="물품에 대한 설명을 입력해주세요."
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </Grid>
          {/* 물품 설명 라인 끝 */}

          {/* 사진 첨부 라인 시작 */}
          <Grid
            item
            xs={2}
            sx={{
              mt: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              height: '110px',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
              }}
            >
              사진 첨부
              <HtmlTooltip
                arrow
                title={
                  <>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                      물품의 상태를 정확히 파악할 수 있는
                      <br />
                      사진(jpg, jpeg, png)을 첨부해주시기
                      <br />
                      바랍니다.
                      <br />
                      (각 사진 당 100MB 이하, 최대 10장)
                    </Typography>
                  </>
                }
              >
                <img
                  style={{
                    position: 'absolute',
                    top: '41px',
                    right: '49px',
                  }}
                  width="25px"
                  height="25px"
                  src="https://img.icons8.com/ios/50/000000/info--v1.png"
                  alt="쿠폰 및 적립금 안내"
                />
              </HtmlTooltip>
            </Typography>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              height: 'auto',
            }}
          >
            {imgFiles.length < 10 && (
              <Button
                htmlFor="fileBox"
                component="label"
                disableRipple
                sx={{
                  boxSizing: 'border-box',
                  mr: '20px',
                  mb: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100px',
                  height: '100px',
                  border: '1px solid #000000',
                  backgroundColor: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#dddddd',
                  },
                }}
              >
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/ios-filled/50/CECECE/plus-math.png"
                  alt="fileUpload"
                />
              </Button>
            )}

            {imgBase64.map((img, index) => {
              return (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      boxSizing: 'border-box',
                      mr: '20px',
                      mb: '20px',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100px',
                      height: '100px',
                      border: '1px solid #000000',
                      borderRadius: '5px',
                    }}
                  >
                    <Box
                      key={index}
                      component="img"
                      alt="미리보기 이미지"
                      src={img}
                      sx={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        borderRadius: '5px',
                      }}
                    />
                    <Box
                      onClick={() => {
                        imageDelete(index);
                      }}
                      component="img"
                      alt="삭제 이미지"
                      src={`${process.env.PUBLIC_URL}/assets/ic-reset.png`}
                      sx={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        p: '2px',
                        borderRadius: '5px',
                        backgroundColor: '#00000050',
                        '&:hover': {
                          cursor: 'pointer',
                          backgroundColor: '#00000080',
                        },
                      }}
                    />
                  </Box>
                </React.Fragment>
              );
            })}

            <input
              hidden
              id="fileBox"
              type="file"
              ref={filesRef}
              multiple
              onChange={imageChange}
            />
          </Grid>
          {/* 사진 첨부 라인 끝 */}

          {/* 계좌번호 입력 라인 시작 */}
          {sellConsign === 'consign' && (
            <>
              <Grid item xs={2} sx={{ ...tableLines, mt: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                  }}
                >
                  계좌 번호
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ ...tableLines, mt: 1, pr: 1 }}>
                <BankSelect value={bank} onChange={bankChange} size="small">
                  <MenuItem value="none" disabled>
                    은행 선택
                  </MenuItem>
                  {bankList.map((bank) => {
                    return (
                      <MenuItem
                        key={bank}
                        value={bank}
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {bank}
                      </MenuItem>
                    );
                  })}
                </BankSelect>
              </Grid>

              <Grid item xs={8} sx={{ ...tableLines, mt: 1 }}>
                <TextField
                  inputRef={accountRef}
                  onChange={accountChange}
                  size="small"
                  placeholder="위탁 수수료 정산을 위해 계좌 번호를 입력해주세요."
                  sx={{ ...textField, width: '100%' }}
                />
              </Grid>
            </>
          )}
          {/* 계좌번호 입력 라인 끝 */}

          {/* 물품 판매/위탁 약관 표기 라인 시작 */}
          <Grid
            item
            xs={12}
            sx={{
              mt: 10,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Terms />
          </Grid>
          {/* 물품 판매/위탁 약관 표기 라인 끝 */}

          {/* 물품 판매/위탁 약관 동의 체크박스 표시 라인 시작 */}
          <Grid
            item
            xs={12}
            sx={{
              mt: 1,
              mb: 3,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Checkbox
              id="ckbAgree"
              inputRef={ckbAgreeRef}
              size="small"
              color="default"
            />
            <Typography variant="body1">
              <label htmlFor="ckbAgree">
                (필수) 약관을 상세히 읽었으며 약관 내용에 동의합니다.
              </label>
            </Typography>
          </Grid>
          {/* 물품 판매/위탁 약관 동의 체크박스 표시 라인 끝 */}

          {/* 등록/취소 버튼 표시 라인 시작 */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              sx={{
                ...button,
                backgroundColor: '#ffffff',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#000000',
                },
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              취소
            </Button>

            <Button
              onClick={() => {
                onSubmit();
              }}
              sx={{
                ...button,
                backgroundColor: '#c3c36a',
                '&:hover': {
                  backgroundColor: '#c3c36a',
                  color: '#ffffff',
                },
              }}
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </Container>
      <UserFooter />
    </>
  );
};

export default UserRequests;
