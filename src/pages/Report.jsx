import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Report = () => {
  return (
    <Container>
      <Wrapper>
        <Header />
        <ReportContainer>
          <h1>
            <strong>리포트</strong>
          </h1>
        </ReportContainer>
      </Wrapper>
    </Container>
  );
};

export default Report;
