import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./ReviewsLists.css";
import { Pagination } from '@mui/material';
import { Box, InputLabel, NativeSelect } from '@material-ui/core';

function ReviewsLists(props) {
   
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalpage, setTotalPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(searchParams.get('pages'));

    const sortRef = useRef();

    useEffect(() => {
        axios
            .all([
                axios.get(`/reviewslists?pages=${searchParams.get('pages')}`),
                axios.get(`/reviewslists?sort=${searchParams.get('sort')}`),
            ])
            .then(
                axios.spread((count) => {
                    setTotalPage(Math.ceil(count.data / 10));
                    setCurrentPage(searchParams.get('pages'));
                    sortRef.current.value = searchParams.get('sort');
                })
            )
            .catch((err) => {
                console.error(err);
            });
    }, [searchParams]); 

    const pageChange = (e, value) => {
        searchParams.set('pages', value);
        setSearchParams(searchParams);
    }

    const sortChange = () => {
        const sort = sortRef.current.value;
        searchParams.set('sort', sort);
        setSearchParams(searchParams);
    }

    const [lists, setLists] = useState([{
        email : '',
        revwCode : '',
        revwRate : '',
        revwTitle : '',
        revwRegiDate : '',
        revwReport : '',
        prodCode : '',
        prodName : '',
    }]);

    const getLists = () => {
        axios
          .get("/reviewslists", {
            // params: {
            //   id: nickname
            // },
          })
          .then((res) => setLists(res.data))
          .catch((e) => {
            console.error(e);
          });
    };

    useEffect(() => {
        getLists();
    }, []);
   
    return (
        <div className = "listpage">
            <div className = "pagetitle">
                리뷰 관리
            </div>
            <Box sx = {{ float : 'right', pr : 11.3, mb : 0 }}>
                <InputLabel
                    sx = {{
                        fontSize : '0.8rem',
                    }}
                variant = "standard"
                htmlFor = "adminFaqListSort"
                >
                </InputLabel>
                <NativeSelect
                    inputRef = {sortRef}
                    onChange = {sortChange}
                    sx = {{
                        px : 1,
                        hover : {
                            background : '#ffffff',
                        },
                        focus : {
                            backgroundColor : '#ffffff',
                        },
                    }}
                    defaultValue = "-revwRegiDate"
                    inputProps = {{
                        name : 'sort',
                        id : 'userReviewsListsSort'
                    }}
                >
                    <option value = "-revwRegiDate">최근 작성 순</option>
                    <option value = "revwRegiDate">오래된 작성 순</option>
                </NativeSelect>
            </Box>
            <div>
                <table className = "listTable">
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>별점</th>
                            <th>리뷰 제목</th>
                            <th>등록일</th>
                            <th>신고 수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.map(rowData => (    
                            <tr className = "listdata" key = {rowData.revwCode}>
                                <td>
                                    <a href={`/products/details/:prodCode=${rowData.prodCode}`}>{rowData.prodName}</a>
                                </td>
                                <td className = "listRate"> 
                                    {rowData.revwRate === 0
                                        ? "☆☆☆☆☆"
                                        :rowData.revwRate === 1
                                        ? "★☆☆☆☆"
                                        :rowData.revwRate === 2
                                        ? "★★☆☆☆"
                                        :rowData.revwRate === 3
                                        ? "★★★☆☆"
                                        :rowData.revwRate === 4
                                        ? "★★★★☆"
                                        : "★★★★★"
                                    }
                                </td>
                                <td>
                                    <a href={`/reviews/details/:revwCode=${rowData.revwTitle}`}>{rowData.revwTitle}</a>
                                </td>
                                <td className = "listdate"> {rowData.revwRegiDate} </td>
                                <td className = "listreport"> {rowData.revwReport} </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Box
            sx={{
                mt : 2,
                width : '100%',
                display : 'flex',
                justofycontent: 'center',
                alignItems : 'center',
            }}
            >
                <Pagination
                count = {Number(totalpage || 0)}
                defaultPage = {1}
                page = {Number(currentPage)}
                onchange = {pageChange}
                showFirstButton 
                showLastButton
                />
            </Box>
        </div>
    );
}


export default ReviewsLists;