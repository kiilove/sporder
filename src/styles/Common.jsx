import { grey } from "@mui/material/colors";
import styled from "styled-components";

export const Canvas = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 4px -4px ${grey[400]};
`;

export const CanvasCustom = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-bottom: 0px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px -2px ${grey[400]};
`;

export const ComponentHeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin-bottom: 10px;
`;

export const ComponentHeaderTitle = styled.span`
  flex: 1;
  height: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-size: 19px;
  font-weight: 700;
  border-left: 5px solid ${(props) => props.color};
`;

export const ComponentBodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 3px;
  border: 0.5px solid ${grey[300]};
`;

export const CloseWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  align-items: center;
  justify-content: flex-end;
  padding-top: 15px;
`;

export const CloseButton = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
    color: ${grey[800]};
  }
`;
