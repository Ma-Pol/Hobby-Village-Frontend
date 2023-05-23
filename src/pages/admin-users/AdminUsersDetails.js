import {React, useState, useEffect} from "react";
import styled from 'styled-components';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Typography  from "@mui/material/Typography";
import Button  from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from "axios";

const AdminUsersDetails = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const { userCode } = useParams();

  useEffect (()=> {
    axios
    .get(`/m/users/details/${userCode}`,{
      
    })
    .then((res)=> {
      setDetails(res.data)
    })
   })

  const handleMemberForm = () => {
        navigate(`m/users`);
    }

  return (
    <Wrapper>
        <Header style={{ marginBottom:"50px", fontSize:"40px"}}>회원 상세 정보</Header>
          <Wrapper1>
          <Box style={{width:"200px", height:"200px", backgroundColor:"lightgrey", float:"left", marginRight:"20px", marginLeft:"100px"}}/>

     
          <Text>
            이름&nbsp;&nbsp;
            <Typography
              style={{width:"70%", marginLeft:"50px"}}
              defaultValue= {details.name}
            />
            </Text>
            <Text>
            닉네임&nbsp;&nbsp;
            <Typography
              style={{width:"70%", marginLeft:"20px"}}
              defaultValue= {details.nickname}
            />
            </Text>
          </Wrapper1>
          
          <TextArea>
          <Text >
            이메일&nbsp;&nbsp;
            <Typography
              style={{width:"70%", marginLeft:"50px"}}
              defaultValue= {details.email}
            />
            </Text>
             <Text>
                생년월일&nbsp;&nbsp;
            <Typography
              style={{width:"70%", marginLeft:"20px"}}
              defaultValue= {details.birthday}
            />
            </Text>
             <Text>
            전화번호&nbsp;&nbsp;
            <Typography
              style={{width:"70%", marginLeft:"20px"}}
              defaultValue= {details.phone}
            />
            </Text>
             <Text>
            우편번호&nbsp;&nbsp;
            <Typography
              style={{width:"70%", marginLeft:"20px"}}
              defaultValue= {details.zipCode}
            />
            </Text>
             <Text>
            주소&nbsp;&nbsp;
            <Typography
              style={{width:"70%", marginLeft:"70px"}}
              defaultValue= {details.address1}
            />
            </Text>
             <Text>
            적립금&nbsp;&nbsp;
            <Typography
              style={{width:"70%", marginLeft:"40px", }}
              defaultValue= {details.savedMoney}
            />
            </Text>
           
        </TextArea>
        
        <Group>  
        <Button variant="outlined" 
          style={{marginTop:"20px" ,width:"10%", height: "60px",borderRadius:"30px",borderColor:"black",backgroundColor:"white",fontFamily: "", fontSize:"20px", color:"black"}} 
          onClick={handleMemberForm} >목록</Button> 
        </Group>
    </Wrapper>
  );
};

export default AdminUsersDetails;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1230px;
    margin: 2rem auto;
    font-weight: 700;
`
const Header = styled.div`
    font-family: "The Jamsil 2 Light";
    align-items: center;
    margin-right:815px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Wrapper1 = styled.div`
    align-items: center;
    width: 1029px;
    margin-left: 100px;
    margin-bottom: 80px;
`
const TextArea = styled.div`
    align-items: center;
    width: 1029px;
    height: 572px;
    // background-color: #EDEDED; 
    margin-left: 100px;
`
const Text = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    font-size:20pt;
    margin-top:80px;
    margin-left:100px;
`
const Group = styled.div`
    margin-top: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

