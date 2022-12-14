import { Stack, Box, Button } from "@mui/material";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Typotext } from "../styles/Typotext";
import Order from "./Order";
import OrderList from "./OrderList";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <ContentContainer>
          <TitleWrapper>
            <Typotext size={"65px"} style={{ fontWeight: "bold" }}>
              팝업스토어 주문시스템
            </Typotext>
          </TitleWrapper>
          <ButtonWrapper>
            <Stack direction={"row"} spacing="30px">
              <Button
                variant="contained"
                size="large"
                style={{ width: "400px", height: "100px", fontSize: "40px" }}
                href="/order"
              >
                주문하기
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ width: "400px", height: "100px", fontSize: "40px" }}
                href="/orderlist"
              >
                주문목록
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="large"
                style={{ width: "400px", height: "100px", fontSize: "40px" }}
                href="/menus"
              >
                메뉴관리
              </Button>
            </Stack>
          </ButtonWrapper>
        </ContentContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
