import styled from 'styled-components';
import SearchImg from '../images/loupe.png';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import React from 'react';

function Header({ keywords, SetKeywords, isMain, onClickSearch }) {
  const token = sessionStorage.getItem('CC_Token');
  const navigate = useNavigate();
  const handlelogout = () => {
    sessionStorage.removeItem('CC_Token');
    navigate('/');
    window.location.reload(true);
  };
  const searchKeywords = (e) => {
    SetKeywords(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventdefault();
  };

  return (
    <Wrapper>
      <HeaderBox>
        <HeaderName>
          <Link to="/">
            <img src={logo} alt="" width="200px" />
          </Link>
        </HeaderName>
        <div>
          {isMain ? (
            <SearchForm onSubmit={onSubmitHandler}>
              <SearchTxt type="text" placeholder="Type to search" onChange={searchKeywords} value={keywords} />

              <SearchBtn href="#" onClick={onClickSearch}>
                <img src={SearchImg} width="15px" alt="serach" />
              </SearchBtn>
            </SearchForm>
          ) : null}
          {token ? (
            <Login>
              <Link to="*" onClick={handlelogout}>
                LOGOUT
              </Link>
            </Login>
          ) : (
            <Login>
              <Link to="/login">LOGIN</Link>
            </Login>
          )}
        </div>
      </HeaderBox>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  max-width: 1675px;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
  padding: 18px;
`;
const HeaderName = styled.span`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;
const Login = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: x-large;
  cursor: pointer;
  color: #3d8dab;
  margin-right: -6px;
`;
const SearchForm = styled.form`
  display: inline-block;
  height: 30px;
  padding: 6px;
  margin-right: 10px;
  border-radius: 50px;
  transition: 0.5s;
  &:hover {
    line-height: 60px;
    box-shadow: 0 0 0.5px 2px #3d8dab;
  }
  &:hover > input {
    padding: 0 6px;
    width: 240px;
  }
`;
const SearchTxt = styled.input`
  display: flex;
  padding: 0;
  width: 0px;
  border: none;
  outline: none;
  float: left;
  font-size: 1rem;
  line-height: 17px;
  transition: 0.4s;
`;
const SearchBtn = styled.button`
  display: flex;
  text-decoration: none;
  justify-content: right;
  align-items: right;
  height: 17px;
  border-radius: 50%;
  color: black;
  border: none;
  background-color: transparent;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
