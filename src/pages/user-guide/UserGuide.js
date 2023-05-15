import React from 'react';
import "./ServiceInfo.css";

const UserGuide = () => {
  return (
     <div className="body">
    <div className="section">
      <div className="text1">
       <h1>
       취미를 빌려드립니다.</h1>
       몸만 준비해 주세요.<br/>
       준비는 저희가 하겠습니다.<br/><br/>

       다양한 물품부터 당신의 취미까지<br/>
       저희가 대여해 드리고 찾아드리겠습니다.       
      </div>
      <div className="img">
       <img className="serviceImg" alt="serviceguide01" src="ServiceGuide/ServiceGuide01.png" width={350} height={300} />
      </div>
    </div>

    <div className="section2">
      <div className="text2">
        <h1>취미 물품 구독 서비스</h1>
                 쉽게 지루해지는 당신,<br/>
                    비싼 용품에 고민하는 당신,<br/><br/>

                    물건마다 측정된 구독료,<br/>
                    일주일 혹은 월 단위로 지금 대여해보세요.
      </div>
      <div className="img2">
       <img className="serviceImg" alt="serviceguide02" src="ServiceGuide/ServiceGuide02.png" width={350} height={200} />
      </div>
    </div>

     <div className="section3">
      <div className="text3">
        <h1>브랜드의 새로운 <br/>
                     물품까지 빌려드립니다.</h1>
              구매하고 싶었지만 고가에 고민하는 당신,<br/>
                     먼저 대여해 보고 고민해보세요.<br/><br/>

                     제휴된 브랜드의 인기 상품부터 <br/>
                     신상품까지 빌려드립니다.
              
                 </div>
      <div className="img3">
       <img className="serviceImg" alt="serviceguide03" src="ServiceGuide/ServiceGuide03.png" width={350} height={200} />
      </div>
    </div>

    <div className="section4">
      <div className="text4">
        <h1>내 취미 찾기</h1>
                 취미 생활은 가지고 싶지만,<br/>
                 무엇을 시작해야 고민인 당신을 위한 서비스<br/><br/>

                 취미 테스트를 통한 취미 찾기, <br/>
                 성향을 파악한 취미 생활 추천받기, <br/><br/>
                 저희가 같이 찾아드리겠습니다.
          </div>    
      <div className="img4">
       {/* <img src={serviceguide04} width={350} height={300} />  */}
       <img className="serviceImg" alt="serviceguide04" src="ServiceGuide/ServiceGuide04.png" width={350} height={300} />
      </div>
    </div>


    </div>
  );
};

export default UserGuide;
