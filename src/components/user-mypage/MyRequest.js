import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from '../Loading';

const MyAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  margin: '0',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: '1px solid #FFFFFF',
  },
  '&:before': {
    display: 'none',
  },
}));

const MyAccordionSummary = styled((props) => <AccordionSummary {...props} />)(
  ({ theme }) => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, .05)'
          : 'rgba(0, 0, 0, .03)',
    },
    '&.Mui-expanded': {
      backgroundColor: 'rgba(0, 0, 0, .03)',
    },
  })
);
const MyAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '0',
  backgroundColor: 'rgba(0, 0, 0, .03)',
}));

const MyRequest = ({
  request,
  expanded,
  handleAccordionChange,
  getRequestList,
}) => {
  const [loading, setLoading] = useState(true);
  const [pictureList, setPictureList] = useState([]);

  const [modifyMode, setModifyMode] = useState(false);
  const reqBankRef = useRef();
  const reqAccountNumRef = useRef();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getRequestPics(request.reqCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이미지 파일명 가져오기
  const getRequestPics = (reqCode) => {
    axios
      .get(`/requests/mypages/pictures?reqCode=${reqCode}`)
      .then((pictures) => {
        const { data } = pictures;
        setPictureList(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 위탁 철회 신청
  const withdraw = (reqCode) => {
    axios
      .patch(`/requests/mypages/withdraw?reqCode=${reqCode}`)
      .then(() => {
        window.alert('철회 요청이 접수되었습니다.');
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 계좌 수정
  const modifyAccount = () => {
    if (window.confirm('계좌 정보를 수정하시겠습니까?')) {
      const bank = reqBankRef.current.value;
      const accountNum = reqAccountNumRef.current.value;
      const reqCode = request.reqCode;

      axios
        .patch(
          `/requests/mypages/account?reqBank=${bank}&reqAccountNum=${accountNum}&reqCode=${reqCode}`
        )
        .then(() => {
          window.alert('계좌 정보가 수정되었습니다.');
          getRequestList();
        })
        .finally(() => {
          setModifyMode(false);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      reqBankRef.current.value = request.reqBank;
      reqAccountNumRef.current.value = request.reqAccountNum;
      setModifyMode(false);
    }
  };

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    border: '1px solid #dfdfdf',
    borderRadius: '5px',
    width: '130px',
    height: '130px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const defaultTextBoxStyle = {
    mr: '10px',
    minHeight: '28px',
    width: '118px',
    px: '15px',
    py: '5px',
    border: '1px solid #BDBDBD',
    borderRadius: '5px',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textFieldStyle = {
    padding: '0',
    margin: '0',
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: '#c3c36a',
      },
    },
  };

  const notActiveModifyBtnStyle = {
    width: '90px',
    height: '28px',
    border: '1px solid #626262',
    marginLeft: '10px',
    borderRadius: '10px',
    color: '#000000',
    fontSize: '0.9rem',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  };

  const activeModifyBtnStyle = {
    width: '90px',
    height: '28px',
    border: '1px solid #626262',
    marginLeft: '10px',
    borderRadius: '10px',
    color: '#000000',
    fontSize: '0.9rem',
    backgroundColor: '#c3c36a',
    '&:hover': {
      backgroundColor: '#c3c36a',
      color: '#ffffff',
    },
  };

  const modalBtnDefaultStyle = {
    boxSizing: 'border-box',
    m: 0,
    mt: '10px',
    ml: '10px',
    p: 0,
    border: '1px solid #626262',
    width: '50px',
    fontSize: '16px',
    borderRadius: '10px',
    shadow: 'none',
    fontWeight: 'bold',
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #7A7A7A',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <MyAccordion
        expanded={expanded === request.reqCode}
        onChange={handleAccordionChange(request.reqCode)}
      >
        <MyAccordionSummary>
          {/* 상부 시작 */}
          <Box
            sx={{
              width: '950px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* 이미지 박스 */}
            <Box
              sx={{
                boxSizing: 'border-box',
                m: '10px',
                width: '130px',
                height: '130px',
                backgroundColor: '#f1f1f1',
                border: '1px solid #dfdfdf',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading ? (
                <Loading height={'130px'} />
              ) : pictureList.length === 0 ? (
                <Typography
                  color="#626262"
                  component="h6"
                  variant="body1"
                  sx={{ textAlign: 'center' }}
                >
                  등록된
                  <br />
                  사진이
                  <br />
                  없습니다.
                </Typography>
              ) : (
                <Swiper loop={true} style={swiperStyle}>
                  {pictureList.map((imgName) => {
                    const fileSrc = `http://localhost:8080/requests/mypages/view-image/${imgName}`;
                    return (
                      <SwiperSlide
                        key={imgName}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          component="img"
                          alt={imgName}
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
              )}
            </Box>
            {/* 이미지 박스 끝 */}

            {/* 판매/위탁 제목 시작 */}
            <Box
              sx={{
                ml: '35px',
                mr: '25px',
                width: '300px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                component="h6"
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  // 양쪽 정렬하기
                  textAlign: 'justify',
                }}
              >
                {request.reqTitle}
              </Typography>
            </Box>
            {/* 판매/위탁 제목 끝 */}

            {/* 신청일 시작 */}
            <Box
              sx={{
                mx: '25px',
                width: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                component="h6"
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {request.reqDate}
              </Typography>
            </Box>
            {/* 신청일 끝 */}

            {/* 신청 종류 시작 */}
            <Box
              sx={{
                mx: '25px',
                width: '70px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                component="h6"
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {request.reqSort} 신청
              </Typography>
            </Box>
            {/* 신청 종류 끝 */}

            {/* 신청 상태 시작 */}
            <Box
              sx={{
                mx: '10px',
                width: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                component="h6"
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {request.reqProgress}
              </Typography>
            </Box>
            {/* 신청 상태 끝 */}
          </Box>
          {/* 상부 끝 */}
        </MyAccordionSummary>

        <MyAccordionDetails>
          {/* 하부 시작 */}
          <Box
            sx={{
              mx: 'auto',
              pb: '35px',
              width: '950px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* 카테고리 시작 */}
              <Box
                sx={{
                  mb: '15px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component="h6"
                  variant="body1"
                  sx={{
                    ml: '40px',
                    mr: '10px',
                    width: '150px',
                    fontWeight: 'bold',
                  }}
                >
                  카테고리
                </Typography>
                <Box sx={defaultTextBoxStyle}>
                  <p style={{ margin: 0 }}>{request.reqCategory}</p>
                </Box>
              </Box>
              {/* 카테고리 끝 */}

              {/* 등록 계좌 시작 */}

              <Box
                sx={{
                  mb: '15px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component="h6"
                  variant="body1"
                  sx={{
                    ml: '40px',
                    mr: '10px',
                    width: '150px',
                    fontWeight: 'bold',
                  }}
                >
                  등록 계좌
                </Typography>
                {modifyMode ? (
                  <TextField
                    inputRef={reqBankRef}
                    variant="outlined"
                    defaultValue={request.reqBank}
                    size="small"
                    sx={{
                      ...textFieldStyle,
                      width: '150px',
                      mr: '10px',
                    }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  <Box sx={defaultTextBoxStyle}>
                    <p style={{ margin: 0 }}>{request.reqBank}</p>
                  </Box>
                )}
                {modifyMode ? (
                  <TextField
                    inputRef={reqAccountNumRef}
                    variant="outlined"
                    defaultValue={request.reqAccountNum}
                    size="small"
                    sx={{
                      ...textFieldStyle,
                      width: '400px',
                    }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  <Box
                    sx={{
                      ...defaultTextBoxStyle,
                      width: '369px',
                      mr: '0px',
                    }}
                  >
                    <p style={{ margin: 0 }}>{request.reqAccountNum}</p>
                  </Box>
                )}

                <Button
                  size="small"
                  onClick={() => {
                    if (modifyMode) {
                      modifyAccount();
                    } else {
                      setModifyMode(true);
                      setTimeout(() => {
                        reqBankRef.current.focus();
                      }, 150);
                    }
                  }}
                  sx={
                    modifyMode ? activeModifyBtnStyle : notActiveModifyBtnStyle
                  }
                >
                  {modifyMode ? '수정 완료' : '계좌 수정'}
                </Button>
              </Box>

              {/* 등록 계좌 끝 */}

              {/* 물품 설명 시작 */}
              <Box
                sx={{
                  mb: '15px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component="h6"
                  variant="body1"
                  sx={{
                    ml: '40px',
                    mr: '10px',
                    width: '150px',
                    fontWeight: 'bold',
                  }}
                >
                  물품 설명
                </Typography>
                <Box
                  sx={{
                    minHeight: '40px',
                    width: '710px',
                    px: '15px',
                    py: '10px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '5px',
                    color: '#000000',
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: request.reqContent }}
                  />
                </Box>
              </Box>
              {/* 물품 설명 끝 */}

              {/* 심사 탈락 사유 시작 */}
              {request.reqProgress === '심사 탈락' && (
                <Box
                  sx={{
                    mb: '15px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    component="h6"
                    variant="body1"
                    sx={{
                      ml: '40px',
                      mr: '10px',
                      width: '150px',
                      fontWeight: 'bold',
                    }}
                  >
                    탈락 사유
                  </Typography>
                  <Box
                    sx={{
                      ...defaultTextBoxStyle,
                      width: '710px',
                    }}
                  >
                    <p style={{ margin: 0 }}>{request.rejectReason}</p>
                  </Box>
                </Box>
              )}

              {/* 심사 탈락 사유 끝 */}
            </Box>
            <Button
              sx={{
                ...modalBtnDefaultStyle,
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                width: '50px',
                fontSize: '14px',
                color: '#000000',
                backgroundColor: '#c3c36a',
                '&:hover': {
                  backgroundColor: '#c3c36a',
                  color: '#ffffff',
                },
              }}
              onClick={handleAccordionChange(request.reqCode)}
            >
              닫기
            </Button>
            {(request.reqProgress === '1차 심사 중' ||
              request.reqProgress === '2차 심사 대기' ||
              request.reqProgress === '2차 심사 중' ||
              request.reqProgress === '완료') &&
              request.reqSort === '위탁' && (
                <>
                  <Button
                    onClick={handleOpen}
                    sx={{
                      ...modalBtnDefaultStyle,
                      position: 'absolute',
                      right: '80px',
                      bottom: '10px',
                      width: '80px',
                      fontSize: '14px',
                      backgroundColor: '#F5B8B8',
                      color: '#000000',
                      '&:hover': {
                        backgroundColor: 'tomato',
                        color: '#FFFFFF',
                      },
                    }}
                  >
                    철회하기
                  </Button>
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={modalStyle}>
                      <h1
                        className="default-font"
                        style={{
                          margin: '0 0 30px 0',
                          fontSize: '30px',
                          textAlign: 'center',
                        }}
                      >
                        위탁 철회
                      </h1>

                      <p className="default-font">
                        위탁 철회를 진행하시겠습니까?
                        <br />
                        <br />
                        현재 대여 중인 물품의 경우, 대여기간이 종료된 후에
                        <br />
                        회원님의 <strong>기본 배송지</strong>로 배송됩니다.
                        <br />
                        <br />
                        이점 유의하시어 기본 배송지 확인 후 철회 부탁드립니다.
                      </p>
                      <Box sx={{ float: 'right' }}>
                        <Button
                          sx={{
                            ...modalBtnDefaultStyle,
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            '&:hover': {
                              backgroundColor: '#f0f0f0',
                              color: '#000000',
                            },
                          }}
                          onClick={handleClose}
                        >
                          닫기
                        </Button>
                        <Button
                          sx={{
                            ...modalBtnDefaultStyle,
                            backgroundColor: '#F5B8B8',
                            color: '#000000',
                            '&:hover': {
                              backgroundColor: 'tomato',
                              color: '#FFFFFF',
                            },
                          }}
                          onClick={() => withdraw(request.reqCode)}
                        >
                          철회
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </>
              )}
          </Box>
          {/* 하부 끝 */}
        </MyAccordionDetails>
      </MyAccordion>
    </>
  );
};

export default MyRequest;
