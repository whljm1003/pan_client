import styled from "styled-components";

export const DiaryWritingWrapper = styled.div`
  height: 87vh;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
`;
export const DiaryWritingMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const WriteHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  padding: 10px;
  font-family: "Cafe24SsurroundAir";
  font-weight: bold;
  margin-bottom: 20px;
`;
export const WriteHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
  font-size: 20px;
`;
export const WriteTitle = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 20%;
  padding-left: 10px;
  margin-bottom: 40px;
  input {
    width: 400px;
    height: 40px;
    border: 1px solid #3d8dab;
    margin-left: 10px;
    border-radius: 12px;
    padding-left: 10px;
  }
`;

export const WriteHeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 100%;

  font-size: 20px;
`;

export const WriteDate = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 20%;
  padding-left: 10px;
  input {
    width: 400px;
    height: 40px;
    border: 1px solid #3d8dab;
    margin-left: 10px;
    border-radius: 12px;
    padding-left: 10px;
  }
`;

export const WriteContents = styled.div`
  width: 1360px;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const Wirte = styled.section`
  border: 1px solid pink;
  width: 50%;
  height: 100%;
`;

export const Preview = styled.section`
  border: 1px solid pink;
  width: 50%;
  height: 100%;
`;

export const Footer = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  padding-right: 20px;
`;

export const WriteButton = styled.button`
  width: 90px;
  height: 40px;
  margin-left: 15px;
  border: 1px solid #242d40;
  border-radius: 10px;
  outline: 0;
  background-color: white;
  font-size: large;
  color: black;
  cursor: pointer;
  font-family: "Cafe24SsurroundAir";
  font-weight: bolder;
  :hover {
    transform: scale(1.05);
    border: 2px solid #242d40;
  }
`;

export const CancelButton = styled.button`
  width: 90px;
  height: 40px;
  margin-left: 15px;
  border: 1px solid #d9a9a9;
  border-radius: 10px;
  outline: 0;
  background-color: white;
  font-size: large;
  color: black;
  cursor: pointer;
  font-family: "Cafe24SsurroundAir";
  font-weight: bolder;
  opacity: 0.7;
  :hover {
    transform: scale(1.05);
    border: 2px solid #d9a9a9;
    opacity: 0.7;
  }
`;
