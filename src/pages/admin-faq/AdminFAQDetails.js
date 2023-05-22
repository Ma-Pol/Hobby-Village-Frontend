import {React, useEffect, useState, useRef} from "react";
import styled from 'styled-components';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Typography  from "@mui/material/Typography";
import Button  from '@mui/material/Button';
import axios from "axios";

const AdminFAQDetails = () => {
   const navigate = useNavigate();
   const [details, setDetails] = useState();
   const { faqCode } = useParams();
   
   useEffect (()=> {
    axios
    .get(`/m/faqs/faqdetails/${faqCode}`
    
    )
    .then((res)=> {
      console.log(res.data)
      setDetails(res.data)
    }).catch((err)=>{
      console.error(err)
    })
   },[faqCode])
    
   const handleList = () => {
        navigate(`/m/faqs/lists`);
    }
     
   const handleModify = () => {
        navigate(`/m/faqs/modify/${faqCode}`);
    }

    const handleDelete = (e) => {
    
    axios
      .post("/m/faqs/details/delete", {
        faqCode : faqCode
      })
      .then((res)=> {
        if( res.data === 1 ){
          navigate(`/m/faqs/lists`)
        }else{

        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if(!details){
    return <></>
  }else
 { return (
    <Wrapper>
        <Header style={{ marginBottom:"50px", fontSize:"36px"}}>FAQ 자주 묻는 질문 | 상세</Header>
          <TextArea>
          <Text>
            제목&nbsp;&nbsp;|
             <Typography
              style={{width:"70%", marginLeft:"20px", marginTop:"30px"}}
            > {details.faqTitle} </Typography> 
            </Text>
  
         <Text1>
          구분&nbsp;&nbsp;| 
            <Typography
                style={{ width:"150px", marginLeft:"20px", marginTop:"30px", fontSize:"20px"}}
            >{details.faqCategory}</Typography>
          </Text1>

          <Text2>
            내용&nbsp;&nbsp;| 
            <Typography
              multiline="true"
              rows={10}
              style={{width:"70%", marginTop:"30px",  marginLeft:"20px"}}
            >{details.faqContent}</Typography>        
        
          </Text2>
        </TextArea>
        
        <Group>  
        <Button type="submit" variant="outlined" 
          style={{marginTop:"20px" ,marginRight:"50px" ,width:"10%", height: "60px",borderRadius:"30px",backgroundColor:"#F5B8B8", borderColor:"black",fontFamily: "", fontSize:"20px", color:"black"}} 
          onClick={handleDelete}>삭제</Button>
  
        <Button variant="outlined" 
          style={{marginTop:"20px" ,width:"10%", height: "60px",borderRadius:"30px",borderColor:"black",backgroundColor:"white",fontFamily: "", fontSize:"20px", color:"black"}} 
          onClick={handleList} >목록</Button> 

        
        <Button variant="outlined" 
          style={{marginTop:"20px" , marginLeft:"50px" ,width:"10%", height: "60px",borderRadius:"30px",borderColor:"black",backgroundColor:"#C3C36A",fontFamily: "", fontSize:"20px", color:"black"}} 
          onClick={handleModify} >수정</Button>   
        </Group>
    </Wrapper>
  );}
};

export default AdminFAQDetails;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1230px;
    margin: 2rem auto;
    font-weight: 700;
    font-size: 40px;
`
const Header = styled.div`
    font-family: "The Jamsil 2 Light";
    font-size: 30pt;
    align-items: center;
    margin-right:615px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const TextArea = styled.div`
    align-items: center;
    width: 1029px;
    height: 572px;
    background-color: #EDEDED; 
    border-radius:10px; 
    margin-left: 100px;
    
`
const Text = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: center;
    font-size:20pt;
    margin-top:30px;
`
const Text1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: center;
    font-size:20pt;
    margin-right:570px;
    margin-top:30px;
`
const Text2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size:20pt;
     margin-top:30px;
    
`
const Group = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
