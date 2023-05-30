/* eslint-disable no-useless-escape */
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Box,
  Button,
  Container,
  Rating,
  TextField,
  InputLabel,
  Tooltip,
  tooltipClasses,
} from '@mui/material';
import { styled } from '@mui/system';
import Loading from '../../components/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

const pagination = {
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className}"></span>`;
  },
};

// MUI 스타일
const tableRow = {
  m: 0,
  p: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '1100px',
  height: '60px',
  borderTop: '1px solid #808080',
  borderLeft: '1px solid #808080',
  borderRight: '1px solid #808080',
};

const tableRowBottom = {
  m: 0,
  p: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '1100px',
  height: '400px',
  border: '1px solid #808080',
};

const tableHeadCell = {
  px: 2,
  width: '150px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  borderRight: '1px solid #808080',
  userSelect: 'none',
};

const tableCell2 = {
  px: 2,
  width: '400px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  borderRight: '1px solid #808080',
};

const tableCell3 = {
  px: 1,
  width: '400px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
};

const inputStyle = {
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      borderColor: '#c3c36a',
    },
  },
};

const noImageBox = {
  backgroundColor: '#f1f1f1',
  borderRadius: '5px',
  width: '350px',
  minHeight: '382.8px',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
};

const swiperStyle = {
  backgroundColor: '#f1f1f1',
  borderRadius: '5px',
  width: '350px',
  minHeight: '382.8px',
  height: '350px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
};

const btnUploadImageStyle = {
  display: 'block',
  width: '80px',
  height: '20px',
  backgroundColor: '#ECECEC',
  fontSize: '12px',
  color: '#4E4E4E',
  border: 'none',
  borderRadius: '5px',
  textAlign: 'center',
  lineHeight: '190%',
  boxShadow: '2px 2px 2px 1px #b0b0b0',
  fontWeight: 'bold',
  '&:hover': {
    cursor: 'pointer',
  },
};

const updateBtnStyle = {
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
};

const cancelBtnStyle = {
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
};

