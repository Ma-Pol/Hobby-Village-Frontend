/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
import React, { useState, useRef, useReducer } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Modal,
  Typography,
  Box,
  Container,
} from '@mui/material';
import axios from 'axios';
import DaumPostcodeEmbed from 'react-daum-postcode';
import UserHeader from 'components/UserHeader';
import UserFooter from 'components/UserFooter';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const daumPostcodeStyle = {
  display: 'block',
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  top: '30%',
  width: '400px',
  height: '500px',
  zIndex: '99999',
};

const checkBtnStyle = {
  mb: '20px',
  backgroundColor: '#D9D9D9',
  color: '#000000',
  '&:hover': {
    backgroundColor: '#D9D9D9',
  },
};

const emailReducer = (state, action) => {
  switch (action.type) {
    case 'CEW':
      return {
        ...state,
        CEW: action.CEW,
      };
    case 'CER':
      return {
        ...state,
        CER: action.CER,
      };
    case 'CEL':
      return {
        ...state,
        CEL: action.CEL,
      };
    case 'CE':
      return {
        ...state,
        CE: action.CE,
      };
    default:
      return state;
  }
};

const nicknameReducer = (state, action) => {
  switch (action.type) {
    case 'CNW':
      return {
        ...state,
        CNW: action.CNW,
      };
    case 'CNR':
      return {
        ...state,
        CNR: action.CNR,
      };
    case 'CNL':
      return {
        ...state,
        CNL: action.CNL,
      };
    case 'CN':
      return {
        ...state,
        CN: action.CN,
      };
    default:
      return state;
  }
};

