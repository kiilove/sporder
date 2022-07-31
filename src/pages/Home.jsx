import { Stack, Box, Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Typotext } from "../styles/Typotext";

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
              소풍 주문시스템
            </Typotext>
          </TitleWrapper>
          <ButtonWrapper>
            <Stack direction={"row"} spacing="30px">
              <Button
                variant="contained"
                size="large"
                style={{ width: "400px", height: "100px", fontSize: "40px" }}
              >
                주문하기
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ width: "400px", height: "100px", fontSize: "40px" }}
              >
                주문목록
              </Button>
            </Stack>
          </ButtonWrapper>
        </ContentContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
