import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    padding: '1rem',
    width: '1150px',
    marginTop: '0.3rem',
    marginLeft: '15rem',
  },
  line: {
    borderTop: '1px solid #BCB5B5',
    marginTop: '3rem',
  },
  left: {
    textAlign: 'left',
  },
  middle: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'left',
  },
  phoneIcon: {
    verticalAlign: 'bottom',
    marginRight: '0.3rem',
  },
  textColor: {
    color: '#555555',
    textDecoration: 'none',
  },
}));

const UserFooter = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.line} />
      <Box className={classes.footerContainer}>
        <Box className={classes.footer}>
          <Grid container spacing={6}>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={3} className={classes.left}>
                  <Typography variant="body2" className={classes.textColor}>
                    취미빌려조
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body2" className={classes.textColor}>
                        김지훈
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" className={classes.textColor}>
                        노현진
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" className={classes.textColor}>
                        배효능
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" className={classes.textColor}>
                        이승현
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" className={classes.textColor}>
                        이준영
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" className={classes.textColor}>
                        이진영
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} className={classes.middle}>
              <Link to="/notices/list" className={classes.textColor}>
                <Typography variant="body2">공지사항</Typography>
              </Link>
              <Link to="/guide" className={classes.textColor}>
                <Typography variant="body2">구독 서비스 안내</Typography>
              </Link>
              <a
                href="mailto:hobbyvillage@example.com"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.textColor}
              >
                <Typography variant="body2" className={classes.textColor}>
                  입점ㆍ제휴ㆍ광고문의
                </Typography>
              </a>
            </Grid>
            <Grid item xs={4} className={classes.right}>
              <Link to="/cs" className={classes.textColor}>
                <Typography variant="body2">고객센터</Typography>
              </Link>
              <Typography variant="body2" className={classes.textColor}>
                <PhoneIcon className={classes.phoneIcon} />
                1544-1234
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default UserFooter;