const UserSignup = () => {
  const email = sessionStorage.getItem('hobbyvillage-email'); // 이메일을 세션에서 가져오기

  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  const nicknameRegex = new RegExp('[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]$');

  const navigate = useNavigate();
  const [modalHandler, setModalHandler] = useState(false); // 배송지 입력 모달 핸들러

  const [emailCheck, emailDispatch] = useReducer(emailReducer, {
    CEW: false, // 이메일 입력 시작 여부 체크(CHECK_EMAIL_WRITE)
    CER: false, // 이메일 정규식 체크(CHECK_EMAIL_REGEX)
    CEL: false, // 이메일 길이 체크(CHECK_EMAIL_LENGTH)
    CE: false, // 이메일 중복 체크(CHECK_EMAIL)
  });

  const [nicknameCheck, nicknameDispatch] = useReducer(nicknameReducer, {
    CNW: false, // 닉네임 입력 시작 여부 체크(CHECK_NICKNAME_WRITE)
    CNR: false, // 닉네임 정규식 체크(CHECK_NICKNAME_REGEX)
    CNL: false, // 닉네임 길이 체크(CHECK_NICKNAME_LENGTH)
    CN: false, // 닉네임 중복 체크(CHECK_NICKNAME)
  });

  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const imageRef = useRef();

  const emailRef = useRef();
  const nicknameRef = useRef();

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [checkPasswordConfirmWrite, setCheckPasswordConfirmWrite] =
    useState(false); // 비밀번호 확인 입력 여부 체크
  const [checkPassword, setPasswordCheck] = useState(false); // 비밀번호 일치 여부 체크

  const nameRef = useRef();
  const [birthDay, setBirthDay] = useState(null);
  const phoneRef = useRef();

  const [zipCode, setZipCode] = useState('');
  const [address1, setAddress1] = useState('');
  const address2Ref = useRef();

  // 이메일 입력 시 체크
  const onEmailChange = (e) => {
    if (!emailCheck.CEW) {
      emailDispatch({ type: 'CEW', CEW: true });
    }

    // 실제 입력값 체크
    if (e.target.value.length === 0) {
      emailDispatch({ type: 'CEL', CEL: false });
    } else {
      emailDispatch({ type: 'CEL', CEL: true });
    }

    // 이메일 정규식 체크
    if (emailRegex.test(e.target.value)) {
      emailDispatch({ type: 'CER', CER: true });
    } else {
      emailDispatch({ type: 'CER', CER: false });
    }

    // 중복확인 미확인 상태로 변경
    emailDispatch({ type: 'CE', CE: false });
  };

  // 닉네임 입력 시 체크
  const onNicknameChange = (e) => {
    if (!nicknameCheck.CNW) {
      nicknameDispatch({ type: 'CNW', CNW: true });
    }

    // 2자 이하 체크
    if (e.target.value.length < 2) {
      nicknameDispatch({ type: 'CNL', CNL: false });
    } else {
      nicknameDispatch({ type: 'CNL', CNL: true });
    }

    // 10자 이상 입력 불가
    if (e.target.value.length > 10) {
      nicknameRef.current.value = e.target.value.slice(0, 10);
    }

    // 닉네임 정규식 체크
    if (nicknameRegex.test(e.target.value)) {
      nicknameDispatch({ type: 'CNR', CNR: true });
    } else {
      nicknameDispatch({ type: 'CNR', CNR: false });
    }

    // 중복확인 미확인 상태로 변경
    nicknameDispatch({ type: 'CN', CN: false });
  };

  // 이메일 중복확인
  const onCheckEmail = () => {
    axios
      .get(`/signup/check?email=${emailRef.current.value}`)
      .then((res) => {
        if (res.data) {
          alert('이미 등록된 이메일입니다. 다시 입력해주세요.');
          emailRef.current.value = '';
          emailRef.current.focus();
          emailDispatch({ type: 'CEL', CEL: false });
          emailDispatch({ type: 'CER', CER: false });
          emailDispatch({ type: 'CE', CE: false });
        } else {
          alert('사용 가능한 이메일입니다.');
          nicknameRef.current.focus();
          emailDispatch({ type: 'CE', CE: true });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 닉네임 중복확인
  const onCheckNickname = () => {
    axios
      .get(`/signup/check?nickname=${nicknameRef.current.value}`)
      .then((res) => {
        if (res.data) {
          alert('이미 등록된 닉네임입니다. 다시 입력해주세요.');
          nicknameRef.current.value = '';
          nicknameRef.current.focus();
          nicknameDispatch({ type: 'CNL', CNL: false });
          nicknameDispatch({ type: 'CNR', CNR: false });
          nicknameDispatch({ type: 'CN', CN: false });
        } else {
          alert('사용 가능한 닉네임입니다.');
          passwordRef.current.focus();
          nicknameDispatch({ type: 'CN', CN: true });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 비밀번호 일치확인 1
  const passwordCheck = (e) => {
    if (checkPasswordConfirmWrite) {
      if (passwordConfirmRef.current.value === e.target.value) {
        setPasswordCheck(true);
      } else {
        setPasswordCheck(false);
      }
    }
  };

  // 비밀번호 일치확인 2
  const passwordConfirmCheck = (e) => {
    if (!checkPasswordConfirmWrite) {
      setCheckPasswordConfirmWrite(true);
    }

    if (passwordRef.current.value === e.target.value) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  };

  // 생년월일 값 적용
  const handleBirthdayChange = (date) => {
    setBirthDay(date);
  };

  const phoneCheck = (e) => {
    const phone = e.target.value;
    phoneRef.current.value = phone.replace(/[^0-9]/gi, '');

    if (phone.length > 11) {
      phoneRef.current.value = phone.substring(0, 11);
    }
  };

  // 주소 검색 후처리
  const selectAddress = (data) => {
    let address1 = '';
    let extraAddress = '';

    if (data.userSelectedType === 'R') {
      address1 = data.roadAddress;
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddress += data.bname;
      }

      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddress +=
          extraAddress !== '' ? ', ' + data.buildingName : data.buildingName;
      }

      if (extraAddress !== '') {
        address1 += ' (' + extraAddress + ')';
      }
    } else {
      address1 = data.jibunAddress;
    }

    setZipCode(data.zonecode);
    setAddress1(address1);
    address2Ref.current.value = '';
    address2Ref.current.focus();
  };

  const handleMember = () => {
    if (emailRef.current.value === '') {
      alert('이메일을 입력해 주세요');
      emailRef.current.focus();
      return false;
    }

    if (nicknameRef.current.value === '') {
      alert('닉네임을 입력해 주세요');
      nicknameRef.current.focus();
      return false;
    }

    if (passwordRef.current.value === '') {
      alert('비밀번호를 입력해 주세요');
      passwordRef.current.focus();
      return false;
    }

    if (nameRef.current.value === '') {
      alert('이름을 입력해 주세요');
      nameRef.current.focus();
      return false;
    }

    if (phoneRef.current.value === '') {
      alert('전화번호를 입력해 주세요');
      phoneRef.current.focus();
      return false;
    }

    if (zipCode === '' || address1 === '') {
      alert('주소를 입력해 주세요');
      setModalHandler(true);
      return false;
    }

    if (!emailCheck.CE) {
      alert('이메일 중복 확인을 해주세요.');
      emailRef.current.focus();
      return false;
    }

    if (!nicknameCheck.CN) {
      alert('닉네임 중복 확인을 해주세요.');
      nicknameRef.current.focus();
      return false;
    }

    if (!checkPassword) {
      alert('비밀번호를 확인해주세요.');
      passwordConfirmRef.current.focus();
      return false;
    }

    const memberData = {
      email: emailRef.current.value,
      nickname: nicknameRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      birthday: birthDay,
      phone: phoneRef.current.value,
      zipCode: zipCode,
      address1: address1,
      address2:
        address2Ref.current.value === '' ? null : address2Ref.current.value,
    };

    axios
      .post('/signup', memberData)
      .then((res) => {
        if (res.data === 1) {
          if (imgFile !== null) {
            imageUpload();
          } else {
            alert('회원가입에 성공했습니다.');
            navigate('/login'); //login 폼으로 감
          }
        } else {
          alert('회원가입에 실패했습니다.');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const imageChange = (e) => {
    if (e.target.files.length === 0) {
      imageRef.current.value = '';
      setImgFile(null);
      setImgBase64([]);
      return false;
    }

    const imageFile = e.target.files[0];

    let check = false;
    const regExp = /[\[\]\{\}\/\?\\\*\|\<\>\"\'\:\;\`\^]/g;
    const imageFileType = imageFile.name.split('.').at(-1).toLowerCase();

    if (regExp.test(imageFile.name)) {
      alert('파일 이름에 특수문자가 포함되어 있습니다.');
      check = true;
    } else if (
      imageFileType !== 'jpg' &&
      imageFileType !== 'png' &&
      imageFileType !== 'jpeg'
    ) {
      alert('이미지 파일만 업로드 가능합니다.');
      check = true;
    }
    if (check) {
      imageRef.current.value = '';
      setImgFile(null);
      setImgBase64([]);
      return false;
    }

    setImgFile(imageFile);

    setImgBase64([]);

    if (imageFile) {
      const imgViewer = new FileReader();

      imgViewer.readAsDataURL(imageFile);
      imgViewer.onloadend = () => {
        const base64 = imgViewer.result;

        if (base64) {
          const base64Sub = base64.toString();

          setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
        }
      };
    }
  };

  const imageUpload = () => {
    const formData = new FormData();

    formData.append('uploadImg', imgFile);

    axios
      .post(`/signup/upload/${emailRef.current.value}`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('회원가입에 성공했습니다.');
        } else {
          alert('회원가입에는 성공했으나 이미지 업로드에 실패했습니다.');
        }
        navigate('/login'); //login 폼으로 감
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (email !== null) {
    return <Navigate to="/login" replace={true} />;
  }

  const defaultInputStyle = {
    '& .MuiInput-root': {
      '&:after': {
        borderBottom: '2px solid #c3c36a',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#c3c36a',
      },
    },
  };

  const emailStyle = {
    '& .MuiInput-root': {
      '&:before': {
        borderBottom:
          !emailCheck.CEW || (emailCheck.CEL && emailCheck.CER && emailCheck.CE)
            ? '1px solid #878787'
            : '1px solid #ff0000',
      },
      '&:after': {
        borderBottom:
          !emailCheck.CEW || (emailCheck.CEL && emailCheck.CER && emailCheck.CE)
            ? '2px solid #c3c36a'
            : '2px solid #ff0000',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color:
          !emailCheck.CEW || (emailCheck.CEL && emailCheck.CER && emailCheck.CE)
            ? '#c3c36a'
            : '#ff0000',
      },
    },
    '& .MuiFormHelperText-root': {
      color:
        !emailCheck.CEW || (emailCheck.CEL && emailCheck.CER && emailCheck.CE)
          ? '#878787'
          : '#ff0000',
    },
  };

  const nicknameStyle = {
    '& .MuiInput-root': {
      '&:before': {
        borderBottom:
          !nicknameCheck.CNW ||
          (nicknameCheck.CNL && nicknameCheck.CNR && nicknameCheck.CN)
            ? '1px solid #878787'
            : '1px solid #ff0000',
      },
      '&:after': {
        borderBottom:
          !nicknameCheck.CNW ||
          (nicknameCheck.CNL && nicknameCheck.CNR && nicknameCheck.CN)
            ? '2px solid #c3c36a'
            : '2px solid #ff0000',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color:
          !nicknameCheck.CNW ||
          (nicknameCheck.CNL && nicknameCheck.CNR && nicknameCheck.CN)
            ? '#c3c36a'
            : '#ff0000',
      },
    },
    '& .MuiFormHelperText-root': {
      color:
        !nicknameCheck.CNW ||
        (nicknameCheck.CNL && nicknameCheck.CNR && nicknameCheck.CN)
          ? '#878787'
          : '#ff0000',
    },
  };

  const passwordConfirmStyle = {
    '& .MuiInput-root': {
      '&:before': {
        borderBottom:
          !checkPasswordConfirmWrite || checkPassword
            ? '1px solid #878787'
            : '1px solid #ff0000',
      },
      '&:after': {
        borderBottom:
          !checkPasswordConfirmWrite || checkPassword
            ? '2px solid #c3c36a'
            : '2px solid #ff0000',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color:
          !checkPasswordConfirmWrite || checkPassword ? '#c3c36a' : '#ff0000',
      },
    },
    '& .MuiFormHelperText-root': {
      color:
        !checkPasswordConfirmWrite || checkPassword ? '#878787' : '#ff0000',
    },
  };

  return (
    <>
      <UserHeader />
      <Modal
        open={modalHandler}
        onClose={() => {
          setModalHandler(false);
        }}
      >
        <>
          <DaumPostcodeEmbed
            onComplete={(data) => {
              selectAddress(data);
              setModalHandler(false);
            }}
            autoClose={true}
            style={daumPostcodeStyle}
          />
        </>
      </Modal>

      <Container
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: '3rem',
            fontWeight: 'bold',
            mt: '50px',
            mb: '50px',
          }}
        >
          회원가입
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '700px',
          }}
        >
          {/* 프로필 사진 및 이메일/닉네임 인풋 시작 */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <input
              hidden
              id="imageInput"
              type="file"
              ref={imageRef}
              onChange={imageChange}
            />
            <label
              title="100MB 미만의 jpg, png, jpeg 파일만 업로드 가능합니다."
              htmlFor="imageInput"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
              }}
            >
              <Box
                component="img"
                sx={{
                  objectFit: 'cover',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: '1px solid #d5d5d5',
                  cursor: 'pointer',
                }}
                src={
                  imgBase64.length === 0
                    ? `${process.env.PUBLIC_URL}/assets/photo.png`
                    : imgBase64[0]
                }
                alt="프로필 사진"
              />
            </label>
            <Box
              sx={{
                m: 0,
                ml: '30px',
                width: '470px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Box
                sx={{
                  my: '10px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  width: '100%',
                  height: '70px',
                }}
              >
                <TextField
                  autoFocus
                  label="이메일*"
                  variant="standard"
                  inputRef={emailRef}
                  onChange={onEmailChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onCheckEmail();
                    }
                  }}
                  helperText={
                    !emailCheck.CEW || !emailCheck.CEL
                      ? '이메일을 입력해주세요.'
                      : emailCheck.CEL && !emailCheck.CER
                      ? '이메일 형식이 올바르지 않습니다.'
                      : emailCheck.CEL && emailCheck.CER && !emailCheck.CE
                      ? '이메일 중복 확인이 필요합니다.'
                      : '사용 가능한 이메일입니다.'
                  }
                  sx={{
                    ...emailStyle,
                    width: '370px',
                    mr: '20px',
                  }}
                />
                <Button
                  onClick={onCheckEmail}
                  sx={checkBtnStyle}
                  disabled={
                    !emailCheck.CEW ||
                    !emailCheck.CEL ||
                    !emailCheck.CER ||
                    emailCheck.CE
                  }
                >
                  중복
                </Button>
              </Box>
              <Box
                sx={{
                  mt: '10px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  width: '100%',
                  height: '70px',
                }}
              >
                <TextField
                  label="닉네임*"
                  variant="standard"
                  inputRef={nicknameRef}
                  onChange={onNicknameChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onCheckNickname();
                    }
                  }}
                  helperText={
                    !nicknameCheck.CNW || !nicknameCheck.CNL
                      ? '닉네임은 2 ~ 10자의 한글, 영문 숫자로 입력해주세요.'
                      : nicknameCheck.CNL && !nicknameCheck.CNR
                      ? '닉네임은 한글, 영문, 숫자만 입력 가능합니다.'
                      : nicknameCheck.CNL &&
                        nicknameCheck.CNR &&
                        !nicknameCheck.CN
                      ? '닉네임 중복 확인이 필요합니다.'
                      : '사용 가능한 닉네임입니다.'
                  }
                  sx={{
                    ...nicknameStyle,
                    width: '370px',
                    mr: '20px',
                  }}
                />
                <Button
                  onClick={onCheckNickname}
                  sx={checkBtnStyle}
                  disabled={
                    !nicknameCheck.CNW ||
                    !nicknameCheck.CNL ||
                    !nicknameCheck.CNR ||
                    nicknameCheck.CN
                  }
                >
                  중복
                </Button>
              </Box>
            </Box>
          </Box>
          {/* 프로필 사진 및 이메일/닉네임 인풋 끝 */}

          <TextField
            label="비밀번호*"
            type="password"
            variant="standard"
            inputRef={passwordRef}
            onChange={passwordCheck}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                passwordConfirmRef.current.focus();
              }
            }}
            sx={{
              ...defaultInputStyle,
              width: '400px',
              mt: '30px',
            }}
          />
          <TextField
            label="비밀번호 확인*"
            type="password"
            variant="standard"
            inputRef={passwordConfirmRef}
            onChange={passwordConfirmCheck}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                nameRef.current.focus();
              }
            }}
            helperText={
              !checkPasswordConfirmWrite
                ? ''
                : !checkPassword
                ? '비밀번호가 일치하지 않습니다.'
                : '비밀번호가 일치합니다.'
            }
            sx={{
              ...passwordConfirmStyle,
              width: '400px',
              mt: '35px',
            }}
          />
          <TextField
            label="이름*"
            variant="standard"
            inputRef={nameRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                phoneRef.current.focus();
              }
            }}
            sx={{
              ...defaultInputStyle,
              width: '400px',
              mt: '35px',
            }}
          />
          <Box
            sx={{
              width: '400px',
              mt: '45px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="생년월일"
                value={birthDay}
                onChange={handleBirthdayChange}
                disableFuture
                sx={{
                  '& .MuiInputBase-input': {
                    width: '200px',
                    height: '20px',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: '#c3c36a',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#c3c36a',
                    },
                  },
                }}
                format="YYYY-MM-DD"
              />
            </LocalizationProvider>
            <Button
              variant="outlined"
              sx={{
                ml: '15px',
                mt: '5px',
                pt: '6px',
                width: '100px',
                height: '40px',
                backgroundColor: '#D9D9D9',
                border: 'none',
                color: '#000000',
                '&:hover': {
                  border: 'none',
                  backgroundColor: '#D9D9D9',
                },
              }}
              onClick={() => {
                setBirthDay(null);
              }}
            >
              초기화
            </Button>
          </Box>

          <TextField
            label="휴대폰 번호*"
            variant="standard"
            inputRef={phoneRef}
            onChange={phoneCheck}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setModalHandler(true);
              }
            }}
            helperText=""
            sx={{
              ...defaultInputStyle,
              width: '400px',
              mt: '35px',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '400px',
              mt: '35px',
            }}
          >
            <TextField
              label="우편번호*"
              variant="standard"
              value={zipCode}
              sx={{
                ...defaultInputStyle,
                width: '250px',
              }}
              inputProps={{
                readOnly: true,
              }}
            />
            <Button
              onClick={() => {
                setModalHandler(true);
              }}
              sx={{
                width: '100px',
                backgroundColor: '#D9D9D9',
                border: 'none',
                color: '#000000',
                '&:hover': {
                  border: 'none',
                  backgroundColor: '#D9D9D9',
                },
              }}
            >
              주소찾기
            </Button>
          </Box>

          <TextField
            label="주소*"
            variant="standard"
            value={address1}
            sx={{
              ...defaultInputStyle,
              width: '400px',
              mt: '35px',
            }}
            inputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="상세주소"
            variant="standard"
            inputRef={address2Ref}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleMember();
              }
            }}
            sx={{
              ...defaultInputStyle,
              width: '400px',
              mt: '35px',
            }}
          />
        </Box>

        <Box
          sx={{
            m: 0,
            mt: 10,
            mb: 10,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
            sx={{
              mr: 3,
              width: '170px',
              height: '45px',
              borderRadius: '10px',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#000000',
              },
            }}
          >
            취소
          </Button>
          <Button
            onClick={handleMember}
            variant="contained"
            sx={{
              ml: 3,
              width: '170px',
              height: '45px',
              borderRadius: '10px',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              backgroundColor: '#c3c36a',
              '&:hover': {
                backgroundColor: '#c3c36a',
                color: '#ffffff',
              },
            }}
          >
            회원가입
          </Button>
        </Box>
      </Container>

      <UserFooter />
    </>
  );
};

export default UserSignup;
