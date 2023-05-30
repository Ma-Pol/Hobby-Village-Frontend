import React from "react";
// css-in-js
import styled from 'styled-components';
import Button  from '@mui/material/Button';
import Parser from 'html-react-parser'
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResultData } from "./assets/data/resultdata";

const Result = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mbti = searchParams.get("mbti");
    //최종적으로 도출한 결과 객체
    const [resultData, setResultData] = React.useState({});
    
    React.useEffect(()=>{
        const result = ResultData.find((s) => s.best === mbti);
        setResultData(result);
    }, [mbti]);

    console.log(resultData);

    
    return(
        <Wrapper>
            <Wrapper2>
            <Header style={{marginBottom:"30px", color:"#54634F"}}>나와 닮은 동물은?</Header>
            <Contents>
            <LogoImage>
               {<img src={resultData.image} width={350} height={350} />}
            </LogoImage>
            { <Desc style={{color:"#4C5947"}}>나의 유형은 {resultData.name} 입니다.</Desc> }
             <Desc1 style={{color:"#4C5947",  textAlign: "center", whiteSpace:"pre-wrap"}}> {resultData.desc} </Desc1> 
            <Button  style={{fontFamily: "The Jamsil 2 Lighst", backgroundColor: "#E5E5C9", color:"black", borderRadius:"20px", width:"150px"}} onClick={()=>navigate("/recommend/home")}>
                테스트 다시하기
                </Button>
            </Contents>
            </Wrapper2>
        </Wrapper>
    )
}

export default Result;

const Wrapper = styled.div` 
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    font-weight: 700;
    font-size: 40px;
`
const Wrapper2 = styled.div`
    max-width: 1600px;
    min-width: 400px;
    padding: 1.5rem 1rem;
    margin: 3rem auto;

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 800px;
    height: 880px;
    border: 30px solid #E5E5C9;
    background: #F3F3EF;
`

const Header = styled.div`
    font-family: "The Jamsil 2 Light";
    font-size: 40pt;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Contents = styled.div`
    font-family: "The Jamsil 2 Light";
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
`
const LogoImage = styled.div`  
`
const Desc = styled.div`
    font-size: 20pt;
    font-family: "The Jamsil 2 Light";
    margin-top: 20px;
    margin-bottom: 20px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    width:80%

`

const Desc1 = styled.div`
    font-size: 15pt;
    font-family: "The Jamsil 1 Thin";
    line-height:2;
    margin-top: 20px;
    margin-bottom: 30px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    width:80% ;
`
