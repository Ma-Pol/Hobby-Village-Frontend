import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MostPopularBrand.css";

function MostPopularBrand(props) {

  const [lists, setLists] = useState([{
    prodCode : '',
    prodBrand : '',
    prodName : '',
    prodContent : '',
    prodPrice : '',
    prodPictures : '',
    prodDibs : '',
  }]);

  const getLists = () => {
    axios
      .get(`/most-popular-brand-products`)
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
    return lists.sort((a, b) => b.prodDibs - a.prodDibs)
  };
  const getTop8Items = () => {
    const sortedlists = getSortedlists();
    return sortedlists.slice(0, 8);
  }

  const navigate = useNavigate();

  const linkToProductsDetails = () => {
    navigate(`/products/details/:prodCode=${lists.prodCode}`);
  };

  const linkToBrandLists = () => {
        navigate("/products/brand/lists");
  };

return (
    <div>
      <div className = "popularbrd">
        브랜드관 인기 취미 물품
      </div>
      <div className = "product-list">
        {getTop8Items().map(li => (
          <li id="popularproducts" key={li.prodBrand}>
            <div className="productpictures">
              <img
                className="pp-pictures"
                alt={`제품이미지`}
                src={process.env.PUBLIC_URL + li.prodPicture}
                onClick = {linkToProductsDetails}
              ></img>
            </div>
            <ul className="pp-text" onClick = {linkToProductsDetails}>
              <li className="pp-brand">{li.prodBrand}</li>
              <li className="pp-name">{li.prodName}</li>
              <li className="pp-price">{li.prodPrice}원</li>
              <li className="pp-prodDibs">관심 {li.prodDibs}</li>
            </ul>
          </li>       
          ))
        }
      </div>
      <div className = "brandlist">
        <button className = "brandlist-btn" onClick = {linkToBrandLists}>
          브랜드관 인기 물품 더 보기
        </button>      
      </div>
    </div>
  );
}

export default  MostPopularBrand; 