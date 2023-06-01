import { Typography, Box, Checkbox, Paper, Button } from '@mui/material';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import UserCartItemsPhoto from './UserCartItemsPhoto'
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserCartItems = ({
    cartCode,
    prodCode,
    prodName,
    prodContent,
    prodShipping,
    prodPrice,
    handleChangeChild,
    cartDelete,
    category,
    period,

    }) => {
     
    // 대여기간 변경

    const [date, setDate] = useState(period);

    const changeDate = (value) => {
        const nextDate = date + value;
        if (nextDate !== 0 && nextDate !== 99) {
            setDate(nextDate);
        }
    };

     // 결제 페이지로 이동
     const periodRef = useRef();
     const navigate = useNavigate();
    
     const payProcess = () => {
 
         const period = periodRef.current.value;
 
         axios
             .patch(`/carts/period/modify/${cartCode}`, {
                 period : period,
             })
             .then((res) => {
                 alert('결제 페이지로 이동합니다.');
                 navigate(`/purchase`);
             })
             .catch((err) => {
                 console.error(err);
             });
    }

    return (                                                  
            <div key = {cartCode}>
                <Paper               
                    elevation = {3}
                    sx = {{  
                        width : "800px",
                        my : 2, ml : 11.5, 
                        height : '200px', 
                        bgcolor : '#FFFFFF', 
                        borderRadius : "15px"
                    }}>
                    <Checkbox
                        onChange={handleChangeChild}
                        icon={<CheckCircleOutlineOutlined />}
                        checkedIcon={<CheckCircleOutlineOutlined />}
                        sx={{
                            color: '#CECECE',
                            p : 0,
                            my : 1,
                            mx : 1,
                            '&.Mui-checked': {
                                color: '#000000',
                                backgroundColor: '#C3C36A',
                                p : 0
                            },
                            '& .MuiSvgIcon-root': {
                                fontSize: '20px', 
                                width : '22px',
                                height : '22px'
                            },
                        }}
                    ></Checkbox>
                    <Button
                        onClick={() => {cartDelete(cartCode);}}
                        sx = {{                                               
                            borderRadius: '50%', // 동그라미 모양을 위한 border-radius 값
                            width: '24px', // 버튼의 너비
                            height: '24px', // 버튼의 높이
                            minWidth: 'unset',
                            fontSize : '20px',
                            fontWeight : 'lighter',
                            p : 0,
                            mt : 0.5,
                            ml : 91,
                            color: '#CECECE',
                            border: '1px solid #CECECE',
                            '&:hover': {
                                backgroundColor: '#C3C36A',
                                border: '1px solid #CECECE',
                                color: 'black',
                                },
                                '&.Mui-selected': {
                                backgroundColor: '#C3C36A',
                                color: 'black'
                                },
                                '&.Mui-selected:hover': {
                                backgroundColor: '#C3C36A',
                                color: 'black',
                                },
                        }}
                        variant="outlined" color="primary">
                        Ⅹ
                    </Button>                       
                    <Box 
                        sx = {{ display: "flex", ml : 4}}
                    >
                        <UserCartItemsPhoto
                            prodCode = {prodCode}
                            prodName = {prodName}
                        ></UserCartItemsPhoto>
                        <Box
                            sx = {{ width : "335px", mx : 2 }}
                        >                            
                            <Typography
                                sx = {{
                                    fontSize : '18px'
                                }}
                            >[{category} - {prodName}]
                            </Typography>
                            <Typography 
                                sx = {{
                                    mt : 1,
                                    fontSize : '14px'
                                }}>{prodContent}
                            </Typography>
                        </Box> 
                        <Box sx = {{ mx : 1, display : "flex", alignItems : "center" }}>
                            <div key = {cartCode}>
                                <Button 
                                    sx = {{ 
                                        borderRadius: '50%', // 동그라미 모양을 위한 border-radius 값
                                        width: '24px', // 버튼의 너비
                                        height: '24px', // 버튼의 높이
                                        minWidth: 'unset',
                                        fontSize : '12px',
                                        mr : 2,
                                        padding: '0',
                                        color: 'black',
                                        border: '1px solid #CECECE',
                                        '&:hover': {
                                            backgroundColor: '#C3C36A',
                                            border: '1px solid #CECECE',
                                            color: 'black',
                                            },
                                            '&.Mui-selected': {
                                            backgroundColor: '#C3C36A',
                                            color: 'black'
                                            },
                                            '&.Mui-selected:hover': {
                                            backgroundColor: '#C3C36A',
                                            color: 'black',
                                            },
                                    }}
                                variant="outlined" color="primary" onClick = {() => {changeDate(-7);}}>
                                    -7                                            
                                </Button>
                                <span ref={periodRef}>{date}일</span>
                                <Button 
                                    sx = {{
                                        borderRadius: '50%', // 동그라미 모양을 위한 border-radius 값
                                        width: '24px', // 버튼의 너비
                                        height: '24px', // 버튼의 높이
                                        minWidth: 'unset',
                                        fontSize : '12px',
                                        ml : 2,
                                        padding: '0',
                                        color: 'black',
                                        border: '1px solid #CECECE',
                                        '&:hover': {
                                            backgroundColor: '#C3C36A',
                                            border: '1px solid #CECECE',
                                            color: 'black',
                                            },
                                            '&.Mui-selected': {
                                            backgroundColor: '#C3C36A',
                                            color: 'black'
                                            },
                                            '&.Mui-selected:hover': {
                                            backgroundColor: '#C3C36A',
                                            color: 'black',
                                            },
                                    }}
                                variant="outlined" color="primary" onClick = {() => {changeDate(7);}}>
                                    +7
                                </Button>
                            </div>
                        </Box> 
                        <Box textAlign = "right">                                            
                            <Typography sx = {{
                                ml : 4,
                                mt : 5,
                                fontSize : '20px',
                                fontWeight : 'bold',
                                }}>
                                    {prodPrice.toLocaleString()}원
                            </Typography>
                            <Box display = 'flex'  >
                                <Typography sx = {{
                                    ml : 4,
                                    mt : 5,
                                    fontSize : '14px'
                                    }}>
                                        배송비
                                </Typography>
                                <Typography sx = {{
                                    ml : 4,
                                    mt : 5,
                                    fontSize : '14px',
                                    fontWeight : 'bold'
                                    }}>
                                        {prodShipping.toLocaleString()}원
                                </Typography>
                            </Box>
                        </Box>                 
                    </Box>                                                    
                </Paper>
            </div>
            )   
}

export default UserCartItems;