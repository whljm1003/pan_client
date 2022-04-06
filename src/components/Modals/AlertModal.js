import Modal from "styled-react-modal";
import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlertModal({
  isModal,
  alertMsg,
  btnContents,
  setIsModal,
  toPage,
}) {
  const navigate = useNavigate();

  return (
    <AlertMD isOpen={isModal}>
      <AlertText>{alertMsg}</AlertText>
      <AlertBtn
        onClick={() => {
          if (toPage) {
            setIsModal(false);
            navigate(`${toPage}`);
          } else {
            setIsModal(false);
          }
        }}
      >
        {btnContents}
      </AlertBtn>
    </AlertMD>
  );
}

const AlertMD = Modal.styled`
  width: 30rem;
  height: 10rem;
  display: flex;
  border-radius: 20px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  box-shadow: 5px 5px 5px gray;
`;

const AlertText = styled.p`
  font-size: x-large;
  font-family: "Cafe24SsurroundAir";
  margin-bottom: 32px;
`;

const AlertBtn = styled.button`
  width: 85%;
  height: 30%;
  border-radius: 20px;
  border: none;
  background-color: #3d8dab;
  cursor: pointer;
  color: #fff9e9;
  font-size: 20px;
  font-family: "Cafe24SsurroundAir";
`;
