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
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import UserPurchaseProductCard from '../../components/user-purchase/UserPurchaseProductCard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DaumPostcodeEmbed from 'react-daum-postcode';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';
import Loading from '../../components/Loading';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#6f6f6f',
    color: '#ffffff',
    maxWidth: 220,
    border: '1px solid #6f6f6f',
  },
}));

const HeaderTypography = styled(Typography)({
  fontWeight: 'bold',
  userSelect: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
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
  const [loading, setLoading] = useState(true);
  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기

  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation(); // 이전 페이지에서 넘겨받은 데이터에 접근하기 위한 훅

  const totalPriceRef = useRef(0); // 총 상품 금액을 저장하기 위한 Ref
  const totalShippingRef = useRef(0); // 총 배송비를 저장하기 위한 Ref

  const ckb1Ref = useRef(); // 1번 약관 동의 체크박스
  const ckb2Ref = useRef(); // 2번 약관 동의 체크박스

  const [productList, setProductList] = useState([]); // 상품 목록

  const [userInfo, setUserInfo] = useState(); // 유저 정보
  const [addressList, setAddressList] = useState([]); // 유저의 배송지 목록
  const [selectedAddress, setSelectedAddress] = useState('none'); // 선택한 배송지

  const [totalPrice, setTotalPrice] = useState(0); // 총 상품 금액(배송비 포함. 쿠폰 적용 전)
  const [exactTotalPrice, setExactTotalPrice] = useState(0); // 총 상품 금액(쿠폰 적용 후)

  const [couponList, setCouponList] = useState([]); // 유저의 쿠폰 목록
  const [selectedCouponIndex, setSelectedCouponIndex] = useState(-1); // 선택한 쿠폰의 인덱스
  const [selectedCoupon, setSelectedCoupon] = useState('none'); // 선택한 쿠폰의 할인 금액

  const savedMoneyRef = useRef(0); // 현재 Input에 입력된 적립금 값
  const [exactSavedMoney, setExactSavedMoney] = useState(0); // 실제 적용된 적립금

  const [payment, setPayment] = useState('none'); // 현재 선택된 결제 수단

  const [modalHandler, setModalHandler] = useState(false); // 배송지 입력 모달 핸들러
  const zipCodeRef = useRef(''); // 배송지 직접 입력 - 우편번호
  const address1Ref = useRef(''); // 배송지 직접 입력 - 주소
  const address2Ref = useRef(''); // 배송지 직접 입력 - 상세주소
  const receiverRef = useRef(''); // 배송지 직접 입력 - 받는 사람
  const phoneRef = useRef(''); // 배송지 직접 입력 - 전화번호
  const [selectedDeliRequest, setSelectedDeliRequest] = useState('none'); // 배송지 직접 입력 - 배송 요청사항
  const deliRequestRef = useRef(''); // 배송지 직접 입력 - 배송 요청사항(직접 입력하는 경우)

  useEffect(() => {
    if (email === null) {
      alert('로그인 후 이용해주세요.');
      navigate('/login', { replace: true });
    } else {
      // 이전 페이지에서 넘겨받은 데이터를 체크
      if (location.state !== null && location.state.products !== undefined) {
        getUserInfo(email); // 유저 정보 가져오기
        getCouponList(email); // 유저의 쿠폰 목록 가져오기
        checkProductInfo(location.state.products); // state에 저장된 상품 정보와 실제 상품 정보 비교

        if (location.state.prevPage !== 'mypages') {
          checkProductState(); // 상품 상태 체크(대여/미대여 체크)
          getAddressList(email); // 유저의 배송지 목록 가져오기
        } else {
          setProductList([location.state.products[0]]); // 마이페이지 접근일 때 상품 목록 저장
          totalPriceRef.current =
            (location.state.products[0].prodPrice *
              location.state.products[0].period) /
            7; // 총 상품 금액 저장
          totalShippingRef.current = 0; // 추가 결제 시 배송비는 없음
          setTotalPrice(totalPriceRef.current);
          setExactTotalPrice(totalPriceRef.current);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      }
      // 이전 페이지에서 넘겨받은 데이터가 없는 경우 강제로 이전 페이지 이동
      else {
        alert('잘못된 접근입니다.');
        navigate(-1, { replace: true });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 상품 상태 체크(대여/미대여 체크)
  const checkProductState = async () => {
    await setProductList([]);
    totalPriceRef.current = 0; // 총 상품 금액 저장을 위한 Ref 초기화
    totalShippingRef.current = 0; // 총 배송비 저장을 위한 Ref 초기화

    const { products } = location.state; // 이전 페이지에서 넘겨받은 상품 데이터

    // 총 상품 개수만큼 반복
    for (let prodIndex = 0; prodIndex < products.length; prodIndex++) {
      const product = products[prodIndex];
      await axios
        .get(`/purchase/productState/${product.prodCode}`)
        .then((state) => {
          if (state.data !== 0) {
            alert(
              `${product.prodName} 은(는) 이미 대여 중이거나 삭제된 상품입니다.`
            );
          } else {
            const newProduct = productList;
            newProduct.push(product);
            setProductList(newProduct);

            totalPriceRef.current += (product.prodPrice * product.period) / 7;
            totalShippingRef.current += product.prodShipping;

            setTotalPrice(totalPriceRef.current + totalShippingRef.current);
            setExactTotalPrice(
              totalPriceRef.current + totalShippingRef.current
            );
          }
        })
        .finally(() => {
          if (prodIndex === products.length - 1 && productList.length === 0) {
            alert('주문 가능한 상품이 없습니다.');
            navigate(-1, { replace: true });
          } else if (prodIndex === products.length - 1) {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // state에 저장된 상품 정보와 실제 상품 정보 비교
  const checkProductInfo = async (products) => {
    // 상품 개수만큼 반복
    for (let i = 0; i < products.length; i++) {
      let isCorrect = true;
      const product = products[i];
      await axios
        .get(`/purchase/productInfo`, {
          params: product,
        })
        .then((res) => {
          if (res.data !== 1) {
            isCorrect = false;
          }
        })
        .catch((err) => {
          console.error(err);
        });

      if (!isCorrect) {
        alert(`상품 정보가 올바르지 않습니다. 결제 과정을 중단합니다.`);
        navigate(-1, { replace: true });
        break;
      }
    }
  };

  // 유저 정보 가져오기
  const getUserInfo = async (email) => {
    await axios
      .get(`/purchase/${email}`)
      .then((info) => {
        setUserInfo(info.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 유저 배송지 목록 가져오기
  const getAddressList = async (email) => {
    await axios
      .get(`/purchase/addresses/${email}`)
      .then((list) => {
        setAddressList(list.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 유저 쿠폰 목록 불러오기
  const getCouponList = async (email) => {
    await axios
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
    // 배송지를 선택하세요 선택 시
    if (e.target.value === 'none') {
      setSelectedAddress('none');
      setSelectedDeliRequest('none');
    }

    // 직접 입력 선택 시
    else if (e.target.value === '직접 입력') {
      setSelectedAddress('직접 입력');
      setSelectedDeliRequest('none');
    }

    // 기존 배송지 선택 시
    else {
      // 현재 선택된 배송지 정보를 저장
      setSelectedAddress(addressList[e.target.value]);

      // 현재 선택된 배송지의 배송 요청사항을 저장
      const currentDeliRequest = addressList[e.target.value].deliRequest;

      // 배송 요청사항이 없는 경우
      if (currentDeliRequest === null || currentDeliRequest === '') {
        setSelectedDeliRequest('none');
      }

      // 배송 요청사항이 직접 수령하겠습니다.인 경우
      else if (currentDeliRequest === '직접 수령하겠습니다.') {
        setSelectedDeliRequest('직접 수령하겠습니다.');
      }

      // 배송 요청사항이 배송 전 연락바랍니다.인 경우
      else if (currentDeliRequest === '배송 전 연락바랍니다.') {
        setSelectedDeliRequest('배송 전 연락바랍니다.');
      }

      // 배송 요청사항이 부재 시 경비실에 맡겨주세요.인 경우
      else if (currentDeliRequest === '부재 시 경비실에 맡겨주세요.') {
        setSelectedDeliRequest('부재 시 경비실에 맡겨주세요.');
      }

      // 배송 요청사항이 부재 시 문 앞에 놓아주세요.인 경우
      else if (currentDeliRequest === '부재 시 문 앞에 놓아주세요.') {
        setSelectedDeliRequest('부재 시 문 앞에 놓아주세요.');
      }

      // 배송 요청사항이 부재 시 택배함에 넣어주세요.인 경우
      else if (currentDeliRequest === '부재 시 택배함에 넣어주세요.') {
        setSelectedDeliRequest('부재 시 택배함에 넣어주세요.');
      }

      // 배송 요청사항이 그 외인 경우
      else {
        setSelectedDeliRequest(currentDeliRequest);
      }
    }
  };

  // 배송지 직접 입력 - 전화번호 입력 값 필터링(문자 입력 x, 11자리 이하)
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
    // 적용 쿠폰 변경 시 적용된 적립금 초기화(최종 가격이 음수로 설정되는 것을 방지)
    savedMoneyRef.current.value = 0;
    setExactSavedMoney(0);

    // 적용된 쿠폰이 없는 경우
    if (e.target.value === 'none') {
      // 선택 쿠폰 인덱스를 무효값으로 설정
      setSelectedCouponIndex(-1);

      // 선택된 쿠폰을 'none'으로 변경
      setSelectedCoupon('none');

      // 쿠폰 적용 전 가격으로 변경(쿠폰 변경 시 계속 가격이 차감되는 것을 방지)
      setExactTotalPrice(totalPrice);
    }
    // 특정 쿠폰을 선택한 경우
    else {
      // 선택 쿠폰 인덱스를 현재 선택한 쿠폰의 인덱스로 변경
      setSelectedCouponIndex(e.target.value);

      // 선택한 쿠폰이 고정 금액 할인 쿠폰인 경우
      if (couponList[e.target.value].discountPer === 0) {
        // 선택한 쿠폰으로 할인된 가격을 저장(최종 가격란에 표기하기 위함)
        setSelectedCoupon(couponList[e.target.value].discountFix);

        // 쿠폰 할인이 적용된 가격을 저장
        setExactTotalPrice(totalPrice - couponList[e.target.value].discountFix);
      }
      // 선택한 쿠폰이 퍼센트 단위 할인 쿠폰인 경우
      else if (couponList[e.target.value].discountFix === 0) {
        // 선택한 쿠폰으로 할인된 가격을 저장(최종 가격란에 표기하기 위함)
        setSelectedCoupon(
          (totalPrice * couponList[e.target.value].discountPer) / 100
        );

        // 쿠폰 할인이 적용된 가격을 저장
        setExactTotalPrice(
          (totalPrice * (100 - couponList[e.target.value].discountPer)) / 100
        );
      }
    }
  };

  // 적립금 유효성 검사
  const savedMoneyRefCheck = () => {
    const savedMoney = savedMoneyRef.current.value;

    // 적립금이 숫자인 경우 이하 실행
    if (!/[^0-9]|^0/gi.test(savedMoney)) {
      // 유저의 적립금이 총 상품 가격보다 큰 경우
      if (userInfo.savedMoney > exactTotalPrice) {
        // 입력된 적립금 값이 총 상품 가격보다 크다면 총 상품 가격으로 변경
        if (savedMoney > exactTotalPrice - 100) {
          savedMoneyRef.current.value = exactTotalPrice - 100;
        }
      }
      // 유저의 적립금이 총 상품 가격 이하인 경우
      else {
        // 입력된 적립금 값이 유저의 총 적립금보다 크다면 유저의 총 적립금으로 변경
        if (savedMoney > userInfo.savedMoney) {
          savedMoneyRef.current.value = userInfo.savedMoney;
        }
      }
    }
    // 숫자가 아닌 값이 입력된 경우 해당 값 제거
    else {
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
    // 추가 주문인지 확인 후 유효성 검사 (추가 주문의 경우 배송지가 필요 없음)
    if (location.state.prevPage !== 'mypages') {
      const phoneRegExp = /^(010|011|016|017|018|019)-[0-9]{3,4}-[0-9]{4}$/;

      // 선택된 배송지가 없는 경우
      if (selectedAddress === 'none') {
        alert('배송지를 선택해주세요.');
        return false;
      }

      // 배송지 직접 입력을 선택한 경우 이하 인풋박스 유효성 검사
      else if (selectedAddress === '직접 입력') {
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
        } else if (!phoneRegExp.test(phoneRef.current.value)) {
          alert('전화번호 형식이 올바르지 않습니다.');
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

    purchaseProcess();
  };

  // 결제하기 버튼 클릭 시 실행 2 (실제 결제 프로세스)
  const purchaseProcess = async () => {
    let processCheck = true;
    const odrNumber =
      new Date().getTime() + '-' + Math.floor(Math.random() * 10000 * 10000);

    const { prevPage } = location.state;
    const prevOdrNumber =
      productList[0].prevOdrNumber !== undefined
        ? productList[0].prevOdrNumber
        : '';

    // 추가 결제인지 확인 후 결제 프로세스 진행
    // 추가 결제가 아닌 경우, 상품 목록 관련 프로세스 진행행
    if (prevPage !== 'mypages') {
      // 각 상품들이 대여 상태인지 한번 더 확인
      for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        await axios
          .get(`/purchase/productState/${product.prodCode}`)
          .then((state) => {
            // 대여 중인 상품이 있다면 구매 불가
            if (state.data !== 0) {
              alert(
                `결제에 실패했습니다. 다시 시도해주세요.\nERROR: 이미 대여중이거나 삭제된 상품이 존재합니다.\n\n${product.prodName}`
              );

              failedNavigate(prevPage); // 결제 실패 시 이전 페이지로 이동
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

      // 각 상품들의 prodIsRental을 1로 변경
      for (let i = 0; i < productList.length; i++) {
        const product = productList[i];

        await axios
          .patch(`/purchase/productState/${product.prodCode}`)
          .then((res) => {
            if (res.data !== 1) {
              alert(
                '결제에 실패했습니다. 다시 시도해주세요.\nERROR: FAIL TO UPDATE PRODUCT STATE'
              );

              purchaseFailed(productList); // 결제 실패 시 상품 상태를 원래대로 되돌림
              failedNavigate(prevPage); // 결제 실패 시 이전 페이지로 이동
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }

    // 3. 실 결제 진행 전 결제 정보를 서버에 저장
    await axios
      .post(
        `/purchase/preInsertOrder/${prevPage}`,
        setOrderData(odrNumber, productList, prevOdrNumber, prevPage)
      )
      .then((res) => {
        if (res.data !== 1) {
          alert(
            '결제에 실패했습니다. 다시 시도해주세요.\nERROR: FAIL TO INSERT ORDER 1'
          );
          processCheck = false;

          if (prevPage !== 'mypages') {
            purchaseFailed(productList); // 결제 실패 시 상품 상태를 원래대로 되돌림
          }
          failedNavigate(prevPage); // 결제 실패 시 이전 페이지로 이동
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // 4. 실 결제 진행 전 결제 정보를 아임포트 서버에 저장
    await axios
      .post(
        `/purchase/payments/prepare`,
        setOrderData(odrNumber, productList, prevOdrNumber, prevPage)
      )
      .then((res) => {
        if (res.data !== 0) {
          alert(
            '결제에 실패했습니다. 다시 시도해주세요.\nERROR: FAIL TO INSERT ORDER 2'
          );
          processCheck = false;

          if (prevPage !== 'mypages') {
            purchaseFailed(productList); // 결제 실패 시 상품 상태를 원래대로 되돌림
          }
          failedNavigate(prevPage); // 결제 실패 시 이전 페이지로 이동
        }
      });

    // 5. 실 결제 진행 (아임포트(포트원) API 사용)
    const { IMP } = window; // 아임포트
    IMP.init('imp76456783'); // 아임포트 아이디

    // pgCode: 결제사 코드
    // 신용카드, 계좌이체 결제: html5_inicis.INIBillTst
    // 휴대폰 결제: kcp
    // 카카오 페이: kakaopay - payMethod 무시
    // 토스 페이: tosspay - card
    // 페이코: payco - payMethod 무시

    // payMethod: 결제 수단
    // card: 신용카드
    // trans: 계좌이체
    // phone: 휴대폰

    if (processCheck) {
      const pgCode =
        payment === 'phone'
          ? 'kcp'
          : payment === 'tosspay'
          ? 'tosspay'
          : payment === 'kakaopay'
          ? 'kakaopay'
          : payment === 'payco'
          ? 'payco'
          : 'html5_inicis.INIBillTst';

      const payMethod =
        payment === 'tosspay' || payment === 'kakaopay' ? 'card' : payment;

      await IMP.request_pay(
        {
          pg: pgCode, // 결제사 선택
          pay_method: payMethod, // 결제 방식
          merchant_uid: odrNumber, // 주문번호
          name: 'hobby-village: test', // 주문명
          amount: exactTotalPrice - exactSavedMoney, // 결제 금액
          buyer_email: email, // 구매자 이메일
          buyer_name: userInfo.name, // 구매자 이름
          buyer_tel: userInfo.phone, // 구매자 전화번호
          buyer_postcode: selectedAddress.zipCode, // 구매자 우편번호
          buyer_addr: `${selectedAddress.address1} ${selectedAddress.address2}`, // 구매자 주소
          escrow: false, // 에스크로 사용 여부
          custom_data: {
            // 주문에 귀속된 상품 정보
            products: productList,
          },
        },

        // 결제 후처리 함수
        async (res) => {
          const { success, imp_uid, paid_amount, error_code, error_msg } = res;

          // 5-1. 결제 성공 시 결제 후처리
          if (success) {
            // 5-1-1. 결제 데이터와 DB에 저장된 주문 정보를 비교
            const compareSuccess = await compareOrderData(
              odrNumber,
              imp_uid,
              paid_amount,
              prevPage
            );
            // 데이터가 일치하는 경우(compareSuccess === true) 결제 후처리 추가 진행

            if (compareSuccess) {
              // 상품 대여 횟수 증가, 유저 적립금 차감, 유저 쿠폰 데이터 삭제, orderProducts 테이블 데이터 추가
              // 5-1-2. 상품 대여 횟수 증가(products > product.period / 7 만큼 증가)
              await increaseRentalCount(productList);

              // 5-1-3. 유저 적립금 차감
              if (exactSavedMoney > 0) {
                await decreaseSavedMoney(email, exactSavedMoney);
              }

              // 5-1-4. 유저 쿠폰 데이터 삭제
              if (selectedCouponIndex !== -1) {
                await deleteCoupon(email, selectedCouponIndex);
              }

              // 5-1-5. 장바구니에서 해당 상품 삭제
              if (prevPage !== 'mypages') {
                await deleteCart(email, productList);
              }

              // 5-1-6. orderProducts 테이블 데이터 추가
              for (let i = 0; i < productList.length; i++) {
                const product = productList[i];

                const orderProductData = {
                  odrNumber: odrNumber,
                  imp_uid: imp_uid,
                  prodCode: product.prodCode,
                  rentalPeriod: product.period,
                  prevOdrNumber: prevOdrNumber, // 추가 주문 시 이전 주문 데이터 검색용
                };

                await purchaseFinalProcess(orderProductData, prevPage);
              }

              alert(`결제가 완료되었습니다!`);
              await navigate(`/mypages/${email}/orders`, { replace: true });
            }

            // 결제 후처리 실패
            else {
              await cancelOrder(imp_uid); // 결제 실패 시 1. 아임포트 결제 취소

              if (prevPage !== 'mypages') {
                await purchaseFailed(productList); // 결제 실패 시 2. 상품 상태를 원래대로 되돌림
              }

              await rollbackOrder(odrNumber, prevPage); // 결제 실패 시 3. 주문 정보를 삭제
              await failedNavigate(prevPage); // 결제 실패 시 4. 이전 페이지로 이동
            }
          }

          // 5-2. 결제 실패 시 에러 메시지 출력 후 이전 페이지로 이동
          else {
            alert(
              `결제에 실패했습니다. 다시 시도해주세요.\n${error_code}: ${error_msg}`
            );

            purchaseFailed(productList); // 결제 실패 시 1. 상품 상태를 원래대로 되돌림
            rollbackOrder(odrNumber, prevPage); // 결제 실패 시 2. 주문 정보를 삭제
            failedNavigate(prevPage); // 결제 실패 시 3. 이전 페이지로 이동
          }
        }
      );
    }
  };

  // 주문 데이터 설정
  const setOrderData = (odrNumber, products, prevOdrNumber, prevPage) => {
    const orderData = {
      odrNumber: odrNumber,
      odrPayment: payment,
      exactPrice: exactTotalPrice - exactSavedMoney,
      usedSavedMoney: exactSavedMoney,
      odrEmail: email,
      odrPhone:
        prevPage === 'mypages'
          ? ''
          : selectedAddress === '직접 입력'
          ? phoneRef.current.value
          : selectedAddress.phone,
      odrZipCode:
        prevPage === 'mypages'
          ? ''
          : selectedAddress === '직접 입력'
          ? zipCodeRef.current.value
          : selectedAddress.zipCode,
      odrAddress1:
        prevPage === 'mypages'
          ? ''
          : selectedAddress === '직접 입력'
          ? address1Ref.current.value
          : selectedAddress.address1,
      odrAddress2:
        prevPage === 'mypages'
          ? ''
          : selectedAddress === '직접 입력'
          ? address2Ref.current.value
          : selectedAddress.address2,
      receiver:
        prevPage === 'mypages'
          ? ''
          : selectedAddress === '직접 입력'
          ? receiverRef.current.value
          : selectedAddress.receiver,
      deliRequest:
        prevPage === 'mypages'
          ? ''
          : selectedDeliRequest === '직접 입력'
          ? deliRequestRef.current.value
          : selectedDeliRequest,
      // 추가 주문 시 필요한 데이터
      prodCode: products[0].prodCode,
      rentalPeriod: products[0].period,
      prevOdrNumber: prevOdrNumber,
    };

    return orderData;
  };

  // 결제 성공 후처리 함수 1: 결제 데이터와 DB에 저장된 주문 정보를 비교
  const compareOrderData = async (
    odrNumber,
    imp_uid,
    paid_amount,
    prevPage
  ) => {
    let compareSuccess = false;

    await axios
      .get(
        `/purchase/compare/${odrNumber}/${imp_uid}/${paid_amount}/${prevPage}`
      )
      .then((res) => {
        // 데이터가 일치하지 않는 경우 에러 메시지 출력
        if (res.data !== 1) {
          alert(
            `결제에 실패했습니다. 다시 시도해주세요.\nERROR: DATA DOESN'T MATCH`
          );
        } else {
          compareSuccess = true;
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return compareSuccess;
  };

  // 결제 성공 후처리 함수 2: 상품 대여 횟수 증가
  const increaseRentalCount = (products) => {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      axios
        .patch(
          `/purchase/success/increaseRentalCount/${product.prodCode}/${product.period}`
        )
        .then((res) => {
          if (res.data !== 1) {
            alert(
              `예기치 못한 오류가 발생했습니다!\nERROR: FAIL TO INCREASE RENTAL COUNT`
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // 결제 성공 후처리 함수 3: 유저 적립금 차감
  const decreaseSavedMoney = (email, exactSavedMoney) => {
    axios
      .patch(`/purchase/success/decreaseSavedMoney/${email}/${exactSavedMoney}`)
      .then((res) => {
        if (res.data !== 1) {
          alert(
            `예기치 못한 오류가 발생했습니다!\nERROR: FAIL TO DECREASE SAVED MONEY`
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 결제 성공 후처리 함수 4: 유저 쿠폰 데이터 삭제
  const deleteCoupon = (email, selectedCouponIndex) => {
    const coupon = couponList[selectedCouponIndex];
    axios
      .delete(`/purchase/success/deleteCoupon/${email}/${coupon.couponCode}`)
      .then((res) => {
        if (res.data !== 1) {
          alert(
            `예기치 못한 오류가 발생했습니다!\nERROR: FAIL TO DELETE COUPON`
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 결제 성공 후처리 함수 5: 장바구니 상품 데이터 삭제
  const deleteCart = (email, products) => {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      axios
        .delete(`/purchase/success/deleteCart/${email}/${product.prodCode}`)
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // 결제 성공 후처리 함수 6: 주문 상품 데이터 추가 또는 변경 + imp_uid 추가
  const purchaseFinalProcess = (orderProductData, prevPage) => {
    axios
      .post(
        `/purchase/success/purchaseFinalProcess/${prevPage}`,
        orderProductData
      )
      .then((res) => {
        if (res.data !== 1) {
          alert(
            `예기치 못한 오류가 발생했습니다!\nERROR: FAIL TO PURCHASE FINAL PROCESS`
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 결제 실패 후처리 함수 1: 상품 상태를 원래대로 되돌림
  const purchaseFailed = (products) => {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      axios
        .patch(`/purchase/fail/productState/${product.prodCode}`)
        .then((res) => {
          if (res.data !== 1) {
            alert(
              `결제 취소 과정 중 예기치 못한 오류가 발생했습니다!\nERROR: FAIL TO ROLLBACK PRODUCT STATE`
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // 결제 실패 후처리 함수 2: 임시 주문 정보를 삭제
  const rollbackOrder = (odrNumber, prevPage) => {
    axios
      .delete(`/purchase/fail/deleteOrder/${odrNumber}/${prevPage}`)
      .then((res) => {
        if (res.data !== 1) {
          alert(
            `결제 취소 과정 중 예기치 못한 오류가 발생했습니다!\nERROR: FAIL TO DELETE ORDER`
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 결제 실패 후처리 함수 3: 아임포트 주문 취소
  const cancelOrder = (imp_uid) => {
    axios
      .get(`/purchase/fail/cancelOrder/${imp_uid}`)
      .then((res) => {
        if (res.data !== 0) {
          alert(
            `결제 취소 과정 중 예기치 못한 오류가 발생했습니다!\nERROR: FAIL TO CANCEL ORDER`
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 결제 실패 후처리 함수 4: 이전 페이지로 이동
  const failedNavigate = (prevPage) => {
    // 장바구니에서 접근한 경우 장바구니 페이지로 이동
    if (prevPage === 'carts') {
      return navigate(`/carts/${email}/lists/all`, { replace: true });
    }
    // 상품 상세 페이지에서 접근한 경우 상품 상세 페이지로 이동
    else if (prevPage === 'details') {
      return navigate(
        `/products/details/${location.state.products[0].prodCode}`,
        { replace: true }
      );
    }
    // 마이페이지에서 접근한 경우 마이페이지로 이동
    else {
      return navigate(`/mypages/${email}`, { replace: true });
    }
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

  // 스타일
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

  if (loading) {
    return (
      <>
        <UserHeader />
        <Loading height={'100vh'} />
        <UserFooter />
      </>
    );
  } else {
    return (
      <>
        <UserHeader />
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
                {productList.length !== 0 && productList.length + '개'}
              </HeaderTypography>
            </HeaderBox>
            {/* 주문 상품 헤더 끝 */}

            {/* 주문 상품 데이터 리스트 표기 시작 */}
            <DataBox>
              {productList.length === 0 ? (
                <></>
              ) : (
                <>
                  {productList !== null &&
                    productList.map((product) => {
                      return (
                        <UserPurchaseProductCard
                          key={product.prodCode}
                          product={product}
                          prevPage={location.state.prevPage}
                        />
                      );
                    })}
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
                    userInfo?.phone.replace(
                      /(\d{3})(\d{4})(\d{4})/,
                      '$1 - $2 - $3'
                    )}
                </Typography>
              </OrderDataBox>
            </DataBox>
            {/* 주문자 정보 데이터(이름, 이메일, 휴대폰 번호) 표기 끝 */}

            {/* 배송지 정보 헤더 시작 (추가 주문 시에는 표기하지 않음) */}
            {location.state !== null &&
              location.state.prevPage !== 'mypages' && (
                <>
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
                      {/* 배송지 선택 Select 박스 표기 시작 */}
                      <OrderDataBoxTitle>배송지 선택</OrderDataBoxTitle>
                      <HVSelect
                        defaultValue="none"
                        onChange={addressChange}
                        displayEmpty
                        size="small"
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

                        {addressList.length !== 0 &&
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
                      {/* 배송지 선택 Select 박스 표기 끝 */}
                    </OrderDataBox>

                    {/* 주소, 받는 사람, 전화번호, 배송 요청사항 표기 시작 */}
                    {selectedAddress !== 'none' && (
                      <>
                        <OrderDataBox
                          sx={{
                            minHeight: '100px',
                          }}
                        >
                          <OrderDataBoxTitle>주소</OrderDataBoxTitle>

                          {/* 주소 표기 시작 (직접 입력인 경우 TextField) */}
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
                                    readOnly: true, // 우편번호는 직접 입력할 수 없도록 설정
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
                                    readOnly: true, // 기본 주소는 직접 입력할 수 없도록 설정
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
                          {/* 주소 표기 끝 (직접 입력인 경우 TextField) */}
                        </OrderDataBox>

                        <OrderDataBox>
                          <OrderDataBoxTitle>받는 사람</OrderDataBoxTitle>
                          {/* 받는 사람 표기 시작 (직접 입력인 경우 TextField) */}
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
                          {/* 받는 사람 표기 끝 (직접 입력인 경우 TextField) */}
                        </OrderDataBox>

                        <OrderDataBox>
                          <OrderDataBoxTitle>전화번호</OrderDataBoxTitle>

                          {/* 전화번호 표기 시작 (직접 입력인 경우 TextField) */}
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
                          {/* 전화번호 표기 끝 (직접 입력인 경우 TextField) */}
                        </OrderDataBox>

                        <OrderDataBox
                          sx={{
                            pb: '4px',
                          }}
                        >
                          <OrderDataBoxTitle>배송 요청사항</OrderDataBoxTitle>

                          {/* 배송 요청사항 표기 시작 */}
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

                              {/* 
                            선택한 배송지 목록에 요청사항이 없거나
                            배송지 직접 입력을 선택한 경우에는 미표기,
                            배송지 목록에 요청사항이 있으면 표기
                          */}
                              {selectedAddress !== null &&
                                selectedAddress.deliRequest !== null &&
                                selectedAddress.deliRequest !== '' &&
                                selectedAddress !== '직접 입력' && (
                                  <MenuItem value={selectedAddress.deliRequest}>
                                    {selectedAddress.deliRequest}
                                  </MenuItem>
                                )}

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
                          {/* 배송 요청사항 표기 끝 */}
                        </OrderDataBox>

                        {/* 배송 요청사항 직접 입력 TextField 표기 시작 */}
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
                        {/* 배송 요청사항 직접 입력 TextField 표기 끝 */}
                      </>
                    )}
                  </DataBox>
                </>
              )}
            {/* 배송지 정보 데이터(우편번호, 주소1, 주소2, 받는 사람, 전화번호, 배송 요청사항) 표기 끝 */}

            {/* 쿠폰 및 적립금 헤더 시작 */}
            <HeaderBox>
              <HeaderTypography variant="h5" component="h2">
                쿠폰 및 적립금 사용&nbsp;&nbsp;
                <HtmlTooltip
                  arrow
                  title={
                    <>
                      <Typography
                        sx={{
                          fontSize: '18px',
                          textAlign: 'center',
                          mb: 1,
                        }}
                      >
                        안내사항
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                        }}
                      >
                        1. 최종 결제 금액은 100원 미만이 될 수 없습니다.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                        }}
                      >
                        2. 주문 취소 시 사용한 쿠폰은 복구되지 않습니다.
                      </Typography>
                    </>
                  }
                >
                  <img
                    width="28px"
                    height="28px"
                    src="https://img.icons8.com/ios/50/000000/info--v1.png"
                    alt="쿠폰 및 적립금 안내"
                  />
                </HtmlTooltip>
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
                >
                  <MenuItem value="none">
                    <Typography
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      현재 보유 중인 쿠폰 : {couponList.length}장
                    </Typography>
                  </MenuItem>

                  {/* 쿠폰 목록 표기 시작 */}
                  {couponList.length !== 0 &&
                    couponList.map((coupon, index) => {
                      // 쿠폰의 할인 금액 변수 저장
                      const discount =
                        coupon.discountFix === 0
                          ? '[' + coupon.discountPer + '% 할인] '
                          : '[' +
                            coupon.discountFix
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                            '원 할인] ';

                      // 실제 출력 데이터
                      return (
                        <MenuItem
                          key={coupon.couponCode}
                          value={index}
                          disabled={
                            totalPrice - coupon.discountFix < 100 ||
                            totalPrice -
                              (totalPrice * coupon.discountPer) / 100 <
                              100
                          }
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
                  {/* 쿠폰 목록 표기 끝 */}
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
                        {userInfo?.savedMoney
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
                    } else if (
                      savedMoneyRef.current.value >
                      exactTotalPrice - 100
                    ) {
                      savedMoneyRef.current.value = exactTotalPrice - 100;
                      setExactSavedMoney(exactTotalPrice);
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
                    if (exactTotalPrice < userInfo?.savedMoney) {
                      savedMoneyRef.current.value = exactTotalPrice - 100;
                    } else {
                      savedMoneyRef.current.value = userInfo?.savedMoney;
                    }
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
                <ToggleButton value="card" sx={paymentBtnStyle}>
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Payment/credit-card.png`}
                    alt="신용 카드"
                    sx={
                      payment === 'card' ? { width: '70px' } : { width: '50px' }
                    }
                  />
                  <Typography
                    sx={
                      payment === 'card'
                        ? selectedPaymentText
                        : unselectedPaymentText
                    }
                  >
                    신용 카드
                  </Typography>
                </ToggleButton>

                <ToggleButton value="trans" sx={paymentBtnStyle}>
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Payment/account-transfer.png`}
                    alt="계좌 이체"
                    sx={
                      payment === 'trans'
                        ? { width: '70px' }
                        : { width: '50px' }
                    }
                  />
                  <Typography
                    sx={
                      payment === 'trans'
                        ? selectedPaymentText
                        : unselectedPaymentText
                    }
                  >
                    계좌 이체
                  </Typography>
                </ToggleButton>

                <ToggleButton value="phone" sx={paymentBtnStyle}>
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Payment/mobile.png`}
                    alt="휴대폰 결제"
                    sx={
                      payment === 'phone'
                        ? { width: '70px' }
                        : { width: '50px' }
                    }
                  />
                  <Typography
                    sx={
                      payment === 'phone'
                        ? selectedPaymentText
                        : unselectedPaymentText
                    }
                  >
                    휴대폰 결제
                  </Typography>
                </ToggleButton>

                <ToggleButton value="kakaopay" sx={paymentBtnStyle}>
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Payment/kakao-pay.png`}
                    alt="카카오 페이"
                    sx={
                      payment === 'kakaopay'
                        ? { width: '70px' }
                        : { width: '50px' }
                    }
                  />
                  <Typography
                    sx={
                      payment === 'kakaopay'
                        ? selectedPaymentText
                        : unselectedPaymentText
                    }
                  >
                    카카오 페이
                  </Typography>
                </ToggleButton>

                <ToggleButton value="tosspay" sx={paymentBtnStyle}>
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Payment/toss.png`}
                    alt="토스 페이"
                    sx={
                      payment === 'tosspay'
                        ? { width: '70px' }
                        : { width: '50px' }
                    }
                  />
                  <Typography
                    sx={
                      payment === 'tosspay'
                        ? selectedPaymentText
                        : unselectedPaymentText
                    }
                  >
                    토스 페이
                  </Typography>
                </ToggleButton>

                <ToggleButton value="payco" sx={paymentBtnStyle}>
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/Payment/payco.png`}
                    alt="삼성 페이"
                    sx={
                      payment === 'payco'
                        ? { width: '70px' }
                        : { width: '50px' }
                    }
                  />
                  <Typography
                    sx={
                      payment === 'payco'
                        ? selectedPaymentText
                        : unselectedPaymentText
                    }
                  >
                    페이코
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
                    {location.state !== null &&
                      exactTotalPrice - exactSavedMoney}
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
                        id="ckb1"
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
                        <label htmlFor="ckb1">
                          (필수) 개인정보 수집 이용 및 제 3자 제공 동의
                        </label>
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
                        id="ckb2"
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
                        <label htmlFor="ckb2">
                          (필수) 위 주문 내용을 확인하였으며 결제에 동의합니다.
                        </label>
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
        <UserFooter />
      </>
    );
  }
};

export default Purchase;
