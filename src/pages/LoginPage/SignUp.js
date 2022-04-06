import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PageTitle from "components/PageTitle";
import login_bg from "images/login_bg.jpg";
import FormBox from "components/Login/FormBox";
import BottomBox from "components/Login/BottomBox";
import AuthLayout from "components/Login/AuthLayout";
import { Button, Input, BlueGreen, CedarChest, TextAlign } from "./styles";
import { useNavigate } from "react-router-dom";
import { FatLink } from "components/shared";
import { API_URL } from "url";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onUsernameHandler = (e) => setUsername(e.target.value);
  const onEmailHandler = (e) => setEmail(e.target.value);
  const onPasswordHandler = (e) => setPassword(e.target.value);
  const onConfirmPasswordHandler = (e) => setConfirmPassword(e.target.value);

  const handleSignUp = () => {
    const emailRegExp =
      /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!emailRegExp.test(email)) {
      return setErrorMessage("이메일을 형식에 맞게 작성해주세요.");
    } else if (username.length < 2) {
      return setErrorMessage("닉네임은 2글자 이상이어야 합니다.");
    } else if (!password.match(passwordRegExp)) {
      return setErrorMessage("비밀번호가 올바르지 않습니다.");
    } else if (password !== confirmPassword) {
      return setErrorMessage("비밀번호가 동일하지 않습니다.");
    } else {
      axios
        .post(`${API_URL}/signup`, {
          username,
          email,
          password,
        })
        .then((res) => setErrorMessage(res.data.message))
        .then(() => navigate("/login"))
        .catch((err) => setErrorMessage(err.response.data.message));
    }
  };

  return (
    <Container>
      <AuthLayout>
        <PageTitle title="Sign Up" />
        <FormBox>
          <TextAlign>
            <BlueGreen>SIGN UP</BlueGreen>
            <CedarChest> ACCOUNT</CedarChest>
          </TextAlign>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              name="email"
              type="text"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={onEmailHandler}
            />
            <Input
              name="username"
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={username}
              onChange={onUsernameHandler}
            />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={onPasswordHandler}
            />
            <Input
              name="passwordCorrect"
              type="password"
              placeholder="다시 한번 입력해주세요."
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
            />
            <Button type="submit" value="SIGN UP" onClick={handleSignUp} />
          </form>
          {errorMessage ? (
            <span className="errorMsg">{errorMessage}</span>
          ) : (
            <span className="errorMsg" />
          )}
          <Subtitle>
            <div>&nbsp;</div>
            <div>가입을 진행하시게 되면 약관 및</div>
            <div>&nbsp;</div>
            <div>데이터 정책, 쿠키 정책에 동의하게 됩니다</div>
          </Subtitle>
        </FormBox>
        <BottomBox cta="Don't You want to Log In?" linkText="Main" link="/" />
        <BottomBox cta="Have an Account?" linkText="Log In" link="/login" />
      </AuthLayout>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  background: url(${login_bg});
  background-position: center;
  background-size: cover;
  top: 0;
  left: 0;
  width: 100%;
`;

const Subtitle = styled(FatLink)`
  font-size: 12px;
  color: #666666;
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: center;
`;
