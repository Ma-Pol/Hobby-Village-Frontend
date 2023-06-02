import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Typography, Box, ToggleButtonGroup, ToggleButton, Checkbox, Paper, Divider, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import UserDibItems from './UserDibItems'
import axios from "axios";

const UserDib = () => {
  
    const { email } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentcategory, setCurrentCategory] = useState(searchParams.get('category'));
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();

    // 찜목록 조회
    useEffect(() => {
    axios        
        .get(`/dibs/${email}/lists?category=${searchParams.get('category')}`,)    
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

    // 카테고리 변경
    const categoryChange = (e, value) => {
        if (value !== null) {
            searchParams.set('category', value);
            setSearchParams(searchParams);
            setCurrentCategory(value);
        }
    };

    // 찜 삭제
    const dibDelete = (dibCode) => {
        if (window.confirm('해당 품목을 장바구니에서 삭제하시겠습니까?')) {
            axios
                .delete(`/dibs/delete/${dibCode}`)
                .then(() => {
                    alert('품목이 삭제되었습니다.');
                    navigate(`/dibs/${email}/lists/category`)
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            return false;
        }
    };

    // 상품 클릭 시 상세페이지로 이동
    const MoveToProd = () => {
        navigate(`/products/details/:prodCode`);
    }

    // 전체선택, 부분선택
    const [selectAll, setSelectAll] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleSelectAll = (e) => {
      setSelectAll(e.target.checked);
  
      if (e.target.checked) {
        setSelectedProducts(lists);
      } else {
        setSelectedProducts([]);
      }
    };

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios        
            .get(`/dibs/${email}/lists/item`,)    
            .then((res) => {
                setItems(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.error(err);
            })
        }, []);

     // 일반상품 품목 갯수 구하기
     const getProductCount = () => {
        const CartItem = items.filter(items => items.prodBrand === null)
        return CartItem.length;
    }
    // 브랜드 상품 품목 갯수 구하기
    const getBrandCount = () => {
        const CartItem = items.filter(items => items.prodBrand !== null)
        return CartItem.length;
    }
    // 전체 품목 갯수 구하기
    const getCartItemCount = parseFloat(getProductCount()) + parseFloat(getBrandCount());

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
    
    const ChipStyle = {
        ml : 0.5,
        borderRadius : "50%",
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        width : '24px',
        height : '24px',
        fontSize : '12px',
        underline : 'none',
        color: '#000000',
        backgroundColor: '#EBEBA9',
        textDecoration : 'none',
        '&:selected': {
            color: '#85CF65'
        }
    }

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
                        찜 목록
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
                            <Chip
                                label = {getCartItemCount}
                                variant = "filled"
                                size = "small"
                                sx = {ChipStyle}
                            ></Chip>
                        </ToggleButton>                 
                        <Typography sx = {{ fontweight : "light", fontSize : '1.6rem', color: '#DADADA', m: 1 }}>|</Typography> 
                        <ToggleButton key = "일반 상품" value = "product">
                            일반 상품
                            <Chip
                                label = {getProductCount()}
                                variant = "filled "
                                size = "small"
                                sx = {ChipStyle}
                            ></Chip> 
                        </ToggleButton>
                        <Typography sx = {{ fontweight : "light", fontSize : '1.6rem', color: '#DADADA'}}>|</Typography> 
                        <ToggleButton key = "브랜드관" value = "brand">                            
                            브랜드관
                            <Chip
                                label = {getBrandCount()}
                                variant = "filled "
                                size = "small"
                                sx = {ChipStyle}
                            ></Chip>
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
                                checked={selectAll}
                                onChange={handleSelectAll}
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
                                    <UserDibItems
                                        key={li.dibCode}
                                        cartCode={li.dibCode}
                                        dibCode={li.dibCode}
                                        prodCode={li.prodCode}
                                        prodName={li.prodName}
                                        prodContent={li.prodContent}
                                        prodShipping={li.prodShipping}
                                        prodPrice={li.prodPrice}
                                        prodDibs={li.prodDibs}
                                        category={category}
                                        selectedProducts={selectedProducts}
                                        setSelectedProducts={setSelectedProducts}
                                        selectAll={selectAll}
                                        setSelectAll={setSelectAll}
                                        length={lists.length}
                                        dibDelete={dibDelete}
                                        MoveToProd={MoveToProd}
                                    />
                                )
                            })}
                        </Box>                 
                     </Box>                    
                </Box>                
            </Box>
        </div>
    )


}

export default UserDib;
