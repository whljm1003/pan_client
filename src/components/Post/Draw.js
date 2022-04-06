import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import brushIcon from "images/brush.png";
import { ModalProvider } from "styled-react-modal";
import AlertModal from "components/Modals/AlertModal";
import { API_URL } from "url";

const CANVAS_WIDTH = 1300;
const CANVAS_HEIGHT = 400;

export default function Board({ setPicUrl }) {
  const COLORS = [
    "#FFF9E9",
    "#CCDEE2",
    "#C08A90",
    "#DCB1B7",
    "#F4A24F",
    "#C57951",
    "#E2CD6D",
    "#D85941",
    "#83B799",
    "#3D8DAB",
    "#9196E1",
    "#505AC5",
    "#274040",
    "#1C1B1A",
  ];

  const [filling, setFilling] = useState(false);
  const [painting, setPainting] = useState(false);
  const [color, setColor] = useState(COLORS[14]);
  // modal state
  const [isModal, setIsModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [btnContents, setBtnContents] = useState("");
  const [toPage, setToPage] = useState("");

  const canvas = useRef(null);
  const ctx = useRef(null);

  const startPainting = () => {
    setPainting(true);
  };

  const stopPainting = () => {
    setPainting(false);
  };

  const onMouseMove = ({ nativeEvent }) => {
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;

    if (!ctx.current) return;

    if (!painting) {
      ctx.current.beginPath();
      ctx.current.moveTo(x, y);
    } else {
      ctx.current.lineTo(x, y);
      ctx.current.stroke();
    }
  };

  const handleColorClick = (e) => {
    setColor(e.target.name);
    ctx.current.fillStyle = color;
    // }
  };

  const handleRangeChange = (e) => {
    const size = e.target.value;
    ctx.current.lineWidth = size;
  };

  const handleEraser = (e) => {
    setColor("white");
    const size = e.target.value;
    ctx.current.lineWidth = size;
  };

  // true면 fill, false면 paint
  const handleModeClick = (e) => {
    setFilling(!filling);
  };

  const handleCanvasClick = () => {
    if (filling) {
      ctx.current.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  };

  const clearDrawing = () => {
    ctx.current.fillStyle = "white";
    ctx.current.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  const uploadCanvasToServer = async () => {
    const newCtx = document.getElementsByClassName("canva");
    const imgBase64 = newCtx[0].toDataURL("image/png");
    const decodImg = atob(imgBase64.split(",")[1]);
    let array = [];
    for (let i = 0; i < decodImg.length; i++) {
      array.push(decodImg.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(array)], { type: "image/png" });
    // const fileName = 'canvas_img_' + new Date().getMilliseconds() + '.png';
    let formData = new FormData();
    formData.append("img", file);

    await axios
      .post(`${API_URL}/diaries/upload`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(modalHandler(true, "그림이 등록 되었습니다", "확인"))
      .then((res) => setPicUrl(res.data.picUrl));
  };

  // const updateCanvas = () => {
  //   var img = new Image(); //이미지 객체 생성
  //   img.src =
  //     "https://s3.ap-northeast-2.amazonaws.com/picanote.me/uploads/1624432560283_blob"; //code.jpg라는 이미지 파일을 로딩 시작
  //   img.onload = function () //이미지 로딩 완료시 실행되는 함수
  //   {
  //     //(20,20)을 중심으로 100*100의 사이즈로 이미지를 그림
  //     ctx.current.drawImage(img, 0, 0, this.width, this.height);
  //   };
  //   const newCtx = document.getElementsByClassName("canva");
  //   const imgBase64 = newCtx[0].toDataURL("image/png");
  // };

  // 모달 핸들러
  const modalHandler = (isModal, alertMsg, btnContents, toPage) => {
    setIsModal(isModal);
    setAlertMsg(alertMsg);
    setBtnContents(btnContents);
    setToPage(toPage);
  };

  useEffect(() => {
    if (canvas.current) {
      ctx.current = canvas.current.getContext("2d");
      ctx.current.strokeStyle = color;
      ctx.current.fillStyle = color;
    }
  }, [color]);

  return (
    <ModalProvider>
      <AlertModal
        isModal={isModal}
        setIsModal={setIsModal}
        alertMsg={alertMsg}
        btnContents={btnContents}
        toPage={toPage}
      />
      <DrawWrapper>
        <ToolDiv>
          <ControlsRng>
            <Range className="controls__range">
              Brush
              <input
                type="range"
                min="0.1"
                max="5"
                defaultValue={"2.5"}
                onChange={handleRangeChange}
                step="0.1"
              />
            </Range>
            <Range className="controls__range">
              Eraser
              <input
                type="range"
                min="10"
                max="40"
                defaultValue={"2.5"}
                onChange={handleEraser}
                step="0.1"
              />
            </Range>
          </ControlsRng>
          {filling ? (
            <Mode onClick={handleModeClick}>Fill</Mode>
          ) : (
            <Mode onClick={handleModeClick}>Paint</Mode>
          )}
          <Clear onClick={clearDrawing}>Clear</Clear>
          {COLORS.map((c) => {
            return color === c ? (
              <ColorButton
                name={c}
                key={c}
                onClick={handleColorClick}
                color={c}
                style={{ border: "2px solid #E3DFD4" }}
              >
                C
              </ColorButton>
            ) : (
              <ColorButton
                name={c}
                key={c}
                onClick={handleColorClick}
                color={c}
              ></ColorButton>
            );
          })}
          <ToolRight>
            <Savebtn onClick={uploadCanvasToServer}>그림 저장</Savebtn>
            {/* <Savebtn onClick={updateCanvas}>
                그림 수정
              </Savebtn> */}
          </ToolRight>
        </ToolDiv>
        <Canva
          className="canva"
          ref={canvas}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseMove={onMouseMove}
          onMouseDown={startPainting}
          onMouseUp={stopPainting}
          onMouseLeave={stopPainting}
          onClick={handleCanvasClick}
        />
      </DrawWrapper>
    </ModalProvider>
  );
}

const DrawWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ToolDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const ControlsRng = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Range = styled.div`
  display: flex;
  align-items: center;
  border-radius: 30px;
  color: #3d8dab;
  font-weight: 700;
  cursor: pointer;
  input {
    margin-left: 5px;
    height: 8px;
    border: 1px solid #e3dfd4;
    background-color: rgb(229, 229, 229);
    border-radius: 50px;
  }
`;

const ColorButton = styled.button`
  border: none;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 2px;
  :hover {
    transform: scale(1.1);
  }
`;

const Canva = styled.canvas`
  border: 1px solid rgb(229, 229, 229);
  border-radius: 12px;
  margin-bottom: 20px;
  cursor: url(${brushIcon}), auto;
`;

const ToolRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 60%;
  height: 30px;
`;

const Savebtn = styled.button`
  width: 100px;
  border-radius: 12px;
  border: none;
  background-color: #75a5a9;
  color: #fff9e9;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;

const Mode = styled.button`
  width: 60px;
  border-radius: 12px;
  border: none;
  margin: 0 2px;
  cursor: pointer;
  background-color: #75a5a9;
  color: #fff9e9;
  font-size: 15px;
  font-weight: 500;
  :hover {
    transform: scale(1.1);
  }
`;

const Clear = styled.button`
  width: 60px;
  border-radius: 12px;
  border: none;
  margin: 0 2px;
  cursor: pointer;
  background-color: #75a5a9;
  color: #fff9e9;
  font-size: 15px;
  font-weight: 500;
  :hover {
    transform: scale(1.1);
  }
`;
