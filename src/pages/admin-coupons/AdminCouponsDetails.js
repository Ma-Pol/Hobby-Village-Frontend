import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import axios from 'axios';
import { Box, Grid, Paper, Button, Typography } from '@mui/material';
import Loading from '../../components/Loading';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 950,
  boxShadow: 'none',
  backgroundColor: '#f1f1f1',
}));

const LabelItem = styled(Grid)(({ theme }) => ({
  minHeight: '50px',
  display: 'flex',
  paddingLeft: '10px',
}));

const buttonStyle = {
  mx: 2,
  width: '65px',
  height: '30px',
  borderRadius: '15px',
  border: '1px solid #626262',
  color: '#000000',
  fontWeight: 'bold',
};

const AdminCouponsDetails = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const prevQuery = location.state?.queryString;
  const { couponCode } = useParams();

  const [coupon, setCoupon] = useState({
    couponCode: 0,
    couponName: '',
    discountPer: 0,
    discountFix: 0,
    startDate: '',
    deadline: '',
  });

  const [discountType, setDiscountType] = useState();
  const [discount, setDiscount] = useState();

  useEffect(() => {
    checkCoupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkCoupon = () => {
    axios.get(`/m/coupons/check/${couponCode}`).then((check) => {
      if (check.data === 0) {
        alert('존재하지 않는 쿠폰입니다.');
        navigate(`/m/coupons/lists?sort=-startDate&filter=none&pages=1`, {
          replace: true,
        });
      } else {
        getCouponDetail();
      }
    });
  };

  const getCouponDetail = () => {
    axios
      .get(`/m/coupons/getCouponDetails?couponCode=${couponCode}`)
      .then((res) => {
        const { data } = res;
        setCoupon(data);

        if (data.discountPer === 0) {
          setDiscountType('고정 금액');
          setDiscount('₩ ' + data.discountFix);
        } else {
          setDiscountType('퍼센트');
          setDiscount(data.discountPer + ' %');
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteCoupon = () => {
    if (window.confirm('정말 해당 쿠폰을 삭제하시겠습니까?')) {
      axios
        .delete(`/m/coupons/delete?couponCode=${couponCode}`)
        .then(() => {
          alert('쿠폰이 삭제되었습니다.');
          handleList();
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      return false;
    }
  };

  const handleList = () => {
    if (prevQuery === undefined) {
      navigate(`/m/coupons/lists?sort=-startDate&filter=none&pages=1`);
    } else {
      navigate(`/m/coupons/lists${prevQuery}`);
    }
  };

  return (
    <Box style={{ maxWidth: '1150px', margin: 'auto', userSelect: 'none' }}>
      <Box
        sx={{
          my: 5,
        }}
      >
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
          쿠폰 목록 &gt; 상세
        </Typography>
      </Box>

      {loading ? (
        <Loading height={'70vh'} />
      ) : (
        <>
          <StyledPaper style={{ marginTop: '40px' }}>
            <Grid container>
              <LabelItem
                item
                xs={2}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  쿠폰명
                </Typography>
              </LabelItem>
              <Grid
                item
                xs={10}
                sx={{
                  px: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  title={coupon.couponName}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {coupon.couponName}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  my: 1,
                  height: '1px',
                  borderBottom: '1px solid #7d7d7d',
                }}
              ></Grid>

              <LabelItem
                item
                xs={2}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  할인 종류
                </Typography>
              </LabelItem>
              <Grid
                item
                xs={10}
                sx={{
                  px: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="h2">
                  {discountType}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  my: 1,
                  height: '1px',
                  borderBottom: '1px solid #7d7d7d',
                }}
              ></Grid>

              <LabelItem
                item
                xs={2}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  할인 금액
                </Typography>
              </LabelItem>
              <Grid
                item
                xs={10}
                sx={{
                  px: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="h2">
                  {discount}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  my: 1,
                  height: '1px',
                  borderBottom: '1px solid #7d7d7d',
                }}
              ></Grid>

              <LabelItem
                item
                xs={2}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  발행일
                </Typography>
              </LabelItem>
              <Grid
                item
                xs={10}
                sx={{
                  px: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="h2">
                  {coupon.startDate}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  my: 1,
                  height: '1px',
                  borderBottom: '1px solid #7d7d7d',
                }}
              ></Grid>

              <LabelItem
                item
                xs={2}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  종료일
                </Typography>
              </LabelItem>
              <Grid
                item
                xs={10}
                sx={{
                  px: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="h2">
                  {coupon.deadline === null ? '무기한' : coupon.deadline}
                </Typography>
              </Grid>
            </Grid>
          </StyledPaper>
          <Box
            style={{
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '50px',
            }}
          >
            <Button
              onClick={deleteCoupon}
              variant="contained"
              sx={{
                ...buttonStyle,
                backgroundColor: '#f5b8b8',
                '&:hover': {
                  backgroundColor: 'tomato',
                  color: '#ffffff',
                },
              }}
            >
              삭제
            </Button>
            <Button
              onClick={handleList}
              variant="contained"
              sx={{
                ...buttonStyle,
                backgroundColor: '#ffffff',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#000000',
                },
              }}
            >
              목록
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminCouponsDetails;
