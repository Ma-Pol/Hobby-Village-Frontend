import { React, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SimpleImageSlider from 'react-simple-image-slider';
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {
  Box,
  Container,
  Grid,
  Link,
  MenuItem,
  Select,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Typography,
  TextField,
  Rating,
  Stack,
  Avatar,
} from '@mui/material';

const UserProductsDetails = () => {
  const images = [
    {
      url: "process.env.PUBLIC_URL + '/arena.png'",
    },
    {
      url: "process.env.PUBLIC_URL + '/brandyarn.png'",
    },
    {
      url: "process.env.PUBLIC_URL + '/excider.png'",
    },
  ];

  const [value, setValue] = useState(2);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SimpleImageSlider
              width={400}
              height={400}
              images={images}
              showBullets={true}
              showNavs={true}
              navSize={50}
              navMargin={10}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Chip label="캠핑" sx={{ height: '30px' }} />
            </Box>
            <Grid item xs={6}>
              <Typography variant="h5" component="h2" mt={1} display="inline">
                냄비 1개, 주전자 2개
              </Typography>
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
            </Grid>
            <Box mb={1}>
              <Typography display="inline">30,000원</Typography>
              <Typography display="inline"> / 7일</Typography>
            </Box>
            <TextField
              disabled
              multiline
              rows={9}
              value="캠핑 필수품! 튼튼한 냄비와 주전자입니다.  하자는 확대 컷 참고 해주세요 ^^"
              sx={{ width: '450px' }}
            ></TextField>
            <Box id="buttons" mt={2}>
              <TextField
                select
                dafaultValue={0}
                size="small"
                sx={{ width: 150 }}
              >
                <MenuItem key={0} value={0}>
                  대여기간 선택
                </MenuItem>
                <MenuItem key={7} value={7}>
                  7일
                </MenuItem>
                <MenuItem key={14} value={14}>
                  14일
                </MenuItem>
                <MenuItem key={21} value={21}>
                  21일
                </MenuItem>
                <MenuItem key={28} value={28}>
                  28일
                </MenuItem>
              </TextField>
              <Button
                variant="contained"
                color="success"
                sx={{ width: 130, mx: 2.5 }}
              >
                장바구니 담기
              </Button>
              <Button variant="contained" color="info" sx={{ width: 130 }}>
                지금 빌리기
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={20}>
        <Grid Container></Grid>
        <Grid item>
          <Typography display="inline" variant="h5" component="h5">
            대여 리뷰
          </Typography>
          <Typography display="inline"> (13) </Typography>
          <Box
            sx={{
              maxWidth: 1080,
              height: 1.1,
              backgroundColor: '#DFDFDF',
              mt: 2.5,
              mb: 2.5,
            }}
          ></Box>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={2.5}>
            <Rating name="read-only" value={value} size="small" readOnly />
          </Grid>
          <Grid item xs={5.5}>
            <Typography variant="body1" component="body1">
              덕분에 즐거운 캠핑할 수 있었습니다!
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" component="body1">
              2023.02.23
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Stack direction="row" spacing={0.5}>
              <Typography display="inline" variant="body1" component="body1">
                프로캠핑러
              </Typography>
              <Avatar
                display="inline"
                sx={{ bgcolor: '#ABCDEF', width: 30, height: 30 }}
              >
                PC
              </Avatar>
            </Stack>
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={2.5}></Grid>
          <Grid item xs={5.2}>
            <TextField
              multiline
              sx={{ mt: 1 }}
              fullWidth
              rows={7}
              disabled
              value="구매할지말지 고민중이었는데 마침 취미빌리지에 있길래 빌려봤어요. 엄청 가볍고 햇빛 아래에서 더 예쁘더라고요^^"
            ></TextField>
          </Grid>
          <Grid item xs={2.3}></Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Box
          sx={{
            maxWidth: 1080,
            height: 1.1,
            backgroundColor: '#DFDFDF',
            mt: 2.5,
            mb: 2.5,
          }}
        ></Box>
      </Box>
    </>
  );
};

export default UserProductsDetails;
