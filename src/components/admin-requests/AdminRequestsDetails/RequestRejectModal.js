import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import { useState } from 'react';

const inputStyle = {
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      borderColor: '#666666',
    },
  },
};

const RequestRejectModal = ({
  reqCode,
  reqTitle,
  reqPhone,
  setRejectModalHandler,
  rejectProgress,
}) => {
  const [rejectReason, setRejectReason] = useState('0');
  const extraReasonRef = useRef();

  const rejectReasons = [
    '물품 명 또는 설명이 적절하지 않습니다.',
    '물품의 상태를 정확히 파악할 수 없습니다.',
    '물품의 손상 정도가 심합니다.',
    '판매하기 부적절한 물품입니다.',
    '기타',
  ];

  const rejectBtnHandler = () => {
    if (rejectReason === null) {
      alert('심사 탈락 사유를 선택해주세요.');
      return false;
    }

    if (window.confirm('정말 심사 탈락 처리하시겠습니까?')) {
      // 심사 탈락 사유 설정
      const reason =
        rejectReason === '4'
          ? extraReasonRef.current.value
          : rejectReasons[rejectReason];

      const rejectData = {
        reqCode: reqCode,
        reqTitle: reqTitle,
        reqPhone: reqPhone,
        rejectReason: reason,
      };

      rejectProgress(rejectData);
    } else {
      return false;
    }
  };

  const reasonChange = (e) => {
    setRejectReason(e.target.value);
    if (e.target.value === '4') {
      setTimeout(() => {
        extraReasonRef.current.focus();
      }, 50);
    }
  };

  return (
    <Container
      sx={{
        userSelect: 'none',
        backgroundColor: '#ffffff',
        display: 'block',
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '30%',
        borderRadius: '15px',
        border: '2px solid #000000',
        width: '600px',
        height: 'auto',
        zIndex: '99999',
      }}
    >
      <Box
        sx={{
          m: 0,
          pt: 3,
          pb: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
          }}
        >
          탈락 사유 선택
        </Typography>
        <FormLabel id="rejectReason">탈락 사유</FormLabel>
        <RadioGroup aria-label="rejectReason" value={rejectReason}>
          {rejectReasons.map((reason, index) => {
            return (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio color="default" />}
                label={reason}
                onChange={reasonChange}
              />
            );
          })}
        </RadioGroup>
        <TextField
          inputRef={extraReasonRef}
          disabled={rejectReason !== '4'}
          multiline
          rows={2}
          variant="outlined"
          placeholder="기타 사유를 입력해주세요. (최대 50자)"
          sx={{
            ...inputStyle,
            ml: '26px',
          }}
          inputProps={{
            maxLength: 50,
          }}
        />
        <Box
          sx={{
            m: 0,
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => {
              setRejectModalHandler(false);
            }}
            variant="contained"
            sx={{
              mx: 2,
              width: '100px',
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
            닫기
          </Button>
          <Button
            onClick={() => {
              rejectBtnHandler();
            }}
            variant="contained"
            sx={{
              mx: 2,
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
            심사 탈락
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RequestRejectModal;
