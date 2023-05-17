import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewsLists.css";

function ReviewsLists(props) {

    const [sort, setSort] = useState("revwRegiDate");

    const sortmain = () => {
        return sort === "new" 
        ? "최근 작성 순" 
        : "오래된 작성 순";
    };
    const sortlist = () => {
        return sort === "new" 
        ? "오래된 작성 순" 
        : "최근 작성 순";
    };

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

    const sortDate = (a, b) => {
        setSort(() => {
            return sort === "new" ? "last" : "new";
        });
        return props.sort === "new"
            ? (new Date(a.revwRegiDate) - new Date(b.revwRegiDate))
            : (new Date(b.revwRegiDate) - new Date(a.revwRegiDate))
    };

    
    return (
        <div className = "listpage">
            <div className = "pagetitle">
                리뷰 관리
            </div>
            <ul className = "sort">
                <li className = "sortMain">
                    <span href = "#">{sortmain()}</span>
                </li>
                <li>
                    <ul className = "sortlist">
                        <li className = "sortlist-sub"
                            href = "#"
                            onClick = {sortDate}
                        >
                            {sortlist()}
                        </li>
                    </ul>
                </li>
            </ul>
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
        </div>
    );
}


export default ReviewsLists;