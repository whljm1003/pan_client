import styled from "styled-components";

export const MypageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MypageMain = styled.div`
  position: relative;
  display: flex;
  height: 88vh;
  width: 80%;
  max-width: 1600px;
  font-family: "Cafe24SsurroundAir";
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27%;
  height: 80%;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

export const Profile = styled.img`
  position: relative;
  object-fit: cover;
  border: 1px solid #ccdee2;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  text-align: center;
`;

export const Username = styled.h2`
  display: flex;
  justify-content: center;
  width: 70%;
  height: 8%;
  margin-top: 7%;
  /* border: 1px solid blue; */
  text-align: left;
  font-size: 2em;
  font-weight: bold;
`;

export const PersonalDiary = styled.button`
  width: ${(props) => (props.cur === true ? "74%" : "70%")};
  height: 8%;
  top: 100px;
  margin-top: 10%;
  cursor: pointer;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: left;
  background-color: ${(props) => (props.cur === true ? "#3D8DAB" : "#83B799")};
  opacity: ${(props) => (props.cur === true ? "1.0" : "0.5")};
  color: #ffffff;
  border-radius: 5px;
  border: none;
  box-shadow: 5px 5px 5px #e4d8b4;
  font-family: "Cafe24SsurroundAir";
  :hover {
    background-color: #b6cb9e;
  }
`;

export const ExchangeDiary = styled.button`
  width: ${(props) => (props.cur === true ? "74%" : "70%")};
  height: 8%;
  margin-top: 3%;
  cursor: pointer;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: left;
  background-color: ${(props) => (props.cur === true ? "#3D8DAB" : "#83B799")};
  opacity: ${(props) => (props.cur === true ? "1.0" : "0.5")};
  color: #ffffff;
  border-radius: 5px;
  border: none;
  box-shadow: 5px 5px 5px #e4d8b4;
  font-family: "Cafe24SsurroundAir";
  :hover {
    background-color: #b6cb9e;
  }
`;

export const Print = styled.button`
  width: ${(props) => (props.cur === true ? "74%" : "70%")};
  height: 8%;
  margin: 24%;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: left;
  color: #ffffff;
  background-color: ${(props) => (props.cur === true ? "#3D8DAB" : "#83B799")};
  opacity: ${(props) => (props.cur === true ? "1.0" : "0.5")};
  box-shadow: 5px 5px 5px #e4d8b4;
  border-radius: 5px;
  border: none;
  font-family: "Cafe24SsurroundAir";
  :hover {
    background-color: #b6cb9e;
  }
`;

export const DiarySection = styled.section`
  position: relative;
  top: 3%;
  left: 4.2%;
  width: 66%;
  height: 80%;
`;

export const MypageFooter = styled.footer`
  width: 100%;
  height: 10vh;
`;
