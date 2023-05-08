import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const ProductCard = styled(Box)({
  margin: '10px 0',
  backgroundColor: '#f5f5f5',
  width: '1050px',
  border: '1px solid #d0d0d0',
  borderRadius: '10px',
  boxShadow: '0px 4px 2px 0px rgba(0,0,0,0.2)',
});

const ProductCardHeader = styled(Box)({
  padding: '8px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#c3c36a',
  width: 'calc(100% - 30px)',
  borderRadius: '10px 10px 0 0',
});

const ProductCardHeaderHost = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#000000',
});

const ProductCardHeaderShipping = styled(Typography)({
  fontSize: '1.3rem',
  color: '#000000',
});

const ProductCardBody = styled(Box)({
  padding: '8px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  width: 'calc(100% - 30px)',
  borderRadius: '0 0 10px 10px',
});

const ProductCardBodyImage = styled(Box)({
  marginRight: '10px',
  width: '150px',
  height: '150px',
});

const ProductCardBodyData = styled(Box)({
  margin: '0 10px',
  width: 'calc(100% - 350px)',
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const ProductCardBodyDataTitleBox = styled(Typography)({
  maxHeight: '70px',
  overflow: 'auto',
});

const ProductCardBodyDataTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.3rem',
  color: '#000000',
});

const ProductCardBodyDataPriceBox = styled(Box)({
  height: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

const ProductCardBodyDataPrice = styled(Typography)({
  fontSize: '1.2rem',
  color: '#000000',
});

const ProductCardBodyRentalDate = styled(Box)({
  marginLeft: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '150px',
  height: '50px',
  border: '2px solid #000000',
  borderRadius: '10px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
});

const UserPurchaseProductCard = () => {
  return (
    <>
      <ProductCard>
        <ProductCardHeader>
          <ProductCardHeaderHost>캠린이</ProductCardHeaderHost>
          <ProductCardHeaderShipping>배송비 2,500원</ProductCardHeaderShipping>
        </ProductCardHeader>
        <ProductCardBody>
          <ProductCardBodyImage
            component="img"
            // alt={fileName}
            // src={fileSrc}
          />
          <ProductCardBodyData>
            <ProductCardBodyDataTitleBox>
              <ProductCardBodyDataTitle>
                캠핑 용품 텐트 + 타프 + 에어매트 + 랜턴 외 10종
              </ProductCardBodyDataTitle>
            </ProductCardBodyDataTitleBox>
            <ProductCardBodyDataPriceBox>
              <ProductCardBodyDataPrice
                sx={{
                  marginBottom: '5px',
                }}
              >
                대여 단위 기간(7일) 당 가격 : 1,000 원
              </ProductCardBodyDataPrice>
              <ProductCardBodyDataPrice>
                결제 예정 금액(배송비 포함) : 3,500 원
              </ProductCardBodyDataPrice>
            </ProductCardBodyDataPriceBox>
          </ProductCardBodyData>
          <ProductCardBodyRentalDate>대여기간: 7 일</ProductCardBodyRentalDate>
        </ProductCardBody>
      </ProductCard>
    </>
  );
};

export default UserPurchaseProductCard;
