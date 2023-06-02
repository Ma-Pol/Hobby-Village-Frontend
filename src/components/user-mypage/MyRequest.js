import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Link,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Rating,
  Stack,
  Avatar,
  TextField,
  Button,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Modal,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Loading from '../Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MyAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
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
  padding: '20px 60px 5px 60px',
  //   margin: '20px 0',
  minWidth: '930px',
  width: '930px',
  //   border: '1px solid green',
  backgroundColor: 'rgba(0, 0, 0, .03)',
}));

const MyRequest = ({ request, expanded, handleChange }) => {
  const [pictureList, setPictureList] = useState([]);
  const reqBankRef = useRef();
  const reqAccountNumRef = useRef();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 이미지 파일명 가져오기
  const getRequestPics = (reqCode) => {
    axios
      .get(`/users/mypages/request/pictures?reqCode=${reqCode}`)
      .then((res) => {
        const { data } = res;
        setPictureList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getRequestPics(request.reqCode);
  }, []);

  // 위탁 철회 신청
  const withdraw = (reqCode) => {
    axios
      .get(`/users/mypages/request/withdraw?reqCode=${reqCode}`)
      .then(() => {
        window.alert('철회 요청이 접수되었습니다.');
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 계좌 수정
  const updateAccount = (reqBank, reqAccountNum, reqCode) => {
    if (window.confirm('계좌 정보를 수정하시겠습니까?')) {
      axios
        .get(
          `/users/mypages/request/updateAccount?reqBank=${reqBank}&reqAccountNum=${reqAccountNum}&reqCode=${reqCode}`
        )
        .then(() => {
          window.alert('계좌 정보가 수정되었습니다.');
          window.location.reload();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const noImageBox = {
    backgroundColor: '#f1f1f1',
    border: '1px solid #dfdfdf',
    borderRadius: '5px',
    width: '100px',
    minHeight: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const swiperStyle = {
    backgroundColor: '#f1f1f1',
    border: '1px solid #dfdfdf',
    borderRadius: '5px',
    width: '100px',
    minHeight: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cellStyle = {
    borderBottom: 'none',
    width: '80px',
    minWidth: '80px',
    padding: '0',
    margin: '0',
  };
  const cellStyle2 = {
    borderBottom: 'none',
    width: '150px',
    minWidth: '150px',
    padding: '0',
    margin: '0',
  };
  const cellStyle3 = {
    borderBottom: 'none',
    width: '200px',
    minWidth: '200px',
    padding: '0',
    margin: '0',
  };
  const cellStyle4 = {
    borderBottom: 'none',
    width: '720px',
    minWidth: '720px',
    padding: '10px 0',
    margin: '0',
    // borderLeft: '1px solid red',
    // borderRight: '1px solid red',
  };

  const textFieldStyle = {
    padding: '0',
    margin: '0',
    width: '100px',
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: '#c3c36a',
      },
    },
  };
  const textFieldStyle2 = {
    padding: '0 0 0 10px',
    margin: '0',
    width: '250px',
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: '#c3c36a',
      },
    },
  };

  const btnModifyStyle = {
    mx: 2,
    marginTop: '5px',
    minWidth: '45px',
    width: '45px',
    minHeight: '30px',
    height: '30px',
    padding: '0',
    bgcolor: '#c3c36a',
    borderRadius: '15px',
    color: '#323232',
    fontWeight: 'regular',
    '&:hover': {
      bgcolor: '#A9A951',
      color: '#323232',
      fontWeight: 'bold',
    },
  };
  const btnCancelStyle = {
    padding: '5px',
    margin: '-15px 0 0 0',
    minWidth: '70px',
    width: '40px',
    minHeight: '30px',
    height: '30px',
    bgcolor: '#F5B8B8',
    borderRadius: '15px',
    color: '#323232',
    fontWeight: 'regular',
    '&:hover': {
      bgcolor: '#F57070',
      color: '#323232',
      fontWeight: 'bold',
    },
  };
  const btnExitStyle = {
    padding: '5px',
    margin: '-15px 0 0 10px',
    minWidth: '45px',
    width: '45px',
    minHeight: '30px',
    height: '30px',
    bgcolor: '#c3c36a',
    borderRadius: '15px',
    color: '#323232',
    fontWeight: 'regular',
    '&:hover': {
      bgcolor: '#A9A951',
      color: '#323232',
      fontWeight: 'bold',
    },
  };

  const btnModalCancelStyle = {
    padding: '5px',
    margin: '20px 0 0 5px',
    minWidth: '55px',
    width: '55px',
    minHeight: '30px',
    height: '30px',
    bgcolor: '#F5B8B8',
    borderRadius: '10px',
    color: '#323232',
    fontWeight: 'regular',
    '&:hover': {
      bgcolor: '#F57070',
      color: '#323232',
      fontWeight: 'bold',
    },
  };
  const btnModalExitStyle = {
    padding: '5px',
    margin: '20px 0 0 0',
    minWidth: '55px',
    width: '55px',
    minHeight: '30px',
    height: '30px',
    bgcolor: '#d9d9d9',
    borderRadius: '10px',
    color: '#323232',
    fontWeight: 'regular',
    '&:hover': {
      bgcolor: '#ACACAC',
      color: '#323232',
      fontWeight: 'bold',
    },
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
        onChange={handleChange(request.reqCode)}
      >
        <MyAccordionSummary>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell sx={cellStyle} align="center">
                  {pictureList.length === 0 ? (
                    <Box sx={noImageBox}>
                      <Typography color="#626262">
                        등록된 사진이 없습니다.
                      </Typography>
                    </Box>
                  ) : (
                    <Swiper loop={true} style={swiperStyle}>
                      {pictureList.map((fileName) => {
                        const fileSrc = `http://localhost:8080/users/mypages/upload/${fileName}`; // 여기에 이미지 요청 경로 넣기
                        return (
                          <SwiperSlide
                            key={fileName}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Box
                              component="img"
                              alt={fileName}
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
                </TableCell>
                <TableCell sx={cellStyle2} align="center">
                  <Typography component="body1" variant="body1" align="center">
                    {request.reqTitle}
                  </Typography>
                </TableCell>
                <TableCell sx={cellStyle2} align="center">
                  <Typography component="body1" variant="body1">
                    신청 날짜 : {request.reqDate}
                  </Typography>
                </TableCell>
                <TableCell sx={cellStyle} align="center">
                  <Typography component="body1" variant="body1">
                    {request.reqSort} 신청
                  </Typography>
                </TableCell>
                <TableCell sx={cellStyle} align="center">
                  <Typography component="body1" variant="body1">
                    {request.reqProgress}
                  </Typography>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </MyAccordionSummary>
        <MyAccordionDetails>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell sx={cellStyle3} align="left">
                  <Typography>카테고리</Typography>
                </TableCell>
                <TableCell sx={cellStyle4}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    disabled
                    defaultValue={request.reqCategory}
                    size="small"
                    sx={textFieldStyle}
                    inputProps={{ style: { textAlign: 'center' } }}
                  ></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle3} align="left">
                  <Typography>등록 계좌</Typography>
                </TableCell>
                <TableCell sx={cellStyle4}>
                  <TextField
                    id="reqBank"
                    inputRef={reqBankRef}
                    variant="outlined"
                    defaultValue={request.reqBank}
                    size="small"
                    sx={textFieldStyle}
                    inputProps={{
                      style: { textAlign: 'center', color: '#7c7c7c' },
                    }}
                  ></TextField>
                  <TextField
                    id="reqAccountNum"
                    inputRef={reqAccountNumRef}
                    variant="outlined"
                    defaultValue={request.reqAccountNum}
                    size="small"
                    sx={textFieldStyle2}
                    inputProps={{
                      style: { textAlign: 'center', color: '#7c7c7c' },
                    }}
                  ></TextField>
                  <Button
                    sx={btnModifyStyle}
                    onClick={() =>
                      updateAccount(
                        reqBankRef.current.value,
                        reqAccountNumRef.current.value,
                        request.reqCode
                      )
                    }
                  >
                    수정
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle3} align="left">
                  <Typography>상품 설명</Typography>
                </TableCell>
                <TableCell sx={cellStyle4}>
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: request.reqContent,
                    }}
                    sx={{
                      color: '#3E3E3E',
                      mb: '10px',
                      border: '1px solid #B7B7B7',
                      borderRadius: '5px',
                      padding: '10px',
                      color: '#B7B7B7',
                    }}
                  ></Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle3} align="left"></TableCell>
                <TableCell sx={cellStyle4} align="right">
                  {(request.reqProgress == '1차 심사 중' ||
                    request.reqProgress == '2차 심사 대기' ||
                    request.reqProgress == '2차 심사 중' ||
                    request.reqProgress == '완료') &&
                    request.reqSort == '위탁' && (
                      <>
                        <Button sx={btnCancelStyle} onClick={handleOpen}>
                          철회하기
                        </Button>
                        <Modal open={open} onClose={handleClose}>
                          <Box sx={modalStyle}>
                            <Typography
                              component="h5"
                              variant="h5"
                              fontWeight="bold"
                            >
                              철회하기
                              <br />
                            </Typography>
                            <Typography sx={{ whiteSpace: 'pre-line' }}>
                              <br />
                              철회를 진행하시겠습니까?
                              <br />
                              <br />
                              현재 대여 중인 물품의 경우, 대여기간이 종료된 후에
                              <br />
                              기본 배송지로 배송됩니다.
                              <br />
                              이점 유의하시어 기본 배송지 확인 후 철회
                              부탁드립니다.
                            </Typography>
                            <Box sx={{ float: 'right' }}>
                              <Button
                                sx={btnModalExitStyle}
                                onClick={handleClose}
                              >
                                닫기
                              </Button>
                              <Button
                                sx={btnModalCancelStyle}
                                onClick={() => withdraw(request.reqCode)}
                              >
                                철회
                              </Button>
                            </Box>
                          </Box>
                        </Modal>
                      </>
                    )}
                  <Button
                    sx={btnExitStyle}
                    onClick={handleChange(request.reqCode)}
                  >
                    닫기
                  </Button>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </MyAccordionDetails>
      </MyAccordion>
    </>
  );
};

export default MyRequest;
