import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, Table, TableRow, TableCell, Button, TextField, Select, MenuItem } from '@mui/material';

const ReviewsCreate = () => {

    const reviewTitleRef = useRef();
    const reviewContentRef = useRef();
    const navigate = useNavigate();
    const { prodCode } = useParams();
    const { revwCode } = useParams();
    const { email } = useParams();
    const [selected, setSelected] = useState([]);
    const [details, setDetails] = useState([]);

    
    

    useEffect(() => {
        axios
        .get(`/reviews/products/${prodCode}`)
        .then((res) => {
            setDetails(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [prodCode]);

    const handleInsert = () => {
        if (reviewTitleRef.current.value === "" || reviewTitleRef.current.value === undefined) {
            alert("리뷰 제목을 입력하세요!");
            reviewTitleRef.current.focus();
            return false;
        }
        if (reviewContentRef.current.value === "" || reviewContentRef.current.value === undefined) {
            alert("리뷰 본문을 입력하세요!");
            reviewContentRef.current.focus();
            return false;
        }
        const generateRevwCode = () => {
            const randomNumber = Math.floor(Math.random() * 100000)
            return `${prodCode}-${randomNumber}`;
        }

        const revwCode = generateRevwCode();

        axios
            .post(`/reviews/create/${prodCode}`, {
                revwWriter : 'baeMu',
                prodCode : prodCode,
                revwTitle : reviewTitleRef.current.value,
                revwContent : reviewContentRef.current.value,
                revwRate : selected,
                revwCode : revwCode
            })
            .then((res) => {
                if(res.data === 1) {
                    alert("리뷰가 작성되었습니다.")
                    navigate(`/reviews/details/${revwCode}`)
                } else {
                    alert("리뷰 작성을 실패하였습니다.")
                    navigate(`/reviews/create/${prodCode}`)
                }
                console.log(res.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handlemypage = () => {
        navigate(`/mypages/${email}/orders`);
    }
    const handleSelectChange = (e) => {
        setSelected(e.target.value);
    }

    const tabletitleStyle = {
        border : "1px solid #7A7A7A",
        width : "150px",
        align : "left",
    }
    const tablecontentStyle = {
        border : "1px solid #7A7A7A",
        align : "left",
    }
    const btncancelStyle = {
        variant : 'outlined',
        width : '150px',
        height : '50px',
        bgcolor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #626262',
        color: '#000000',
        fontWeight: 'bold',
        '&:hover': {
            bgcolor: '#c3c36a',
            border: '1px solid #626262',
            color: '#ffffff',
        }
    }
    const btncreateStyle = {
        variant : 'outlined',
        width : '150px',
        height : '50px',
        bgcolor: '#c3c36a',
        borderRadius: '10px',
        border: '1px solid #626262',
        color: '#000000',
        fontWeight: 'bold',
        '&:hover': {
            bgcolor: '#ffffff',
            border: '1px solid #626262',
            color: '#000000',
        }
    }

    return (
        <div>
            <Box style = {{ maxWidth : '1150px', margin : 'auto'}}>
                <Box
                    sx = {{
                        my : 5,
                    }}
                >
                    <Typography
                        variant = "h5"
                        sx = {{
                            fontweight : 'bold',
                            display : 'flex',
                            alignItems : 'center',
                            fontSize : '1.6rem',
                        }}
                    >
                        리뷰 관리 &gt; 리뷰 작성
                    </Typography>
                </Box>
                <Container>
                    <Table>
                        <>
                            <TableRow>                   
                                <TableCell sx = {tabletitleStyle}>상품명</TableCell>
                                <TableCell sx = {tablecontentStyle}>{details.prodName}</TableCell>
                            </TableRow>
                            <TableRow>                   
                                <TableCell sx = {tabletitleStyle}>별점</TableCell>
                                <TableCell sx = {tablecontentStyle}>
                                    <Select                                      
                                        value = {selected}
                                        onChange = {handleSelectChange}       
                                        displayEmpty                   
                                        style = {{height : "40px", width : "200px"}}
                                        >             
                                        <MenuItem disabled value = "" >별점을 선택해주세요</MenuItem>
                                        <MenuItem value = {0} >☆☆☆☆☆</MenuItem>
                                        <MenuItem value = {1} >★☆☆☆☆</MenuItem>
                                        <MenuItem value = {2} >★★☆☆☆</MenuItem>
                                        <MenuItem value = {3} >★★★☆☆</MenuItem>
                                        <MenuItem value = {4} >★★★★☆</MenuItem>
                                        <MenuItem value = {5} >★★★★★</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>                   
                                <TableCell sx = {tabletitleStyle}>리뷰 제목</TableCell>
                                <TableCell sx = {tablecontentStyle}>
                                    <TextField
                                        id = "standard-basic"
                                        variant = "standard"
                                        placeholder = "리뷰 제목을 작성해주세요."
                                        inputRef = {reviewTitleRef}
                                        fullWidth = "fullWidth" 
                                    ></TextField>
                                </TableCell>
                            </TableRow>
                            <TableRow>                   
                                <TableCell sx = {tabletitleStyle} style = {{verticalAlign : "top"}}>
                                    첨부 사진
                                    <Button>파일첨부</Button>
                                </TableCell>
                                <TableCell sx = {tablecontentStyle}>
                                    <img
                                        alt = {`상품사진`}
                                        src = {process.env.PUBLIC_URL + details.prodPicture}
                                    ></img>
                                </TableCell>
                            </TableRow>
                            <TableRow>                   
                                <TableCell sx = {tabletitleStyle}>리뷰 본문</TableCell>
                                <TableCell sx = {tablecontentStyle}>
                                    <TextField
                                        id = "outlined-multiline-static"
                                        multiline
                                        rows = {8}
                                        placeholder = "리뷰 내용을 작성해주세요."
                                        inputRef = {reviewContentRef}
                                        fullWidth = "fullWidth" 
                                    ></TextField></TableCell>
                            </TableRow>
                        </>                     
                    </Table>
                    <Box
                        sx={{ mt : '30px', display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center' }}
                    >
                        <Button onClick = {handlemypage} sx = {btncancelStyle}>
                            취소
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button onClick = {handleInsert} sx = {btncreateStyle}>
                            작성
                        </Button>
                    </Box>
                </Container>
            </Box>
        </div>
    )
    
}

export default ReviewsCreate;