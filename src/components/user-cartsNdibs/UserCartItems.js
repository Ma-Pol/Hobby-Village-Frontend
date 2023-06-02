import { Typography, Box, Checkbox, Paper, Button } from '@mui/material';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import UserCartItemsPhoto from './UserCartItemsPhoto'
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCartItems = ({
    cartCode,
    prodCode,
    prodName,
    prodContent,
    prodShipping,
    prodPrice,
    cartDelete,
    category,
    period,
    selectedProducts,
    setSelectedProducts,
    selectAll,
    setSelectAll,
    length,
    }) => {

    // 전체선택, 선택항목

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (selectAll) {
        setChecked(true);
        } else if (selectedProducts.length + 1 !== length) {
        setChecked(false);
        }
    }, [selectAll]);
    
    const handleSelect = (e) => {
        setChecked(e.target.checked);
    
        if (e.target.checked) {
        if (selectedProducts.length + 1 === length) {
            setSelectAll(true);
        }
    
        setSelectedProducts([
            ...selectedProducts,
            {
            prodCode: prodCode,
            prodName: prodName,
            prodPrice: prodPrice,
            prodShipping: prodShipping,
            period: date,
            },
        ]);
        } else {
        setSelectAll(false);
        setSelectedProducts(
            selectedProducts.filter((product) => product.prodCode !== prodCode)
        );
        }
    };

    // 대여기간 변경
    const [date, setDate] = useState(period);
    
    const changeDate = (value) => {
        const nextDate = date + value;
        if (nextDate !== 0 && nextDate !== 99) {
        setDate(nextDate);
    
        if (checked) {
            changePeriod(nextDate);
        }
        }
    };
    
    const changePeriod = (nextDate) => {
        const newSelectedProducts = selectedProducts.map((product) =>
        product.prodCode === prodCode ? { ...product, period: nextDate } : product
        );
        setSelectedProducts(newSelectedProducts);
    };

    // 대여기간 DB수정 요청  
        axios
            .post(`/carts/${date}/modify/${cartCode}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });

            
    // 개별 상품 총가격
    const TotalByPeriod = parseFloat(prodPrice) * (date / 7); 

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
                        checked={checked}
                        onChange={handleSelect}
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
                                <span>{date}일</span>
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
                                    {(TotalByPeriod).toLocaleString()}원
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