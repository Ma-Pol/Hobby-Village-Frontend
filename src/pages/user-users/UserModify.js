import React, { useState, useRef } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UserModify = () => {
   const [Password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [checkEmail, setCheckEmail] = useState(false)
  const [checkNickname, setCheckNickname] = useState(false)
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const emailRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleClickButton = () => {
        navigate('/login'); // 어디로 이동?
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

  const onconfirmPasswordHandler = (event) => {
        setconfirmPassword(event.currentTarget.value)
    }
  

    const onCheckEmail = async (e) => {
    e.preventDefault();

    try { 
      const res = axios.post("/users/register/email", { email: e.current.value });

      const  result  = res.data;

      if (!result) {
          setEmail("이미 등록된 메일입니다. 다시 입력해주세요.");
          setCheckEmail(false);
      } else {
        setEmail("사용 가능한 메일입니다.");
        setCheckEmail(true);
      }

    } catch (err) {
      console.log(err);
    }
  }

  const onCheckNickname = async (e) => {
    e.preventDefault();

    try { 
      const res = axios.post("/users/register/nickname", { nickname: e.current.value })
      
      const  result = res.data;

      if (!result) {
          setNickname("이미 등록된 닉네임입니다. 다시 입력해주세요.");
          setCheckNickname(false);
     } else {
        setNickname("사용 가능한 닉네임입니다.");
        setCheckNickname(true);
      }

    } catch (err) {
      console.log(err);
    }
  }
    
   
    
  const hasNotSameError = passwordEntered =>
        // eslint-disable-next-line eqeqeq
        Password != confirmPassword ? true : false;    

  
  const handleMember = () => { 
  
    axios
            // .post(`/users/${userCode}/modify`, {
            //     email: emailRef.current.value,
            //     pw: pwRef.current.value,
            //     name:"",
            //     nickname:"",
            //     birthday:"",
            //     phone:"",
            //     profPicture:"",

            // })
            
            .catch((e) => {
                console.error(e);
            });
    };

  return (
    <Wrapper>
        <Header style={{ marginTop:"50px", marginLeft:"80px"}}>회원정보 수정</Header>
   
    <Text>
        <TextField 
            id="standard-basic" label="이름" variant="standard" autoFocus style={{width:"80%", marginTop:"80px"}}/>
         <Text1>
         <TextField 
            id="standard-basic" label="닉네임" variant="standard" style={{width:"570px", marginTop:"30px", marginRight:"10px"}}
            />
         <Button onClick={onCheckNickname} 
                    style={{backgroundColor:"#D9D9D9", height:"30px", color:"black", marginTop:"50px"}} 
                   >
                    중복
         </Button>
         </Text1>
         <Text1>         
        <TextField 
            id="standard-basic" label="이메일" variant="standard" style={{width:"570px", marginTop:"30px", marginRight:"10px"}} 
            />
        <Button 
          onClick={onCheckEmail} style={{backgroundColor:"#D9D9D9", height:"30px", color:"black", marginTop:"50px"}} >
          중복
        </Button>
        </Text1>    
        <TextField 
            id="standard-basic" label="비밀번호" variant="standard" required style={{width:"80%", marginTop:"30px"}}
            value={Password} onChange={onPasswordHandler}  // 해당 텍스트필드에 error 핸들러 추가
            type="password"
        />
        <TextField 
            id="standard-basic" label="비밀번호 확인" variant="standard"  required style={{width:"80%", marginTop:"30px"}}
            value={confirmPassword} onChange={onconfirmPasswordHandler} error={hasNotSameError('confirmPassword')} // 해당 텍스트필드에 error 핸들러 추가
            helperText={hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null} // 에러일 경우에만 안내 문구 표시
            type="password"
        />
        <TextField 
            id="standard-basic" label="생년월일" variant="standard" style={{width:"80%", marginTop:"30px"}}/>
        <TextField 
            id="standard-basic" label="전화번호" variant="standard" style={{width:"80%", marginTop:"30px"}}/>
        </Text>
  
    
    <Group>
        <Button variant="outlined" 
            style={{marginTop:"20px" ,marginRight:"50px" ,width:"20%", minHeight: "60px",borderRadius:"10px",backgroundColor:"white",fontFamily: "", fontSize:"24px", color:"black",borderColor:"black"}} 
            onClick={handleClickButton}>취소</Button>
        <Button variant="outlined" 
            style={{marginTop:"20px" ,width:"20%", minHeight: "60px",borderRadius:"10px",backgroundColor:"#C3C36A",fontFamily: "", fontSize:"24px", color:"black",borderColor:"black"}} 
            onClick={handleClickButton}>수정</Button>
    </Group>

    <Button variant="outlined" style={{backgroundColor:"#F5B8B8", color:"black",borderColor:"black", marginTop:"300px", marginLeft:"600px"}} onClick={handleClickOpen}>
        회원탈퇴
      </Button>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"
        style={{width:"550px",fontSize:"25px"}}>
          {"회원 탈퇴"}
        </DialogTitle>
        <DialogContent style={{height:"150px", marginTop:"30px"}} >
          <DialogContentText id="alert-dialog-description">
            회원 탈퇴를 진행하시겠습니까? <br/><br/>
            <Content>
            회원을 탈퇴할 경우 철회되지 않은 대여/위탁 물품은<br/>
            저희 플랫폼에 귀속될 수 있습니다.<br/><br/>
            </Content>
            삭제한 아이디는 복구할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{marginBottom:"20px"}}>
          <Button variant="outlined" onClick={handleClose} 
          style={{backgroundColor:"white", color:"black",borderColor:"black", borderRadius:"10px", marginRight:"20px",width:"80px"}}>
            닫기
            </Button>
          <Button variant="outlined" onClick={handleClose}  
          style={{backgroundColor:"#F5B8B8", color:"black",borderColor:"black", borderRadius:"10px", marginRight:"10px",width:"80px"}}autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    
    
</Wrapper>
  );
};

export default UserModify;

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    font-weight: 700;
    font-size: 40px;
`
const Header = styled.div`
    font-family: "The Jamsil 2 Light";
    font-size: 25pt;
    justify-content: left;
    align-items: left;
    display: flex;
    flex-direction: column;
`
const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Text1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    font-size:20pt;
`
const Group = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const Content = styled.div`
color: red;
`
