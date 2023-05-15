import { React, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Link, MenuItem, Select } from '@mui/material';

const UserProductsList = () => {
  const [productsList, setProductsList] = useState([]);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    '등산',
    '수영',
    '웨이트',
    '캠핑',
    '테니스',
    '뜨개',
    '사진',
    '악기',
    '기타',
  ]);

  const categoryNameStyle = {
    margin: '0 40px 0 0',
    fontSize: '20px',
  };

  const selectStyle = {
    width: 120,
    height: 40,
    margin: '10px 0 120px 20px',
  };

  const [filter, setFilter] = useState();

  const [filterIsRental, setFilterIsRental] = useState();

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
      <Box id="filters" sx={{ display: 'grid', gridAutoFlow: 'column' }}>
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
      </Box>
    </Box>
  );
};

export default UserProductsList;
