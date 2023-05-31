import React from 'react';
// css-in-js
import styled from 'styled-components';
import HobbyR01 from './assets/animal.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    // useHistory
    navigate('/recommend/question');
  };

  return (
    <Wrapper
      style={{
        userSelect: 'none',
      }}
    >
      <Wrapper2>
        <Header style={{ color: '#595F88', marginBottom: '10px' }}>
          나의 취미 찾기
        </Header>
        <Contents>
          <Title>동물로 나타낸 나의 취미 유형은?</Title>
          <LogoImage>
            <img alt="HobbyR01" src={HobbyR01} width={650} height={520} />
          </LogoImage>
          <Button
            style={{
              marginTop: '10px',
              width: '55%',
              minHeight: '30px',
              borderRadius: '40px',
              backgroundColor: '#9297B9',
              fontFamily: 'The Jamsil 2 Light',
              fontSize: '25px',
              color: 'white',
            }}
            onClick={handleClickButton}
          >
            취미를 찾아 떠나는 여정
          </Button>
        </Contents>
      </Wrapper2>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  font-weight: 700;
  font-size: 40px;
`;
const Wrapper2 = styled.div`
  padding: 1.5rem 1rem;
  margin: 3rem auto;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 800px;
  height: 850px;
  border: 10px solid #9da0b8;
  background: #f4f4f4;
`;
const Header = styled.div`
  font-family: 'The Jamsil 2 Light';
  font-size: 60pt;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Contents = styled.div`
  font-family: 'The Jamsil 2 Light';
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
  font-family: 'The Jamsil 2 Light';
  font-size: 20pt;
  margin-top: 20px;
  color: #545454;
`;
const LogoImage = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
