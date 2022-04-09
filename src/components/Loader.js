import { memo } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrap>
      <ReactLoading type="spokes" color="#487eb0" width={130} />
    </LoaderWrap>
  );
};
export default memo(Loader);

const LoaderWrap = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
  z-index: 999;
`;
