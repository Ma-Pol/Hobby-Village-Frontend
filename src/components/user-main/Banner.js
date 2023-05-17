import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Autoplay])

function Banner(props) { 

    const navigate = useNavigate();  // 배너 버튼 링크
  
    const linkToProductsLists = () => {
      navigate("/products/lists");
    };
    const linkToRequests = () => {
      navigate("/requests");
    };
    const linkToProductsBrnadLists = () => {
      navigate("/products/brand/lists");
    };
    const linkToNoticesLists = () => {
      navigate("/notices/lists");
    };
    const linkToServiceInfo = () => {
      navigate("/serviceInfo");
    };

    return (
        <div className = "bannerlayout">
            <Swiper 
            className = "banner"
            spaceBetween = {50}
            slidesPerView = {1}
            navigation
            pagination={{ clickable: true }}
            autoplay = {{ delay : 5000 }}
            >
            <SwiperSlide>                        
                <div className = "slide01">
                <ul>
                    <li className="s01-left">
                    <p>취미를 빌려드립니다.</p>
                    <p>
                        고가의 취미 용품,
                        <br />
                        시작하기 힘들었던 취미,
                        <br />
                        저희가 도와드리겠습니다.
                    </p>
                    <p>
                        <button onClick = {linkToProductsLists}>
                        취미 물품 보기
                        </button>
                    </p>
                    </li>
                    <li className="s01-right">
                    <img src = "/MainBanner/banner1.png" alt = "banner1"></img>
                    </li>
                </ul>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className = "slide02">
                <ul>
                    <li className="s02-left">
                    <img src = "/MainBanner/banner2.jpg" alt = "banner2"></img>
                    </li>
                    <li className="s02-right">
                    <p>
                        내가 하고싶은 취미를 빌리고,
                        <br />
                        내가 해봤던 취미를빌려주자.
                    </p>
                    <p>
                        우리 회사에서 소유하고 있는 물품뿐만 아니라,
                        <br />
                        개인의 취미 물품을 빌려주고, 빌릴 수 있습니다.
                    </p>
                    <p>
                        <ul>
                        <li>
                            <button onClick = {linkToProductsLists}>
                            취미 물품 보기
                            </button>
                        </li>
                        <li>
                            <button onClick = {linkToRequests}>
                            판매/위탁 신청
                            </button>
                        </li>
                        </ul> 
                    </p>
                    </li>
                </ul>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className = "slide03">
                <ul>
                    <li className="s03-left">
                    <p>
                        브랜드의 새로운
                        <br />
                        물품까지 빌려드립니다.
                    </p>
                    <p>
                        제휴된 브랜드의 인기 상품부터
                        <br />
                        신상품까지 빌려드립니다.
                    </p>
                    <p>
                        <button onClick = {linkToProductsBrnadLists}>
                        브랜드관 보기
                        </button>
                    </p>
                    </li>
                    <li className="s03-right">
                    <img src = "/MainBanner/banner3.jpg" alt = "banner3"></img>
                    </li>
                </ul>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className = "slide04">
                <ul>
                    <li className="s04-left">
                    <img src = "/MainBanner/banner4.png" alt = "banner4"></img>
                    </li>
                    <li className="s04-right">
                    <p>
                        우리 서비스의 상세
                        <br />
                        안내를 알려드립니다.
                    </p>
                    <p>
                        새롭게 생긴 공지사항 및 우리 서비스의
                        <br />
                        상세한 구독 서비스를 알아보세요
                    </p>
                    <p>
                        <ul>
                        <li>
                            <button onClick = {linkToNoticesLists}>
                            공지사항
                            </button>
                        </li>
                        <li>
                            <button onClick = {linkToServiceInfo}>
                            구독서비스안내
                            </button>
                        </li>
                        </ul> 
                    </p>
                    </li>
                </ul>
                </div>
            </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default  Banner;