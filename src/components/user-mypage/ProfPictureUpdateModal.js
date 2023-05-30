/* eslint-disable no-useless-escape */
import { Box, Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';

const ProfPictureUpdateModal = ({ setProfPictureModal }) => {
  const email = sessionStorage.getItem('hobbyvillage-email');
  const profilePicture = sessionStorage.getItem('hobbyvillage-profile');
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const imageRef = useRef();

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
      .patch(`/users/mypages/profPicture/${email}/${profilePicture}`, formData)
      .then((res) => {
        if (res.data !== null) {
          alert('프로필 사진이 변경되었습니다.');
          sessionStorage.setItem('hobbyvillage-profile', res.data);
        } else {
          alert('프로필 사진 변경에 실패했습니다.');
        }
        setProfPictureModal(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Container
      sx={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '30%',
        zIndex: '99999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
        height: '460px',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '3px solid #d5d5d5',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mt: '20px',
          fontWeight: 'bold',
        }}
      >
        프로필 사진 변경
      </Typography>
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
          marginTop: '30px',
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
      <Box>
        <Typography
          variant="body1"
          sx={{
            mt: '30px',
          }}
        >
          프로필 사진은 100MB 미만의 jpg, png, jpeg
          <br />
          파일만 업로드 가능합니다.
        </Typography>
      </Box>
      <Box
        sx={{
          m: 0,
          mt: '40px',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setProfPictureModal(false);
          }}
          sx={{
            mr: 2,
            width: '90px',
            height: '35px',
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
          취소
        </Button>
        <Button
          onClick={imageUpload}
          variant="contained"
          sx={{
            ml: 2,
            width: '90px',
            height: '35px',
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
          변경
        </Button>
      </Box>
    </Container>
  );
};

export default ProfPictureUpdateModal;
