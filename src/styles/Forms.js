import { lightBlue, grey, lightGreen } from "@mui/material/colors";
import styled from "styled-components";
export const Textbox = styled.input`
  padding: 0;
  margin: 0;
  font-size: ${(props) => props.inputSize || "20px"};
  height: ${(props) => props.inputHeight || "30px"};
  width: ${(props) => props.inputWidth || "50px"};
  color: ${(props) => props.inputColor || grey[800]};
  border: 1px solid ${grey[700]};
  border-radius: 3px;
  text-align: center;
`;
