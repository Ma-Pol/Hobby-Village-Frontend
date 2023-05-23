import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MostPopularProducts.css";

function MostPopularProducts(props) {

// const prodCode = window.sessionStorage.getItem("prodCode"); // 인기 상품 조회
  const [lists, setLists] = useState([{
        email : '',
        prodCode : '',
        rentalCount : '',
        prodName : '',
        prodPicture : '',
        prodPrice : '',
        prodDibs : '',
  }]);
  

  const getLists = () => {
    axios
      .get(`/most-popular-products`)
      .then((list) => {
        setLists(list.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getLists();
  }, []);
  
  const getSortedlists = () => {
    return lists.sort((a, b) => b.rentalCount - a.rentalCount)
  };
  const getTop8Items = () => {
    const sortedlists = getSortedlists();
    return sortedlists.slice(0, 8);
  }

  const navigate = useNavigate();

  const linkToProductsLists = () => {
    navigate("/products/lists");
  };
  const linkToProductsDetails = () => {
    navigate(`/products/details/:prodCode=${lists.prodCode}`);
  };

  return (
    <div>
      <div className = "popularprod">
        인기 취미 물품
      </div>
      <div className = "product-list">
        {getTop8Items().map(li => (
          <li id="popularproducts" key={li.prodCode}>
            <div className="productpictures">
              <img
                className="pp-pictures"
                alt={`제품이미지`}
                src={process.env.PUBLIC_URL + li.prodPicture}
                onClick = {linkToProductsDetails}
              ></img>
            </div>
            <ul className="pp-text" onClick = {linkToProductsDetails}>
              <li className="pp-name">{li.prodName}</li>
              <li className="pp-price">{li.prodPrice}원</li>
              <li className="pp-prodDibs">관심 {li.prodDibs}</li>
            </ul>
          </li>       
          ))
        }
      </div>
      <div className = "productslist">
        <button className = "productslist-btn" onClick = {linkToProductsLists}>
          인기 취미 물품 더 보기
        </button>      
      </div>
    </div>
  );
}

export default  MostPopularProducts; 
     