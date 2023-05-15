import {React, useState, useRef} from "react";
import styled from 'styled-components';
import { Navigate, useNavigate } from "react-router-dom";
import TextField  from "@mui/material/TextField";
import Button  from '@mui/material/Button';
import axios from "axios";

const AdminFAQCreate = () => {
  const faqTitleRef = useRef();
  const faqContentRef = useRef();
  const selectList = ["결제", "로그인/정보", "상품문의", "판매/대여", "기타"];
  const [Selected, setSelected] = useState("");
  const selectRef = useRef();

  const navigate = useNavigate();
    
  const handleClick = () => {
        navigate(`/m/faqs/lists`);
  }

  const handleSelect = (e) => {
      setSelected(e.target.value);
  };
  
  const handleInsert = () => {
    console.log("handleInsert =>", faqTitleRef.current.value);
    if (faqTitleRef.current.value === "" || faqTitleRef.current.value === undefined) {
      alert("제목을 입력하세요!!!");
      faqTitleRef.current.focus();
      return false;
    }
   
    if (
      faqContentRef.current.value === "" ||
      faqContentRef.current.value === undefined
    ) {
      alert("내용을 입력하세요!!!");
      faqContentRef.current.focus();
      return false;
    }
  axios
      .post(`/m/faqs/create`, {
        faqTitle: faqTitleRef.current.value,
        faqContent: faqContentRef.current.value,
        faqCategory: selectRef,
      })
      .then(response => {
        console.log(response.data);
        setSelected(response.data);
      }
       
      )
      .catch((e) => {
        console.error(e);
      });
    }

  return (
     <Wrapper>
        <Header style={{ marginBottom:"50px", fontSize:"36px"}}>FAQ 자주 묻는 질문 | 등록</Header>
          <Text>
            제목
            <TextField
              variant="outlined"
              inputRef={faqTitleRef}
              defaultValue="제목을 입력해주세요."
              style={{width:"70%", marginLeft:"20px"}}
            />
            </Text>
  
         <Text1>
          구분
          <select onChange={handleSelect} inputRef={selectRef} style={{height:"40px", width:"150px", borderColor:"#C8C8C8", borderRadius:"5px", marginLeft:"20px"}}>
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          </Text1>

          <Text2>
            내용
            <TextField
              variant="outlined"
              inputRef={faqContentRef}
              multiline
              rows={10}
              defaultValue="내용을 입력해주세요."
              style={{width:"70%",  marginLeft:"20px"}}
            />        
        
          </Text2>
        
        <Group>  
        
        <Button type="submit" variant="outlined" 
          style={{marginTop:"20px" ,marginRight:"50px" ,width:"15%", height: "60px",borderRadius:"30px",backgroundColor:"white", borderColor:"black",fontFamily: "", fontSize:"20px", color:"black"}} 
          onClick={handleClick}>취소</Button>
  
        <Button variant="outlined" 
          style={{marginTop:"20px" ,width:"15%", height: "60px",borderRadius:"30px",borderColor:"black",backgroundColor:"#C3C36A",fontFamily: "", fontSize:"20px", color:"black"}} 
          onClick={handleInsert} >등록</Button> 
        </Group>
    </Wrapper>
  );
};

export default AdminFAQCreate;

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
const Text = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size:20pt;
    margin-top:20px;
`
const Text1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size:20pt;
    margin-top:20px;
    margin-right:710px;
`
const Text2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: top;
    justify-content: center;
    font-size:20pt;
    margin-top:20px;
`
const Group = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

