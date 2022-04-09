import styled from "styled-components";

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 102vh;
`;
export const DetailsMain = styled.div`
  display: flex;
  flex-direction: row;
  height: 88vh;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
`;
export const DetailContent = styled.div`
  width: 65%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  color: white;
  z-index: 1;
  ::after {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 20px 0 0 20px;
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.5) 10%,
        rgba(20, 20, 20, 0.5) 100%
      ),
      url("https://source.unsplash.com/user/erondu");
    background-size: cover;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  padding: 10px;
  font-size: 20px;
  font-family: "MapoGoldenPier";
`;
export const ContentHeaderT = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ContentHTLeft = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
`;
export const ContentTitle = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  width: 80%;
  height: 30px;
`;
export const ContentHTRight = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
`;
export const ContentDate = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  width: 80%;
  height: 30px;
`;
export const ContentHeaderB = styled.div`
  /* border: 3px solid #E2CD6D; */
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ContentHBLeft = styled.div`
  padding-left: 80px;
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
`;
export const ContentFeel = styled.div`
  margin-left: 20px;
  width: 50px;
  height: 40px;
`;
export const ContentHBRight = styled.div`
  padding-left: 80px;
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
`;
export const ContentWeather = styled.div`
  margin-left: 20px;
  width: 50px;
  height: 40px;
`;
export const ContentMain = styled.div`
  width: 100%;
  height: 80%;
  padding: 20px;
  font-family: "MapoGoldenPier";
  font-size: 20px;
  line-height: 40px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    width: 100%;
    height: 60%;
    border-radius: 13px;
  }
  div {
    word-break: break-all;
    width: 100%;
    height: 100%;
  }
  h1 {
    font-size: 38px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 36px;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 34px;
    margin-bottom: 10px;
  }
  h4 {
    font-size: 32px;
    margin-bottom: 7px;
  }
  h5 {
    font-size: 30px;
    margin-bottom: 7px;
  }
  h6 {
    font-size: 28px;
    margin-bottom: 7px;
  }
  strong {
    font-weight: 700;
  }
`;
export const ContentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5%;
  padding: 10px;
  font-family: "GmarketSansBold";
`;
export const BottomLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BottomWriter = styled.div`
  margin-left: 10px;
  font-family: "GmarketSansMedium";
  span {
    margin-left: 5px;
    font-weight: 700;
  }
`;
export const BottomLikeBtn = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  span {
    margin-top: 2px;
    margin-left: 10px;
  }
`;
export const BottomRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
export const BottomPreBtn = styled.div`
  margin-left: 20px;
  width: 70px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #75a5a9;
  border-radius: 6px;
  background-color: #75a5a9;
  font-family: "GmarketSansMedium";
  font-size: 15px;
  color: #fff9e9;
  cursor: pointer;
`;
export const BottomNextBtn = styled.div`
  margin-left: 20px;
  width: 70px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #75a5a9;
  border-radius: 6px;
  background-color: #75a5a9;
  font-family: "GmarketSansMedium";
  font-size: 15px;
  color: #fff9e9;
  cursor: pointer;
`;
export const PublicBtn = styled.div`
  margin-left: 20px;
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #75a5a9;
  border-radius: 6px;
  background-color: #75a5a9;
  font-family: "GmarketSansMedium";
  font-size: 15px;
  color: #fff9e9;
  cursor: pointer;
`;
export const BottomEditBtn = styled.div`
  margin-left: 20px;
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #75a5a9;
  border-radius: 6px;
  background-color: #75a5a9;
  font-family: "GmarketSansMedium";
  font-size: 15px;
  color: #fff9e9;
  cursor: pointer;
`;
export const BottomDeleteBtn = styled.div`
  margin-left: 20px;
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #75a5a9;
  border-radius: 6px;
  background-color: #75a5a9;
  font-family: "GmarketSansMedium";
  font-size: 15px;
  color: #fff9e9;
  cursor: pointer;
`;
export const DetailComment = styled.div`
  width: 35%;
  height: 100%;
  margin: 0 auto;
  border: 4px solid #3d8dab;
  border-left: none;
  border-radius: 0 20px 20px 0;
  position: relative;
  overflow-x: hidden;
`;
export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-top: 10px;
  padding-left: 10px;
`;
export const CommentLeft = styled.div`
  font-family: "GmarketSansBold";
  font-size: 15px;
`;
export const CommentMiddle = styled.div`
  margin-left: 10px;
  font-family: "GmarketSansMedium";
  font-size: 12px;
`;
export const CommentRight = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row-reverse;
  font-family: "GmarketSansLight";
  font-size: 12px;
`;
export const CommentEditBtn = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #75a5a9;
  background-color: #75a5a9;
  margin-left: 20px;
  font-family: "GmarketSansMedium";
  font-size: 15px;
  color: #fff9e9;
  cursor: pointer;
`;
export const CommentDeleteBtn = styled.div`
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #75a5a9;
  margin-right: 20px;
  font-family: "GmarketSansMedium";
  font-size: 15px;
  color: #fff9e9;
  cursor: pointer;
`;
export const CommentMain = styled.div`
  width: 100%;
  height: 10%;
  padding: 10px;
  font-family: "GmarketSansMedium";
  font-size: 18px;
`;
export const DetailBG = styled.div`
  height: 90%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const CommentBottom = styled.form`
  width: 100%;
  height: 5.5%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5px;
`;
export const CommentInput = styled.input`
  border: 3px solid black;
  width: 80%;
  margin-left: 10px;
  padding: 0.5em;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: white;
`;
export const CommnetBG = styled.div`
  border-bottom: 1px solid rgb(229, 229, 229);
`;
export const CommentSubmitBtn = styled.div`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #75a5a9;
  border-radius: 5px;
  background-color: #75a5a9;
  margin-right: 10px;
  font-family: "GmarketSansMedium";
  font-size: 15px;
  color: #fff9e9;
  position: absolute;
  bottom: 0px;
  right: 0px;
  cursor: pointer;
`;
export const DisableComment = styled.div`
  background-color: rgba(40, 42, 54, 0.8);
  border-radius: 0 20px 20px 0;
  width: 35%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "MapoGoldenPier";
  font-size: 35px;
  color: white;
  line-height: 60px;
`;
