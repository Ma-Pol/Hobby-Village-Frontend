/* eslint-disable no-useless-escape */
import axios from 'axios';
import React, { useRef, useState } from 'react';

const UserRequests = () => {
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const filesRef = useRef();

  // 파일 업로드 버튼 클릭 후 파일 선택 시 실행되는 함수
  const imageChange = (e) => {
    // input에 저장된 파일 목록을 가져옴
    const imageFiles = e.target.files;

    // 만약 이미지 파일만을 저장하고 싶은 경우, 확장자 명을 확인할 것
    // 예시문) jpg, png, jpeg만 저장하고, 파일명의 특수문자를 체크하는 for문
    // 파일명 특문체크는 필수입니다!
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

    // 가져온 파일 목록을 imgFile에 저장
    setImgFiles(imageFiles); // 여기까지는 이미지 업로드만을 위한 코드

    //
    // 여기부터는 이미지 미리보기를 위한 코드
    setImgBase64([]); // 기존에 미리보기가 있었다면 그 목록을 비워야 함

    // input에 저장된 파일 개수만큼 반복
    for (let i = 0; i < imageFiles.length; i++) {
      // 비어있는 파일이 아니라면(파일이 읽힌다면)
      if (imageFiles[i]) {
        const imgViewer = new FileReader(); // FileReader 객체 생성

        imgViewer.readAsDataURL(imageFiles[i]); // 파일을 읽어서
        imgViewer.onloadend = () => {
          // 읽기가 끝났을 때
          const base64 = imgViewer.result; // 파일의 내용물을 base64 형태로 저장

          // base64가 있으면
          if (base64) {
            const base64Sub = base64.toString(); // base64를 문자열로 변환

            // ImgBase64에 base64Sub를 추가
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  const imageUpload = () => {
    console.log(imgFiles);
    // <form></form> 형식으로 데이터를 보내기 위해 사용
    const formData = new FormData();

    // imgFile에 저장된 파일 목록을 formData에 저장
    for (let i = 0; i < imgFiles.length; i++) {
      formData.append('uploadImg', imgFiles[i]);
    }

    // 이미지 업로드 요청
    axios
      .post(`/requests/upload/img`, formData)
      .then((res) => {
        if (res.data !== 0) {
          alert('이미지 업로드 성공!');
          setImgBase64([]);
          filesRef.current.value = '';
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

      {/* 이 아래로 이미지 미리보기 화면(상품 등록에서는 이미지 슬라이더 파트) */}
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
