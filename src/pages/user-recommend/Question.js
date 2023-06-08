/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Parser from 'html-react-parser';
import { QuestionData } from './assets/data/questiondata';
import { createSearchParams, useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

const Question = () => {
  const [questionNo, setQuestionNo] = React.useState(0);
  const navigate = useNavigate();

  const [totalScore, setTotalScore] = React.useState([
    { id: 'EI', score: 0 },
    { id: 'SN', score: 0 },
    { id: 'TF', score: 0 },
    { id: 'JP', score: 0 },
  ]);

  const handleClickAnswer = (add, type) => {
    const newScore = totalScore.map((s) =>
      s.id === type ? { id: s.id, score: s.score + add } : s
    );

    setTotalScore(newScore);

    if (QuestionData.length !== questionNo + 1) {
      // 다음문제로 문제수 증가
      setQuestionNo(questionNo + 1);
    } else {
      //mbti도출
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        ''
      );
      //결과 페이지 이동
      navigate({
        pathname: '/recommend/result',
        search: `?${createSearchParams({
          mbti: mbti,
        })}`,
      });
    }
  };

  return (
    <Wrapper>
      <Wrapper2>
        <Line>
          <LinearProgress
            variant="determinate"
            value={(questionNo / QuestionData.length) * 100}
            style={{
              width: '80%',
              minHeight: '30px',
              marginTop: '20px',
              marginBottom: '50px',
              backgroundColor: '#E5E5C9',
              borderRadius: '20px',
            }}
          />
        </Line>
        <LogoImage>
          <img
            alt="로고"
            src={QuestionData[questionNo].img}
            width={450}
            height={350}
          />
        </LogoImage>
        <Title
          style={{
            marginTop: '40px',
            textAlign: 'center',
            color: '#4C5947',
          }}
        >
          {Parser(QuestionData[questionNo].title)}
        </Title>
        <Group>
          <Button
            onClick={() => handleClickAnswer(1, QuestionData[questionNo].type)}
            style={{
              width: '80%',
              minHeight: '10px',
              fontSize: '16pt',
              marginTop: '30px',
              backgroundColor: '#A3A38D',
              fontFamily: 'The Jamsil 2 Light',
              color: 'white',
            }}
          >
            {QuestionData[questionNo].answera}
          </Button>
          <Button
            onClick={() => handleClickAnswer(0, QuestionData[questionNo].type)}
            style={{
              width: '80%',
              minHeight: '10px',
              fontSize: '16pt',
              marginTop: '20px',
              backgroundColor: '#A3A38D',
              fontFamily: 'The Jamsil 2 Light',
              color: 'white',
            }}
          >
            {QuestionData[questionNo].answerb}
          </Button>
        </Group>
      </Wrapper2>
    </Wrapper>
  );
};

export default Question;

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  font-weight: 700;
  font-size: 40px;
  user-select: none;
`;
const Wrapper2 = styled.div`
  max-width: 1600px;
  min-width: 400px;
  padding: 1.5rem 1rem;
  margin: 3rem auto;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 800px;
  height: 850px;
  border: 30px solid #e5e5c9;
  background: #f3f3ef;
`;

const Line = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  .MuiLinearProgress-barColorPrimary {
    background-color: #ebd7ff;
  }
`;
const LogoImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  height: 84px;
  font-size: 21pt;
  font-family: 'The Jamsil 1 Thin';
  margin-left: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  line-height: 1.5;
`;
const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
