import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  NativeSelect,
  Grid,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import Product from '../../components/user-products/UserProductCard';

const UserProductsBrandList = () => {
  return (
    <Container fixed>
      <Box></Box>
    </Container>
  );
};

export default UserProductsBrandList;
