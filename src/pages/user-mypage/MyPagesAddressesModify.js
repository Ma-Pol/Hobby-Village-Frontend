import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UserMypageAddressRows from '../../components/user-mypage/UserMypageAddress/UserMypageAddressRows';

const MyPagesAddressesModify = () => {
  const { addressCode } = useParams();
  const navigate = useNavigate();

  const addReceiverRef = useRef();
  const addAddress1Ref = useRef();
  const addAddress2Ref = useRef();
  const addZipCodeRef = useRef();
  const addPhoneRef = useRef();
  const addDeliRequestRef = useRef();
  const check = useRef();
  const email = 'kim@naver.com';

  const [addressDetail, setAddressDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const [checked, setChecked] = useState(false);

  // 배송지 상세 조회
  useEffect(() => {
    axios
      .get(`/mypages/${email}/addresses/${addressCode}`)
      .then((detail) => {
        if (detail.data.isDefault === 1) {
          setChecked(true);
        }
        setAddressDetail(detail.data);
        console.log(detail.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // 배송지 수정
  const modifyAddress = () => {
    axios
      .patch(`/mypages/addresses/modify`, {
        addressCode: addressCode,
        receiver: addReceiverRef.current.value,
        address1: addAddress1Ref.current.value,
        address2: addAddress2Ref.current.value,
        zipCode: addZipCodeRef.current.value,
        phone: addPhoneRef.current.value,
        deliRequest: addDeliRequestRef.current.value,
        isDefault: checked ? 1 : 0, // 기본 배송지로 설정이 체크되면 1, 아니면 0
      })
      .then((response) => {
        navigate(`/mypages/${email}/addresses/lists`);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const addressesRow = {
    marginTop: '30px',
  };

  if (loading) {
    return <div>로딩</div>;
  } else {
    return (
      <Container>
        {/* 배송지 수정 글씨 표기 시작 */}
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
          배송지 수정
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
              defaultValue={addressDetail.receiver}
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
            <Box
              sx={{
                display: 'flex', // 좌우로 나란히 정렬
                justifyContent: 'center',
                flexDirection: 'column', // 수직방향으로 정렬
              }}
            >
              <Box sx={addressesRow}>우편번호 찾기</Box>
              {/* 우편번호 */}
              <TextField
                id="standard-basic"
                variant="standard"
                inputRef={addZipCodeRef}
                defaultValue={addressDetail.zipCode}
                style={{ width: '700px' }}
              />
              {/* 검색 아이콘 */}
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>
            {/* 기본 주소 */}
            <TextField
              id="standard-basic"
              variant="standard"
              inputRef={addAddress1Ref}
              defaultValue={addressDetail.address1}
              style={{ width: '700px' }}
            />
            {/* 상세 주소 */}
            <TextField
              id="standard-basic"
              label="상세주소"
              variant="standard"
              inputRef={addAddress2Ref}
              defaultValue={addressDetail.address2}
              style={{ width: '700px' }}
            />
          </Box>

          <Box>
            <Box sx={addressesRow}>휴대폰 번호</Box>
            <TextField
              id="standard-basic"
              variant="standard"
              inputRef={addPhoneRef}
              defaultValue={addressDetail.phone}
              style={{ width: '700px' }}
            />
          </Box>

          <Box>
            <Box sx={addressesRow}>배송 요청사항</Box>
            <TextField
              id="standard-basic"
              variant="standard"
              inputRef={addDeliRequestRef}
              defaultValue={addressDetail.deliRequest}
              style={{ width: '700px' }}
            />
            <FormControlLabel
              inputRef={check}
              defaultValue={addressDetail.isDefault}
              sx={{ display: 'flex' }}
              control={<Checkbox checked={checked} onChange={handleChange} />}
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
            href={`/mypages/${email}/addresses/lists`}
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
            onClick={modifyAddress} // 클릭 시 modifyAddress 함수 호출
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
  }
};

export default MyPagesAddressesModify;
