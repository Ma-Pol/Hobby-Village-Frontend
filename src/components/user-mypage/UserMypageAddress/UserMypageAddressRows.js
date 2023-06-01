import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const UserMypageAddressRows = ({ address, getAddressList }) => {
  const { email } = useParams();

  const {
    addressCode,
    receiver,
    zipCode,
    address1,
    address2,
    phone,
    deliRequest,
    isDefault,
  } = address;

  // 배송지 삭제
  const deleteAddress = () => {
    if (window.confirm('해당 배송지를 삭제하시겠습니까?')) {
      axios
        .delete(`/addresses/mypages?addressCode=${addressCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('삭제가 완료되었습니다.');
          } else {
            alert('삭제에 실패하였습니다.');
          }
        })
        .finally(() => {
          getAddressList();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  return (
    <>
      <Box
        sx={{
          boxSizing: 'border-box',
          border: '2px solid #000000',
          borderRadius: '15px',
          m: 0,
          my: '10px',
          p: '10px 15px',
          width: '950px',
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {isDefault === 1 && (
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#c3c36a',
              borderRadius: '5px',
              width: '90px',
              height: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: '0.7rem',
              }}
            >
              기본 배송지
            </Typography>
          </Box>
        )}

        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.4rem',
            mb: '5px',
          }}
        >
          {receiver}
        </Typography>

        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: '1.1rem',
            mb: '5px',
          }}
        >
          [{zipCode}]&nbsp;{address1}&nbsp;{address2}
        </Typography>

        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: '1rem',
            mb: '5px',
          }}
        >
          {String(phone).replace(/(\d{3})(\d{4})(\d{4})/, '$1 - $2 - $3')}
        </Typography>

        <Box
          sx={{
            m: 0,
            p: 0,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontSize: '1rem',
              mb: '5px',
              maxWidth: '800px',
            }}
          >
            {deliRequest ? deliRequest : '- 배송 요청사항 없음 -'}
          </Typography>

          <Box
            sx={{
              m: 0,
              p: 0,
            }}
          >
            <Button
              variant="contained"
              size="small"
              href={`/mypages/${email}/addresses/modify/${addressCode}`}
              sx={{
                height: '30px',
                color: '#000000',
                fontWeight: 'bold',
                borderRadius: '10px',
                backgroundColor: '#c3c36a',
                '&:hover': {
                  backgroundColor: '#c3c36a',
                  color: '#ffffff',
                },
              }}
            >
              수정
            </Button>

            {isDefault === 0 && (
              <Button
                variant="contained"
                size="small"
                onClick={deleteAddress} // 클릭 시 deleteAddress 함수 호출
                sx={{
                  ml: 2,
                  height: '30px',
                  color: '#000000',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  backgroundColor: '#F5B8B8',
                  '&:hover': {
                    backgroundColor: 'tomato',
                    color: '#ffffff',
                  },
                }}
              >
                삭제
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserMypageAddressRows;
