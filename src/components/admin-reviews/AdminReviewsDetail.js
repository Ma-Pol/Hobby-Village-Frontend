import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Table, TableRow, TableCell, Button } from '@mui/material';

const AdminReviewsDetail = () => {

    const navigate = useNavigate();
    const { revwCode } = useParams();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios
        .get(`/m/reviews/details/${revwCode}`)
        .then((res) => {
            setDetails(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [revwCode])

    const reviewsDelete = () => {
        if (window.confirm("리뷰를 삭제하시겠습니까?")) {
            axios
            .post(`/m/reviews/delete`, {
                revwCode : revwCode
            })
            .then((res) => {
                if (res.data === 1) {
                    alert("리뷰가 삭제되었습니다.");
                    navigate(`/m/reviews`);;
                } else {
                    alert("리뷰 삭제에 실패했습니다.")
                }              
            })
            .catch((err) => {
                console.error(err);
            });
        }
        return false;
    }

    const ListsReviews = () => {
        navigate(`/m/reviews`);
    }

    // MUI 스타일
    const tabletitleStyle = {
        border : "1px solid #7A7A7A",
        width : "150px",
        align : "left",
    }
    const tablecontentStyle = {
        border : "1px solid #7A7A7A",
        align : "left",
    }

    const btndeleteStyle = {
        variant : 'outlined',
        width : '65px',
        height : '30px',
        bgcolor: '#F5B8B8',
        borderRadius: '15px',
        border: '1px solid #626262',
        color: '#000000',
        fontWeight: 'bold',
        '&:hover': {
            bgcolor: '#F5B8B8',
            border: '1px solid #626262',
            color: '#ffffff',
        }
    }

    const btnlistStyle = {
        variant : 'outlined',
        width : '65px',
        height : '30px',
        bgcolor: '#ffffff',
        borderRadius: '15px',
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
            <Box style = {{ maxwidth : '1150px', margin : 'auto'}}>
                <Box
                    sx = {{
                        my : 5,
                    }}
                >
                    <Typography 
                        varaint = "h5"
                        sx = {{
                            fontweight : 'bold',
                            display : 'flex',
                            alignItems : 'center',
                            fontSize : '1.6rem'
                        }}
                    >
                        리뷰 &gt; 리뷰 상세
                    </Typography>
                </Box>
                <Box>
                        <Table>
                            <>
                                <TableRow>
                                    <TableCell sx = {tabletitleStyle}>리뷰 등록번호</TableCell>
                                    <TableCell sx = {tablecontentStyle}>{details.revwCode}</TableCell>
                                    <TableCell sx = {tabletitleStyle}>작성일</TableCell>
                                    <TableCell sx = {tablecontentStyle}>{details.revwRegiDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx = {tabletitleStyle}>상품번호</TableCell>
                                    <TableCell sx = {tablecontentStyle}>{details.prodCode}</TableCell>
                                    <TableCell sx = {tabletitleStyle}>상품명</TableCell>
                                    <TableCell sx = {tablecontentStyle}>{details.prodName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx = {tabletitleStyle}>별점</TableCell>
                                    <TableCell sx = {tablecontentStyle}>
                                        {details.revwRate === 0
                                            ? "☆☆☆☆☆"
                                            :details.revwRate === 1
                                            ? "★☆☆☆☆"
                                            :details.revwRate === 2
                                            ? "★★☆☆☆"
                                            :details.revwRate === 3
                                            ? "★★★☆☆"
                                            :details.revwRate === 4
                                            ? "★★★★☆"
                                            :details.revwRate === 5
                                            ? "★★★★★"
                                            : ""
                                        }
                                    </TableCell>
                                    <TableCell sx = {tabletitleStyle}>작성자(닉네임)</TableCell>
                                    <TableCell sx = {tablecontentStyle}>{details.revwWriter}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx = {tabletitleStyle}>리뷰 제목</TableCell>
                                    <TableCell sx = {tablecontentStyle}>{details.revwTitle}</TableCell>
                                    <TableCell sx = {tabletitleStyle}>누적 신고 수</TableCell>
                                    <TableCell sx = {tablecontentStyle}>{details.revwReport}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx = {tabletitleStyle}>첨부 사진</TableCell>
                                    <TableCell sx = {tablecontentStyle}>
                                        <img
                                            alt = {`상품사진`}
                                            src = {process.env.PUBLIC_URL + details.prodPicture}
                                        >
                                        </img>
                                    </TableCell>
                                    <TableCell sx = {tabletitleStyle}>리뷰 본문</TableCell>
                                    <TableCell sx = {tablecontentStyle}>
                                        <div dangerouslySetInnerHTML={ {__html: details.revwContent} }></div>
                                    </TableCell>
                                </TableRow>
                            </>
                        </Table>
                        <Box
                            sx={{ mt : '30px', display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center' }}
                        >
                            <Button onClick = {reviewsDelete} sx = {btndeleteStyle}>
                                삭제
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button onClick = {ListsReviews} sx = {btnlistStyle}>
                                목록  
                            </Button>
                        </Box>
                </Box>
            </Box>
        </div>
    )

}

export default AdminReviewsDetail;