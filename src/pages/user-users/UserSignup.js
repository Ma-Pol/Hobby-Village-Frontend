import React, { useState, useRef } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import { Modal } from "@mui/material";
import axios from "axios";
import FileInput from "./FileInput";
import './Signup.css'
import DaumPostcodeEmbed from "react-daum-postcode";

const UserSignup = () => {
  const [Password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [checkEmail, setCheckEmail] = useState(false)
  const [checkNickname, setCheckNickname] = useState(false)
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("");
  const [modalHandler, setModalHandler] = useState(false); // 배송지 입력 모달 핸들러
  const zipCodeRef = useRef(''); // 배송지 직접 입력 - 우편번호
  const address1Ref = useRef(''); // 배송지 직접 입력 - 주소
  const address2Ref = useRef(''); // 배송지 직접 입력 - 상세주소
  const emailRef = useRef('');
  const pwRef = useRef('');
  const nickRef = useRef('');
  const nameRef = useRef('');
  const birthRef = useRef('');
  const phoneRef = useRef('');
  const profRef = useRef();


  const [values, setValues] = useState({
     imgFile: null,   
    });
 
  const navigate = useNavigate();

  const handleClickButton = () => {
        navigate('/login');
    }
 
  const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

  const onconfirmPasswordHandler = (event) => {
        setconfirmPassword(event.currentTarget.value)
    }
  
   const handleChange = (name,value) => { //name,value를 parmeter로 받아서
        setValues((prevValues) => ({
                   ...prevValues,
                   [name]: value, //name의 값으로 property명을 지정하고 해당하는 값을 지정할 수 있음
               }) );
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
 

   // 주소 검색 후처리
  const selectAddress = (data) => {
    let address1 = '';
    let extraAddress = '';

    if (data.userSelectedType === 'R') {
      address1 = data.roadAddress;
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddress += data.bname;
      }

      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddress +=
          extraAddress !== '' ? ', ' + data.buildingName : data.buildingName;
      }

      if (extraAddress !== '') {
        address1 += ' (' + extraAddress + ')';
      }
    } else {
      address1 = data.jibunAddress;
    }

    zipCodeRef.current.value = data.zonecode;
    address1Ref.current.value = address1;
    address2Ref.current.value = '';
    address2Ref.current.focus();
  };

  
  const handleMember = () => { 
  
    if (emailRef.current.value === "" || emailRef.current.value === false) {
      alert("이미 존재하는 이메일입니다.");
      emailRef.current.focus();
      return false;
    }

    if (nickRef.current.value === "" || nickRef.current.value === false) {
      alert("이미 존재하는 닉네임입니다.");
      nickRef.current.focus();
      return false;
    }
   
    axios   
            .post("/signup/insertMember", {
                email: emailRef.current.value,
                pw: pwRef.current.value,
                name:nameRef ,
                nickname:nickRef,
                birthday:birthRef,
                phone:phoneRef,
                profPicture:profRef,
                zipCode: zipCodeRef,
                address1:address1Ref,
                address2:address2Ref,

            })
            .then((res) => {
                console.log("handleMember =>", res);
                if (res.data === 1) {
                    alert ("회원가입 성공!!!");
                    navigate("/login") //login 폼으로 감
                    }else {
                    alert("회원가입 실패!!!");                   
                }    
            })
            
            .catch((e) => {
                console.error(e);
            });
    };
  

  return (
     <Wrapper>
        <Header style={{ marginTop:"50px", marginLeft:"70px"}}>회원가입</Header>
        <Container >
            <FileInput 
                    name="imgFile" 
                    value={values.imgFile} 
                    onChange={handleChange}
                    inputRef={profRef}   
            />        
            <Text1>
                <TextField 
                    id="standard-basic" label="이름" variant="standard" autoFocus style={{width:"50%", marginTop:"50px", marginLeft:"30px"}} inputRef={nameRef}/>
            </Text1>
            <Text1>
                <TextField 
                    id="standard-basic" label="닉네임" variant="standard" style={{width:"41%", marginTop:"50px", marginLeft:"30px", marginRight:"10px"}}
                    inputRef={nickRef}
                    />
                <Button onClick={onCheckNickname} 
                    style={{backgroundColor:"#D9D9D9", height:"30px", color:"black", marginTop:"70px"}} 
                   >
                    중복
                </Button>    
            </Text1>
        </Container>

        <Text>
            <Text1>
                <TextField 
                    id="standard-basic" label="이메일" variant="standard" style={{width:"575px", marginRight:"10px"}} inputRef={emailRef} />
                <Button 
                    onClick={onCheckEmail} style={{backgroundColor:"#D9D9D9", height:"30px", color:"black", marginTop:"10px"}} >
                    중복
                </Button>
            </Text1>      
            <TextField 
                id="standard-basic" label="비밀번호" variant="standard" required style={{width:"80%", marginTop:"30px"}}
                 onChange={onPasswordHandler}  // 해당 텍스트필드에 error 핸들러 추가
                type="password" 
            />
            <TextField 
                id="standard-basic" label="비밀번호 확인" variant="standard"  required style={{width:"80%", marginTop:"30px"}}
                defualValue={confirmPassword} onChange={onconfirmPasswordHandler} error={hasNotSameError('confirmPassword')} // 해당 텍스트필드에 error 핸들러 추가
                helperText={hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null} // 에러일 경우에만 안내 문구 표시
                type="password" inputRef={pwRef}
            />
            <TextField 
                id="standard-basic" label="생년월일" variant="standard" style={{width:"80%", marginTop:"30px"}} inputRef={birthRef}/>
            <TextField 
                id="standard-basic" label="전화번호" variant="standard" style={{width:"80%", marginTop:"30px"}} inputRef={phoneRef}/>
        </Text>
        <Text>
            <Modal
                open={modalHandler}
                onClose={() => {
                setModalHandler(false);
                }}
            > 
            <DaumPostcodeEmbed
                onComplete={(data) => {
                selectAddress(data);
                setModalHandler(false);
                }}
                autoClose={true}
                // style={daumPostcodeStyle}
            />
            </Modal>
            <Text2>
                <TextField
                    inputRef={zipCodeRef}
                    placeholder="우편번호"
                    variant="standard"
                    size="small"
                    style={{ marginRight:"25px", width:"30%"}}
                    inputProps={{
                    readOnly: true,
                    }}
                />
                <Button onClick={setModalHandler} 
                    style={{backgroundColor:"#D9D9D9",marginRight:"345px", height:"30px", color:"black"}}>주소검색</Button>
            </Text2>
                <TextField
                    inputRef={address1Ref}
                    placeholder="주소"
                    variant="standard"
                    size="small"
                    style={{marginTop:"50px", width:"80%"}}
                    inputProps={{
                    readOnly: true,
                    }}
                    />
                <TextField
                    inputRef={address2Ref}
                    placeholder="상세 주소"
                    variant="standard"
                    size="small"
                    style={{marginTop:"50px", width:"80%"}}
                />  
        </Text> 
    
    <Group>
        <Button variant="outlined" 
            style={{marginTop:"20px" ,marginRight:"50px" ,width:"20%", height: "60px",borderRadius:"10px",backgroundColor:"white",fontFamily: "", fontSize:"24px", color:"black",borderColor:"black"}} 
            onClick={handleClickButton}>취소</Button>
        <Button variant="outlined" 
            style={{marginTop:"20px" ,width:"20%", height: "60px",borderRadius:"10px",backgroundColor:"#C3C36A",fontFamily: "", fontSize:"24px", color:"black",borderColor:"black"}} 
            onClick={handleMember}>계정 생성</Button>
    </Group>
    
</Wrapper>

  );
};

export default UserSignup;

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
const Container = styled.div`
    align-items: center;
    width: 1029px;
    margin-left: 80px;
    margin-bottom: 50px;
    margin-top:80px;
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
const Text2 = styled.div` 
    display: flex;
    align-items: center;
    justify-content: left;
    font-size:20pt;
    margin-top: 50px
`
const Group = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
