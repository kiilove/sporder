import { Button, Stack } from "@mui/material";
import { grey, lightBlue, lightGreen, pink } from "@mui/material/colors";
import React from "react";
import styled from "styled-components";
import { Typotext } from "../styles/Typotext";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  &:hover {
    background-color: ${pink[200]};
    cursor: pointer;
  }

  border-radius: 5px;
  border: 1px solid ${grey[300]};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemRow = styled.div`
  display: flex;
  width: 100%;
`;

const MenuList = (props) => {
  return (
    <Container>
      <Wrapper>
        <Stack sx={{ width: "100%" }}>
          <Button
            sx={{
              width: "100%",
              height: "100px",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <ItemRow>
              <Typotext
                size="20px"
                color={grey[600]}
                style={{ marginRight: "5px", fontWeight: "bold" }}
              >
                {props.title}
              </Typotext>
              <Typotext
                size="20px"
                color={grey[600]}
                style={{ fontWeight: "bold" }}
              >
                {props.type}
              </Typotext>
            </ItemRow>

            <ItemRow>
              <Typotext
                size="15px"
                color={grey[600]}
                style={{ fontWeight: "bold" }}
              >
                {props.size}
              </Typotext>
            </ItemRow>
            <ItemRow>
              <Typotext
                size="23px"
                color={grey[600]}
                style={{ fontWeight: "bolder" }}
              >
                {Number(props.price).toLocaleString()}
              </Typotext>
            </ItemRow>
          </Button>
        </Stack>
      </Wrapper>
    </Container>
  );
};

export default MenuList;
