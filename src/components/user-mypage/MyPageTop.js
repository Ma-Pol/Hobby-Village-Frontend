import { Box, Container, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfPictureUpdateModal from './ProfPictureUpdateModal';
import CouponModal from './CouponModal';
import Loading from '../Loading';

const profPictureBoxStyle = {
  position: 'relative',
  boxSizing: 'border-box',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  cursor: 'pointer',
};

const profPictureCoverStyle = {
  textAlign: 'center',
  position: 'absolute',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  backgroundColor: '#25252550',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff',
  opacity: 0,
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: '#15151590',
    opacity: 1,
  },
};

const profPictureStyle = {
  boxSizing: 'border-box',
  objectFit: 'cover',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  border: '1px solid #d5d5d5',
};

const myPageTopButtonStyle = {
  boxSizing: 'border-box',
  p: '10px',
  height: '140px',
  borderRadius: '10px',
  boxShadow: '2px 2px 2px 0px rgba(0,0,0,0.4)',
  display: 'flex',
  flexDirection: 'column',
};

const MyPageTop = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const email = sessionStorage.getItem('hobbyvillage-email');
  const nickname = sessionStorage.getItem('hobbyvillage-usernickname');
  const profilePicture = sessionStorage.getItem('hobbyvillage-profile');

  const [couponCount, setCouponCount] = useState(0);
  const [savedMoney, setSavedMoney] = useState(0);

  const [profPictureModal, setProfPictureModal] = useState(false);
  // const [couponListBox, setCouponListBox] = useState(false);
  const [couponListModal, setCouponListModal] = useState(false);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = () => {
    axios
      .all([
        axios.get(`/users/mypages/savedMoney/${email}`),
        axios.get(`/users/mypages/couponCount/${email}`),
      ])
      .then(
        axios.spread((savedMoney, couponCount) => {
          setSavedMoney(savedMoney.data);
          setCouponCount(couponCount.data);
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) {
    return <Loading height={'422.79px'} />;
  } else {
    return (
      <>
        <Modal
          open={profPictureModal}
          onClose={() => {
            setProfPictureModal(false);
          }}
        >
          <>
            <ProfPictureUpdateModal setProfPictureModal={setProfPictureModal} />
          </>
        </Modal>

        <Modal
          open={couponListModal}
          onClose={() => {
            setCouponListModal(false);
          }}
        >
          <>
            <CouponModal
              getUserData={getUserData}
              setCouponListModal={setCouponListModal}
            />
          </>
        </Modal>

        {/* 마이페이지 상단부 시작 */}
        <Box
          sx={{
            width: '100%',
            mb: '20px',
            pb: '60px',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Container
            sx={{
              userSelect: 'none',
              width: '1100px',
            }}
          >
            {/* My Page 표기 시작 */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                margin: '30px 0 20px 0',
              }}
            >
              My Page
            </Typography>
            {/* My Page 표기 끝 */}

            {/* 좌측 프로필 사진 / 우측 버튼모음 표기 시작 */}
            <Box
              sx={{
                width: '1000px',
                mx: 'auto',
                mt: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* 프로필 사진, 닉네임, 회원 정보 변경, 배송지 관리 시작 */}
              <Box
                sx={{
                  width: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* 프로필 사진 시작 */}
                <Box
                  onClick={() => {
                    setProfPictureModal(true);
                  }}
                  sx={profPictureBoxStyle}
                >
                  <Box sx={profPictureCoverStyle}>
                    프로필 사진
                    <br />
                    변경
                  </Box>
                  <Box
                    component="img"
                    sx={profPictureStyle}
                    src={`http://localhost:8080/users/mypages/profile/${profilePicture}`}
                    alt="프로필 사진"
                  />
                </Box>
                {/* 프로필 사진 끝 */}

                <Typography
                  variant="h6"
                  sx={{
                    mt: '10px',
                    fontSize: '1.5rem',
                    width: '100%',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {nickname}
                </Typography>

                {/* 회원 정보 변경, 배송지 관리 시작 */}
                <Link
                  style={{
                    textDecoration: 'none',
                  }}
                  to={`/users/${email}/modify`}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      mt: '10px',
                      fontSize: '1rem',
                      width: '100%',
                      color: '#000000',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    회원정보 수정
                  </Typography>
                </Link>

                <Link
                  style={{
                    textDecoration: 'none',
                  }}
                  to={`/mypages/${email}/addresses/lists`}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      mt: '5px',
                      fontSize: '1rem',
                      width: '100%',
                      color: '#000000',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    배송지 관리
                  </Typography>
                </Link>
                {/* 회원 정보 변경, 배송지 관리 끝 */}
              </Box>
              {/* 프로필 사진, 닉네임, 회원 정보 변경, 배송지 관리 끝 */}

              {/* 버튼 모음 시작 */}
              {/* 우측 적립금, 쿠폰, 주문 내역, 리뷰 관리, 찜 목록, 물품 판매/위탁 버튼모음 표기 시작 */}
              <Box
                sx={{
                  width: '680px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* 상단 라인 적립금, 주문 내역, 리뷰 관리 버튼모음 표기 시작 */}
                <Box
                  sx={{
                    mb: '10px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      ...myPageTopButtonStyle,
                      mr: '10px',
                      width: '280px',
                      backgroundColor: '#C3C36A',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '30px',
                      }}
                    >
                      <img
                        width="30px"
                        height="30px"
                        src="https://img.icons8.com/ios-filled/50/us-dollar-circled--v2.png"
                        alt="us-dollar-circled--v2"
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          ml: '10px',
                          fontSize: '1.2rem',
                          width: '100%',
                          color: '#000000',
                        }}
                      >
                        적립금
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: '10px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        height: '60px',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '2.5rem',
                          color: '#000000',
                        }}
                      >
                        {String(savedMoney).replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        )}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          ml: '10px',
                          pb: '5px',
                          fontSize: '1.5rem',
                          color: '#000000',
                        }}
                      >
                        원
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    onClick={() => {
                      navigate(
                        `/mypages/${email}/orders?odrState=payment-completed`
                      );
                    }}
                    sx={{
                      ...myPageTopButtonStyle,
                      mr: '10px',
                      width: '190px',
                      backgroundColor: '#ECECEC',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      width="80px"
                      height="80px"
                      src="https://img.icons8.com/ios-filled/100/shipped.png"
                      alt="shipped"
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.2rem',
                        color: '#000000',
                      }}
                    >
                      주문 내역 &gt;
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => {
                      navigate(
                        `/reviews/${email}/lists?sort=-revwRegiDate&pages=1`
                      );
                    }}
                    sx={{
                      ...myPageTopButtonStyle,
                      width: '190px',
                      backgroundColor: '#C3C36A',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      width="80px"
                      height="80px"
                      src="https://img.icons8.com/ios-filled/100/very-popular-topic.png"
                      alt="very-popular-topic"
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.2rem',
                        color: '#000000',
                      }}
                    >
                      리뷰 관리 &gt;
                    </Typography>
                  </Box>
                </Box>
                {/* 상단 라인 적립금, 주문 내역, 리뷰 관리 버튼모음 표기 끝 */}

                {/* 하단 라인 쿠폰, 찜 목록, 물품 판매/위탁 버튼모음 표기 시작 */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    onClick={() => {
                      // setCouponListBox(!couponListBox);
                      setCouponListModal(true);
                    }}
                    sx={{
                      ...myPageTopButtonStyle,
                      mr: '10px',
                      width: '280px',
                      backgroundColor: '#ECECEC',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {/* <Box
                    sx={{
                      position: 'absolute',
                      left: '0',
                      bottom: '-310px',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box',
                      width: '100%',
                      height: '300px',
                      display: couponListBox ? 'flex' : 'none',
                      p: '10px',
                      borderRadius: '10px',
                      border: '1px solid #dddddd',
                      boxShadow: '2px 2px 2px 0px rgba(0,0,0,0.4)',
                    }}
                  >
                    테스트
                  </Box> */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '30px',
                      }}
                    >
                      <img
                        width="30px"
                        height="30px"
                        src="https://img.icons8.com/ios-filled/50/loyalty-card.png"
                        alt="loyalty-card"
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          ml: '10px',
                          fontSize: '1.2rem',
                          width: '100%',
                          color: '#000000',
                        }}
                      >
                        쿠폰 관리 &gt;
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: '10px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        height: '60px',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '2.5rem',
                          color: '#000000',
                        }}
                      >
                        {couponCount}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          ml: '10px',
                          pb: '5px',
                          fontSize: '1.5rem',
                          color: '#000000',
                        }}
                      >
                        장
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    onClick={() => {
                      navigate(`/dibs/${email}/lists/all`);
                    }}
                    sx={{
                      ...myPageTopButtonStyle,
                      mr: '10px',
                      width: '190px',
                      backgroundColor: '#C3C36A',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      width="80px"
                      height="80px"
                      src="https://img.icons8.com/material-outlined/96/hearts.png"
                      alt="hearts"
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.2rem',
                        color: '#000000',
                      }}
                    >
                      찜 목록 &gt;
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => {
                      navigate(`/mypages/${email}/requests/lists?filter=none`);
                    }}
                    sx={{
                      ...myPageTopButtonStyle,
                      width: '190px',
                      backgroundColor: '#ECECEC',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      width="80px"
                      height="80px"
                      src="https://img.icons8.com/pastel-glyph/64/hand-box.png"
                      alt="hand-box"
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.2rem',
                        color: '#000000',
                      }}
                    >
                      물품 판매/위탁 &gt;
                    </Typography>
                  </Box>
                </Box>
                {/* 하단 라인 쿠폰, 찜 목록, 물품 판매/위탁 버튼모음 표기 끝 */}
              </Box>
              {/* 버튼 모음 끝 */}
            </Box>
            {/* 좌측 프로필 사진 / 우측 버튼모음 표기 끝 */}
          </Container>
        </Box>
        {/* 마이페이지 상단부 끝 */}
      </>
    );
  }
};

export default MyPageTop;
