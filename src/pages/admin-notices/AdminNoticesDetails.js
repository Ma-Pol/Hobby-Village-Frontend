import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const AdminNoticesDetails = () => {
  const { notCode } = useParams();
  const [noticeDetail, setNoticeDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`/m/notices/noticeDetails/${notCode}`)
      .then((detail) => {
        setNoticeDetail(detail.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [notCode]);

  return (
    <div>
      <h1>공지사항 상세보기</h1>
      <h2>제목</h2>
      <p>{noticeDetail.notTitle}</p>
      <h2>카테고리</h2>
      <p>{noticeDetail.notCategory}</p>
      <h2>작성일</h2>
      <p>{noticeDetail.notDate}</p>
      <h2>내용</h2>
      <p dangerouslySetInnerHTML={{ __html: noticeDetail.notContent }}></p>
      <br />
      <br />
      <br />
      <button>삭제</button>
      <button>목록</button>
      <button>수정</button>
    </div>
  );
};

export default AdminNoticesDetails;
