import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminOrdersTable from '../../components/admin-orders/AdminOrdersDetails/AdminOrdersDetailTable';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminOrdersDetails = ({ prevPage }) => {
  const navigate = useNavigate();
  const { odrNumber } = useParams();
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderProductList, setOrderProductList] = useState([]);

  useEffect(() => {
    getOrderDetails(odrNumber);
    getOrderProductLists(odrNumber);
  }, [odrNumber]);

  const getOrderDetails = (odrNumber) => {
    axios
      .get(`/m/orders/orderDetails/${odrNumber}`)
      .then((detail) => {
        setOrderDetail(detail.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getOrderProductLists = (odrNumber) => {
    axios
      .get(`/m/orders/productLists/${odrNumber}`)
      .then((list) => {
        setOrderProductList(list.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      {/* 주문 목록 > 주문 상세 글씨 표기 시작 */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 5,
          mb: 1,
          pl: 1,
          pr: 1,
          fontWeight: 'bold',
          userSelect: 'none',
        }}
      >
        주문 목록 &gt; 주문 상세
      </Typography>
      {/* 주문 목록 > 주문 상세 글씨 표기 끝 */}

      {/* 주문 상세 내용 표기 시작 */}
      <AdminOrdersTable
        orderDetail={orderDetail}
        orderProductList={orderProductList}
        getOrderDetails={getOrderDetails}
        getOrderProductLists={getOrderProductLists}
      />
      {/* 주문 상세 내용 표기 끝 */}

      {/* 주문 목록 버튼 표기 시작 */}
      <Box
        sx={{
          my: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            if (prevPage === 'direct') {
              navigate('/m/orders/lists?sort=-odrDate&pages=1');
            } else {
              navigate(`/m/orders/lists${prevPage}`);
            }
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
          주문 목록
        </Button>
      </Box>
      {/* 주문 목록 버튼 표기 끝 */}
    </Container>
  );
};

AdminOrdersDetails.defaultProps = {
  prevPage: 'direct',
};

export default AdminOrdersDetails;
