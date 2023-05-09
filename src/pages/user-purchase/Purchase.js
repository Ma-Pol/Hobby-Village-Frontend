import {
  Box,
  Button,
  Checkbox,
  Container,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import UserPurchaseProductCard from '../../components/user-purchase/UserPurchaseProductCard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HeaderTypography = styled(Typography)({
  fontWeight: 'bold',
  userSelect: 'none',
});

const HeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  height: '40px',
  margin: '10px 0',
  paddingBottom: '10px',
  borderBottom: '1px solid #bcb5b5',
  userSelect: 'none',
});

const DataBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '10px 0',
  padding: '10px 0',
  userSelect: 'none',
});

const OrderDataBox = styled(Box)({
  backgroundColor: '#f5f5f5',
  padding: '0 10px',
  width: '1030px',
  height: '50px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const OrderDataBoxTitle = styled(Typography)({
  width: '180px',
  fontSize: '1.3rem',
  fontWeight: 'bold',
});

const CouponSelect = styled(Select)({
  width: '400px',
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

const SavedMoneyInput = styled(TextField)({
  width: '400px',
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
});

const PaymentBtnGroup = styled(ToggleButtonGroup)({
  width: '100%',
  height: '130px',
  display: 'flex',
  justifyContent: 'center',
});

const PriceContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  margin: '10px 0',
  padding: '10px 22px',
  userSelect: 'none',
});

const PriceLeftBox = styled(Box)({
  padding: '10px',
  width: '420px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '1px solid #d0d0d0',
  borderRadius: '10px',
  boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.2)',
});

