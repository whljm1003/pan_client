import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all:unset;
    }
    * {
        box-sizing:border-box;   
    }
    body {
        font-size: 14px;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #f1f2f6;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
`;
