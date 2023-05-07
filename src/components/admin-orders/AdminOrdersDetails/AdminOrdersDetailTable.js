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

const tableRowAddress = {
  display: 'flex',
  height: '120px',
  m: 0,
  p: 0,
  border: '1px solid #7a7a7a',
};

const table4RowFirstCell = {
  minWidth: '140px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const table4RowSecondCell = {
  minWidth: '480px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
  overflow: 'hidden',
};

const table4RowThirdCell = {
  minWidth: '100px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const table4RowFourthCell = {
  minWidth: '157px',
  padding: '0 15px',
  overflow: 'hidden',
};

const table2RowFirstCell = {
  minWidth: '140px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const table2RowSecondCell = {
  minWidth: '797px',
  padding: '0 15px',
  overflow: 'hidden',
};

const table3RowFirstCell = {
  minWidth: '140px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
  display: 'flex',
  alignItems: 'center',
};

const table3RowSecondCell = {
  minWidth: '671px',
  padding: '0 15px',
  display: 'flex',
  alignItems: 'center',
};

const table3RowThirdCell = {
  minWidth: '97px',
  padding: '0 15px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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

// 주문지 수정 모드
const tableRowAddressModify = {
  display: 'flex',
  height: '180px',
  m: 0,
  p: 0,
  border: '1px solid #7a7a7a',
};

const addressModifySecondCell = {
  minWidth: '671px',
  padding: '0 15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const addressModifyThirdCell = {
  minWidth: '97px',
  padding: '0 15px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
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
  orderDetail,
  orderProductList,
  getOrderDetails,
  getOrderProductLists,
}) => {
  const {
    odrNumber,
    odrPayment,
    odrEmail,
    odrZipCode,
    odrAddress1,
    odrAddress2,
    odrDate,
    userCode,
  } = orderDetail;
  const userLink = `/m/users/details/${userCode}`;
  const weekday = ['일', '월', '화', '수', '목', '금', '토'];

  const [modalHandler, setModalHandler] = useState(false);
  const [odrAddressModifyMode, setOdrAddressModifyMode] = useState(false);
  const odrZipCodeRef = useRef();
  const odrAddress1Ref = useRef();
  const odrAddress2Ref = useRef();

  let orderPriceSum = 0;
  for (let i = 0; i < orderProductList.length; i++) {
    orderPriceSum += orderProductList[i].prodPrice;
    orderPriceSum += orderProductList[i].prodShipping;
  }

  // console.log(
  //   '주문번호 작성법: ' +
  //     new Date().getTime() +
  //     '-' +
  //     Math.floor(Math.random() * 10000 * 10000)
  // );

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
            alert('주소 수정에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

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
        }}
      >
        {/* 1행 시작 */}
        <Grid item xs={12} sx={tableRow}>
          {/* 1행 1열 시작 */}
          <Box sx={table4RowFirstCell}>
            <Typography variant="h6" component="h2" sx={tableHead}>
              주문 번호
            </Typography>
          </Box>
          {/* 1행 1열 끝 */}

          {/* 1행 2열 시작 */}
          <Box sx={table4RowSecondCell}>
            <Typography variant="h6" component="h2" sx={tableBody}>
              {odrNumber}
            </Typography>
          </Box>
          {/* 1행 2열 끝 */}

          {/* 1행 3열 시작 */}
          <Box sx={table4RowThirdCell}>
            <Typography variant="h6" component="h2" sx={tableHead}>
              주문 일자
            </Typography>
          </Box>
          {/* 1행 3열 끝 */}

          {/* 1행 4열 시작 */}
          <Box sx={table4RowFourthCell}>
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
          <Box sx={table4RowFirstCell}>
            <Typography variant="h6" component="h2" sx={tableHead}>
              결제 정보
            </Typography>
          </Box>
          {/* 2행 1열 끝 */}

          {/* 2행 2열 시작 */}
          <Box sx={table4RowSecondCell}>
            <Typography variant="h6" component="h2" sx={tableBody}>
              {odrPayment}&nbsp;결제
            </Typography>
          </Box>
          {/* 2행 2열 끝 */}

          {/* 2행 3열 시작 */}
          <Box sx={table4RowThirdCell}>
            <Typography variant="h6" component="h2" sx={tableHead}>
              총 결제액
            </Typography>
          </Box>
          {/* 2행 3열 끝 */}

          {/* 2행 4열 시작 */}
          <Box sx={table4RowFourthCell}>
            <Typography variant="h6" component="h2" sx={tableBody}>
              {orderPriceSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              &nbsp;원
            </Typography>
          </Box>
          {/* 2행 4열 끝 */}
        </Grid>
        {/* 2행 끝 */}

        {/* 3행 시작 */}
        <Grid item xs={12} sx={tableRow}>
          {/* 3행 1열 시작 */}
          <Box sx={table2RowFirstCell}>
            <Typography variant="h6" component="h2" sx={tableHead}>
              주문자 이메일
            </Typography>
          </Box>
          {/* 3행 1열 끝 */}

          {/* 3행 2열 시작 */}
          <Box sx={table2RowSecondCell}>
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
          {/* 3행 2열 끝 */}
        </Grid>
        {/* 3행 끝 */}

        {/* 4행 시작 */}
        <Grid
          item
          xs={12}
          sx={odrAddressModifyMode ? tableRowAddressModify : tableRowAddress}
        >
          {/* 4행 1열 시작 */}
          <Box
            sx={odrAddressModifyMode ? table3RowFirstCell : table3RowFirstCell}
          >
            <Typography variant="h6" component="h2" sx={tableHead}>
              주문자 주소
            </Typography>
          </Box>
          {/* 4행 1열 끝 */}

          {/* 4행 2열 시작 */}
          <Box
            sx={
              odrAddressModifyMode
                ? addressModifySecondCell
                : table3RowSecondCell
            }
          >
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
                    label="우편번호"
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
                  label="주소"
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
                  label="주소 상세"
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
          {/* 4행 2열 끝 */}

          {/* 4행 3열 시작 */}
          <Box
            sx={
              odrAddressModifyMode ? addressModifyThirdCell : table3RowThirdCell
            }
          >
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
          {/* 4행 3열 끝 */}
        </Grid>
        {/* 4행 끝 */}
      </Grid>

      {orderProductList.map((orderProduct) => {
        return (
          <AdminOrdersProductsTable
            key={orderProduct.opCode}
            getOrderProductLists={getOrderProductLists}
            orderProduct={orderProduct}
            odrNumber={odrNumber}
            weekday={weekday}
          />
        );
      })}
    </Container>
  );
};

export default AdminOrdersDetailTable;
