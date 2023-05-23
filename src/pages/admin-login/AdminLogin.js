import React from "react";
import styled from 'styled-components';
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField  from "@mui/material/TextField";
import Button  from '@mui/material/Button';
import axios from "axios";

const AdminLogin = () => {
    const adminIdRef = useRef();
    const pwRef = useRef();


    const navigate = useNavigate();

    const handleLogin = () => {
     if (adminIdRef.current.value === "" || adminIdRef.current.value === undefined){
        alert("아이디를 입력하시오!!!");
        adminIdRef.current.focus();                       
        return false;                                       
     }
     if (pwRef.current.value === "" || pwRef.current.value === undefined){
        alert("패스워드를 입력하시오!!!");
        pwRef.current.focus();
        return false;                                                                                                                                      
     }
    

     axios
        .post(`/m/login`, {
            id: adminIdRef.current.value, //MemberVO를 통해 저장
            password: pwRef.current.value,
        })
        .then((res) => {
            console.log.apply("handleLogin =>", res);
            if(res.data === 1){
                window.sessionStorage.setItem("id", adminIdRef.current.value);
                navigate("/m/");//admin main
            }else{
              
             }
        })
        .catch((e)=> {
            console.error(e);
        });
    };



return (
<Wrapper>
    <Header style={{ marginTop:"50px", marginLeft:"145px"}}>관리자 로그인</Header>
    <Text>
    <TextField 
    id="standard-basic" label="아이디" variant="standard" autoFocus inputRef={adminIdRef} style={{width:"70%", marginTop:"100px"}}/>
    <TextField 
    id="standard-basic" label="비밀번호" type="password" variant="standard" inputRef={pwRef}  style={{width:"70%", marginTop:"50px"}}/>
    </Text>
    <Group>
    <Button variant="contained" 
    style={{marginTop:"20px" ,width:"15%", minHeight: "70px",borderRadius:"10px",backgroundColor:"#C3C36A",fontFamily: "", fontSize:"24px", color:"black"}} 
    onClick={handleLogin} >로그인</Button> 
    </Group>
</Wrapper>

) 

}

export default AdminLogin;
   
const Wrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 2rem auto;
    font-weight: 700;
    font-size: 40px;
`

const Header = styled.div`
    font-family: "The Jamsil 2 Light";
    font-size: 30pt;
    justify-content: left;
    align-items: left;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
`
const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Group = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`