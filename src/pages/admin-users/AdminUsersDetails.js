import { Typography, Button, Box } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from 'components/Loading';

const buttonStyle = {
  mx: 2,
  width: '65px',
  height: '30px',
  borderRadius: '15px',
  border: '1px solid #626262',
  color: '#000000',
  fontWeight: 'bold',
};

const AdminUsersDetails = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userCode } = useParams();
  const location = useLocation();
  const prevQuery = location.state?.queryString;
  const [details, setDetails] = useState();

  useEffect(() => {
    checkUserCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUserCode = () => {
    axios.get(`/m/users/check/${userCode}`).then((check) => {
      if (check.data === 0) {
        alert('존재하지 않는 회원입니다.');
        navigate(-1);
      } else {
        getUserDetail();
      }
    });
  };

  const getUserDetail = () => {
    axios
      .get(`/m/users/userDetails/${userCode}`)
      .then((detail) => {
        setDetails(detail.data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleList = () => {
    if (prevQuery === undefined) {
      navigate(`/m/users/lists?sort=-userCode&pages=1`);
    } else {
      navigate(`/m/users/lists${prevQuery}`);
    }
  };

  const mainBoxStyle = {
    m: 0,
    mb: '50px',
    width: '650px',
    display: 'flex',
  };

  const headerStyle = {
    fontWeight: 'bold',
    width: '140px',
    mr: '60px',
  };

  const contentStyle = {
    width: '450px',
  };

  return (
    <Box style={{ maxWidth: '1150px', margin: 'auto' }}>
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
            userSelect: 'none',
          }}
        >
          회원 목록 &gt; 상세
        </Typography>
      </Box>

      {loading ? (
        <Loading height={'70vh'} />
      ) : (
        <>
          <Box
            sx={{
              mt: '40px',
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '700px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '700px',
              }}
            >
              {/* 프로필 사진 및 이메일/닉네임 시작 */}
              <Box
                sx={{
                  mb: '50px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                {/* 프로필 사진 시작 */}
                <Box
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid #d5d5d5',
                  }}
                  component="img"
                  src={
                    details.profPicture !== null
                      ? `http://localhost:8080/m/users/profPicture/${details.profPicture}`
                      : `${process.env.PUBLIC_URL}/assets/photo.png`
                  }
                />
                {/* 프로필 사진 끝 */}

                {/* 이메일/닉네임 시작 */}
                <Box
                  sx={{
                    m: 0,
                    width: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      ml: '10px',
                      my: '10px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      height: '50px',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                        mr: '50px',
                      }}
                    >
                      이메일
                    </Typography>
                    <Typography variant="h6" component="h2">
                      {details.email}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      ml: '10px',
                      my: '10px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      height: '50px',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                        mr: '50px',
                      }}
                    >
                      닉네임
                    </Typography>
                    <Typography variant="h6" component="h2">
                      {details.nickname}
                    </Typography>
                  </Box>
                </Box>
                {/* 이메일/닉네임 끝 */}
              </Box>
              {/* 프로필 사진 및 이메일/닉네임 끝 */}

              {/* 이름/생년월일/휴대폰 번호/기본 주소 시작 */}
              <Box sx={mainBoxStyle}>
                <Typography variant="h6" component="h2" sx={headerStyle}>
                  이름
                </Typography>
                <Typography variant="h6" component="h2" sx={contentStyle}>
                  {details.name}
                </Typography>
              </Box>

              <Box sx={mainBoxStyle}>
                <Typography variant="h6" component="h2" sx={headerStyle}>
                  생년월일
                </Typography>
                <Typography variant="h6" component="h2" sx={contentStyle}>
                  {details.birthday}
                </Typography>
              </Box>

              <Box sx={mainBoxStyle}>
                <Typography variant="h6" component="h2" sx={headerStyle}>
                  휴대폰 번호
                </Typography>
                <Typography variant="h6" component="h2" sx={contentStyle}>
                  {details.phone.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    '$1 - $2 - $3'
                  )}
                </Typography>
              </Box>

              <Box sx={mainBoxStyle}>
                <Typography variant="h6" component="h2" sx={headerStyle}>
                  기본 우편번호
                </Typography>
                <Typography variant="h6" component="h2" sx={contentStyle}>
                  {details.zipCode}
                </Typography>
              </Box>

              <Box sx={{ ...mainBoxStyle, mb: '20px' }}>
                <Typography variant="h6" component="h2" sx={headerStyle}>
                  기본 주소
                </Typography>
                <Typography variant="h6" component="h2" sx={contentStyle}>
                  {details.address1 + ' ' + details.address2}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 4,
                mb: 5,
              }}
            >
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
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminUsersDetails;
