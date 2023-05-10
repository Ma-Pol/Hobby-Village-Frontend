import {
  Box,
  Button,
  Checkbox,
  Container,
  InputAdornment,
  MenuItem,
  Modal,
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
import DaumPostcodeEmbed from 'react-daum-postcode';

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

const HVSelect = styled(Select)({
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
  // const email = window.sessionStorage.getItem('email'); // 로그인한 유저의 이메일
  const email = 'lee@naver.com'; // 테스트용 임시 이메일

  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation(); // 이전 페이지에서 넘겨받은 데이터에 접근하기 위한 훅

  const totalPriceRef = useRef(0); // 총 상품 금액을 저장하기 위한 Ref
  const totalShippingRef = useRef(0); // 총 배송비를 저장하기 위한 Ref

  const ckb1Ref = useRef(); // 1번 약관 동의 체크박스
  const ckb2Ref = useRef(); // 2번 약관 동의 체크박스

  const [totalPrice, setTotalPrice] = useState(0); // 총 상품 금액
  const [exactTotalPrice, setExactTotalPrice] = useState(0); // 총 상품 금액(쿠폰 적용 후)

  const [userInfo, setUserInfo] = useState(); // 유저 정보
  const [addressList, setAddressList] = useState([]); // 유저의 배송지 목록
  const [selectedAddress, setSelectedAddress] = useState('none'); // 선택한 배송지

  const [couponList, setCouponList] = useState([]); // 유저의 쿠폰 목록
  const [selectedCoupon, setSelectedCoupon] = useState('none'); // 선택한 쿠폰

  const savedMoneyRef = useRef(0); // 현재 Input에 입력된 적립금 값
  const [exactSavedMoney, setExactSavedMoney] = useState(0); // 실제 적용된 적립금

  const [payment, setPayment] = useState('none'); // 결제 수단

  const [modalHandler, setModalHandler] = useState(false); // 배송지 입력 모달 핸들러
  const zipCodeRef = useRef(''); // 배송지 직접 입력 - 우편번호
  const address1Ref = useRef(''); // 배송지 직접 입력 - 주소
  const address2Ref = useRef(''); // 배송지 직접 입력 - 상세주소
  const receiverRef = useRef(''); // 배송지 직접 입력 - 받는 사람
  const phoneRef = useRef(''); // 배송지 직접 입력 - 전화번호
  const [selectedDeliRequest, setSelectedDeliRequest] = useState('none'); // 배송지 직접 입력 - 배송 요청사항
  const deliRequestRef = useRef(''); // 배송지 직접 입력 - 배송 요청사항(직접 입력하는 경우)

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    // 이전 페이지에서 넘겨받은 데이터를 체크
    if (location.state !== null && location.state.products !== undefined) {
      getProductState(); // 상품 상태 체크(대여/미대여 체크)
      getUserInfo(email); // 유저 정보 가져오기
      getAddressList(email); // 유저의 배송지 목록 가져오기
      getCouponList(email); // 유저의 쿠폰 목록 가져오기
    }
    // 이전 페이지에서 넘겨받은 데이터가 없는 경우 강제로 이전 페이지 이동
    else {
      alert('잘못된 접근입니다.');
      navigate(-1, { replace: true });
    }
  }, []);

  // 상품 상태 체크(대여/미대여 체크)
  const getProductState = () => {
    totalPriceRef.current = 0; // 총 상품 금액 저장을 위한 Ref 초기화
    totalShippingRef.current = 0; // 총 배송비 저장을 위한 Ref 초기화

    const { products } = location.state; // 이전 페이지에서 넘겨받은 상품 데이터

    // 총 상품 개수만큼 반복
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      axios
        .get(`/purchase/productState/${product.prodCode}`)
        .then((state) => {
          if (state.data === 1) {
            alert(`${product.prodName} 은(는) 이미 대여 중인 상품입니다.`);
            products.splice(i, 1);
            i--;
          } else {
            totalPriceRef.current += (product.prodPrice * product.period) / 7;
            totalShippingRef.current += product.prodShipping;

            setTotalPrice(totalPriceRef.current + totalShippingRef.current);
            setExactTotalPrice(
              totalPriceRef.current + totalShippingRef.current
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
      .catch((err) => {
        console.error(err);
      });
  };

  const getCouponList = (email) => {
    axios
      .get(`/purchase/coupons/${email}`)
      .then((list) => {
        setCouponList(list.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 배송지 Select Box 변경
  const addressChange = (e) => {
    if (e.target.value === 'none') {
      setSelectedAddress('none');
      setSelectedDeliRequest('none');
    } else if (e.target.value === '직접 입력') {
      setSelectedAddress('직접 입력');
      setSelectedDeliRequest('none');
    } else {
      setSelectedAddress(addressList[e.target.value]);
      const currentDeliRequest = addressList[e.target.value].deliRequest;
      if (currentDeliRequest === null || currentDeliRequest === '') {
        setSelectedDeliRequest('none');
      } else if (currentDeliRequest === '직접 수령하겠습니다.') {
        setSelectedDeliRequest('직접 수령하겠습니다.');
      } else if (currentDeliRequest === '배송 전 연락바랍니다.') {
        setSelectedDeliRequest('배송 전 연락바랍니다.');
      } else if (currentDeliRequest === '부재 시 경비실에 맡겨주세요.') {
        setSelectedDeliRequest('부재 시 경비실에 맡겨주세요.');
      } else if (currentDeliRequest === '부재 시 문 앞에 놓아주세요.') {
        setSelectedDeliRequest('부재 시 문 앞에 놓아주세요.');
      } else if (currentDeliRequest === '부재 시 택배함에 넣어주세요.') {
        setSelectedDeliRequest('부재 시 택배함에 넣어주세요.');
      } else {
        setSelectedDeliRequest('직접 입력');
      }
    }
  };

  // 배송지 직접 입력 - 전화번호 유효성 검사
  const phoneRefCheck = () => {
    const phone = phoneRef.current.value;
    phoneRef.current.value = phone.replace(/[^0-9]/gi, '');

    if (phone.length > 11) {
      phoneRef.current.value = phone.substring(0, 11);
    }
  };

  // 배송 요청사항 Select Box 변경
  const deliRequestChange = (e) => {
    setSelectedDeliRequest(e.target.value);
  };

  // 배송 요청사항 직접 입력 Input Box 길이 체크
  const deliRequestRefCheck = () => {
    if (deliRequestRef.current.value.length > 50) {
      deliRequestRef.current.value = deliRequestRef.current.value.substring(
        0,
        50
      );
    }
  };

  // 적용 쿠폰 변경
  const couponChange = (e) => {
    if (e.target.value === 'none') {
      setSelectedCoupon('none');
      setExactTotalPrice(totalPrice);
    } else {
      if (couponList[e.target.value].discountPer === 0) {
        setSelectedCoupon(couponList[e.target.value].discountFix);
        setExactTotalPrice(totalPrice - couponList[e.target.value].discountFix);
      } else if (couponList[e.target.value].discountFix === 0) {
        setSelectedCoupon(
          (totalPrice * couponList[e.target.value].discountPer) / 100
        );
        setExactTotalPrice(
          (totalPrice * (100 - couponList[e.target.value].discountPer)) / 100
        );
      }
    }
  };

  // 적립금 유효성 검사
  const savedMoneyRefCheck = () => {
    const savedMoney = savedMoneyRef.current.value;
    if (!/[^0-9]|^0/gi.test(savedMoney)) {
      if (userInfo.savedMoney > exactTotalPrice) {
        if (savedMoney > exactTotalPrice) {
          savedMoneyRef.current.value = exactTotalPrice;
        }
      } else {
        if (savedMoney > userInfo.savedMoney) {
          savedMoneyRef.current.value = userInfo.savedMoney;
        }
      }
    } else {
      savedMoneyRef.current.value = savedMoney.replace(/[^0-9]|^0/gi, '');
    }
  };

  // 결제 수단 변경 시 실행
  const paymentChange = (e, value) => {
    if (value !== null) {
      setPayment(value);
    }
  };

  // 결제하기 버튼 클릭 시 실행 1 (결제 유효성 검사)
  const purchaseHandler = () => {
    if (selectedAddress === 'none') {
      alert('배송지를 선택해주세요.');
      return false;
    } else if (selectedAddress === '직접 입력') {
      if (zipCodeRef.current.value === '') {
        alert('우편번호를 입력해주세요.');
        return false;
      }

      if (address1Ref.current.value === '') {
        alert('주소를 입력해주세요.');
        return false;
      }

      if (receiverRef.current.value === '') {
        alert('받는 사람을 입력해주세요.');
        return false;
      }

      if (phoneRef.current.value === '') {
        alert('전화번호를 입력해주세요.');
        return false;
      } else if (phoneRef.current.value.length < 9) {
        alert('입력된 전화번호 길이가 올바르지 않습니다.');
        return false;
      }
    }

    if (selectedDeliRequest === 'none') {
      alert('배송 요청사항을 선택해주세요.');
      return false;
    }

    if (selectedDeliRequest === '직접 입력') {
      if (deliRequestRef.current.value === '') {
        alert('배송 요청사항을 입력해주세요.');
        return false;
      }
    }

    if (payment === 'none') {
      alert('결제 수단을 선택해주세요.');
      return false;
    }

    if (!ckb1Ref.current.checked) {
      alert('개인정보 수집 이용 및 제 3자 제공 약관에 동의해주세요.');
      return false;
    }

    if (!ckb2Ref.current.checked) {
      alert('주문 상품 확인 및 결제 진행 약관에 동의해주세요.');
      return false;
    }

    alert('결제가 완료되었습니다.');
  };

  // 주소 검색 후처리
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

    zipCodeRef.current.value = data.zonecode;
    address1Ref.current.value = address1;
    address2Ref.current.value = '';
    address2Ref.current.focus();
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

  const inputBoxStyle = {
    '& .MuiInput-root': {
      '&:before': {
        borderBottom: '1px solid #010101',
      },
      '&:hover:before': {
        borderBottom: '1px solid #010101',
      },
      '&:after': {
        borderBottom: '2px solid #010101',
      },
    },
  };

  if (userInfo === undefined || addressList === undefined) {
    return <div></div>;
  } else {
    return (
      <Container
        sx={{
          mt: 2,
          mb: 10,
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
              주문 상품&nbsp;
              {location.state !== null && location.state.products.length + '개'}
            </HeaderTypography>
          </HeaderBox>
          {/* 주문 상품 헤더 끝 */}

          {/* 주문 상품 데이터 리스트 표기 시작 */}
          <DataBox>
            {location.state !== null &&
              (location.state.products.length === 0 ? (
                // navigate(-1, { replace: true })
                <></>
              ) : (
                <>
                  {location.state !== null &&
                    location.state.products.map((product) => {
                      return (
                        <UserPurchaseProductCard
                          key={product.prodCode}
                          product={product}
                        />
                      );
                    })}
                </>
              ))}
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
            {/* 셀렉트 박스와 option을 사용해서 배송지 변경, 입력이 가능하게 만들기 */}
            <OrderDataBox>
              <OrderDataBoxTitle>이름</OrderDataBoxTitle>
              <Typography
                sx={{
                  fontSize: '1.2rem',
                }}
              >
                {userInfo !== undefined && userInfo.name}
              </Typography>
            </OrderDataBox>
            <OrderDataBox>
              <OrderDataBoxTitle>이메일</OrderDataBoxTitle>
              <Typography
                sx={{
                  fontSize: '1.2rem',
                }}
              >
                {userInfo !== undefined && userInfo.email}
              </Typography>
            </OrderDataBox>
            <OrderDataBox>
              <OrderDataBoxTitle>전화번호</OrderDataBoxTitle>
              <Typography
                sx={{
                  fontSize: '1.2rem',
                }}
              >
                {userInfo !== undefined &&
                  userInfo.phone.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    '$1 - $2 - $3'
                  )}
              </Typography>
            </OrderDataBox>
          </DataBox>
          {/* 주문자 정보 데이터(이름, 이메일, 휴대폰 번호) 표기 끝 */}

          {/* 배송지 정보 헤더 시작 */}
          <HeaderBox>
            <HeaderTypography variant="h5" component="h2">
              배송지 정보
            </HeaderTypography>
          </HeaderBox>
          {/* 배송지 정보 헤더 끝 */}

          {/* 배송지 정보 데이터(우편번호, 주소1, 주소2, 받는 사람, 전화번호, 배송 요청사항) 표기 시작 */}
          <DataBox>
            <OrderDataBox
              sx={{
                height: '60px',
              }}
            >
              <OrderDataBoxTitle>배송지 선택</OrderDataBoxTitle>
              <HVSelect
                defaultValue="none"
                onChange={addressChange}
                displayEmpty
                size="small"
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                  width: '850px',
                }}
              >
                <MenuItem value="none">
                  <Typography
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    배송지를 선택하세요
                  </Typography>
                </MenuItem>
                {addressList !== undefined &&
                  addressList.map((address, index) => {
                    const addr =
                      '[' +
                      address.zipCode +
                      '] ' +
                      address.address1 +
                      ' ' +
                      address.address2;
                    return (
                      <MenuItem
                        key={address.addressCode}
                        value={index}
                        title={addr}
                      >
                        {addr}
                      </MenuItem>
                    );
                  })}
                <MenuItem value="직접 입력">배송지 직접 입력</MenuItem>
              </HVSelect>
            </OrderDataBox>

            {selectedAddress !== 'none' && (
              <>
                <OrderDataBox
                  sx={{
                    minHeight: '100px',
                  }}
                >
                  <OrderDataBoxTitle>주소</OrderDataBoxTitle>

                  {selectedAddress === '직접 입력' ? (
                    <Box
                      sx={{
                        width: '850px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          mb: 1,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                      >
                        <TextField
                          inputRef={zipCodeRef}
                          placeholder="우편번호"
                          variant="standard"
                          size="small"
                          sx={{ ...inputBoxStyle, width: '130px' }}
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
                            ml: 2,
                            height: '30px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #626262',
                            color: '#000000',
                            '&:hover': {
                              backgroundColor: '#ffffff',
                              color: '#000000',
                            },
                          }}
                        >
                          주소 검색
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          mt: 1,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <TextField
                          inputRef={address1Ref}
                          placeholder="주소"
                          variant="standard"
                          size="small"
                          sx={{ ...inputBoxStyle, width: '545px' }}
                          inputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          inputRef={address2Ref}
                          placeholder="상세 주소"
                          variant="standard"
                          size="small"
                          sx={{ ...inputBoxStyle, width: '300px' }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        width: '850px',
                        fontSize: '1.2rem',
                      }}
                    >
                      {'[' + selectedAddress.zipCode + '] '}
                      {selectedAddress.address1}&nbsp;
                      {selectedAddress.address2}
                    </Typography>
                  )}
                </OrderDataBox>

                <OrderDataBox>
                  <OrderDataBoxTitle>받는 사람</OrderDataBoxTitle>
                  <Box
                    sx={{
                      width: '850px',
                    }}
                  >
                    {selectedAddress === '직접 입력' ? (
                      <TextField
                        inputRef={receiverRef}
                        placeholder="받는 사람"
                        variant="standard"
                        size="small"
                        sx={{ ...inputBoxStyle, width: '300px' }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          width: '850px',
                          fontSize: '1.2rem',
                        }}
                      >
                        {selectedAddress.receiver}
                      </Typography>
                    )}
                  </Box>
                </OrderDataBox>

                <OrderDataBox>
                  <OrderDataBoxTitle>전화번호</OrderDataBoxTitle>
                  <Box
                    sx={{
                      width: '850px',
                    }}
                  >
                    {selectedAddress === '직접 입력' ? (
                      <TextField
                        inputRef={phoneRef}
                        onChange={phoneRefCheck}
                        placeholder="전화번호 ( - 제외)"
                        variant="standard"
                        size="small"
                        sx={{ ...inputBoxStyle, width: '300px' }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          width: '850px',
                          fontSize: '1.2rem',
                        }}
                      >
                        {selectedAddress.phone.replace(
                          /(\d{3})(\d{4})(\d{4})/,
                          '$1 - $2 - $3'
                        )}
                      </Typography>
                    )}
                  </Box>
                </OrderDataBox>

                <OrderDataBox
                  sx={{
                    pb: '4px',
                  }}
                >
                  <OrderDataBoxTitle>배송 요청사항</OrderDataBoxTitle>
                  <Box
                    sx={{
                      width: '850px',
                    }}
                  >
                    <HVSelect
                      value={selectedDeliRequest}
                      onChange={deliRequestChange}
                      displayEmpty
                      size="small"
                      inputProps={{ 'aria-label': 'Without label' }}
                      sx={{
                        width: '400px',
                      }}
                    >
                      <MenuItem value="none" disabled>
                        <Typography
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          배송 시 요청사항을 선택하세요
                        </Typography>
                      </MenuItem>

                      <MenuItem value="직접 수령하겠습니다.">
                        직접 수령하겠습니다.
                      </MenuItem>
                      <MenuItem value="배송 전 연락바랍니다.">
                        배송 전 연락바랍니다.
                      </MenuItem>
                      <MenuItem value="부재 시 경비실에 맡겨주세요.">
                        부재 시 경비실에 맡겨주세요.
                      </MenuItem>
                      <MenuItem value="부재 시 문 앞에 놓아주세요.">
                        부재 시 문 앞에 놓아주세요.
                      </MenuItem>
                      <MenuItem value="부재 시 택배함에 넣어주세요.">
                        부재 시 택배함에 넣어주세요.
                      </MenuItem>
                      <MenuItem value="직접 입력">직접 입력</MenuItem>
                    </HVSelect>
                  </Box>
                </OrderDataBox>

                {selectedDeliRequest === '직접 입력' && (
                  <OrderDataBox>
                    <OrderDataBoxTitle></OrderDataBoxTitle>
                    <Box
                      sx={{
                        width: '850px',
                      }}
                    >
                      <TextField
                        defaultValue={
                          selectedAddress !== null &&
                          selectedAddress.deliRequest
                        }
                        inputRef={deliRequestRef}
                        onChange={deliRequestRefCheck}
                        placeholder="배송 요청사항(최대 50자)"
                        variant="standard"
                        size="small"
                        sx={{ ...inputBoxStyle, width: '400px' }}
                      />
                    </Box>
                  </OrderDataBox>
                )}
              </>
            )}
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
              <HVSelect
                onChange={couponChange}
                defaultValue="none"
                displayEmpty
                size="small"
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="none">
                  <Typography
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    사용 가능 쿠폰 {couponList.length}장
                  </Typography>
                </MenuItem>

                {couponList !== undefined &&
                  couponList.map((coupon, index) => {
                    const discount =
                      coupon.discountFix === 0
                        ? '[' + coupon.discountPer + '% 할인] '
                        : '[' +
                          coupon.discountFix
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                          '원 할인] ';
                    return (
                      <MenuItem
                        key={coupon.couponCode}
                        value={index}
                        disabled={couponList[index].discountFix > totalPrice}
                        title={discount + coupon.couponName}
                        sx={{
                          width: '400px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {discount + coupon.couponName}
                      </MenuItem>
                    );
                  })}
              </HVSelect>
            </OrderDataBox>
            <OrderDataBox
              sx={{
                height: '60px',
              }}
            >
              <OrderDataBoxTitle>적립금 사용</OrderDataBoxTitle>
              <SavedMoneyInput
                inputRef={savedMoneyRef}
                variant="outlined"
                size="small"
                onChange={savedMoneyRefCheck}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (savedMoneyRef.current.value === '') {
                      setExactSavedMoney(0);
                    } else {
                      setExactSavedMoney(savedMoneyRef.current.value);
                    }
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      &nbsp; 원 /&nbsp;
                      {userInfo.savedMoney
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      &nbsp; 원
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  if (savedMoneyRef.current.value === '') {
                    setExactSavedMoney(0);
                  } else {
                    setExactSavedMoney(savedMoneyRef.current.value);
                  }
                }}
                sx={{
                  marginLeft: '10px',
                  width: '80px',
                  backgroundColor: '#ffffff',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                  },
                }}
              >
                적용
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  savedMoneyRef.current.value = userInfo.savedMoney;
                }}
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
                전액 사용
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
                  sx={
                    payment === 'test1' ? { width: '70px' } : { width: '50px' }
                  }
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
                  sx={
                    payment === 'test2' ? { width: '70px' } : { width: '50px' }
                  }
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
                  sx={
                    payment === 'test3' ? { width: '70px' } : { width: '50px' }
                  }
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
                  sx={
                    payment === 'test4' ? { width: '70px' } : { width: '50px' }
                  }
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
                  sx={
                    payment === 'test5' ? { width: '70px' } : { width: '50px' }
                  }
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
                  sx={
                    payment === 'test6' ? { width: '70px' } : { width: '50px' }
                  }
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
                  {location.state !== null &&
                    totalPriceRef.current
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  &nbsp;원
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
                  {location.state !== null &&
                    totalShippingRef.current
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  &nbsp;원
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
                  {selectedCoupon !== 'none' ? selectedCoupon : '0'}&nbsp;원
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
                  {location.state !== null &&
                    exactSavedMoney
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  &nbsp;원
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
                  {location.state !== null && exactTotalPrice - exactSavedMoney}
                  &nbsp;원
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
                      (주)취미빌리지는 통신 판매 중개자로 거래 당사자가
                      아니므로, 판매자가 등록한 상품 정보 및 거래 등에 대해
                      책임을 지지 않습니다.
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
                  onClick={purchaseHandler}
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
  }
};

export default Purchase;
