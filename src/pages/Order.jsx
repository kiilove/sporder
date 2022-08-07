import { faSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Stack, TextField } from "@mui/material";
import { blueGrey, grey, pink } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { menuItems } from "../data";
import { Textbox } from "../styles/Forms";
import { Typotext } from "../styles/Typotext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  align-items: flex-start;
  align-content: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 100% auto;
  justify-content: center;
  align-content: flex-start;
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
  margin-right: 100px;
`;

const OrderItemRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${blueGrey[900]};
`;

const OrderItemBox = styled.div`
  display: flex;
  height: 45px;
`;

const ArrowBox = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
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
  const [getMoney, setGetMoney] = useState(0);
  const [sumPrice, setSumPrice] = useState({});
  const [sumOrder, setSumOrder] = useState([]);

  const handleOrderAddList = (props) => {
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

  const handleOrderRemoveList = (props) => {
    //console.log(props.orderCode);
    const prevOrderList = [...orderList];
    const prevSumOrder = [...sumOrder];
    const targetArray = orderList.filter(
      (fItem) => fItem.orderCode === props.orderCode
    );

    if (targetArray.length <= 0) {
      const targetSumIndex = prevSumOrder.findIndex(
        (fItem) => fItem.sumCode === props.sumCode
      );
      prevSumOrder.splice(targetSumIndex, 1);
      setSumOrder(prevSumOrder);
    } else {
      const targetOrderNum = targetArray[targetArray.length - 1].orderNum;
      const targetOrderIndex = prevOrderList.findIndex(
        (fItem) => fItem.orderNum == targetOrderNum
      );
      prevOrderList.splice(targetOrderIndex, 1);
    }

    setOrderList(prevOrderList);
  };

  const handleSumPrice = () => {
    const sumPrice = orderList
      .map((item) => item.orderPrice)
      .reduce((sum, price) => parseInt(sum) + parseInt(price), 0);
    setSumPrice(sumPrice);
  };
  const handleSumOrder = (props) => {
    if (orderList.length <= 0) {
      console.log("주문목록 없음");
      setSumOrder([]);
    } else {
      if (orderList.length == 1) {
        setSumOrder([
          {
            sumCode: orderList[0].orderCode,
            sumTitle: orderList[0].orderTitle,
            sumPrice: orderList[0].orderPrice,
            sumCount: 1,
          },
        ]);
      } else {
        if (
          sumOrder.some(
            (sItem) =>
              sItem.sumCode === orderList[orderList.length - 1].orderCode
          )
        ) {
          const refreshSumOrder = () =>
            sumOrder.map((item, idx) => {
              const tempCount = orderList.filter(
                (fItem) => fItem.orderCode === item.sumCode
              ).length;
              return {
                sumCode: item.sumCode,
                sumTitle: item.sumTitle,
                sumPrice: item.sumPrice,
                sumCount: tempCount,
              };
            });
          setSumOrder(refreshSumOrder());
        } else {
          setSumOrder([
            ...sumOrder,
            {
              sumCode: orderList[orderList.length - 1].orderCode,
              sumTitle: orderList[orderList.length - 1].orderTitle,
              sumPrice: orderList[orderList.length - 1].orderPrice,
              sumCount: 1,
            },
          ]);
        }
      }
    }
  };

  useEffect(() => {
    handleSumOrder();
    handleSumPrice();
    console.log(orderList);
  }, [orderList]);

  return (
    <Container>
      <Wrapper>
        <MenuContainer>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            width={"100%"}
          >
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
                            handleOrderAddList({
                              orderCode: item.code,
                              orderTitle: item.title,
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
              <SummaryItemRow
                style={{ justifyContent: "flex-end", marginRight: "50px" }}
              >
                <Typotext size={"30px"} style={{ marginRight: "10px" }}>
                  합계금액 :{" "}
                </Typotext>
                <Typotext size={"30px"} style={{ fontWeight: "bold" }}>
                  {Number(JSON.stringify(sumPrice)).toLocaleString()}
                </Typotext>
              </SummaryItemRow>

              {sumOrder.map((item, idx) => (
                <OrderItemRow>
                  <OrderItemBox
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      width: "80px",
                    }}
                  >
                    <Typotext size={"20px"}>{idx + 1}</Typotext>
                  </OrderItemBox>
                  <OrderItemBox
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      alignContent: "center",
                      width: "200px",
                    }}
                  >
                    <Typotext
                      size={"20px"}
                      style={{ marginRight: "30px", fontWeight: "bold" }}
                    >
                      {item.sumTitle}
                    </Typotext>
                  </OrderItemBox>
                  <OrderItemBox
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      width: "100px",
                    }}
                  >
                    <Textbox
                      inputWidth="80px"
                      value={item.sumCount}
                      type="text"
                      readOnly
                    />
                  </OrderItemBox>
                  <OrderItemBox style={{ flexDirection: "column" }}>
                    <ArrowBox
                      onClick={() =>
                        handleOrderAddList({
                          orderCode: item.sumCode,
                          orderTitle: item.sumTitle,
                          orderPrice: item.sumPrice,
                        })
                      }
                    >
                      <ExpandLessIcon />
                    </ArrowBox>
                    <ArrowBox
                      onClick={() => {
                        handleOrderRemoveList({ orderCode: item.sumCode });
                      }}
                    >
                      <ExpandMoreIcon />
                    </ArrowBox>
                  </OrderItemBox>
                </OrderItemRow>
              ))}
            </Stack>
            <Stack
              spacing={2}
              width={"100%"}
              style={{ justifyContent: "flex-start", marginTop: "20px" }}
            >
              <OrderItemRow
                style={{
                  border: "none",
                  height: "85px",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    height: "55px",
                    width: "300px",
                    fontSize: "20px",
                  }}
                >
                  현금결제
                </Button>
                <OrderItemBox
                  style={{
                    border: "none",
                    height: "85px",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <TextField
                    label="받은돈"
                    type={"Number"}
                    style={{ marginLeft: "10px" }}
                    value={getMoney}
                    onChange={(e) => setGetMoney(e.target.value)}
                  ></TextField>
                </OrderItemBox>
                <OrderItemBox
                  style={{
                    border: "none",
                    height: "85px",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Typotext size="20px" style={{ marginLeft: "20px" }}>
                    거스름돈 :{" "}
                  </Typotext>
                  <Typotext size="20px" style={{ marginLeft: "20px" }}>
                    {Number(getMoney - sumPrice).toLocaleString()}
                  </Typotext>
                </OrderItemBox>
              </OrderItemRow>
              <OrderItemRow style={{ border: "none", height: "80px" }}>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  style={{ width: "300px", fontSize: "20px" }}
                >
                  계좌이체
                </Button>
                <OrderItemBox
                  style={{
                    border: "none",
                    height: "85px",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Typotext size="20px" style={{ marginLeft: "20px" }}>
                    국민은행 : 000-000-0000-0000
                  </Typotext>
                </OrderItemBox>
              </OrderItemRow>
              <OrderItemRow style={{ border: "none", height: "80px" }}>
                <Button
                  size="large"
                  variant="contained"
                  color="warning"
                  style={{ width: "300px", fontSize: "20px" }}
                >
                  카카오페이
                </Button>
              </OrderItemRow>
            </Stack>
          </OrderContentWrapper>
        </OrderContainer>
      </Wrapper>
    </Container>
  );
};

export default Order;
