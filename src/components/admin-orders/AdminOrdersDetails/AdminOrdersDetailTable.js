import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import AdminOrdersProductsTable from './AdminOrdersProductsTable';
import DaumPostcodeEmbed from 'react-daum-postcode';
import axios from 'axios';

const tableRow = {
  display: 'flex',
  height: '60px',
  m: 0,
  p: 0,
  borderLeft: '1px solid #7a7a7a',
  borderTop: '1px solid #7a7a7a',
  borderRight: '1px solid #7a7a7a',
};

const tableRowBottom = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  m: 0,
  p: 0,
};

const tableRow4ColFirstCell = {
  minWidth: '140px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const tableRow4ColSecondCell = {
  minWidth: '460px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
  overflow: 'hidden',
};

const tableRow4ColThirdCell = {
  minWidth: '120px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const tableRow4ColFourthCell = {
  minWidth: '157px',
  padding: '0 15px',
  overflow: 'hidden',
};

const tableHead = {
  lineHeight: '60px',
  fontWeight: 'bold',
  userSelect: 'none',
};

const tableBody = {
  lineHeight: '60px',
  userSelect: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const tableBodyAddress = {
  padding: '10px 0',
  userSelect: 'none',
  overflow: 'auto',
  maxHeight: '100px',
};

const daumPostcodeStyle = {
  display: 'block',
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  top: '30%',
  width: '400px',
  height: '500px',
  zIndex: '99999',
};

const AdminOrdersDetailTable = ({
  odrNumber,
  orderDetail,
  orderProductList,
  getOrderDetails,
}) => {
  const {
    odrPayment,
    exactPrice,
    usedSavedMoney,
    cancelPrice,
    cancelSavedMoney,
    odrEmail,
    receiver,
    odrPhone,
    odrZipCode,
    odrAddress1,
    odrAddress2,
    odrDate,
    userCode,
  } = orderDetail; // 주문 상세 정보
  const currentPrice = exactPrice - cancelPrice; // 주문 취소 금액을 제외한 실제 결제 금액
  const currentSavedMoney = usedSavedMoney - cancelSavedMoney; // 주문 취소 금액을 제외한 실제 사용한 적립금
  const { odrState } = orderProductList.length !== 0 ? orderProductList[0] : ''; // 주문 상태
  // 주문 상태에 따른 버튼 활성화 여부
  // 결제 완료, 배송 준비 중이 아닌 상품이 하나라도 있으면 false
  let checkState = true;
  orderProductList.forEach((product) => {
    if (checkState) {
      if (
        !(
          product.odrState === '결제 완료' ||
          product.odrState === '배송 준비 중'
        )
      ) {
        checkState = false;
      }
    }
  });

  const userLink = `/m/users/details/${userCode}`;
  const weekday = ['일', '월', '화', '수', '목', '금', '토'];

  const [modalHandler, setModalHandler] = useState(false);
  const [odrAddressModifyMode, setOdrAddressModifyMode] = useState(false);
  const odrZipCodeRef = useRef();
  const odrAddress1Ref = useRef();
  const odrAddress2Ref = useRef();

  // 결제 완료 > 배송 준비 중 상태 변경
  const payCompToPreDeli = () => {
    if (
      window.confirm(
        '모든 상품의 주문 상태를 배송 준비 중으로 변경하시겠습니까?'
      )
    ) {
      axios
        .patch(`/m/orders/odrState/preparing-for-delivery`, {
          odrNumber: odrNumber,
        })
        .then((res) => {
          if (res.data !== 0) {
            alert('변경되었습니다.');
            window.location.reload();
          } else {
            alert('알 수 없는 이유로 변경에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // 주소 검색 API 사용 후처리
  const selectAddress = (data) => {
    let address1 = '';
    let extraAddress = '';

    if (data.userSelectedType === 'R') {
      address1 = data.roadAddress;
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddress += data.bname;
      }

      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddress +=
          extraAddress !== '' ? ', ' + data.buildingName : data.buildingName;
      }

      if (extraAddress !== '') {
        address1 += ' (' + extraAddress + ')';
      }
    } else {
      address1 = data.jibunAddress;
    }

    odrZipCodeRef.current.value = data.zonecode;
    odrAddress1Ref.current.value = address1;
    odrAddress2Ref.current.value = '';
    odrAddress2Ref.current.focus();
  };

  const addressModify = () => {
    if (window.confirm('주소를 수정하시겠습니까?')) {
      axios
        .patch(`/m/orders/modify`, {
          odrNumber: odrNumber,
          odrZipCode: odrZipCodeRef.current.value,
          odrAddress1: odrAddress1Ref.current.value,
          odrAddress2: odrAddress2Ref.current.value,
        })
        .then((res) => {
          if (res.data === 1) {
            alert('주소가 수정되었습니다.');
            getOrderDetails(odrNumber);
            setOdrAddressModifyMode(false);
          } else {
            alert('알 수 없는 이유로 주소 수정에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  const tableRowAddress = {
    display: 'flex',
    height: odrAddressModifyMode ? '180px' : '120px',
    m: 0,
    p: 0,
    border: '1px solid #7a7a7a',
  };

  const tableRow3ColFirstCell = {
    minWidth: '140px',
    padding: '0 15px',
    borderRight: '1px solid #7a7a7a',
    display: 'flex',
    alignItems: 'center',
  };

  const tableRow3ColSecondCell = {
    minWidth: checkState ? '671px' : '797px',
    padding: '0 15px',
    display: 'flex',
    flexDirection: odrAddressModifyMode ? 'column' : 'flex-start',
    justifyContent: odrAddressModifyMode ? 'center' : 'flex-start',
    alignItems: odrAddressModifyMode ? 'flex-start' : 'center',
  };

  const tableRow3ColThirdCell = {
    minWidth: '97px',
    padding: '0 15px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: odrAddressModifyMode ? 'column' : 'row',
  };

  if (odrState === undefined) {
    return <></>;
  } else {
    return (
      <Container
        sx={{
          width: '100%',
        }}
      >
        <Modal
          open={modalHandler}
          onClose={() => {
            setModalHandler(false);
          }}
        >
          <>
            <DaumPostcodeEmbed
              onComplete={(data) => {
                selectAddress(data);
                setModalHandler(false);
              }}
              autoClose={true}
              style={daumPostcodeStyle}
            />
          </>
        </Modal>
        <Grid
          container
          sx={{
            mx: 'auto',
            my: 4,
            width: '1000px',
            border: '1px solid #000000',
          }}
        >
          {/* 1행 시작 */}
          <Grid item xs={12} sx={tableRow}>
            {/* 1행 1열 시작 */}
            <Box sx={tableRow4ColFirstCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                주문 번호
              </Typography>
            </Box>
            {/* 1행 1열 끝 */}

            {/* 1행 2열 시작 */}
            <Box sx={tableRow4ColSecondCell}>
              <Typography variant="h6" component="h2" sx={tableBody}>
                {odrNumber}
              </Typography>
            </Box>
            {/* 1행 2열 끝 */}

            {/* 1행 3열 시작 */}
            <Box sx={tableRow4ColThirdCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                주문 일자
              </Typography>
            </Box>
            {/* 1행 3열 끝 */}

            {/* 1행 4열 시작 */}
            <Box sx={tableRow4ColFourthCell}>
              <Typography variant="h6" component="h2" sx={tableBody}>
                {odrDate}&nbsp;({weekday[new Date(odrDate).getDay()]})
              </Typography>
            </Box>
            {/* 1행 4열 끝 */}
          </Grid>
          {/* 1행 끝 */}

          {/* 2행 시작 */}
          <Grid item xs={12} sx={tableRow}>
            {/* 2행 1열 시작 */}
            <Box sx={tableRow4ColFirstCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                주문자 이메일
              </Typography>
            </Box>
            {/* 2행 1열 끝 */}

            {/* 2행 2열 시작 */}
            <Box sx={tableRow4ColSecondCell}>
              <Typography variant="h6" component="h2" sx={tableBody}>
                <Link
                  href={userLink}
                  title={odrEmail + '\n회원 상세 페이지'}
                  underline="hover"
                  sx={{ color: '#000000', cursor: 'pointer' }}
                >
                  {odrEmail}
                </Link>
              </Typography>
            </Box>
            {/* 2행 2열 끝 */}

            {/* 2행 3열 시작 */}
            <Box sx={tableRow4ColThirdCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                결제 방법
              </Typography>
            </Box>
            {/* 2행 3열 끝 */}

            {/* 2행 4열 시작 */}
            <Box sx={tableRow4ColFourthCell}>
              <Typography variant="h6" component="h2" sx={tableBody}>
                {odrPayment}
              </Typography>
            </Box>
            {/* 2행 4열 끝 */}
          </Grid>
          {/* 2행 끝 */}

          {/* 3행 시작 */}
          <Grid item xs={12} sx={tableRow}>
            {/* 3행 1열 시작 */}
            <Box sx={tableRow4ColFirstCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                총 결제액
              </Typography>
            </Box>
            {/* 3행 1열 끝 */}

            {/* 3행 2열 시작 */}
            <Box sx={tableRow4ColSecondCell}>
              <Typography variant="h6" component="h2" sx={tableBody}>
                {String(currentPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                &nbsp;원
              </Typography>
            </Box>
            {/* 3행 2열 끝 */}

            {/* 3행 3열 시작 */}
            <Box sx={tableRow4ColThirdCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                사용 적립금
              </Typography>
            </Box>
            {/* 3행 1열 끝 */}

            {/* 3행 2열 시작 */}
            <Box sx={tableRow4ColFourthCell}>
              <Typography variant="h6" component="h2" sx={tableBody}>
                {String(currentSavedMoney).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ','
                )}
                &nbsp;원
              </Typography>
            </Box>
            {/* 3행 2열 끝 */}
          </Grid>
          {/* 3행 끝 */}

          {/* 4행 시작 */}
          <Grid item xs={12} sx={tableRow}>
            {/* 4행 1열 시작 */}
            <Box sx={tableRow4ColFirstCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                전화번호
              </Typography>
            </Box>
            {/* 4행 1열 끝 */}

            {/* 4행 2열 시작 */}
            <Box sx={tableRow4ColSecondCell}>
              <Typography variant="h6" component="h2" sx={tableBody}>
                {String(odrPhone).replace(
                  /^(\d{2,3})(\d{3,4})(\d{4})$/,
                  `$1 - $2 - $3`
                )}
              </Typography>
            </Box>
            {/* 4행 2열 끝 */}

            {/* 4행 3열 시작 */}
            <Box sx={tableRow4ColThirdCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                받는 사람
              </Typography>
            </Box>
            {/* 4행 1열 끝 */}

            {/* 4행 2열 시작 */}
            <Box sx={tableRow4ColFourthCell}>
              <Typography variant="h6" component="h2" sx={tableBody}>
                {receiver}
              </Typography>
            </Box>
            {/* 4행 2열 끝 */}
          </Grid>
          {/* 4행 끝 */}

          {/* 5행 시작 */}
          <Grid item xs={12} sx={tableRowAddress}>
            {/* 5행 1열 시작 */}
            <Box sx={tableRow3ColFirstCell}>
              <Typography variant="h6" component="h2" sx={tableHead}>
                주문자 주소
              </Typography>
            </Box>
            {/* 5행 1열 끝 */}

            {/* 5행 2열 시작 */}
            <Box sx={tableRow3ColSecondCell}>
              {odrAddressModifyMode ? (
                // 주소 수정 모드일 때
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      my: '10px',
                    }}
                  >
                    <TextField
                      inputRef={odrZipCodeRef}
                      variant="outlined"
                      defaultValue={odrZipCode}
                      size="small"
                      sx={{ width: '100px', height: '30px', mr: '10px' }}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        setModalHandler(true);
                      }}
                      sx={{
                        mx: 1,
                        width: '140px',
                        height: '30px',
                        backgroundColor: '#ffffff',
                        borderRadius: '15px',
                        border: '1px solid #626262',
                        color: '#000000',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#ffffff',
                          color: '#000000',
                        },
                      }}
                    >
                      우편번호 검색
                    </Button>
                  </Box>
                  <TextField
                    inputRef={odrAddress1Ref}
                    variant="outlined"
                    defaultValue={odrAddress1}
                    size="small"
                    sx={{ width: '650px', height: '30px', my: '10px' }}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    inputRef={odrAddress2Ref}
                    variant="outlined"
                    defaultValue={odrAddress2}
                    size="small"
                    sx={{ width: '650px', height: '30px', my: '10px' }}
                  />
                </>
              ) : (
                // 주소 수정 모드가 아닐 때
                <Typography variant="h6" component="h2" sx={tableBodyAddress}>
                  [{odrZipCode}]&nbsp;
                  {odrAddress1}&nbsp;
                  {odrAddress2}
                </Typography>
              )}
            </Box>
            {/* 5행 2열 끝 */}

            {/* 5행 3열 시작 */}
            {checkState ? (
              <>
                <Box sx={tableRow3ColThirdCell}>
                  {odrAddressModifyMode ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={addressModify}
                        sx={{
                          my: 1,
                          width: '65px',
                          height: '30px',
                          backgroundColor: '#c3c36a',
                          borderRadius: '15px',
                          border: '1px solid #626262',
                          color: '#000000',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: '#c3c36a',
                            color: '#ffffff',
                          },
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (odrAddressModifyMode) {
                            setOdrAddressModifyMode(false);
                          } else {
                            setOdrAddressModifyMode(true);
                          }
                        }}
                        sx={{
                          my: 1,
                          width: '65px',
                          height: '30px',
                          backgroundColor: '#ffffff',
                          borderRadius: '15px',
                          border: '1px solid #626262',
                          color: '#000000',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: '#ffffff',
                            color: '#000000',
                          },
                        }}
                      >
                        취소
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (odrAddressModifyMode) {
                          setOdrAddressModifyMode(false);
                        } else {
                          setOdrAddressModifyMode(true);
                        }
                      }}
                      sx={{
                        width: '65px',
                        height: '30px',
                        backgroundColor: '#c3c36a',
                        borderRadius: '15px',
                        border: '1px solid #626262',
                        color: '#000000',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#c3c36a',
                          color: '#ffffff',
                        },
                      }}
                    >
                      수정
                    </Button>
                  )}
                </Box>
              </>
            ) : (
              <></>
            )}
            {/* 5행 3열 끝 */}
          </Grid>
          {/* 5행 끝 */}

          {/* 6행 시작 */}
          {odrState === '결제 완료' ? (
            <>
              <Grid item xs={12} sx={tableRowBottom}>
                <Button
                  onClick={payCompToPreDeli}
                  variant="contained"
                  sx={{
                    mx: 1,
                    width: '100px',
                    height: '30px',
                    backgroundColor: '#c3c36a',
                    borderRadius: '15px',
                    border: '1px solid #626262',
                    color: '#000000',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#c3c36a',
                      color: '#ffffff',
                    },
                  }}
                >
                  주문 확인
                </Button>
              </Grid>
            </>
          ) : (
            <></>
          )}
          {/* 6행 끝 */}
        </Grid>

        {orderProductList.map((orderProduct) => {
          return (
            <AdminOrdersProductsTable
              key={orderProduct.opCode}
              odrEmail={odrEmail}
              odrNumber={odrNumber}
              exactPrice={exactPrice}
              usedSavedMoney={usedSavedMoney}
              orderProduct={orderProduct}
              weekday={weekday}
            />
          );
        })}
      </Container>
    );
  }
};

export default AdminOrdersDetailTable;
