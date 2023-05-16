import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Link,
  MenuItem,
  Select,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

const UserProductsList = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 스트링
  const [productsList, setProductsList] = useState([]); // 상품 목록
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState();
  const [filterIsRental, setFilterIsRental] = useState();

  // 카테고리 불러오기 ?
  const getCategories = () => {
    axios
      .post('http://localhost:8080/products/lists')
      .then((res) => {
        const { data } = res;
        setCategories(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getProductList = () => {
    axios
      .get('http://localhost:8080/products/lists')
      .then((res) => {
        const { data } = res;
        setProductsList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getProductList();
    getCategories();
  }, []);

  const categoryNameStyle = {
    margin: '0 40px 0 0',
    fontSize: '20px',
  };

  const selectStyle = {
    width: 120,
    height: 40,
    margin: '10px 0 120px 20px',
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterIsRentalChange = (e) => {
    setFilterIsRental(e.target.value);
  };

  return (
    <Box>
      {/* 카테고리 리스트 */}
      <Link href="#" sx={{ fontSize: '24px', color: '#C3C36A' }}>
        전체
      </Link>
      <Box sx={{ margin: '20px 0px' }}>
        {categories.map((category) => (
          <Link href="#" sx={categoryNameStyle}>
            {category}
          </Link>
        ))}
      </Box>
      <Box id="filters" sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Select
          sx={selectStyle}
          defaultValue={0}
          value={filterIsRental}
          onChange={handleFilterIsRentalChange}
        >
          <MenuItem value={0}>전체</MenuItem>
          <MenuItem value={1}>미대여</MenuItem>
          <MenuItem value={2}>대여중</MenuItem>
        </Select>
        <Select
          sx={selectStyle}
          defaultValue={0}
          value={filter}
          onChange={handleFilterChange}
        >
          <MenuItem value={0}>최신순</MenuItem>
          <MenuItem value={1}>평점순</MenuItem>
          <MenuItem value={2}>인기순</MenuItem>
          <MenuItem value={3}>가격높은순</MenuItem>
          <MenuItem value={4}>가격낮은순</MenuItem>
        </Select>
      </Box>
      <Card sx={{ maxWidth: 220, maxHeight: 330 }}>
        <CardMedia sx={{ height: 220 }} image="" title="" />
        <CardActions>
          <Link>상품명</Link>
        </CardActions>
        <CardContent>
          <Box>상품가격</Box>
          <Box>관심 관심수</Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProductsList;
