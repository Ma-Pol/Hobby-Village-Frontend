import { Box, Container, Typography, Button } from '@mui/material';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminNoticesDetails = () => {
  const { notCode } = useParams();
  const modifyLink = `/m/notices/modify/${notCode}`;
  const [noticeDetail, setNoticeDetail] = useState([]);
  const navigate = useNavigate();

  // 공지사항 상세 조회
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

  // 공지사항 삭제
  const deleteNotice = () => {
    axios
      .delete(`/m/notices/noticeDelete/${notCode}`)
      .then((response) => {
        console.log(response);
        if (response.data === 1) {
          alert('삭제가 완료되었습니다.');
          // 입력 받은 데이터가 정상적으로 들어왔으면(값이 1이면) navigate를 통해 페이지 이동
          navigate('/m/notices/lists?sort=-notDate&filter=none&pages=1');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const noticeDetailRow = {
    minHeight: '50px',
    display: 'flex',
  };

  const noticeDetailFirstCell = {
    width: '100px',
  };

  const noticeDetailSecondCell = {
    width: 'calc(100% - 100px)',
  };

  return (
    <Container>
      {/* 공지사항 목록 글씨 표기 시작 */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 5,
          mb: 1,
          pl: 2,
          pr: 1,
          fontWeight: 'bold',
          userSelect: 'none',
        }}
      >
        공지사항 &#62; 상세
      </Typography>

      <Box
        sx={{
          mt: 2,
          mx: 'auto',
          px: 2,
          width: '1100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#DDDDDD',
            width: '1100px',
          }}
        >
          <Box sx={noticeDetailRow}>
            <Box sx={noticeDetailFirstCell}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 'bold' }}
              >
                제목
              </Typography>
            </Box>
            <Box sx={noticeDetailSecondCell}>
              <Typography variant="h6" component="h2">
                {noticeDetail.notTitle}
              </Typography>
            </Box>
          </Box>

          <Box sx={noticeDetailRow}>
            <Box sx={noticeDetailFirstCell}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 'bold' }}
              >
                카테고리
              </Typography>
            </Box>

            <Box sx={noticeDetailSecondCell}>
              <Typography variant="h6" component="h2">
                {noticeDetail.notCategory}
              </Typography>
            </Box>
          </Box>

          <Box sx={noticeDetailRow}>
            <Box sx={noticeDetailFirstCell}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 'bold' }}
              >
                작성일
              </Typography>
            </Box>

            <Box sx={noticeDetailSecondCell}>
              <Typography variant="h6" component="h2">
                {noticeDetail.notDate}
              </Typography>
            </Box>
          </Box>

          <Box sx={noticeDetailRow}>
            <Box sx={noticeDetailFirstCell}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 'bold' }}
              >
                내용
              </Typography>
            </Box>

            <Box sx={noticeDetailSecondCell}>
              <Typography
                dangerouslySetInnerHTML={{ __html: noticeDetail.notContent }}
                variant="h6"
                component="h2"
              ></Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'Center',
        }}
      >
        {/* 삭제 버튼 */}
        <Button
          variant="contained"
          size="small"
          onClick={deleteNotice} // 클릭 시 deleteNotice 함수 호출
          sx={{
            mt: 1,
            mr: 1,
            height: '25px',
            float: 'center',
            backgroundColor: '#F5B8B8',
            color: '#000000',
            border: '1px solid #000000',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          삭제
        </Button>

        <Button
          variant="contained"
          size="small"
          href="/m/notices/lists?sort=-notDate&filter=none&pages=1"
          sx={{
            mt: 1,
            mr: 1,
            height: '25px',
            float: 'center',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid #000000',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          목록
        </Button>

        <Button
          variant="contained"
          size="small"
          href={modifyLink}
          sx={{
            mt: 1,
            mr: 1,
            height: '25px',
            float: 'center',
            backgroundColor: '#C3C36A',
            color: '#000000',
            border: '1px solid #000000',
            '&:hover': {
              backgroundColor: '#c6c6c6',
              color: '#000000',
            },
          }}
        >
          수정
        </Button>
      </Box>
    </Container>
  );
};

export default AdminNoticesDetails;
