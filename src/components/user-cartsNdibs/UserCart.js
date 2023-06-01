import React, {  useRef, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Typography, Box, ToggleButtonGroup, ToggleButton, Checkbox, Paper, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import UserCartItems from './UserCartItems'
import axios from "axios";


const UserCart = () => {
  
    const { email } = useParams();
    const { cartCode } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentcategory, setCurrentCategory] = useState(searchParams.get('category'));
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();

    // 장바구니 목록 조회

    useEffect(() => {
        axios        
            .get(`/carts/${email}/lists?category=${searchParams.get('category')}`,)    
            .then((res) => {
                setLists(res.data);
                if (searchParams.get('category') !== currentcategory) {
                setCurrentCategory(searchParams.get('category'));
                }
                console.log(res.data)
            })
            .catch((err) => {
                console.error(err);
            })
        }, [searchParams, email]);

    // 전체선택, 부분선택
    const [checkItems, setCheckItems] = useState([]);

    const data = [
        {id: 0, title: '선택 1'},
        {id: 1, title: '선택 2'},
        {id: 2, title: '선택 3'},
        {id: 3, title: '선택 4'}
            
    ]

    const handleChangeParent = (checked) => {
        if (checked) {
        const idArray = [];
        data.forEach((el) => idArray.push(el.id));
        setCheckItems(idArray);
        } else {
        setCheckItems([]);
        }
    }
    
    const handleChangeChild = (checked, id) => {
        if (checked) {
            setCheckItems(prev => [...prev, id]);
            } else {
            setCheckItems(checkItems.filter((el) => el !== id));
            }
    };


    // 카테고리 변경
    const categoryChange = (e, value) => {
        if (value !== null) {
            searchParams.set('category', value);
            setSearchParams(searchParams);
            setCurrentCategory(value);
        }
    };   

    // 장바구니 삭제
    const cartDelete = () => {
        if (window.confirm('해당 품목을 장바구니에서 삭제하시겠습니까?')) {
            axios
                .delete(`/carts/delete?carCode/${cartCode}`)
                .then(() => {
                    alert('품목이 삭제되었습니다.');
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            return false;
        }
    };

    // 결제 페이지로 이동
    const periodRef = useRef();
    
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

    // MUI 스타일 
    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
          margin: theme.spacing(0.5),
          border: 0,
            '&.Mui-disabled': {
            border: 0,
            },
            '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
            },
            '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
            },
            '&:hover': {
            backgroundColor: '#FFFFFF',
            color: '#85CF65',
            },
            '&.Mui-selected': {
            backgroundColor: '#FFFFFF',
            textDecoration: 'underline',
            color: '#85CF65'
            },
            '&.Mui-selected:hover': {
            backgroundColor: '#FFFFFF',
            textDecoration: 'underline',
            color: '#85CF65',
            },
        },
        width: '100%'
      }));

      const payBtnStyle = {
        mt : 1.5,
        height : '60px',
        width : '270px',
        borderRadius : '10px',
        backgroundColor : '#c3c36a',
        color : '#000000',
        border : '1px solid #000000',
        fontSize : '20px',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#c3c36a',
          color: '#ffffff',
        },
      };

    return (
        <div>
            <Box style = {{ margin : 'auto'}}>
                <Box sx = {{ my : 2, height : '50px', borderBottom: '1px solid #B7B7B7' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontweight: "bold",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1.6rem",
                            ml : "100px",
                        }}
                        >
                        장바구니
                    </Typography>
                </Box>
                <Paper
                    elevation = {0}
                    sx={{
                        display: 'flex',
                        border: (theme) => `0px ${theme.palette.divider}`,
                        flexWrap: 'wrap',
                      }}
                >
                    <StyledToggleButtonGroup
                        value = {String(currentcategory)}
                        exclusive
                        onChange = {categoryChange}
                        sx = {{
                            ml : "100px",
                        }}
                    >
                        <ToggleButton key = "전체" value = "none">
                            전체
                            <Typography>

                            </Typography>
                        </ToggleButton> 
                        <Typography sx = {{ fontweight : "light", fontSize : '1.6rem', color: '#DADADA', m: 1 }}>|</Typography> 
                        <ToggleButton key = "일반 상품" value = "product">
                            일반 상품
                        </ToggleButton>
                        <Typography sx = {{ fontweight : "light", fontSize : '1.6rem', color: '#DADADA'}}>|</Typography> 
                        <ToggleButton key = "브랜드관" value = "brand">                            
                            브랜드관
                        </ToggleButton>
                    </StyledToggleButtonGroup>                   
                </Paper>
                <Box sx = {{ width : 'fullWidth', my : 2, height : 'auto', pt : 3, pb : 8, bgcolor : '#F4F4F4' }}>                 
                    <Box>
                        <Typography
                        variant="h5"
                        sx={{
                            ml : "100px",
                            display: 'flex',
                            alignItems: "center",
                            fontSize: "12px",
                        }}
                        >
                            <Checkbox
                                // onChange={handleChangeParent}
                                icon={<CheckCircleOutlineOutlined />}
                                checkedIcon={<CheckCircleOutlineOutlined />}
                                sx={{
                                    color: '#CECECE',
                                    p : 0,
                                    mr : 1,
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
                            전체 선택
                            <Divider sx ={{my : 0.5, mx : 2}} orientation="vertical" variant="middle" flexItem />
                            선택 상품 삭제
                        </Typography>
                        
                    </Box>
                    <Box sx = {{ display : 'flex', alignItems : 'flex-end'}}>   
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 0.5 }}>
                            {lists.map((li) => {
                                const category = li.prodBrand === null 
                                ? "일반" 
                                : "브랜드관";                           
                                return (                                                                        
                                    <UserCartItems
                                    key={li.cartCode}
                                    cartCode={li.cartCode}
                                    prodCode={li.prodCode}
                                    prodName={li.prodName}
                                    prodContent={li.prodContent}
                                    prodShipping={li.prodShipping}
                                    prodPrice={li.prodPrice}
                                    period={li.period}
                                    cartDelete={cartDelete}
                                    category={category}
                                    periodRef={periodRef}
                                    />
                                )
                            })}
                        </Box>                 
                        <Paper
                                elevation = {3}  
                                sx = {{  
                                    width : '300px',
                                    height : '350px', 
                                    borderRadius : '10px',
                                    mb : 70.3,
                                    }}>
                                <Typography variant = 'h6' sx = {{ mt : 1, textAlign : 'center', fontWeight : "bold" }}>결제 정보</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography sx = {{ ml : 1, mt : 3, textAlign : 'left', color : '#595959' }}>상품 수</Typography>
                                    <Typography sx = {{ mr : 1, mt : 3, textAlign : 'right'}}>개</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography sx = {{ ml : 1, mt : 3, textAlign : 'left', color : '#595959' }}>상품 금액</Typography>
                                    <Typography sx = {{ mr : 1, mt : 3, textAlign : 'right'}}>원</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography sx = {{ ml : 1, mt : 3, textAlign : 'left', color : '#595959' }}>배송비</Typography>
                                    <Typography sx = {{ mr : 1, mt : 3, textAlign : 'right'}}>원</Typography>
                                </Box>
                                <Box sx={{  display: 'flex', justifyContent: 'center' }}>
                                    <Divider sx={{ width : '90%', bgcolor: '#8F8F8F', mt : 3 }} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography sx = {{ ml : 1, mt : 3, textAlign : 'left', color : '#595959', fontSize: "20px", fontWeight : "bold" }}>총 결제 금액</Typography>
                                    <Typography sx = {{ mr : 1, mt : 3, textAlign : 'right', fontSize: "20px", fontWeight : "bold"}}>원</Typography>
                                </Box>
                                <Box sx={{  display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        onClick={payProcess}
                                        sx={payBtnStyle}
                                    >
                                        결제
                                    </Button>
                                </Box>
                        </Paper>
                     </Box>          
                    
                </Box>                
            </Box>
        </div>
    )



}

export default UserCart;