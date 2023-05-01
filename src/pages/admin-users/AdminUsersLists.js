import {
  Box,
  Container,
  Grid,
  NativeSelect,
  Typography,
  Button,
  InputLabel,
  Pagination,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AdminUsersRows from '../../components/admin-users/AdminUsersLists/AdminUsersRows';

const AdminUsersLists = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const [userList, setUserList] = useState([]); // 회원 목록
  const [totalPage, setTotalPage] = useState(); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(searchParams.get('pages')); // 현재 페이지
  const sortRef = useRef(); // 현재 정렬 기준
  const conditionRef = useRef(); // 현재 검색 조건
  const keywordRef = useRef(); // 현재 검색 키워드

  // 페이지 접근 시 회원 목록 가져오기
  useEffect(() => {
    // 검색 조건이 없을 때
    if (searchParams.get('keyword') === null) {
      // 다중 요청(페이지네이션을 위한 전체 회원 수 요청, 회원 목록 요청)
      axios
        .all([
          axios.get(`/m/users/count`),
          axios.get(
            `/m/users/lists?sort=${searchParams.get(
              'sort'
            )}&pages=${searchParams.get('pages')}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10)); // 전체 페이지 수 설정
            setUserList(list.data); // 회원 목록 설정
            setCurrentPage(searchParams.get('pages')); // 현재 페이지 설정
            sortRef.current.value = searchParams.get('sort'); // 현재 정렬 기준 설정
            conditionRef.current.value = 'email'; // 현재 검색 조건 기본값 설정
            keywordRef.current.value = ''; // 현재 검색 키워드 기본값 설정
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
    // 검색 조건이 있을 때
    else {
      axios
        .all([
          axios.get(
            `/m/users/count?condition=${searchParams.get(
              'condition'
            )}&keyword=${searchParams.get('keyword')}`
          ),
          axios.get(
            `/m/users/lists?condition=${searchParams.get(
              'condition'
            )}&keyword=${searchParams.get('keyword')}&sort=${searchParams.get(
              'sort'
            )}&pages=${searchParams.get('pages')}`
          ),
        ])
        .then(
          axios.spread((count, list) => {
            setTotalPage(Math.ceil(count.data / 10));
            setUserList(list.data);
            setCurrentPage(searchParams.get('pages'));
            sortRef.current.value = searchParams.get('sort');
            conditionRef.current.value = searchParams.get('condition');
            keywordRef.current.value = searchParams.get('keyword');
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchParams]);

  // 페이지네이션 클릭 시
  const pageChange = (e, value) => {
    searchParams.set('pages', value);
    setSearchParams(searchParams);
  };

  // 검색 버튼 클릭 시
  const search = () => {
    const sort = sortRef.current.value;
    const condition = conditionRef.current.value;
    const keyword = keywordRef.current.value;
    if (keyword === '') {
      navigate(`/m/users/lists?sort=${sort}&pages=1`);
    } else {
      navigate(
        `/m/users/lists?condition=${condition}&keyword=${keyword}&sort=${sort}&pages=1`
      );
    }
  };

  // 정렬 기준 변경 시
  const sortChange = () => {
    const sort = sortRef.current.value;
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };

  // 회원 삭제 버튼 클릭 시
  const userDelete = (userCode) => {
    if (window.confirm('정말 해당 회원을 삭제하시겠습니까?')) {
      axios
        .delete(`/m/users/delete?userCode=${userCode}`)
        .then(() => {
          alert('회원이 삭제되었습니다.');
          // 마지막 페이지에서 마지막 회원을 삭제할 경우 이전 페이지로 이동
          if (
            Number(userList.length % 10) === 1 &&
            totalPage === Number(currentPage)
          ) {
            searchParams.set('pages', currentPage - 1);
            setSearchParams(searchParams);
          }
          // 그 외의 경우 새로고침
          else {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };

  return (
    <Container>
      {/* 회원 목록 글씨 표기 시작 */}
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
        회원 목록
      </Typography>
      {/* 회원 목록 글씨 표기 끝 */}

      {/* 정렬 기준 선택용 Select Box 표기 시작 */}
      <Box sx={{ float: 'right', pr: 1, mb: 1 }}>
        <InputLabel
          sx={{
            fontSize: '0.8rem',
          }}
          variant="standard"
          htmlFor="adminUserListSort"
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
          defaultValue="-userCode"
          inputProps={{
            name: 'sort',
            id: 'adminUserListSort',
          }}
        >
          <option value="-userCode">최근 가입 순</option>
          <option value="userCode">오래된 가입 순</option>
        </NativeSelect>
      </Box>
      {/* 정렬 기준 선택용 Select Box 표기 끝 */}

      {/* 회원 목록 테이블 표기 시작 */}
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
        {/* 회원 목록 테이블 컬럼명 표기 시작 */}
        <Grid
          container
          sx={{
            px: 1,
            py: 0.5,
            borderTop: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <Grid item xs={6}>
            <Typography
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                px: 1,
                py: 0.5,
              }}
            >
              회원 이메일
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                px: 1,
                py: 0.5,
              }}
            >
              회원 이름
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                px: 1,
                py: 0.5,
              }}
            >
              회원 관리
            </Typography>
          </Grid>
        </Grid>
        {/* 회원 목록 테이블 컬럼명 표기 끝 */}

        {/* 회원 목록 테이블 데이터 표기 시작 */}
        {userList.length === 0 ? (
          // 회원 데이터가 없을 경우
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
            회원 데이터가 존재하지 않습니다.
          </Typography>
        ) : (
          // 회원 데이터가 있을 경우
          userList.map((user, index, row) => (
            <AdminUsersRows
              key={user.userCode}
              userCode={user.userCode}
              userEmail={user.email}
              userName={user.name}
              userDelete={userDelete}
              isLast={index + 1 === row.length} // 마지막 데이터인지 확인
            />
          ))
        )}
        {/* 회원 목록 테이블 데이터 표기 끝 */}
      </Box>
      {/* 회원 목록 테이블 표기 끝 */}

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

      {/* 검색 바 표기 시작 */}
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NativeSelect
          inputRef={conditionRef}
          size="normal"
          sx={{
            mx: 1,
            px: 1,
            outline: '1px solid #000000',
            hover: {
              backgroundColor: '#ffffff',
            },
            focus: {
              backgroundColor: '#fffffff',
            },
          }}
          defaultValue="email"
          inputProps={{
            name: 'condition',
            id: 'adminUserListCondition',
          }}
        >
          <option value="email">회원 이메일</option>
          <option value="name">회원 이름</option>
        </NativeSelect>
        <TextField
          inputRef={keywordRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
          id="adminUserListKeyword"
          variant="outlined"
          size="small"
          sx={{
            mx: 1,
            width: '400px',
            '&:focus': {
              outline: 'none',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={search}
          sx={{
            mx: 1,
            width: '65px',
            backgroundColor: '#c3c36a',
            color: '#000000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#c3c36a',
              color: '#ffffff',
            },
          }}
        >
          검색
        </Button>
      </Box>
      {/* 검색 바 표기 끝 */}
    </Container>
  );
};

export default AdminUsersLists;
