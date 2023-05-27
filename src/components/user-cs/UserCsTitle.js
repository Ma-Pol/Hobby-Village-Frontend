import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const UserCsTitle = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}
      >
        <Toolbar
          sx={{
            maxWidth: 1150,
            width: '100%',
            margin: '0 auto',
            justifyContent: 'space-between',
            padding: '16px 0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 'bold', color: 'black', marginRight: 2 }}
            >
              고객센터
            </Typography>
            <PhoneIcon sx={{ color: 'black' }} />
            <Typography variant="h6" sx={{ color: 'black', marginLeft: 1 }}>
              1544-1234
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <hr
        style={{
          borderTop: '0.5px solid #BCB5B5',
          width: '1150px',
          margin: '0 auto',
          marginTop: '-8px',
        }}
      />
    </>
  );
};

export default UserCsTitle;
