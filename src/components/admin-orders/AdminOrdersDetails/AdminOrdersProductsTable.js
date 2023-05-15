import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';

const tableRow = {
  display: 'flex',
  height: '50px',
  m: 0,
  p: 0,
  borderLeft: '1px solid #7a7a7a',
  borderTop: '1px solid #7a7a7a',
  borderRight: '1px solid #7a7a7a',
};

const tableRowButtonBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '40px',
  m: 0,
  p: 0,
};

const tableRow4ColFirstCell = {
  minWidth: '140px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const tableRow4ColSecondCell = {
  minWidth: '395px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
  overflow: 'hidden',
};

const tableRow4ColThirdCell = {
  minWidth: '100px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const tableRow4ColFourthCell = {
  minWidth: '142px',
  padding: '0 15px',
  overflow: 'hidden',
};

const tableRow3ColFirstCell = {
  minWidth: '140px',
  padding: '0 15px',
  borderRight: '1px solid #7a7a7a',
};

const tableRow3ColSecondCell = {
  minWidth: '552px',
  padding: '0 15px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const tableRow3ColThirdCell = {
  minWidth: '100px',
  padding: '0 15px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const tableHead = {
  lineHeight: '50px',
  fontWeight: 'bold',
  userSelect: 'none',
};

const tableBody = {
  lineHeight: '50px',
  userSelect: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const deliverySelectBox = {
  width: '150px',
  mr: 2,
};

const AdminOrdersProductsTable = ({
  odrEmail,
  odrNumber,
  exactPrice,
  usedSavedMoney,
  orderProduct,
  weekday,
}) => {
  const {
    opCode,
    courierCompany,
    trackingNumber,
    prodCode,
    deliDate,
    rentalPeriod,
    deadline,
    odrState,
    prodCategory,
    prodName,
    prodPrice,
    prodShipping,
  } = orderProduct;
  const prodLink = `/m/products/details/${prodCode}`;
  const remainingDays = Math.floor(
    (new Date() - new Date(deliDate)) / (1000 * 60 * 60 * 24)
  );
  let deliCompanyString =
    courierCompany === '04'
      ? 'CJ대한통운'
      : courierCompany === '05'
      ? '한진택배'
      : courierCompany === '08'
      ? '롯데 택배'
      : courierCompany === '01'
      ? '우체국 택배'
      : courierCompany === '06'
      ? '로젠택배'
      : courierCompany === '23'
      ? '경동택배'
      : courierCompany === '46'
      ? 'CU 편의점 택배'
      : courierCompany === '24'
      ? 'GS Postbox 택배'
      : '';

  const [deliveryCompany, setDeliveryCompany] = useState('none');
  const trackingNumberRef = useRef();

  // 배송 중 처리
  const preDeliToShipping = () => {
    if (
      window.confirm(
        `${prodName}\n운송 정보를 등록하고 해당 상품을 배송 중으로 변경하시겠습니까?`
      )
    ) {
      axios
        .patch(`/m/orders/odrState/shipping`, {
          opCode: opCode,
          courierCompany: deliveryCompany,
          trackingNumber: trackingNumberRef.current.value,
        })
        .then((res) => {
          if (res.data === 1) {
            alert('등록 및 변경되었습니다.');
            window.location.reload();
          } else {
            alert('알 수 없는 이유로 등록 및 변경에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  // 반납 완료 처리
  const returningToReturned = () => {
    if (
      window.confirm(`${prodName}\n해당 상품을 반납 완료 처리 하시겠습니까?`)
    ) {
      axios
        .patch(`/m/orders/returned`, {
          opCode: opCode,
          prodCode: prodCode,
          prodPrice: prodPrice,
          rentalPeriod: rentalPeriod,
          odrEmail: odrEmail,
        })
        .then((res) => {
          if (res.data === 1) {
            alert('반납 완료 처리 되었습니다.');
            window.location.reload();
          } else {
            alert('알 수 없는 이유로 반납 완료 처리에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  // 주문 취소 처리 1: 주문 상품의 현 상태 확인
  const checkOdrState = async () => {
    let check = false;
    await axios
      .get(`/m/orders/odrState/${opCode}`)
      .then((res) => {
        if (res.data !== '취소 요청') {
          alert(`${res.data} 상태에서는 주문 취소를 할 수 없습니다.`);
        } else {
          check = true;
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return check;
  };

  // 주문 취소 처리 2: 주문 상품 개수 확인 및 환불 처리
  const cancelOrder = async () => {
    await axios
      .post(`/m/orders/cancelOrder`, {
        opCode: opCode,
        odrNumber: odrNumber,
        prodCode: prodCode,
        prodPrice: prodPrice,
        rentalPeriod: rentalPeriod,
        prodShipping: prodShipping,
        exactPrice: exactPrice,
        usedSavedMoney: usedSavedMoney,
        odrEmail: odrEmail,
      })
      .then((res) => {
        if (res.data === 100) {
          alert('알 수 없는 이유로 주문 취소에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 주문 취소 처리 3: 취소 후처리
  const cancelOrderAfter = async (check) => {
    await axios.patch(`/m/orders/cancelOrderAfte`, {
      opCode: opCode,
      prodCode: prodCode,
      prodPrice: prodPrice,
      rentalPeriod: rentalPeriod,
      prodShipping: prodShipping,
      usedSavedMoney: usedSavedMoney,
      odrEmail: odrEmail,
      // check: check,
    });
  };

  const changeDeliveryCompany = (e) => {
    setDeliveryCompany(e.target.value);
  };

  const trackingNumberRefCheck = () => {
    const trackingNumber = trackingNumberRef.current.value;
    trackingNumberRef.current.value = trackingNumber.replace(/[^0-9]/g, '');
  };

  const preDeliToShippingBtn = () => {
    if (deliveryCompany === 'none') {
      alert('택배사를 선택해주세요.');
      return false;
    }

    if (trackingNumberRef.current.value === '') {
      alert('운송장 번호를 입력해주세요.');
      return false;
    }

    preDeliToShipping();
  };

  return (
    <Grid
      container
      sx={{
        mx: 'auto',
        my: 2,
        width: '900px',
      }}
    >
      {/* 1행 시작 */}
      <Grid item xs={12} sx={tableRow}>
        {/* 1행 1열 시작 */}
        <Box sx={tableRow4ColFirstCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            상품 번호
          </Typography>
        </Box>
        {/* 1행 1열 끝 */}

        {/* 1행 2열 시작 */}
        <Box sx={tableRow4ColSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            <Link
              href={prodLink}
              title={prodCode + '\n상품 상세 페이지'}
              underline="hover"
              sx={{ color: '#000000', cursor: 'pointer' }}
            >
              {prodCode}
            </Link>
          </Typography>
        </Box>
        {/* 1행 2열 끝 */}

        {/* 1행 3열 시작 */}
        <Box sx={tableRow4ColThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            주문 상태
          </Typography>
        </Box>
        {/* 1행 3열 끝 */}

        {/* 1행 4열 시작 */}
        <Box sx={tableRow4ColFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {odrState}
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
            상품 명
          </Typography>
        </Box>
        {/* 2행 1열 끝 */}

        {/* 2행 2열 시작 */}
        <Box sx={tableRow4ColSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {prodName}
          </Typography>
        </Box>
        {/* 2행 2열 끝 */}

        {/* 2행 3열 시작 */}
        <Box sx={tableRow4ColThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            카테고리
          </Typography>
        </Box>
        {/* 2행 3열 끝 */}

        {/* 2행 4열 시작 */}
        <Box sx={tableRow4ColFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {prodCategory}
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
            상품 가격
          </Typography>
        </Box>
        {/* 3행 1열 끝 */}

        {/* 3행 2열 시작 */}
        <Box sx={tableRow4ColSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {prodPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;원
          </Typography>
        </Box>
        {/* 3행 2열 끝 */}

        {/* 3행 3열 시작 */}
        <Box sx={tableRow4ColThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            배송비
          </Typography>
        </Box>
        {/* 3행 3열 끝 */}

        {/* 3행 4열 시작 */}
        <Box sx={tableRow4ColFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {prodShipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            &nbsp;원
          </Typography>
        </Box>
        {/* 3행 4열 끝 */}
      </Grid>
      {/* 3행 끝 */}

      {/* 4행 시작 */}
      {odrState !== '결제 완료' &&
        odrState !== '취소 요청' &&
        odrState !== '취소 처리 완료' && (
          <>
            {/* 4행 1열 시작 */}
            <Grid item xs={12} sx={tableRow}>
              <Box sx={tableRow3ColFirstCell}>
                <Typography variant="h6" component="h2" sx={tableHead}>
                  운송 정보
                </Typography>
              </Box>
              {/* 4행 1열 끝 */}

              {odrState === '배송 준비 중' ? (
                <>
                  {/* 4행 2열 시작 */}
                  <Box sx={tableRow3ColSecondCell}>
                    <Select
                      value={deliveryCompany}
                      sx={deliverySelectBox}
                      size="small"
                      onChange={changeDeliveryCompany}
                    >
                      <MenuItem value="none" disabled>
                        택배사
                      </MenuItem>

                      <MenuItem value="04">CJ 대한통운</MenuItem>
                      <MenuItem value="05">한진 택배</MenuItem>
                      <MenuItem value="08">롯데 택배</MenuItem>
                      <MenuItem value="01">우체국 택배</MenuItem>
                      <MenuItem value="06">로젠 택배</MenuItem>
                      <MenuItem value="23">경동 택배</MenuItem>
                      <MenuItem value="46">CU 편의점 택배</MenuItem>
                      <MenuItem value="24">GS Postbox 택배</MenuItem>
                    </Select>

                    <TextField
                      inputRef={trackingNumberRef}
                      onChange={trackingNumberRefCheck}
                      variant="outlined"
                      size="small"
                      placeholder="운송장 번호를 입력하세요."
                      sx={{ width: '380px', mr: '10px' }}
                    />
                  </Box>
                  {/* 4행 2열 끝 */}

                  {/* 4행 3열 시작 */}
                  <Box sx={tableRow3ColThirdCell}>
                    <Button
                      onClick={preDeliToShippingBtn}
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
                      배송 시작
                    </Button>
                  </Box>
                  {/* 4행 3열 끝 */}
                </>
              ) : (
                <>
                  {/* 4행 2열 시작 */}
                  <Box sx={{ ...tableRow3ColSecondCell, width: '700px' }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ ...tableBody, userSelect: 'auto' }}
                    >
                      {'[' + deliCompanyString + '] '}
                      {trackingNumber}
                    </Typography>
                  </Box>
                  {/* 4행 2열 끝 */}
                </>
              )}
            </Grid>
          </>
        )}
      {/* 4행 끝 */}

      {/* 5행 시작 */}
      <Grid item xs={12} sx={tableRow}>
        {/* 5행 1열 시작 */}
        <Box sx={tableRow4ColFirstCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            상품 도착일
          </Typography>
        </Box>
        {/* 5행 1열 끝 */}

        {/* 5행 2열 시작 */}
        <Box sx={tableRow4ColSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {deliDate === '1000-01-01'
              ? '-'
              : deliDate + ' (' + weekday[new Date(deliDate).getDay()] + ')'}
          </Typography>
        </Box>
        {/* 5행 2열 끝 */}

        {/* 5행 3열 시작 */}
        <Box sx={tableRow4ColThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            구독 기간
          </Typography>
        </Box>
        {/* 5행 3열 끝 */}

        {/* 5행 4열 시작 */}
        <Box sx={tableRow4ColFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {rentalPeriod}&nbsp;일
          </Typography>
        </Box>
        {/* 5행 4열 끝 */}
      </Grid>
      {/* 5행 끝 */}

      {/* 6행 시작 */}
      <Grid
        item
        xs={12}
        sx={{ ...tableRow, borderBottom: '1px solid #7a7a7a' }}
      >
        {/* 6행 1열 시작 */}
        <Box sx={tableRow4ColFirstCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            반납 기한일
          </Typography>
        </Box>
        {/* 6행 1열 끝 */}

        {/* 6행 2열 시작 */}
        <Box sx={tableRow4ColSecondCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {deadline === '1000-01-01'
              ? '-'
              : deadline + ' (' + weekday[new Date(deadline).getDay()] + ')'}
          </Typography>
        </Box>
        {/* 6행 2열 끝 */}

        {/* 6행 3열 시작 */}
        <Box sx={tableRow4ColThirdCell}>
          <Typography variant="h6" component="h2" sx={tableHead}>
            잔여 일수
          </Typography>
        </Box>
        {/* 6행 3열 끝 */}

        {/* 6행 4열 시작 */}
        <Box sx={tableRow4ColFourthCell}>
          <Typography variant="h6" component="h2" sx={tableBody}>
            {
              // 상품 배송일이 설정되지 않은 경우
              deliDate === '1000-01-01'
                ? // rentalPeriod 값을 출력
                  rentalPeriod
                : // 상품 배송일이 설정되어 있고, 남은 기한이 1보다 큰 경우
                rentalPeriod - remainingDays > 0
                ? // 남은 기한을 출력
                  rentalPeriod - remainingDays
                : // 남은 기한이 0이하인 경우 0을 출력
                  '0'
            }
            &nbsp;일
          </Typography>
        </Box>
        {/* 6행 4열 끝 */}
      </Grid>
      {/* 6행 끝 */}

      {/* 7행 시작 */}
      {odrState === '반납 중' || odrState === '취소 요청' ? (
        <>
          <Grid item xs={12} sx={tableRowButtonBox}>
            {odrState === '취소 요청' && (
              <Button
                variant="contained"
                onClick={cancelOrderAfter}
                sx={{
                  mx: 1,
                  width: '100px',
                  height: '30px',
                  backgroundColor: '#f5b8b8',
                  borderRadius: '15px',
                  border: '1px solid #626262',
                  color: '#000000',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'tomato',
                    color: '#ffffff',
                  },
                }}
              >
                주문 취소
              </Button>
            )}

            {odrState === '반납 중' && (
              <Button
                onClick={returningToReturned}
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
                반납 완료
              </Button>
            )}
          </Grid>
        </>
      ) : (
        <></>
      )}
      {/* 7행 끝 */}
    </Grid>
  );
};

export default AdminOrdersProductsTable;