const UserReviewsModify = () => {
  const sessionEmail = sessionStorage.getItem('hobbyvillage-email');
  const nickname = sessionStorage.getItem('hobbyvillage-usernickname');

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { revwCode } = useParams();

  const [detail, setDetail] = useState(null);
  const [prevRevwImages, setPrevRevwImages] = useState([]);

  const [rateValue, setRateValue] = useState(0);
  const titleRef = useRef();
  const contentRef = useRef();

  const revwImagesRef = useRef();
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);

  useEffect(() => {
    checkReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revwCode]);

  const checkReview = () => {
    axios
      .get(`/users/reviews/check?revwCode=${revwCode}&email=${sessionEmail}`)
      .then((check) => {
        if (check.data === 1) {
          getReviewDetail();
        } else {
          alert(`존재하지 않거나 접근 불가능한 리뷰입니다.`);
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getReviewDetail = () => {
    let check = true;
    axios
      .get(`/users/reviews/reviewDetails/${revwCode}`)
      .then((res) => {
        if (res.data.revwWriter !== nickname) {
          alert('본인의 리뷰만 수정할 수 있습니다.');
          check = false;
          // navigate(-1);
        } else {
          setDetail(res.data);
          setRateValue(res.data.revwRate);
        }
      })
      .finally(() => {
        if (check) {
          getReviewImages();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getReviewImages = () => {
    axios
      .get(`/users/reviews/reviewImage/${revwCode}`)
      .then((images) => {
        if (images.data !== null) {
          if (images.data.length === 1) {
            setPrevRevwImages([images.data]);
          } else {
            setPrevRevwImages(images.data);
          }
        } else {
          setPrevRevwImages([]);
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 리뷰 수정 함수 1
  const handleModify = () => {
    if (titleRef.current.value === '') {
      alert('리뷰 제목을 입력해주세요.');
      titleRef.current.focus();
      return false;
    }

    if (contentRef.current.value === '') {
      alert('리뷰 본문을 입력해주세요.');
      contentRef.current.focus();
      return false;
    }

    if (rateValue === null || rateValue === 0) {
      alert('별점을 선택해주세요.');
      return false;
    }

    if (window.confirm('리뷰를 수정하시겠습니까?')) {
      modifyReview();
    } else {
      return false;
    }
  };

  // 리뷰 수정 함수 2
  const modifyReview = () => {
    axios
      .patch(`/users/reviews/modify`, {
        revwCode: revwCode,
        revwTitle: titleRef.current.value,
        revwContent: contentRef.current.value,
        revwRate: rateValue,
      })
      .then((res) => {
        if (res.data === 1) {
          if (imgFiles.length === 0) {
            alert('리뷰가 수정되었습니다.');
            navigate(`/reviews/details/${revwCode}`);
          } else {
            imageUpload();
          }
        } else {
          alert('리뷰 수정에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 리뷰 이미지 업로드 함수
  const imageUpload = () => {
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append('uploadImg', imgFiles[i]);
    }

    axios
      .patch(`/users/reviews/upload/${revwCode}`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('리뷰가 수정되었습니다.');
          navigate(`/reviews/details/${revwCode}`);
        } else {
          alert('리뷰가 수정되었으나, 이미지 업로드에 실패했습니다.');
          navigate(`/reviews/details/${revwCode}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 별점 변경 함수
  const changeRateValue = (e, value) => {
    if (value !== null) {
      setRateValue(value);
    }
  };

  //리뷰 이미지 첨부 함수
  const imageChange = (e) => {
    setImgFiles([]);
    const imageFiles = e.target.files;

    if (imageFiles.length > 10) {
      alert('이미지는 최대 10장까지만 업로드할 수 있습니다.');
      setImgFiles([]);
      setImgBase64([]);
      revwImagesRef.current.value = '';
      return false;
    }

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

      if (check) {
        revwImagesRef.current.value = '';
        setImgFiles([]);
        setImgBase64([]);
        return false;
      }
    }

    setImgFiles(imageFiles);

    // 이미지 미리보기
    setImgBase64([]);
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

  return (
    <Container
      sx={{
        minHeight: '80vh',
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
          userSelect: 'none',
        }}
      >
        리뷰 목록 &#62; 리뷰 수정
      </Typography>

      {loading ? (
        <Loading height={'70vh'} />
      ) : (
        <>
          {/* form 시작 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* 첫 번째 행 */}
            <Box sx={tableRow}>
              <Box sx={tableHeadCell}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  상품 명
                </Typography>
              </Box>
              <Box sx={tableCell2}>
                <Typography
                  variant="body1"
                  component="h2"
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {detail.prodName}
                </Typography>
              </Box>

              <Box sx={tableHeadCell}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 'bold' }}
                >
                  별점
                </Typography>
              </Box>
              <Box sx={tableCell3}>
                <Typography
                  variant="body1"
                  component="h2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating value={rateValue} onChange={changeRateValue} />
                </Typography>
              </Box>
            </Box>

            {/* 두 번째 행 */}
            <Box sx={tableRow}>
              <Box sx={tableHeadCell}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  리뷰 제목
                </Typography>
              </Box>
              <Box sx={tableCell2}>
                <TextField
                  inputRef={titleRef}
                  defaultValue={detail.revwTitle}
                  variant="outlined"
                  size="small"
                  sx={{
                    ...inputStyle,
                    width: '100%',
                  }}
                />
              </Box>

              <Box sx={tableHeadCell}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 'bold' }}
                >
                  누적 신고 수
                </Typography>
              </Box>
              <Box sx={tableCell3}>
                <Typography
                  variant="body1"
                  component="h2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {detail.revwReport}
                </Typography>
              </Box>
            </Box>

            {/* 세 번째 행 */}
            <Box sx={tableRowBottom}>
              <Box sx={tableHeadCell}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  리뷰 본문
                </Typography>
              </Box>
              <Box sx={{ ...tableCell2, py: 2 }}>
                <TextField
                  inputRef={contentRef}
                  defaultValue={detail.revwContent}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={15}
                  sx={{
                    ...inputStyle,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>

              <Box
                sx={{
                  ...tableHeadCell,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 'bold', position: 'relative' }}
                >
                  첨부 사진
                  <HtmlTooltip
                    arrow
                    title={
                      <>
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                          상품 리뷰와 관련된 이미지 파일을 업로드해주세요.
                          <br />
                          (각 사진 당 100MB 이하, 최대 10장)
                        </Typography>
                      </>
                    }
                  >
                    <img
                      style={{
                        position: 'absolute',
                        top: '3px',
                        right: '-30px',
                      }}
                      width="25px"
                      height="25px"
                      src="https://img.icons8.com/ios/50/000000/info--v1.png"
                      alt="첨부 안내"
                    />
                  </HtmlTooltip>
                </Typography>

                <InputLabel htmlFor="revwImages" sx={btnUploadImageStyle}>
                  파일 선택
                </InputLabel>
                <input
                  hidden
                  id="revwImages"
                  type="file"
                  ref={revwImagesRef}
                  multiple
                  onChange={imageChange}
                />
              </Box>
              <Box sx={{ ...tableCell3, justifyContent: 'center' }}>
                {
                  // 기존 이미지, 새로 추가된 이미지 모두 없는 경우
                  prevRevwImages.length === 0 && imgBase64.length === 0 ? (
                    <Box sx={noImageBox}>
                      <Typography color="#626262">
                        등록된 사진이 없습니다.
                      </Typography>
                    </Box>
                  ) : // 새로 추가된 이미지가 있는 경우
                  imgBase64.length !== 0 ? (
                    <Swiper
                      loop={true}
                      pagination={pagination}
                      modules={[Pagination]}
                      style={swiperStyle}
                    >
                      {imgBase64.map((img, index) => {
                        return (
                          <SwiperSlide
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            key={index}
                          >
                            <Box
                              component="img"
                              alt="상품 이미지"
                              src={img}
                              sx={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  ) : (
                    // 기존 이미지가 있고, 새로 추가된 이미지는 없는 경우
                    <Swiper
                      loop={true}
                      pagination={pagination}
                      modules={[Pagination]}
                      style={swiperStyle}
                    >
                      {prevRevwImages.map((revwPicture) => {
                        const fileSrc = `http://localhost:8080/users/reviews/images/${revwPicture}`;
                        return (
                          <SwiperSlide
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            key={revwPicture}
                          >
                            <Box
                              component="img"
                              alt="상품 이미지"
                              src={fileSrc}
                              sx={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  )
                }
              </Box>
            </Box>

            {/* 하단 버튼 */}
            <Box
              style={{
                marginTop: '20px',
                marginBottom: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                sx={cancelBtnStyle}
                onClick={() => {
                  if (window.confirm('리뷰 수정을 취소하시겠습니까?')) {
                    navigate(`/reviews/details/${revwCode}`, { replace: true });
                  }
                }}
              >
                취소
              </Button>

              <Button
                onClick={() => {
                  handleModify();
                }}
                sx={updateBtnStyle}
              >
                수정 완료
              </Button>
            </Box>
          </Box>
          {/* form 끝 */}
        </>
      )}
    </Container>
  );
};

export default UserReviewsModify;
