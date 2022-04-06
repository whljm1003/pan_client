import React from "react";
import { GlobalStyles } from "styles";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "pages/MainPage/index";
import Myapge from "pages/MyPage/index";
import Template from "pages/TemplatePage/Template";
import TemplateGroup from "pages/TemplatePage/TemplateGroup";
import Writing from "pages/PostPage/Writing";
import Drawing from "pages/PostPage/Drawing";
import Details from "pages/DetailPage/index";
import Login from "pages/LoginPage/Login";
import SignUp from "pages/LoginPage/SignUp";
// context API
import UserStore from "store/UserStore";
import CreateBookStore from "store/CreateBookStore";
import DiaryInfoStore from "store/DiaryInfoStore";
//recoil
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <UserStore>
      <CreateBookStore>
        <DiaryInfoStore>
          <RecoilRoot>
            <HelmetProvider>
              <GlobalStyles />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/mypage" element={<Myapge />} />
                  <Route path="/template" element={<Template />} />
                  <Route path="/templategroup" element={<TemplateGroup />} />
                  <Route path="/writing" element={<Writing />} />
                  <Route path="/drawing" element={<Drawing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/details/:id" element={<Details />} />
                </Routes>
              </BrowserRouter>
            </HelmetProvider>
          </RecoilRoot>
        </DiaryInfoStore>
      </CreateBookStore>
    </UserStore>
  );
}

export default App;
