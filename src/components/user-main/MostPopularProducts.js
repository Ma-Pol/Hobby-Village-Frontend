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
      .get("/most-popular-products", {
        // params: {
        //   prodCode: prodCode,
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

  const compared = (a, b) => {
    return a.rentalCount - b.rentalCount;
  };

  const list = lists.sort(compared).map((li) => (
    <li id="popularproducts" key={li.prodCode} to={`/${li.prodCode}`}>
      <div className="productpictures">
        <img
          className="pp-pictures"
          alt={`제품이미지`}
          src={process.env.PUBLIC_URL + li.prodPicture}
        ></img>
      </div>
      <span className="pp-text">
        <p className="pp-name">{li.prodName}</p>
        <p className="pp-price">{li.prodPrice}</p>
        <p className="pp-prodDibs">{li.prodDibs}</p>
      </span>
    </li>
  ));

  const navigate = useNavigate();

  const linkToProductsLists = () => {
    navigate("/products/lists");
  };

  return (
    <div>
      <div className = "popularprod">
        인기 취미 물품
      </div>
      <div>
        <ul>{list}</ul>
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
     