const PriceLeftBoxRow = styled(Box)({
  margin: '5px 0',
  padding: '0 10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Purchase = () => {
  // const email = window.sessionStorage.getItem('email');
  const email = 'lee@naver.com';
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = location.state;
  const couponRef = useRef();
  const savedMoneyRef = useRef();
  const ckb1Ref = useRef();
  const ckb2Ref = useRef();
  // const [productList, setProductList] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [addressList, setAddressList] = useState([]);
  const [currentAddress, setCurrentAddress] = useState();
  const [couponList, setCouponList] = useState([]);
  const [payment, setPayment] = useState();

  useEffect(() => {
    if (location.state !== null && products !== undefined) {
      getProductState();
      getUserInfo(email);
      getAddressList(email);
    } else {
      alert('잘못된 접근입니다.');
      navigate(-1, { replace: true });
    }
  }, []);

  const getProductState = () => {
    // const { products } = location.state;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      axios
        .get(`/purchase/productState/${product.prodCode}`)
        .then((state) => {
          if (state.data === 1) {
            alert(`${product.prodName} 은(는) 이미 대여 중인 상품입니다.`);
            products.splice(i, 1);
            i--;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // products.forEach((product) => {
    //   axios
    //   .get(`/purchase/products-details/${product.prodCode}`)
    //   .then((state) => {
    //     if (state.data === 0) {

    //     } else {
    //       alert(`${product.prodName} 은(는) 이미 대여 중인 상품입니다.`);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    // })
  };

  const getUserInfo = (email) => {
    axios
      .get(`/purchase/${email}`)
      .then((info) => {
        setUserInfo(info.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAddressList = (email) => {
    axios
      .get(`/purchase/addresses/${email}`)
      .then((list) => {
        setAddressList(list.data);
      })
      .then(() => {
        setCurrentAddress(addressList[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const paymentChange = (e, value) => {
    if (value !== null) {
      setPayment(value);
    }
  };

  const selectedPaymentText = {
    fontSize: '1.0rem',
    color: '#000000',
    fontWeight: 'bold',
  };

  const unselectedPaymentText = {
    fontSize: '0.9rem',
    color: '#777777',
  };

  const paymentBtnStyle = {
    width: '16%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #d0d0d0',
    '&.Mui-selected': {
      backgroundColor: '#d5d578',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#d5d578',
    },
  };

  return (
    <Container
      sx={{
        mt: 2,
        mb: 10,
      }}
    >
      <Container
        sx={{
          width: '1148px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 주문 상품 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            주문 상품 X개
          </HeaderTypography>
        </HeaderBox>
        {/* 주문 상품 헤더 끝 */}

        {/* 주문 상품 데이터 리스트 표기 시작 */}
        <DataBox>
          {products.length === 0 ? (
            // navigate(-1, { replace: true })
            <></>
          ) : (
            <>
              {
                console.log(products)

                // productList.map((product) => {
                //   return (
                //     <UserPurchaseProductCard
                //       key={product.prodCode}
                //       product={product}
                //     />
                //   );
                // })
              }
            </>
          )}
        </DataBox>
        {/* 주문 상품 데이터 리스트 표기 끝 */}

        {/* 주문자 정보 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            주문자 정보
          </HeaderTypography>
        </HeaderBox>
        {/* 주문자 정보 헤더 끝 */}

        {/* 주문자 정보 데이터(이름, 이메일, 휴대폰 번호) 표기 시작 */}
        <DataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>이름</OrderDataBoxTitle>
            <Typography
              sx={{
                fontSize: '1.2rem',
              }}
            >
              이승현
            </Typography>
          </OrderDataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>이메일</OrderDataBoxTitle>
            <Typography
              sx={{
                fontSize: '1.2rem',
              }}
            >
              example0001@example.com
            </Typography>
          </OrderDataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>전화번호</OrderDataBoxTitle>
            <Typography
              sx={{
                fontSize: '1.2rem',
              }}
            >
              010 - 1234 - 5678
            </Typography>
          </OrderDataBox>
        </DataBox>
        {/* 주문자 정보 데이터(이름, 이메일, 휴대폰 번호) 표기 끝 */}

        {/* 배송지 정보 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            배송지 정보
          </HeaderTypography>
          <HeaderTypography
            variant="h6"
            component="h2"
            sx={{
              color: '#c3c36a',
              cursor: 'pointer',
            }}
          >
            배송지 변경
          </HeaderTypography>
        </HeaderBox>
        {/* 배송지 정보 헤더 끝 */}

        {/* 배송지 정보 데이터(우편번호, 주소1, 주소2, 받는 사람, 전화번호, 배송 요청사항) 표기 시작 */}
        <DataBox>
          <OrderDataBox
            sx={{
              height: '80px',
            }}
          >
            <OrderDataBoxTitle>주소</OrderDataBoxTitle>
            <Typography
              sx={{
                width: '850px',
                fontSize: '1.2rem',
              }}
            >
              [13529] 경기 성남시 분당구 판교역로 166 (백현동) 카카오 본사
            </Typography>
          </OrderDataBox>
          <OrderDataBox
            sx={{
              height: '80px',
            }}
          >
            <OrderDataBoxTitle>배송 요청사항</OrderDataBoxTitle>
            <Typography
              sx={{
                width: '850px',
                fontSize: '1.2rem',
              }}
            >
              부재시 문 앞에 놔주세요.
            </Typography>
          </OrderDataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>받는 사람</OrderDataBoxTitle>
            <Typography
              sx={{
                width: '850px',
                fontSize: '1.2rem',
              }}
            >
              이승현
            </Typography>
          </OrderDataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>전화번호</OrderDataBoxTitle>
            <Typography
              sx={{
                width: '850px',
                fontSize: '1.2rem',
              }}
            >
              010 - 1234 - 5678
            </Typography>
          </OrderDataBox>
        </DataBox>
        {/* 배송지 정보 데이터(우편번호, 주소1, 주소2, 받는 사람, 전화번호, 배송 요청사항) 표기 끝 */}

        {/* 쿠폰 및 적립금 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            쿠폰 및 적립금 사용
          </HeaderTypography>
        </HeaderBox>
        {/* 쿠폰 및 적립금 헤더 끝 */}

        {/* 쿠폰 및 적립금 데이터(쿠폰, 적립금) 표기 시작 */}
        <DataBox>
          <OrderDataBox
            sx={{
              height: '60px',
            }}
          >
            <OrderDataBoxTitle>쿠폰 적용</OrderDataBoxTitle>
            <CouponSelect
              inputRef={couponRef}
              defaultValue="none"
              displayEmpty
              size="small"
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <Typography
                  sx={{
                    textAlign: 'center',
                    overflow: 'hidden',
                  }}
                >
                  사용 가능 쿠폰 x장
                </Typography>
              </MenuItem>
              <MenuItem
                value="쿠폰 코드1"
                title="쿠폰 이름 2"
                sx={{
                  width: '400px',
                }}
              >
                [10% 할인] 쿠폰 이름 1
              </MenuItem>
              <MenuItem
                value="쿠폰 코드2"
                title="쿠폰 이름 2"
                sx={{
                  width: '400px',
                }}
              >
                <Typography
                  sx={{
                    overflow: 'hidden',
                  }}
                >
                  [1,000원 할인] 쿠폰 이름 2
                </Typography>
              </MenuItem>
            </CouponSelect>
          </OrderDataBox>
          <OrderDataBox
            sx={{
              height: '60px',
            }}
          >
            <OrderDataBoxTitle>적립금 사용</OrderDataBoxTitle>
            <SavedMoneyInput
              inputRef={savedMoneyRef}
              id="텍스트 필드 아이디"
              variant="outlined"
              size="small"
              type="number"
              InputProps={{
                inputProps: { min: 0, max: 2345 },
                endAdornment: (
                  <InputAdornment position="end"> 원 / 2,345 원</InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              size="small"
              sx={{
                marginLeft: '10px',
                width: '120px',
                backgroundColor: '#c3c36a',
                borderRadius: '5px',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#c3c36a',
                  color: '#ffffff',
                },
              }}
            >
              모두 사용
            </Button>
          </OrderDataBox>
        </DataBox>
        {/* 쿠폰 및 적립금 데이터(쿠폰, 적립금) 표기 끝 */}

        {/* 결제 수단 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            결제 수단
          </HeaderTypography>
        </HeaderBox>
        {/* 결제 수단 헤더 끝 */}

        {/* 결제 수단 버튼 표기 시작 */}
        <DataBox>
          <PaymentBtnGroup
            value={String(payment)}
            exclusive
            onChange={paymentChange}
          >
            <ToggleButton value="test1" sx={paymentBtnStyle}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/Payment/credit-card.png`}
                alt="신용 카드"
                sx={payment === 'test1' ? { width: '70px' } : { width: '50px' }}
              />
              <Typography
                sx={
                  payment === 'test1'
                    ? selectedPaymentText
                    : unselectedPaymentText
                }
              >
                신용 카드
              </Typography>
            </ToggleButton>
            <ToggleButton value="test2" sx={paymentBtnStyle}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/Payment/account-transfer.png`}
                alt="계좌 이체"
                sx={payment === 'test2' ? { width: '70px' } : { width: '50px' }}
              />
              <Typography
                sx={
                  payment === 'test2'
                    ? selectedPaymentText
                    : unselectedPaymentText
                }
              >
                계좌 이체
              </Typography>
            </ToggleButton>
            <ToggleButton value="test3" sx={paymentBtnStyle}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/Payment/kakao-pay.png`}
                alt="카카오 페이"
                sx={payment === 'test3' ? { width: '70px' } : { width: '50px' }}
              />
              <Typography
                sx={
                  payment === 'test3'
                    ? selectedPaymentText
                    : unselectedPaymentText
                }
              >
                카카오 페이
              </Typography>
            </ToggleButton>
            <ToggleButton value="test4" sx={paymentBtnStyle}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/Payment/naver-pay.png`}
                alt="네이버 페이"
                sx={payment === 'test4' ? { width: '70px' } : { width: '50px' }}
              />
              <Typography
                sx={
                  payment === 'test4'
                    ? selectedPaymentText
                    : unselectedPaymentText
                }
              >
                네이버 페이
              </Typography>
            </ToggleButton>
            <ToggleButton value="test5" sx={paymentBtnStyle}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/Payment/toss.png`}
                alt="토스"
                sx={payment === 'test5' ? { width: '70px' } : { width: '50px' }}
              />
              <Typography
                sx={
                  payment === 'test5'
                    ? selectedPaymentText
                    : unselectedPaymentText
                }
              >
                토스
              </Typography>
            </ToggleButton>
            <ToggleButton value="test6" sx={paymentBtnStyle}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/Payment/mobile.png`}
                alt="휴대폰 결제"
                sx={payment === 'test6' ? { width: '70px' } : { width: '50px' }}
              />
              <Typography
                sx={
                  payment === 'test6'
                    ? selectedPaymentText
                    : unselectedPaymentText
                }
              >
                휴대폰 결제
              </Typography>
            </ToggleButton>
          </PaymentBtnGroup>
        </DataBox>
        {/* 결제 수단 버튼 표기 끝 */}

        {/* 총 결제 금액 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            총 결제 금액
          </HeaderTypography>
        </HeaderBox>
        {/* 총 결제 금액 헤더 끝 */}

        {/* 총 결제 금액 및 결제 버튼 표기 시작 */}
        <PriceContainer>
          <PriceLeftBox>
            <PriceLeftBoxRow>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                총 상품 금액
              </Typography>
              <Typography variant="h6" component="h2">
                81,000원
              </Typography>
            </PriceLeftBoxRow>
            <PriceLeftBoxRow>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                쿠폰 할인
              </Typography>
              <Typography variant="h6" component="h2">
                0원
              </Typography>
            </PriceLeftBoxRow>
            <PriceLeftBoxRow>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                사용 적립금
              </Typography>
              <Typography variant="h6" component="h2">
                0원
              </Typography>
            </PriceLeftBoxRow>
            <PriceLeftBoxRow>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                총 배송비
              </Typography>
              <Typography variant="h6" component="h2">
                2,500원
              </Typography>
            </PriceLeftBoxRow>
            <Box
              sx={{
                margin: '10px 0',
                border: '1px solid #d0d0d0',
              }}
            ></Box>
            <PriceLeftBoxRow>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                최종 결제 금액
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                2,500원
              </Typography>
            </PriceLeftBoxRow>
          </PriceLeftBox>

          <Box
            sx={{
              width: '605px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* 약관 동의 박스 시작 */}
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '10px 0',
                width: '605px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #d0d0d0',
                borderRadius: '10px',
              }}
            >
              {/* 개인 정보 수집 동의 박스 시작 */}
              <Box
                sx={{
                  marginBottom: '5px',
                  width: '605px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                {/* 체크박스 시작 */}
                <Box
                  sx={{
                    width: '38px',
                  }}
                >
                  <Checkbox
                    inputRef={ckb1Ref}
                    sx={{
                      ml: '5px',
                    }}
                    size="small"
                    color="default"
                  />
                </Box>
                {/* 체크박스 끝 */}

                {/* 개인 정보 수집 동의 텍스트 박스 시작 */}
                <Box
                  sx={{
                    padding: '0 10px',
                    width: '567px',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    (필수) 개인정보 수집 이용 및 제 3자 제공 동의
                  </Typography>
                  <Typography
                    sx={{
                      margin: '5px 0',
                    }}
                  >
                    본인은 만 14세 이상이며, 주문 내용을 확인하였습니다.
                  </Typography>
                  <Typography
                    sx={{
                      margin: '5px 0',
                    }}
                  >
                    (주)취미빌리지는 통신 판매 중개자로 거래 당사자가 아니므로,
                    판매자가 등록한 상품 정보 및 거래 등에 대해 책임을 지지
                    않습니다.
                  </Typography>
                </Box>
                {/* 개인 정보 수집 동의 텍스트 박스 끝 */}
              </Box>
              {/* 개인 정보 수집 동의 박스 끝 */}

              {/* 결제 동의 박스 시작 */}
              <Box
                sx={{
                  width: '605px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                {/* 체크박스 시작 */}
                <Box
                  sx={{
                    width: '38px',
                  }}
                >
                  <Checkbox
                    inputRef={ckb2Ref}
                    sx={{
                      ml: '5px',
                    }}
                    size="small"
                    color="default"
                  />
                </Box>
                {/* 체크박스 끝 */}

                {/* 결제 동의 텍스트 박스 시작 */}
                <Box
                  sx={{
                    padding: '0 10px',
                    width: '567px',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    (필수) 위 주문 내용을 확인하였으며 결제에 동의합니다.
                  </Typography>
                </Box>
                {/* 결제 동의 텍스트 박스 끝 */}
              </Box>
              {/* 결제 동의 박스 끝 */}
            </Box>
            {/* 약관 동의 박스 끝 */}

            {/* 결제 버튼 박스 시작 */}
            <Box>
              <Button
                variant="contained"
                // href="#"
                sx={{
                  width: '100%',
                  height: '60px',
                  backgroundColor: '#c3c36a',
                  borderRadius: '10px',
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: '#c3c36a',
                    color: '#ffffff',
                  },
                }}
              >
                결제하기
              </Button>
            </Box>
            {/* 결제 버튼 박스 끝 */}
          </Box>
        </PriceContainer>
        {/* 총 결제 금액 및 결제 버튼 표기 끝 */}
      </Container>
    </Container>
  );
};

export default Purchase;
