import { blueGrey, grey, cyan, yellow, lightBlue } from "@mui/material/colors";

import styled from "styled-components";

export const Typotext = styled.span`
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : "Noto Sans KR"};
  font-size: ${(props) => (props.size ? props.size : "14px")};
  margin-bottom: ${(props) => props.gutterBottom && "10px"};
  color: ${(props) => (props.color ? props.color : blueGrey[800])};
`;

export const GridentText = styled.span`
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : "Noto Sans KR"};
  font-size: ${(props) => (props.size ? props.size : "14px")};
  margin-bottom: ${(props) => props.gutterBottom && "10px"};
  color: ${(props) => (props.color ? props.color : blueGrey[800])};
  background: #ff70fa;
  background: -webkit-linear-gradient(to right, #ff70fa 0%, #8402b3 100%);
  background: -moz-linear-gradient(to right, #ff70fa 0%, #8402b3 100%);
  background: linear-gradient(to right, #ff70fa 0%, #8402b3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const GridentText2 = styled.span`
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : "Noto Sans KR"};
  font-size: ${(props) => (props.size ? props.size : "14px")};
  margin-bottom: ${(props) => props.gutterBottom && "10px"};
  color: ${(props) => (props.color ? props.color : blueGrey[800])};
  background: #feffe6;
  background: -webkit-linear-gradient(
    to right,
    #feffe6 0%,
    #5991ff 50%,
    #badff7 100%
  );
  background: -moz-linear-gradient(
    to right,
    #feffe6 0%,
    #5991ff 50%,
    #badff7 100%
  );
  background: linear-gradient(to right, #feffe6 0%, #5991ff 50%, #badff7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
