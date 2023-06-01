import React, { useRef, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import DaumPostcodeEmbed from 'react-daum-postcode';

const MyPagesAddressesCreate = () => {
  const addReceiverRef = useRef();
  const addAddress1Ref = useRef();
  const addAddress2Ref = useRef();
  const addZipCodeRef = useRef();
  const addPhoneRef = useRef();
  const addDeliRequestRef = useRef();
  const check = useRef();
  const addEmail = 'kim@naver.com';

  const navigate = useNavigate();

  const [modalHandler, setModalHandler] = useState(false); // 배송지 입력 모달 핸들러

  const addressesRow = {
    marginTop: '30px',
  };

  const insertAddress = () => {
    axios
      .post(`/mypages/${addEmail}/addresses/create`, {
        receiver: addReceiverRef.current.value, // 현재 받는 사람 값을 저장
        address1: addAddress1Ref.current.value,
        address2: addAddress2Ref.current.value,
        zipCode: addZipCodeRef.current.value,
        phone: addPhoneRef.current.value,
        deliRequest: addDeliRequestRef.current.value,
        email: addEmail,
        isDefault: check.current.checked ? 1 : 0, // 기본 배송지로 설정이 체크되면 1, 아니면 0
      })
      .then((response) => {
        console.log(response);
        if (response.data === 1) {
          // 입력 받은 데이터가 정상적으로 들어왔으면(값이 1이면) navigate를 통해 페이지 이동
          navigate(`/mypages/${addEmail}/addresses/lists`);
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

    addZipCodeRef.current.value = data.zonecode;
    addAddress1Ref.current.value = address1;
    addAddress2Ref.current.value = '';
    addAddress2Ref.current.focus();
  };

  return (
    <Container>
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
            // style={daumPostcodeStyle}
          />
        </>
      </Modal>
      {/* 배송지 추가 글씨 표기 시작 */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 5,
          mb: 1,
          pl: 2,
          pr: 1,
          fontWeight: 'bold',
          userSelect: 'none',
        }}
      >
        배송지 추가
      </Typography>

      <Box
        sx={{
          display: 'flex', // 좌우로 나란히 정렬
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column', // 수직방향으로 정렬
        }}
      >
        <Box>
          <Box sx={addressesRow}>받는 사람</Box>
          <TextField
            id="standard-basic"
            variant="standard"
            inputRef={addReceiverRef}
            style={{ width: '700px' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex', // 좌우로 나란히 정렬
            justifyContent: 'center',
            flexDirection: 'column', // 수직방향으로 정렬
          }}
        >
          <Box>
            <Box>
              <TextField
                inputRef={addZipCodeRef}
                placeholder="우편번호"
                variant="standard"
                size="small"
                style={{ marginRight: '25px', width: '30%' }}
                inputProps={{
                  readOnly: true,
                }}
              />
              <Button
                onClick={setModalHandler}
                style={{
                  backgroundColor: '#D9D9D9',
                  marginRight: '345px',
                  height: '30px',
                  color: 'black',
                }}
              >
                주소검색
              </Button>
            </Box>
            <TextField
              inputRef={addAddress1Ref}
              placeholder="주소"
              variant="standard"
              size="small"
              style={{ marginTop: '50px', width: '80%' }}
              inputProps={{
                readOnly: true,
              }}
            />
            <TextField
              inputRef={addAddress2Ref}
              placeholder="상세 주소"
              variant="standard"
              size="small"
              style={{ marginTop: '50px', width: '80%' }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={addressesRow}>휴대폰 번호</Box>
          <TextField
            id="standard-basic"
            variant="standard"
            inputRef={addPhoneRef}
            style={{ width: '700px' }}
          />
        </Box>

        <Box>
          <Box sx={addressesRow}>배송 요청사항</Box>
          <TextField
            id="standard-basic"
            variant="standard"
            inputRef={addDeliRequestRef}
            style={{ width: '700px' }}
          />
          {/* 기본 배송지로 선택 체크박스 */}
          <FormControlLabel
            sx={{ display: 'flex' }}
            control={<Checkbox inputRef={check} />}
            label="기본 배송지로 선택"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'Center',
        }}
      >
        {/* 취소 버튼 */}
        <Button
          variant="contained"
          size="large"
          href={`/mypages/${addEmail}/addresses/lists`}
          sx={{
            mt: 1,
            mr: 1,
            width: '135px',
            float: 'center',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid #626262',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          취소
        </Button>

        {/* 저장 버튼 */}
        <Button
          variant="contained"
          size="large"
          onClick={insertAddress} // 클릭 시 insertAddress 함수 호출
          sx={{
            mt: 1,
            mr: 1,
            width: '135px',
            float: 'center',
            backgroundColor: '#C3C36A',
            color: '#000000',
            border: '1px solid #626262',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          저장
        </Button>
      </Box>
    </Container>
  );
};

export default MyPagesAddressesCreate;
