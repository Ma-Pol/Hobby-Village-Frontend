import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  useSearchParams,
  useParams,
  Navigate,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Pagination, Typography } from '@mui/material';
import { Box, InputLabel, NativeSelect } from '@material-ui/core';
import Loading from '../../components/Loading';
import UserReviewsRows from '../../components/user-reviews/UserReviewsRows';

// 기본 경로
// http://localhost:3000/reviews/${email}/lists?sort=-revwRegiDate&pages=1

const UserReviewsLists = () => {
  const [loading, setLoading] = useState(true);
  const sessionEmail = sessionStorage.getItem('hobbyvillage-email');
  const nickname = sessionStorage.getItem('hobbyvillage-usernickname');
  const { email } = useParams();

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(searchParams.get('pages'));
  const [reviewList, setReviewList] = useState([]); // 리뷰 목록

  const sortRef = useRef();

  // 리뷰 목록 조회
  useEffect(() => {
    axios
      .all([
        axios.get(`/users/reviews/count?revwWriter=${nickname}`),
        axios.get(
          `/users/reviews/lists?revwWriter=${nickname}&sort=${searchParams.get(
            'sort'
          )}&pages=${searchParams.get('pages')}`
        ),
      ])
      .then(
        axios.spread((count, list) => {
          setTotalPage(Math.ceil(count.data / 10));
          setCurrentPage(searchParams.get('pages'));
          setReviewList(list.data);
          sortRef.current.value = searchParams.get('sort');
        })
      )
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [nickname, searchParams]);

  const sortChange = () => {
    const sort = sortRef.current.value;
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };

  const pageChange = (e, value) => {
    searchParams.set('pages', value);
    setSearchParams(searchParams);
  };

  const tableHead = {
    fontWeight: 'bold',
    textAlign: 'center',
    px: 1,
    py: 0.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  if (sessionEmail !== email) {
    alert('잘못된 접근입니다.');
    return <Navigate to={`/reviews/${sessionEmail}/lists`} />;
  }

  return (
    <Container
      sx={{
        minHeight: '80vh',
      }}
    >
      {/* 리뷰 목록 글씨 표기 시작 */}
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
        리뷰 관리 &gt; 목록
      </Typography>
      {/* 리뷰 목록 글씨 표기 끝 */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        {/* 정렬 기준 선택용 Select Box 표기 시작 */}
        <Box sx={{ float: 'right', pr: 1, mb: 1 }}>
          <InputLabel
            sx={{
              fontSize: '0.8rem',
            }}
            variant="standard"
            htmlFor="userReviewListSort"
          >
            정렬 기준
          </InputLabel>
          <NativeSelect
            inputRef={sortRef}
            onChange={sortChange}
            sx={{
              px: 1,
              hover: {
                backgroundColor: '#ffffff',
              },
              focus: {
                backgroundColor: '#fffffff',
              },
            }}
            defaultValue="-revwRegiDate"
            inputProps={{
              name: 'sort',
              id: 'userReviewListSort',
            }}
          >
            <option value="-revwRegiDate">최근 작성 순</option>
            <option value="revwRegiDate">오래된 작성 순</option>
          </NativeSelect>
        </Box>
        {/* 정렬 기준 선택용 Select Box 표기 끝 */}
      </Box>
      {/* 리뷰 목록 테이블 표기 시작 */}
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        {/* 리뷰 목록 테이블 컬럼명 표기 시작 */}
        <Grid
          container
          sx={{
            px: 1,
            py: 0.5,
            borderTop: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <Grid item xs={2}>
            <Typography sx={tableHead}>상품 명</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>별점</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={tableHead}>리뷰 제목</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={tableHead}>등록일</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography sx={tableHead}>신고 수</Typography>
          </Grid>
        </Grid>
        {/* 리뷰 목록 테이블 컬럼명 표기 끝 */}

        {/* 리뷰 목록 테이블 데이터 표기 시작 */}
        {loading ? (
          <Box sx={{ m: 0, borderBottom: '2px solid #000000', width: '100%' }}>
            <Loading height={'436px'} />
          </Box>
        ) : reviewList.length === 0 ? (
          // 리뷰 데이터가 없을 경우
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            리뷰 데이터가 존재하지 않습니다.
          </Typography>
        ) : (
          // 리뷰 데이터가 있을 경우
          reviewList.map((review, index, row) => (
            <UserReviewsRows
              key={review.revwCode}
              revwCode={review.revwCode}
              prodCode={review.prodCode}
              prodName={review.prodName}
              revwRate={review.revwRate}
              revwTitle={review.revwTitle}
              revwRegiDate={review.revwRegiDate}
              revwReport={review.revwReport}
              queryString={location.search}
              isLast={index + 1 === row.length} // 마지막 데이터인지 확인
            />
          ))
        )}
        {/* 리뷰 목록 테이블 데이터 표기 끝 */}
      </Box>
      {/* 리뷰 목록 테이블 표기 끝 */}

      {/* 페이지네이션 표기 시작 */}
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={Number(totalPage || 0)}
          page={Number(currentPage)}
          onChange={pageChange}
          showFirstButton
          showLastButton
        />
      </Box>
      {/* 페이지네이션 표기 끝 */}
    </Container>
  );
};

export default UserReviewsLists;
