import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Modal,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Loading from 'components/Loading';

const MyPagesAddressesModify = () => {
  const [loading, setLoading] = useState(true);
  const [addressDetail, setAddressDetail] = useState([]);

  const { email, addressCode } = useParams();
  const navigate = useNavigate();

  const receiverRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const zipCodeRef = useRef();
  const phoneRef = useRef();
  const deliRequestRef = useRef();
  const [checked, setChecked] = useState(false);

  const [modalHandler, setModalHandler] = useState(false); // 배송지 입력 모달 핸들러

  // 배송지 상세 조회
  useEffect(() => {
    checkAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, addressCode]);

  const checkAddress = () => {
    axios
      .get(`/addresses/mypages/check?addressCode=${addressCode}&email=${email}`)
      .then((res) => {
        if (res.data === 1) {
          getAddressDetail();
        } else {
          alert('잘못된 접근입니다.');
          navigate(`/mypages/${email}/addresses/lists`);
          return false;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAddressDetail = () => {
    axios
      .get(`/addresses/mypages?addressCode=${addressCode}`)
      .then((detail) => {
        if (detail.data.isDefault === 1) {
          setChecked(true);
        }
        setAddressDetail(detail.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleModify = () => {
    // 각 항목의 값이 비어있으면 경고창을 띄우고 함수를 종료
    if (receiverRef.current.value === '') {
      alert('받는 사람을 입력해주세요.');
      receiverRef.current.focus();
      return false;
    }

    if (zipCodeRef.current.value === '') {
      alert('우편번호를 입력해주세요.');
      setModalHandler(true);
      return false;
    }

    if (address1Ref.current.value === '') {
      alert('기본 주소를 입력해주세요.');
      setModalHandler(true);
      return false;
    }

    if (phoneRef.current.value === '') {
      alert('휴대폰 번호를 입력해주세요.');
      phoneRef.current.focus();
      return false;
    }

    if (window.confirm('배송지를 수정하시겠습니까?')) {
      modifyAddress();
    }
  };

  // 배송지 수정
  const modifyAddress = () => {
    axios
      .patch(`/addresses/mypages`, {
        addressCode: addressCode,
        receiver: receiverRef.current.value,
        address1: address1Ref.current.value,
        address2:
          address2Ref.current.value === '' ? null : address2Ref.current.value,
        zipCode: zipCodeRef.current.value,
        phone: phoneRef.current.value,
        deliRequest: deliRequestRef.current.value,
        isDefault: checked ? 1 : 0, // 기본 배송지로 설정이 체크되면 1, 아니면 0
        email: email,
      })
      .then((res) => {
        if (res.data === 1) {
          alert('배송지가 수정되었습니다.');
          navigate(`/mypages/${email}/addresses/lists`);
        } else {
          alert('배송지 수정에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
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

  const checkBoxChange = (e) => {
    setChecked(e.target.checked);
  };

  const phoneCheck = (e) => {
    const phone = e.target.value;
    phoneRef.current.value = phone.replace(/[^0-9]/gi, '');

    if (phone.length > 11) {
      phoneRef.current.value = phone.substring(0, 11);
    }
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

  const textFieldStyle = {
    mb: '30px',
    '& .MuiInput-root': {
      '&:after': {
        borderBottom: '2px solid #c3c36a',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#c3c36a',
      },
    },
  };

  return (
    <>
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
          minHeight: '60vh',
          mt: '40px',
          userSelect: 'none',
          width: '1100px',
        }}
      >
        {/* 배송지 수정 글씨 표기 시작 */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            m: '30px 0 40px 0',
          }}
        >
          배송지 수정
        </Typography>

        {loading ? (
          <Loading height={'30vh'} />
        ) : (
          <>
            <Box
              sx={{
                width: '1000px',
                mx: 'auto',
                mt: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                label="받는 사람*"
                variant="standard"
                inputRef={receiverRef}
                defaultValue={addressDetail.receiver}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setModalHandler(true);
                  }
                }}
                sx={{
                  ...textFieldStyle,
                  width: '700px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                  width: '700px',
                  mb: '30px',
                }}
              >
                <TextField
                  label="우편 번호*"
                  variant="standard"
                  disabled
                  inputRef={zipCodeRef}
                  defaultValue={addressDetail.zipCode}
                  sx={{
                    ...textFieldStyle,
                    width: '150px',
                    mb: 0,
                  }}
                />
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setModalHandler(true);
                  }}
                  sx={{
                    ml: 3,
                    width: '110px',
                    borderRadius: '10px',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      color: '#000000',
                    },
                  }}
                >
                  주소 검색
                </Button>
              </Box>

              <TextField
                label="기본 주소*"
                variant="standard"
                disabled
                inputRef={address1Ref}
                defaultValue={addressDetail.address1}
                sx={{
                  ...textFieldStyle,
                  width: '700px',
                }}
              />

              <TextField
                label="상세 주소"
                variant="standard"
                inputRef={address2Ref}
                defaultValue={addressDetail.address2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    phoneRef.current.focus();
                  }
                }}
                sx={{
                  ...textFieldStyle,
                  width: '700px',
                }}
              />

              <TextField
                label="휴대폰 번호* ( - 제외)"
                variant="standard"
                inputRef={phoneRef}
                onChange={phoneCheck}
                defaultValue={addressDetail.phone}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    deliRequestRef.current.focus();
                  }
                }}
                sx={{
                  ...textFieldStyle,
                  width: '700px',
                }}
              />
              <TextField
                label="배송 요청사항"
                variant="standard"
                inputRef={deliRequestRef}
                defaultValue={addressDetail.deliRequest}
                inputProps={{
                  maxLength: 50,
                }}
                sx={{
                  ...textFieldStyle,
                  width: '700px',
                }}
              />
              <Box
                sx={{
                  width: '700px',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={checkBoxChange}
                      color="success"
                    />
                  }
                  label="기본 배송지로 선택"
                />
              </Box>
            </Box>

            <Box
              sx={{
                mt: '40px',
                pb: '70px',
                display: 'flex',
                justifyContent: 'Center',
              }}
            >
              <Button
                variant="contained"
                href={`/mypages/${email}/addresses/lists`}
                size="large"
                sx={{
                  mr: 2,
                  width: '150px',
                  borderRadius: '10px',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  backgroundColor: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                  },
                }}
              >
                취소
              </Button>

              <Button
                onClick={handleModify}
                variant="contained"
                size="large"
                sx={{
                  ml: 2,
                  width: '150px',
                  borderRadius: '10px',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  backgroundColor: '#c3c36a',
                  '&:hover': {
                    backgroundColor: '#c3c36a',
                    color: '#ffffff',
                  },
                }}
              >
                수정
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default MyPagesAddressesModify;
