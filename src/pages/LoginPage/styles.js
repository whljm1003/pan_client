import styled from "styled-components";

export const TextAlign = styled.div`
  text-align: center;
`;

export const BlueGreen = styled.label`
  font-size: 24px;
  font-weight: 700;
  color: rgb(61, 141, 171);
`;

export const CedarChest = styled.label`
  font-size: 24px;
  font-weight: 700;
  color: rgb(216, 89, 65);
`;

export const Button = styled.input`
  border: none;
  margin-top: 12px;
  background-color: #005c99;
  border-radius: 10px;
  cursor: pointer;
  color: #ffffff;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 80%;
  &:hover {
    transform: none;
    color: gold;
  }
`;

export const Input = styled.input`
  width: 80%;
  border-radius: 7px;
  padding: 7px;
  background-color: #ffffff;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;
