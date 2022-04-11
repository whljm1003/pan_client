import styled from 'styled-components';
import login_bg from 'images/login_bg.jpg';
import PageTitle from 'components/PageTitle';
import FormBox from 'components/Login/FormBox';
import BottomBox from 'components/Login/BottomBox';
import Separator from 'components/Login/Separator';
import AuthLayout from 'components/Login/AuthLayout';
import React, { useState } from 'react';
import { Input, Button, TextAlign, BlueGreen, CedarChest } from './styles';
import { postLogin } from 'api/userApi';
import { useMutation, useQueryClient } from 'react-query';
// import kakao_button from "images/kakao_button.png";
// import google_button from "images/google_button.png";

export default function Login() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleEmail = (e) => {
    setEmail(e.target.value);
  };
  const HandlePassword = (e) => {
    setPassword(e.target.value);
  };

  const { mutate, isLoading } = useMutation(() => postLogin(email, password), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      queryClient.invalidateQueries('super-heroes');
      // window.location.href = "http://localhost:3000";
      window.location.href = 'http://picanote.site';
    },
    onError: (error) => {
      alert('비밀번호가 일치하지 않습니다.');
    },
  });
  const HandleSubmit = async (e) => {
    e.preventDefault();
    mutate(email, password);
  };

  if (isLoading) {
    <div>...로딩중</div>;
  }

  return (
    <Container>
      <AuthLayout>
        {/* 화면 상단 탭에 보이는 디자인 */}
        <PageTitle title="Log In" />
        <FormBox>
          <TextAlign>
            <BlueGreen>LOGIN </BlueGreen>
            <CedarChest> ACCOUNT</CedarChest>
          </TextAlign>
          <form>
            <Input name="email" type="text" placeholder="EMAIL" onChange={HandleEmail} />
            <Input name="password" type="password" placeholder="PASSWORD" onChange={HandlePassword} />
            <Button type="submit" value="LOG IN" onClick={HandleSubmit} style={{ marginBottom: '15px' }} />
          </form>
          <Separator />
          <ImageBox>
            {/* <SocialBtn>
              <img src={kakao_button} width="55%" alt="kakao" />
            </SocialBtn>
            <SocialBtn>
              <img src={google_button} width="55%" alt="google" />
            </SocialBtn> */}
          </ImageBox>
        </FormBox>
        <BottomBox cta="Don't You want to Log In?" linkText="Main" link="/" />
        <BottomBox cta="Don't have an account?" linkText="Sign Up" link="/signUp" />
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

export const ImageBox = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0px 5px 5px 0px;
`;
export const SocialBtn = styled.div`
  margin: 0px 5px 0px 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
