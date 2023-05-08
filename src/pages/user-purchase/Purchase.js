import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import UserPurchaseProductCard from '../../components/user-purchase/UserPurchaseProductCard';

const HeaderTypography = styled(Typography)({
  fontWeight: 'bold',
  userSelect: 'none',
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
  width: '1050px',
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

const Purchase = () => {
  return (
    <Container
      sx={{
        mt: 2,
        mb: 4,
      }}
    >
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
            주문 상품
          </HeaderTypography>
        </HeaderBox>
        {/* 주문 상품 헤더 끝 */}

        {/* 주문 상품 데이터 리스트 표기 시작 */}
        <DataBox>
          <UserPurchaseProductCard />
          <UserPurchaseProductCard />
          <UserPurchaseProductCard />
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
              이승현
            </Typography>
          </OrderDataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>이메일</OrderDataBoxTitle>
            <Typography
              sx={{
                fontSize: '1.2rem',
              }}
            >
              example0001@example.com
            </Typography>
          </OrderDataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>전화번호</OrderDataBoxTitle>
            <Typography
              sx={{
                fontSize: '1.2rem',
              }}
            >
              010 - 1234 - 5678
            </Typography>
          </OrderDataBox>
        </DataBox>
        {/* 주문자 정보 데이터(이름, 이메일, 휴대폰 번호) 표기 끝 */}

        {/* 배송지 정보 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            배송지 정보
          </HeaderTypography>
          <HeaderTypography
            variant="h6"
            component="h2"
            sx={{
              color: '#c3c36a',
              cursor: 'pointer',
            }}
          >
            배송지 변경
          </HeaderTypography>
        </HeaderBox>
        {/* 배송지 정보 헤더 끝 */}

        {/* 배송지 정보 데이터(우편번호, 주소1, 주소2, 받는 사람, 전화번호, 배송 요청사항) 표기 시작 */}
        <DataBox>
          <OrderDataBox
            sx={{
              height: '80px',
            }}
          >
            <OrderDataBoxTitle>주소</OrderDataBoxTitle>
            <Typography
              sx={{
                width: '850px',
                fontSize: '1.2rem',
              }}
            >
              [13529] 경기 성남시 분당구 판교역로 166 (백현동) 카카오 본사
            </Typography>
          </OrderDataBox>
          <OrderDataBox
            sx={{
              height: '80px',
            }}
          >
            <OrderDataBoxTitle>배송 요청 사항</OrderDataBoxTitle>
            <Typography
              sx={{
                width: '850px',
                fontSize: '1.2rem',
              }}
            >
              부재시 문 앞에 놔주세요.
            </Typography>
          </OrderDataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>받는 사람</OrderDataBoxTitle>
            <Typography
              sx={{
                fontSize: '1.2rem',
              }}
            >
              이승현
            </Typography>
          </OrderDataBox>
          <OrderDataBox>
            <OrderDataBoxTitle>전화번호</OrderDataBoxTitle>
            <Typography
              sx={{
                fontSize: '1.2rem',
              }}
            >
              010 - 1234 - 5678
            </Typography>
          </OrderDataBox>
        </DataBox>
        {/* 배송지 정보 데이터(우편번호, 주소1, 주소2, 받는 사람, 전화번호, 배송 요청사항) 표기 끝 */}

        {/* 쿠폰 및 적립금 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            쿠폰 및 적립금
          </HeaderTypography>
        </HeaderBox>
        {/* 쿠폰 및 적립금 헤더 끝 */}

        {/* 쿠폰 및 적립금 데이터(쿠폰, 적립금) 표기 시작 */}
        <DataBox></DataBox>
        {/* 쿠폰 및 적립금 데이터(쿠폰, 적립금) 표기 끝 */}

        {/* 결제 수단 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            결제 수단
          </HeaderTypography>
        </HeaderBox>
        {/* 결제 수단 헤더 끝 */}

        {/* 결제 수단 버튼 표기 시작 */}
        <DataBox></DataBox>
        {/* 결제 수단 버튼 표기 끝 */}

        {/* 총 결제 금액 헤더 시작 */}
        <HeaderBox>
          <HeaderTypography variant="h5" component="h2">
            총 결제 금액
          </HeaderTypography>
        </HeaderBox>
        {/* 총 결제 금액 헤더 끝 */}

        {/* 총 결제 금액 및 결제 버튼 표기 시작 */}
        <DataBox></DataBox>
        {/* 총 결제 금액 및 결제 버튼 표기 끝 */}
      </Container>
    </Container>
  );
};

export default Purchase;
