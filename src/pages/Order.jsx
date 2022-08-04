import { Button, Stack } from "@mui/material";
import { blueGrey, grey, pink } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
  width: 45%;
  height: 100% auto;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  padding: 10px;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  justify-content: center;
  align-content: center;
  align-items: flex-start;
  padding: 10px;
`;

const OrderContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
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
  height: 30px;
  border-bottom: 1px solid ${blueGrey[900]};
`;

const MenuListContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0px;
  &:hover {
    background-color: ${pink[200]};
    cursor: pointer;
  }

  border-radius: 5px;
  border: 1px solid ${grey[300]};
`;

const MenuListWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0px;
`;

const MenuListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MenuListItemRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const SummaryItemRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderCount, setOrderCount] = useState({});
  const [sumPrice, setSumPrice] = useState({});
  const [sumOrder, setSumOrder] = useState({});

  const handleOrderList = (props) => {
    const orderLength = orderList.length > 0 ? orderList.length + 1 : 1;
    setOrderList([
      ...orderList,
      {
        orderNum: orderLength,
        orderId: props.orderId,
        orderCode: props.orderCode,
        orderTitle: props.orderTitle,
        orderType: props.orderType,
        orderPrice: props.orderPrice,
      },
    ]);
  };

  useEffect(() => {
    const sumPrice = orderList
      .map((item) => item.orderPrice)
      .reduce((sum, price) => parseInt(sum) + parseInt(price), 0);
    setSumPrice(sumPrice);
    const sumCount = orderList
      .map((item) => item.orderTitle)
      .reduce((accu, curr) => {
        accu[curr] = (accu[curr] || 0) + 1;
        return accu;
      }, {});
    setSumOrder(sumCount);

    console.log(sumCount);
    console.log(sumPrice);
  }, [orderList]);

  // useEffect(() => {
  //   menuItems.map((item) => {
  //     setOrderCount((orderCount[item.code] = 0));
  //   });
  //   console.log(orderCount);
  // }, []);

  return (
    <Container>
      <Wrapper>
        <MenuContainer>
          <Stack style={{ width: "100%" }} spacing={3}>
            {menuItems.map((item, idx) => {
              return (
                <>
                  <MenuListContainer>
                    <MenuListWrapper>
                      <Stack sx={{ width: "100%" }}>
                        <Button
                          sx={{
                            width: "100%",
                            height: "100px",
                            justifyContent: "center",
                            alignContent: "center",
                            padding: "20px",
                          }}
                          onClick={() =>
                            handleOrderList({
                              orderId: item.id,
                              orderCode: item.code,
                              orderTitle: item.title,
                              orderType: item.type,
                              orderPrice: item.price,
                            })
                          }
                        >
                          <MenuListItemRow>
                            <Typotext
                              size="20px"
                              color={grey[600]}
                              style={{ marginRight: "5px", fontWeight: "bold" }}
                            >
                              {item.title}
                            </Typotext>
                          </MenuListItemRow>

                          <MenuListItemRow>
                            <Typotext
                              size="15px"
                              color={grey[600]}
                              style={{ fontWeight: "bold" }}
                            >
                              {item.size}
                            </Typotext>
                          </MenuListItemRow>
                          <MenuListItemRow>
                            <Typotext
                              size="23px"
                              color={grey[600]}
                              style={{ fontWeight: "bolder" }}
                            >
                              {Number(item.price).toLocaleString()}
                            </Typotext>
                          </MenuListItemRow>
                        </Button>
                      </Stack>
                    </MenuListWrapper>
                  </MenuListContainer>
                </>
              );
            })}
          </Stack>
        </MenuContainer>
        <OrderContainer>
          <OrderContentWrapper>
            <Stack
              sx={{
                width: "100%",
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
              <SummaryItemRow>
                <Typotext size={"20px"}>합계금액: </Typotext>
                <Typotext size={"20px"}>{JSON.stringify(sumPrice)}</Typotext>
              </SummaryItemRow>
              <SummaryItemRow>
                <Typotext size={"20px"}>주문요약: </Typotext>
                <Typotext size={"20px"}>{JSON.stringify(sumOrder)}</Typotext>
              </SummaryItemRow>
              {orderList.map((item, idx) => (
                <OrderItemRow>
                  <Typotext size={"20px"} style={{ marginRight: "30px" }}>
                    {item.orderNum}
                  </Typotext>
                  <Typotext size={"20px"} style={{ marginRight: "30px" }}>
                    {item.orderTitle}
                  </Typotext>
                </OrderItemRow>
              ))}
            </Stack>
          </OrderContentWrapper>
        </OrderContainer>
      </Wrapper>
    </Container>
  );
};

export default Order;
