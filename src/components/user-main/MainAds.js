import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./MainAds.css";

function MainAds(props) {

SwiperCore.use([Navigation, Pagination, Autoplay])

return (
    <div className = "MainAdslayout">
        <Swiper 
        className = "MainAds"
        spaceBetween = {50}
        slidesPerView = {1}
        navigation
        pagination={{ clickable: true }}
        autoplay = {{ delay : 8000 }}
        >
        <SwiperSlide>                        
            <div>
                <img src = "/AdImage/arenaAD0.png" alt = "Ads01"></img>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div>
                <img src = "/AdImage/melkinAD0.png" alt = "Ads02"></img>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div>
                <img src = "/AdImage/retrosAD0.png" alt = "Ads03"></img>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div>
                <img src = "/AdImage/yamahaAD0.png" alt = "Ads04"></img>
            </div>
        </SwiperSlide>
        </Swiper>
    </div>
);
}

export default MainAds;