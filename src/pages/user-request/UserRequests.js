/* eslint-disable no-useless-escape */
import axios from 'axios';
import React, { useRef, useState } from 'react';

const UserRequests = () => {
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const filesRef = useRef();

  const imageChange = (e) => {
    const imageFiles = e.target.files;

    for (let i = 0; i < imageFiles.length; i++) {
      let check = false;

      const regExp = /[\[\]\{\}\/\?\\\*\|\<\>\"\'\:\;\`\^]/g;
      const imageFileType = imageFiles[i].name.split('.').at(-1).toLowerCase();

      if (regExp.test(imageFiles[i].name)) {
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
        filesRef.current.value = '';
        setImgBase64([]);
        return false;
      }
    }
    setImgFiles(imageFiles);

    // 이미지 미리보기
    setImgBase64([]);
    for (let i = 0; i < imageFiles.length; i++) {
      if (imageFiles[i]) {
        const imgViewer = new FileReader();

        imgViewer.readAsDataURL(imageFiles[i]);
        imgViewer.onloadend = () => {
          const base64 = imgViewer.result;

          if (base64) {
            const base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  // 이미지 업로드 함수(위탁 신청 등록 후 사용)
  const imageUpload = (reqCode) => {
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append('uploadImg', imgFiles[i]);
    }

    axios
      .post(`/requests/upload/img/${reqCode}`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('이미지 업로드 성공!');
          setImgBase64([]);
          filesRef.current.value = '';
          // 마이 페이지 내 판매/위탁 신청 목록 페이지로 이동
        } else {
          alert('이미지 업로드 실패!');
          setImgBase64([]);
          filesRef.current.value = '';
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>이미지 업로드하기</h1>
      <input type="file" ref={filesRef} multiple onChange={imageChange} />
      <button onClick={imageUpload}>업로드하기(백엔드와 연결되는 부분)</button>
      <h2>이미지 미리보기</h2>

      {/* 이 아래로 이미지 미리보기 화면(이미지 슬라이더 파트) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 실제 이미지가 보여지는 공간 */}
        {imgBase64.map((img, index) => {
          return (
            <div
              key={index}
              style={{
                margin: '10px 0',
              }}
            >
              <img
                src={img}
                alt="미리보기 이미지"
                style={{ maxWidth: '400px' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserRequests;
