import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MypagesOrdersRows = ({ order }) => {
  const API_KEY = process.env.REACT_APP_SWEETTRACKER_API_KEY;
  const nickname = sessionStorage.getItem('hobbyvillage-usernickname');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [prodPicture, setProdPicture] = useState('');
  const [reviewed, setReviewed] = useState(true);
  const [period, setPeriod] = useState(7);

  const deadline = new Date(order.deadline);
  const today = new Date();

  useEffect(() => {
    axios
      .all([
        axios.get(`/orders/mypages/prodPicture/${order.prodCode}`),
        axios.get(`/orders/mypages/review/${order.prodCode}/${nickname}`),
      ])
      .then(
        axios.spread((picture, review) => {
          setProdPicture(picture.data);
          setReviewed(review.data);
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExOrder = () => {
    if (
      window.confirm(
        `${order.prodName} 물품을 ${period}일 만큼 연장 결제하시겠습니까?`
      )
    ) {
      navigate(`/purchase`, {
        state: {
          prevPage: 'mypages',
          products: [
            {
              prodCode: order.prodCode,
              prodName: order.prodName,
              prodPrice: order.prodPrice,
              prodShipping: order.prodShipping,
              prodHost: order.prodHost,
              prodPicture: prodPicture,
              period: period,
            },
          ],
        },
      });
    } else {
      return false;
    }
  };

  const handleCancel = () => {
    if (window.confirm(`${order.prodName} 물품의 주문을 취소하시겠습니까?`)) {
      axios
        .patch(`/orders/mypages/cancel/${order.opCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('취소 처리 되었습니다.');
            window.location.reload();
          } else {
            alert('취소 처리에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  const handleReturn = () => {
    if (window.confirm(`${order.prodName} 물품을 반납 처리 하시겠습니까?`)) {
      axios
        .patch(`/orders/mypages/return/${order.opCode}`)
        .then((res) => {
          if (res.data === 1) {
            alert('반납 처리 되었습니다.');
            window.location.reload();
          } else {
            alert('반납 처리에 실패했습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  const changePeriod = (value) => {
    const nextPeriod = period + value;
    if (nextPeriod !== 0 && nextPeriod !== 35) {
      setPeriod(nextPeriod);
    }
  };

  if (loading) {
    return <Loading height={'270px'} />;
  } else {
    return (
      <Box
        sx={{
          m: 0,
          my: '15px',
          p: 0,
          width: '950px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            pb: '3px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #a9a9a9',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#616161',
            }}
          >
            주문번호 : {order.odrNumber} | 주문일자 : {order.odrDate}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#616161',
            }}
          >
            총 결제 금액 :{' '}
            {String(order.exactPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Typography>
        </Box>

        <Box
          sx={{
            mt: '10px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* 상품 이미지 */}
          <Box
            component="img"
            src={`http://localhost:8080/orders/mypages/product/${prodPicture}`}
            alt="프로필 사진"
            sx={{
              mr: '20px',
              boxSizing: 'border-box',
              objectFit: 'contain',
              width: '200px',
              height: '200px',
              border: '1px solid #dfdfdf',
              borderRadius: '15px',
            }}
          />

          {/* 상품 설명 */}
          <Box
            sx={{
              m: 0,
              p: 0,
              width: '350px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'space-between',
            }}
          >
            <Box
              sx={{
                m: 0,
                p: 0,
                width: '100%',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1rem',
                  mb: '5px',
                }}
              >
                {order.prodHost}
              </Typography>
              <Typography
                title={order.prodName}
                onClick={() => {
                  navigate(`/products/details/${order.prodCode}`);
                }}
                variant="h6"
                sx={{
                  width: '100%',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  '&:hover': {
                    TextDecoration: 'underline',
                    cursor: 'pointer',
                  },
                }}
              >
                {order.prodName}
              </Typography>
            </Box>

            <Box sx={{ m: 0, p: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.1rem',
                }}
              >
                상품 가격 :&nbsp;
                {String(order.prodPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원 /7일
                <br />
                배송비 :&nbsp;
                {String(order.prodShipping).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ','
                )}
                원
              </Typography>
            </Box>
          </Box>

          {/* 대여 기간, 데드라인 */}
          <Box
            sx={{
              m: 0,
              p: 0,
              width: '150px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
              }}
            >
              {order.odrState === '취소 요청' ? (
                <strong>취소 요청 중</strong>
              ) : order.odrState === '취소 처리 완료' ? (
                <>
                  <strong>취소 처리 완료</strong>
                </>
              ) : (
                <>
                  대여 기간: {order.rentalPeriod}일
                  <br />~ {order.deadline}까지
                </>
              )}
            </Typography>
          </Box>

          {/* 각종 버튼 */}
          <Box
            sx={{
              m: 0,
              p: 0,
              width: '200px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {order.odrState === '결제 완료' ||
            order.odrState === '배송 준비 중' ? (
              <Button
                onClick={handleCancel}
                variant="contained"
                sx={{
                  my: 1,
                  width: '150px',
                  height: '40px',
                  borderRadius: '10px',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  backgroundColor: '#f5b8b8',
                  '&:hover': {
                    backgroundColor: 'tomato',
                    color: '#ffffff',
                  },
                }}
              >
                주문 취소
              </Button>
            ) : order.odrState === '배송 중' ? (
              <>
                <form
                  action="http://info.sweettracker.co.kr/tracking/5"
                  target="_blank"
                  method="post"
                >
                  <div class="form-group">
                    <input
                      type="hidden"
                      class="form-control"
                      name="t_key"
                      value={API_KEY}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="hidden"
                      class="form-control"
                      name="t_code"
                      value={order.courierCompany}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="hidden"
                      class="form-control"
                      name="t_invoice"
                      value={order.trackingNumber}
                    />
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      my: 1,
                      width: '150px',
                      height: '40px',
                      borderRadius: '10px',
                      color: '#000000',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      border: '2px solid #C3C36A',
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        color: '#818128',
                      },
                    }}
                  >
                    배송 추적
                  </Button>
                </form>
              </>
            ) : order.odrState === '배송 완료' && deadline < today ? (
              <>
                <Box
                  sx={{
                    mb: '5px',
                    width: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    onClick={() => {
                      changePeriod(-7);
                    }}
                    sx={{
                      m: 0,
                      p: 0,
                      boxSizing: 'border-box',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      color: '#000000',
                      textAlign: 'center',
                      lineHeight: '30px',
                      border: '1px solid #d0d0d0',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: '#e1e1e1',
                      },
                    }}
                  >
                    -7
                  </Box>

                  <Typography
                    sx={{
                      width: '60px',
                      height: '30px',
                      textAlign: 'center',
                      lineHeight: '30px',
                    }}
                  >
                    {period}일
                  </Typography>

                  <Box
                    onClick={() => {
                      changePeriod(7);
                    }}
                    sx={{
                      m: 0,
                      p: 0,
                      boxSizing: 'border-box',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      color: '#000000',
                      textAlign: 'center',
                      lineHeight: '30px',
                      border: '1px solid #d0d0d0',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: '#e1e1e1',
                      },
                    }}
                  >
                    +7
                  </Box>
                </Box>
                <Button
                  onClick={handleExOrder}
                  variant="contained"
                  sx={{
                    my: 1,
                    width: '150px',
                    height: '40px',
                    borderRadius: '10px',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    backgroundColor: '#c3c36a',
                    '&:hover': {
                      backgroundColor: '#c3c36a',
                      color: '#ffffff',
                    },
                  }}
                >
                  연장 결제
                </Button>
                {!reviewed && (
                  <Button
                    variant="contained"
                    href={`/reviews/create/${order.prodCode}`}
                    sx={{
                      my: 1,
                      width: '150px',
                      height: '40px',
                      borderRadius: '10px',
                      color: '#000000',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        color: '#000000',
                      },
                    }}
                  >
                    리뷰 작성
                  </Button>
                )}
              </>
            ) : order.odrState === '배송 완료' && deadline > today ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleReturn}
                  sx={{
                    my: 1,
                    width: '150px',
                    height: '40px',
                    borderRadius: '10px',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    backgroundColor: '#c3c36a',
                    '&:hover': {
                      backgroundColor: '#c3c36a',
                      color: '#ffffff',
                    },
                  }}
                >
                  반납
                </Button>
                {!reviewed && (
                  <Button
                    variant="contained"
                    href={`/reviews/create/${order.prodCode}`}
                    sx={{
                      my: 1,
                      width: '150px',
                      height: '40px',
                      borderRadius: '10px',
                      color: '#000000',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        color: '#000000',
                      },
                    }}
                  >
                    리뷰 작성
                  </Button>
                )}
              </>
            ) : (
              !reviewed &&
              order.odrState !== '취소 요청' &&
              order.odrState !== '취소 처리 완료' && (
                <Button
                  variant="contained"
                  href={`/reviews/create/${order.prodCode}`}
                  sx={{
                    my: 1,
                    width: '150px',
                    height: '40px',
                    borderRadius: '10px',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      color: '#000000',
                    },
                  }}
                >
                  리뷰 작성
                </Button>
              )
            )}
          </Box>
        </Box>

        {/* 배송지 주소 시작 */}
        <Box
          sx={{
            width: '920px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            mt: '15px',
            backgroundColor: '#EFE8E880',
            borderRadius: '10px',
            p: '15px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              width: '100%',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#000000',
              mb: '10px',
            }}
          >
            배송지 주소
          </Typography>
          <Typography
            variant="body2"
            sx={{
              width: '100%',
              fontSize: '1rem',
              color: '#000000',
            }}
          >
            [{order.odrZipCode}]&nbsp;
            {order.odrAddress1}&nbsp;
            {order.odrAddress2}
          </Typography>

          <Typography
            sx={{
              width: '100%',
              fontSize: '1rem',
              color: '#000000',
            }}
          ></Typography>
        </Box>
      </Box>
    );
  }
};

export default MypagesOrdersRows;
