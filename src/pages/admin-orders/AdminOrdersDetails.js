/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminOrdersTable from '../../components/admin-orders/AdminOrdersDetails/AdminOrdersDetailTable';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';

const AdminOrdersDetails = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const prevPage = location.state?.queryString;
  const navigate = useNavigate();
  const { odrNumber } = useParams();
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderProductList, setOrderProductList] = useState([]);

  useEffect(() => {
    checkOrder();
  }, []);

  const checkOrder = () => {
    axios
      .get(`/m/orders/check/${odrNumber}`)
      .then((check) => {
        if (check.data === 0) {
          alert('존재하지 않는 주문입니다.');
          navigate('/m/orders/lists?sort=-odrDate&filter=none&pages=1', {
            replace: true,
          });
        } else {
          getOrderDetails(odrNumber);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getOrderDetails = (odrNumber) => {
    axios
      .get(`/m/orders/orderDetails/${odrNumber}`)
      .then((detail) => {
        setOrderDetail(detail.data);
        getOrderProductLists(odrNumber);
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
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container sx={{ userSelect: 'none' }}>
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
          fontSize: '3vh',
        }}
      >
        주문 목록 &gt; 주문 상세
      </Typography>
      {/* 주문 목록 > 주문 상세 글씨 표기 끝 */}

      {loading ? (
        <Loading height={'70vh'} />
      ) : (
        <>
          {/* 주문 상세 내용 표기 시작 */}
          <AdminOrdersTable
            odrNumber={odrNumber}
            orderDetail={orderDetail}
            orderProductList={orderProductList}
            getOrderDetails={getOrderDetails}
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
                if (prevPage === undefined) {
                  navigate('/m/orders/lists?sort=-odrDate&filter=none&pages=1');
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
        </>
      )}
    </Container>
  );
};

export default AdminOrdersDetails;
