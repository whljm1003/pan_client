import styled from "styled-components";

export const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1600px;
  width: 100%;
  height: 100%;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const PhraseGroup = styled.div`
  position: relative;
  width: 100%;
  margin: 40px 0;
  max-width: 1600px;
`;

export const Phrase = styled.div`
  display: block;
  padding-left: 2rem;
  margin-bottom: 15px;
  font-size: 2rem;
  font-family: "Cafe24SsurroundAir";
  color: #e3dfd4;
  animation: fadein 3s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Div1 = styled.div`
  display: flex;
  justify-content: center;
  height: 50vh;
  width: 100vw;
  margin-top: 40px;
`;

export const Div2 = styled.div`
  width: 100%;
  height: 60vh;
  margin: 40px 0;
`;

export const Div3 = styled.div`
  display: flex;
`;

export const MainFooter = styled.footer`
  margin-top: 20vh;
  height: 5vh;
  width: 100%;
`;

export const MainLabel = styled.h3`
  font-size: 30px;
  font-family: "Cafe24SsurroundAir";
  font-weight: bolder;
  letter-spacing: -4px;
  word-spacing: 5px;
  margin: 0 2rem 1.8rem;
  padding-bottom: 8px;
  width: fit-content;
  border-bottom: ${(props) => (props.choose ? "3px solid black" : "none")};
  cursor: pointer;
  opacity: ${(props) => (props.choose ? "1.0" : "0.5")};
`;

export const CautionEx = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 2rem;
  padding-left: 2rem;
  font-family: "Cafe24SsurroundAir";
  font-size: 50px;
`;
