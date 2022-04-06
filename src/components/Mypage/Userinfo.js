import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ModalProvider } from "styled-react-modal";
import DeleteModal from "components/Modals/DeleteModal";
import AlertModal from "components/Modals/AlertModal";
import { API_URL } from "url";
import mask from "../../images/mask.png";

function EditUserInfo({ username, email }) {
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [newProfile, setNewProfile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // modal state
  const [isModal, setIsModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [target, setTarget] = useState("");
  const [btnContents, setBtnContents] = useState("");
  const [toPage, setToPage] = useState("");

  // alertModal handler
  const alertHandler = (isModal, alertMsg, btnContents, toPage) => {
    setIsModal(isModal);
    setBtnContents(btnContents);
    setAlertMsg(alertMsg);
    setToPage(toPage);
  };

  // deleteModal handler
  const deleteHandler = (isConfirmModal, target) => {
    setIsConfirmModal(isConfirmModal);
    setTarget(target);
  };

  // 프로필 사진
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  // const [imgFile, setImgFile] = useState(null);	//파일

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = async () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      // setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }

    // multer s3 통신해서 프로필 사진 변경
    const formData = new FormData();
    formData.append("img", event.target.files[0]);
    axios
      .put(`${API_URL}/profile/upload`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => setNewProfile(res.data.profileUrl));
  };

  // 회원정보 수정
  const UserInfoHandler = async () => {
    if (!newPassword || !newName) {
      return alertHandler(
        true,
        "유저네임과 비밀번호는 필수 사항입니다",
        "확인"
      );
    } else if (newPassword !== confirmPassword) {
      return alertHandler(true, "비밀번호가 일치하지 않습니다", "확인");
    } else {
      await axios({
        method: "put",
        url: `${API_URL}/profile`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
          ContentType: "application/json",
        },
        data: {
          username: newName,
          password: newPassword,
          profileUrl: newProfile,
        },
        withCredentials: true,
      }).then(
        sessionStorage.removeItem("CC_Token"),
        alertHandler(true, "회원정보가 정상적으로 바꼈습니다", "확인", "/login")
      );
    }
  };

  // 회원탈퇴
  const WithdrawalHandler = async () => {
    await axios
      .delete(`${API_URL}/withdrawal`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("CC_Token")}`,
          ContentType: "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        alertHandler(true, "회원탈퇴가 되었습니다", "확인");
        sessionStorage.removeItem("CC_Token");
        navigate("/");
      });
  };

  return (
    <ModalProvider>
      <AlertModal
        isModal={isModal}
        setIsModal={setIsModal}
        alertMsg={alertMsg}
        btnContents={btnContents}
        toPage={toPage}
      />
      <DeleteModal
        isModal={isConfirmModal}
        setIsModal={setIsConfirmModal}
        target={target}
        HandleSubmit={WithdrawalHandler}
      />
      <EditWrapper>
        <ProfileWrapper>
          <ProfileLeft>
            <div>
              <img alt="#" src={imgBase64 ? imgBase64 : mask}></img>
            </div>
            <label htmlFor="imgFile" onChange={handleChangeFile}>
              사진 변경
            </label>
            <input
              type="file"
              name="imgFile"
              id="imgFile"
              onChange={handleChangeFile}
              style={{ display: "none" }}
            />
          </ProfileLeft>
          <ProfileRight>
            <div>{username}</div>
            <div>{email}</div>
          </ProfileRight>
        </ProfileWrapper>
        <UsernameWrapper>
          <LeftDiv>유저네임</LeftDiv>
          <input
            type="text"
            placeholder="유저네임"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          ></input>
        </UsernameWrapper>
        <PassowrdWrapper>
          <LeftDiv>비밀번호</LeftDiv>
          <PasswordMain>
            <div>
              <span>새 비밀번호</span>
              <input
                type="password"
                placeholder="새 비밀번호"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <span>비밀번호 확인</span>
              <input
                type="password"
                placeholder="비밀번호 확인"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></input>
            </div>
          </PasswordMain>
        </PassowrdWrapper>
        <Withdrawal>
          <WithdrawalMain>
            <LeftDiv>회원탈퇴</LeftDiv>
            <button onClick={() => deleteHandler(true, "탈퇴")}>
              회원 탈퇴
            </button>
          </WithdrawalMain>
          <Bottom>
            탈퇴 시 작성하신 일기장 및 일기들이 모두 삭제되며 복구되지 않습니다.
          </Bottom>
        </Withdrawal>
        <EditFooter>
          <button onClick={UserInfoHandler}>수정하기</button>
        </EditFooter>
      </EditWrapper>
    </ModalProvider>
  );
}

export default EditUserInfo;

const EditWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 20px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 13rem;
  margin-bottom: 70px;
`;

const ProfileLeft = styled.div`
  width: 15rem;
  height: 130%;
  border-right: 1px solid rgb(234, 236, 239);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    margin-top: 15px;
    width: 150px;
    height: 35px;
    cursor: pointer;
    color: white;
    font-size: large;
    font-weight: bold;
    background-color: #3d8dab;
    border-radius: 9px;
    outline: none;
    border: none;
    font-family: "Cafe24SsurroundAir";
    :hover {
      transform: scale(1.1);
    }
  }
  img {
    border: 1px solid red;
    width: 8rem;
    height: 8rem;
    border: 1px solid #ccdee2;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ProfileRight = styled.div`
  margin-top: 30px;
  width: 70%;
  height: 100%;
  div {
    margin: 1rem 0 0 1.5rem;
    font-size: x-large;
  }
  div:nth-child(1) {
    font-size: xx-large;
    font-family: "Cafe24Ssurround";
    display: inline-block;
  }
`;

const UsernameWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid rgb(234, 236, 239);
  align-items: center;
  input {
    width: 15rem;
    height: 36px;
    font-size: large;
    font-weight: 600;
    border: 1px solid rgb(234, 236, 239);
    border-radius: 12px;
    margin-left: 1rem;
    padding-left: 1rem;
  }
`;

const PassowrdWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid rgb(234, 236, 239);
`;

const PasswordMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  margin-top: 1rem;
  /* border: 1px solid pink;  */
  font-size: large;
  font-weight: 600;
  div {
    width: 100%;
    height: 50px;
  }
  input {
    width: 50%;
    height: 36px;
    border: 1px solid rgb(234, 236, 239);
    border-radius: 12px;
    padding-left: 1rem;
  }
  span {
    margin-left: 1rem;
    display: inline-block;
    width: 150px;
  }
`;

const Withdrawal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WithdrawalMain = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  button {
    margin-left: 10px;
    width: 130px;
    height: 35px;
    cursor: pointer;
    color: white;
    font-size: x-large;
    font-weight: bold;
    background-color: rgb(237, 116, 112);
    border-radius: 9px;
    outline: none;
    border: none;
    font-family: "Cafe24SsurroundAir";
    opacity: 0.3;
    :hover {
      opacity: 1;
    }
  }
`;

const Bottom = styled.div`
  margin-top: 1.3rem;
  padding: 0.5rem 0 1rem 4.3rem;
  width: 100%;
  height: 50px;
  font-size: large;
  color: gray;
  opacity: 0.6;
  border-bottom: 1px solid rgb(234, 236, 239);
`;

const LeftDiv = styled.div`
  width: 15rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  font-weight: 700;
`;

const EditFooter = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  button {
    margin-top: 2rem;
    margin-left: 20px;
    width: 120px;
    height: 45px;
    cursor: pointer;
    color: white;
    font-size: x-large;
    font-weight: bold;
    background-color: #3d8dab;
    border-radius: 9px;
    outline: none;
    border: none;
    font-family: "Cafe24SsurroundAir";
    :hover {
      transform: scale(1.1);
    }
  }
`;

const DiarySection = styled.section`
  position: relative;
  top: 3%;
  left: 4.2%;
  width: 66%;
  height: 80%;
`;
