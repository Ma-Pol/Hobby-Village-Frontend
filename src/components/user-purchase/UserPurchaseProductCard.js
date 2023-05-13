import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const ProductCard = styled(Box)({
  margin: '10px 0',
  backgroundColor: '#f5f5f5',
  width: '1050px',
  border: '1px solid #d0d0d0',
  borderRadius: '10px',
  boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.2)',
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

const ProductCardBodyDataTitleBox = styled(Box)({
  maxHeight: '70px',
  overflow: 'auto',
});

const ProductCardBodyDataTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
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

const UserPurchaseProductCard = ({ product }) => {
  const { prodName, prodPrice, prodShipping, prodHost, prodPicture, period } =
    product;
  const imageSrc = `http://localhost:8080/purchase/pictures/${prodPicture}`;

  return (
    <>
      <ProductCard>
        <ProductCardHeader>
          <ProductCardHeaderHost>{prodHost}</ProductCardHeaderHost>
          <ProductCardHeaderShipping>
            배송비&nbsp;
            {prodShipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </ProductCardHeaderShipping>
        </ProductCardHeader>
        <ProductCardBody>
          <ProductCardBodyImage
            component="img"
            alt={prodPicture}
            src={imageSrc}
          />
          <ProductCardBodyData>
            <ProductCardBodyDataTitleBox>
              <ProductCardBodyDataTitle title={prodName}>
                {prodName}
              </ProductCardBodyDataTitle>
            </ProductCardBodyDataTitleBox>
            <ProductCardBodyDataPriceBox>
              <ProductCardBodyDataPrice
                sx={{
                  marginBottom: '5px',
                }}
              >
                대여 단위 기간(7일) 당 가격 :&nbsp;
                {prodPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                &nbsp;원
              </ProductCardBodyDataPrice>
              <ProductCardBodyDataPrice
                sx={{
                  fontWeight: 'bold',
                }}
              >
                결제 예정 금액(배송비 포함) :&nbsp;
                {((prodPrice * period) / 7 + prodShipping)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                &nbsp;원
              </ProductCardBodyDataPrice>
            </ProductCardBodyDataPriceBox>
          </ProductCardBodyData>
          <ProductCardBodyRentalDate>
            대여 기간: &nbsp;{period}&nbsp;일
          </ProductCardBodyRentalDate>
        </ProductCardBody>
      </ProductCard>
    </>
  );
};

export default UserPurchaseProductCard;
