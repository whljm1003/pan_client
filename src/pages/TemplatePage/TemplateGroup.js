import React from "react";
import ToggleButton from "components/ToggleButton";
import Header from "components/Header";
import ChooseGroupBook from "components/Modals/ChooseGroupBook";
import { useNavigate } from "react-router-dom";
import { ModalProvider } from "styled-react-modal";
import {
  FadingBackground,
  Announcement,
  TemplateMain,
  Writing,
  Drawing,
} from "./styles";

export default function TemplateGroup() {
  const navigate = useNavigate();

  return (
    <>
      <ModalProvider backgroundComponent={FadingBackground}>
        <ChooseGroupBook />
        <Header main="/" login="/login" />
        <Announcement>템플릿 선택하기</Announcement>
        <TemplateMain>
          <Writing
            onClick={() => {
              navigate("/writing");
            }}
          >
            시적 감성
          </Writing>
          <Drawing
            onClick={() => {
              navigate("/drawing");
            }}
          >
            예술적 감성
          </Drawing>
        </TemplateMain>
        <ToggleButton></ToggleButton>
      </ModalProvider>
    </>
  );
}
