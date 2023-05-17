import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MostPopularBrand.css";

function MostPopularBrand(props) {

    const navigate = useNavigate();

    const linkToProductsBrnadLists = () => {
        navigate("/products/brand/lists");
      };

return (
    <div>
      <div className = "popularbrd">
        브랜드관 인기 취미 물품
      </div>
      <div>
        {/* <ul>{list}</ul> */}
      </div>
      <div className = "brandlist">
        <button className = "brandlist-btn" onClick = {linkToProductsBrnadLists}>
          브랜드관 인기 물품 더 보기
        </button>      
      </div>
    </div>
  );
}

export default  MostPopularBrand; 