import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';

const UserReviewsDetails = () => {
  const navigate = useNavigate();
  const { revwCode } = useParams();
  const [details, setDetails] = useState([]);

  const getDetails = () => {
    axios
      .get(`/reviews/details/${revwCode}`)
      .then((detail) => {
        setDetails(detail.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  const ListsReviews = () => {
    navigate(`/reviews/:email/lists`);
  };

  const modifyReviews = () => {
    navigate(`/reviews/modify/${revwCode}`);
  };

  const tabletitleStyle = {
    border: '1px solid #7A7A7A',
    width: '150px',
    align: 'left',
  };
  const tablecontentStyle = {
    border: '1px solid #7A7A7A',
    align: 'left',
  };
  const btnlistStyle = {
    variant: 'outlined',
    width: '150px',
    height: '50px',
    bgcolor: '#c3c36a',
    borderRadius: '10px',
    border: '1px solid #626262',
    color: '#000000',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#c3c36a',
      border: '1px solid #626262',
      color: '#ffffff',
    },
  };
  const btnmodifyStyle = {
    variant: 'outlined',
    width: '150px',
    height: '50px',
    bgcolor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #626262',
    color: '#000000',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#ffffff',
      border: '1px solid #626262',
      color: '#000000',
    },
  };

  return (
    <div>
      <Box style={{ maxWidth: '1150px', margin: 'auto' }}>
        <Box
          sx={{
            my: 5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontweight: 'bold',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.6rem',
            }}
          >
            리뷰 관리 &gt; 리뷰 상세
          </Typography>
        </Box>
        <Container>
          <Table>
            <>
              <TableRow>
                <TableCell sx={tabletitleStyle}>상품명</TableCell>
                <TableCell sx={tablecontentStyle}>{details.prodName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={tabletitleStyle}>별점</TableCell>
                <TableCell sx={tablecontentStyle}>
                  {details.revwRate === 0
                    ? '☆☆☆☆☆'
                    : details.revwRate === 1
                    ? '★☆☆☆☆'
                    : details.revwRate === 2
                    ? '★★☆☆☆'
                    : details.revwRate === 3
                    ? '★★★☆☆'
                    : details.revwRate === 4
                    ? '★★★★☆'
                    : details.revwRate === 5
                    ? '★★★★★'
                    : ''}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={tabletitleStyle}>리뷰 제목</TableCell>
                <TableCell sx={tablecontentStyle}>
                  {details.revwTitle}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={tabletitleStyle}>첨부 사진</TableCell>
                <TableCell sx={tablecontentStyle}>
                  <img
                    alt={`상품사진`}
                    src={process.env.PUBLIC_URL + details.prodPicture}
                  ></img>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={tabletitleStyle}>리뷰 본문</TableCell>
                <TableCell sx={tablecontentStyle}>
                  {details.revwContent}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={tabletitleStyle}>신고 수</TableCell>
                <TableCell sx={tablecontentStyle}>
                  {details.revwReport}
                </TableCell>
              </TableRow>
            </>
          </Table>
          <Box
            sx={{
              mt: '30px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button onClick={ListsReviews} sx={btnlistStyle}>
              목록
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={modifyReviews} sx={btnmodifyStyle}>
              수정
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default UserReviewsDetails;
