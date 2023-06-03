import { Typography, Box, Checkbox, Paper, Button } from '@mui/material';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import UserDibItemsPhoto from './UserDibItemsPhoto';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const UserDibItems = ({
  dibCode,
  prodCode,
  prodName,
  prodContent,
  prodShipping,
  prodPrice,
  prodDibs,
  category,
  selectedProducts,
  setSelectedProducts,
  selectAll,
  setSelectAll,
  length,
  dibDelete,
  MoveToProd,
}) => {
  // 전체선택, 선택항목

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (selectAll) {
      setChecked(true);
    } else if (selectedProducts.length + 1 !== length) {
      setChecked(false);
    }
  }, [selectAll]);

  const handleSelect = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked) {
      if (selectedProducts.length + 1 === length) {
        setSelectAll(true);
      }

      setSelectedProducts([
        ...selectedProducts,
        {
          prodCode: prodCode,
          prodName: prodName,
          prodPrice: prodPrice,
          prodShipping: prodShipping,
        },
      ]);
    } else {
      setSelectAll(false);
      setSelectedProducts(
        selectedProducts.filter((product) => product.prodCode !== prodCode)
      );
    }
  };

  return (
    <div key={dibCode}>
      <Paper
        elevation={3}
        sx={{
          width: '800px',
          my: 2,
          ml: 22,
          height: '200px',
          bgcolor: '#FFFFFF',
          borderRadius: '15px',
        }}
      >
        <Checkbox
          checked={checked}
          onChange={handleSelect}
          icon={<CheckCircleOutlineOutlined />}
          checkedIcon={<CheckCircleOutlineOutlined />}
          sx={{
            color: '#CECECE',
            p: 0,
            my: 1,
            mx: 1,
            '&.Mui-checked': {
              color: '#000000',
              backgroundColor: '#C3C36A',
              p: 0,
            },
            '& .MuiSvgIcon-root': {
              fontSize: '20px',
              width: '22px',
              height: '22px',
            },
          }}
        ></Checkbox>
        <Button
          onClick={() => {
            dibDelete(dibCode);
          }}
          sx={{
            borderRadius: '50%', // 동그라미 모양을 위한 border-radius 값
            width: '24px', // 버튼의 너비
            height: '24px', // 버튼의 높이
            minWidth: 'unset',
            fontSize: '20px',
            fontWeight: 'lighter',
            p: 0,
            mt: 0.5,
            ml: 91,
            color: '#CECECE',
            border: '1px solid #CECECE',
            '&:hover': {
              backgroundColor: '#C3C36A',
              border: '1px solid #CECECE',
              color: 'black',
            },
            '&.Mui-selected': {
              backgroundColor: '#C3C36A',
              color: 'black',
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#C3C36A',
              color: 'black',
            },
          }}
          variant="outlined"
          color="primary"
        >
          Ⅹ
        </Button>
        <Box
          sx={{ display: 'flex', ml: 4, cursor: 'pointer' }}
          onClick={MoveToProd}
        >
          <UserDibItemsPhoto
            prodCode={prodCode}
            prodName={prodName}
          ></UserDibItemsPhoto>
          <Box
            onClick={MoveToProd}
            sx={{ width: '335px', mx: 2, cursor: 'pointer' }}
          >
            <Typography
              sx={{
                fontSize: '18px',
              }}
            >
              [{category} - {prodName}]
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: '14px',
              }}
            >
              {prodContent}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              ml: 5,
            }}
          >
            <FavoriteBorderIcon
              style={{
                color: '#1C1B1F',
                position: 'absolute',
                fontSize: 40,
              }}
            />
            <Typography
              sx={{
                fontSize: '12px',
                color: '#1C1B1F',
                position: 'absolute',
              }}
            >
              찜
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                color: '#A0A0A0',
                mt: 7,
              }}
            >
              관심 {prodDibs}
            </Typography>
          </Box>
          <Box textAlign="right" sx={{ ml: 8 }}>
            <Typography
              sx={{
                ml: 4,
                mt: 5,
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {prodPrice.toLocaleString()}원
            </Typography>
            <Box display="flex">
              <Typography
                sx={{
                  ml: 4,
                  mt: 5,
                  fontSize: '14px',
                }}
              >
                배송비
              </Typography>
              <Typography
                sx={{
                  ml: 4,
                  mt: 5,
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {prodShipping.toLocaleString()}원
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default UserDibItems;
