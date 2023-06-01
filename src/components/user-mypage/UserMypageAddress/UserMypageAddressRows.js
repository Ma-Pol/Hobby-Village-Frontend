import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import axios from 'axios';

const UserMypageAddressRows = ({
  addressCode,
  receiver,
  zipCode,
  address1,
  address2,
  phone,
  deliRequest,
  isDefault,
  email,
  getAddressList,
}) => {
  const tableData = {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '0.01em',
    borderRadius: '1em',
    marginBottom: '15px',
  };

  // 배송지 삭제
  const deleteAddress = () => {
    axios
      .delete(`/mypages/${email}/addresses/delete/${addressCode}`)
      .then((response) => {
        console.log(response);
        if (response.data === 1) {
          alert('삭제가 완료되었습니다.');
        }
      })
      .finally(() => {
        getAddressList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={tableData}>
      <Box>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
          {receiver}
        </Typography>
      </Box>
      <Box>
        {address1}, {address2}
      </Box>
      {/* 정규식 사용하여 하이픈 추가 */}
      <Box>{phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 - $2 - $3')}</Box>
      <Box>{deliRequest}</Box>
      <Box>
        <Button
          variant="contained"
          size="small"
          href={`/mypages/${email}/addresses/modify/${addressCode}`}
          sx={{
            mt: 1,
            mr: 1,
            height: '25px',
            float: 'center',
            backgroundColor: '#C3C36A',
            color: '#000000',
            border: '1px solid #000000',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          수정
        </Button>

        {/* 삭제 버튼 */}
        <Button
          variant="contained"
          size="small"
          onClick={deleteAddress} // 클릭 시 deleteAddress 함수 호출
          sx={{
            mt: 1,
            mr: 1,
            height: '25px',
            float: 'center',
            backgroundColor: '#F5B8B8',
            color: '#000000',
            border: '1px solid #000000',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          삭제
        </Button>

        {/* 기본배송지 버튼 */}
        {isDefault === 1 && (
          <Button
            variant="contained"
            size="medium"
            sx={{
              mt: 1,
              mr: 1,
              mx: 45,
              height: '25px',
              float: 'center',
              backgroundColor: '#C3C36A',
              color: '#000000',
              border: '1px solid #000000',
              '&:hover': {
                backgroundColor: '#c6c6c6',
                color: '#000000',
              },
            }}
          >
            기본배송지
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserMypageAddressRows;
