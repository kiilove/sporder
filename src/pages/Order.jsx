import { Stack } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import React from "react";
import styled from "styled-components";
import MenuList from "../components/MenuList";
import { menuItems } from "../data";
import { Typotext } from "../styles/Typotext";

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100% auto;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  padding: 10px;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  justify-content: center;
  align-content: center;
  align-items: flex-start;
  padding: 10px;
`;

const OrderContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  padding: 10px;
  margin-left: 100px;
`;

const OrderItemRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid ${blueGrey[900]};
`;
const Order = () => {
  return (
    <Container>
      <Wrapper>
        <MenuContainer>
          <Stack style={{ width: "100%" }} spacing={3}>
            {menuItems.map((item, idx) => {
              return (
                <MenuList
                  title={item.title}
                  type={item.type}
                  size={item.size}
                  price={item.price}
                />
              );
            })}
          </Stack>
        </MenuContainer>
        <OrderContainer>
          <OrderContentWrapper>
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                alignContent: "flex-start",
              }}
              spacing={5}
            >
              <OrderItemRow>
                <Typotext size={"20px"} style={{ marginRight: "30px" }}>
                  주문일자
                </Typotext>
                <Typotext size={"20px"}>2022-08-16</Typotext>
              </OrderItemRow>
              <OrderItemRow>
                <Typotext size={"20px"} style={{ marginRight: "30px" }}>
                  주문번호
                </Typotext>
                <Typotext size={"20px"}>001</Typotext>
              </OrderItemRow>
            </Stack>
          </OrderContentWrapper>
        </OrderContainer>
      </Wrapper>
    </Container>
  );
};

export default Order;
