import { faSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Stack } from "@mui/material";
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
  margin-left: 100px;
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
  const [sumCost, setsumCost] = useState({});
  const [sumOrder, setSumOrder] = useState([]);

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

  const handlesumCost = () => {
    const sumCost = orderList
      .map((item) => item.orderPrice)
      .reduce((sum, price) => parseInt(sum) + parseInt(price), 0);
    setsumCost(sumCost);
  };
  const handleSumOrder = (props) => {
    if (orderList.length <= 0) {
      console.log("???????????? ??????");
      setSumOrder([]);
    } else {
      console.log("??????????????? ?????? ?????? ??????");
      if (sumOrder.length <= 0) {
        console.log("?????? ?????? ??????");
        //????????? ?????? ?????? ??????
        setSumOrder([
          {
            sumCode: orderList[0].orderCode,
            sumTitle: orderList[0].orderTitle,
            sumCount: 1,
          },
        ]);
        //console.log(sumOrder);
      } else {
        console.log("????????? ???????????? ??????");
        //????????? ?????? ?????? ?????? ???????????? ?????? ???????????? ?????? ??????

        if (
          //????????? ????????? ????????? ?????? ??????
          sumOrder.filter(
            (filter) =>
              filter.sumCode === orderList[orderList.length - 1].orderCode
          ) <= 0
        ) {
          // ?????? ?????? ???????????? ????????? ?????? 1??? ?????? ??????
          setSumOrder([
            ...sumOrder,
            {
              sumCode: orderList[orderList.length - 1].orderCode,
              sumTitle: orderList[orderList.length - 1].orderTitle,
              sumCount: 1,
            },
          ]);
        } else {
          //???????????? ?????? ????????? ????????? ????????? ????????????

          //?????? ?????? ?????? ?????? setState?????? ????????? ???????????? ????????? ?????? ????????? ????????????
          const prevSumOrder = [...sumOrder];

          //sumOrder ????????? ??????????????? ?????????
          const refreshSumOrder = () => {
            const targetIndex = prevSumOrder.findIndex(
              (fIdx) =>
                fIdx.sumCode === orderList[orderList.length - 1].orderCode
            );
            prevSumOrder[targetIndex].sumCount++;

            return prevSumOrder;
          };

          setSumOrder(refreshSumOrder());
        }
      }
    }
  };
  useEffect(() => {
    handleSumOrder();
    handlesumCost();
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
                  ????????????
                </Typotext>
                <Typotext size={"20px"}>2022-08-16</Typotext>
              </OrderItemRow>
              <SummaryItemRow>
                <Typotext size={"20px"}>????????????: </Typotext>
                <Typotext size={"20px"}>
                  {Number(JSON.stringify(sumCost)).toLocaleString()}
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
                    <Typotext size={"20px"} style={{ marginRight: "30px" }}>
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
                    />
                  </OrderItemBox>
                  <OrderItemBox style={{ flexDirection: "column" }}>
                    <ArrowBox>{<ExpandLessIcon />}</ArrowBox>
                    <ArrowBox>{<ExpandMoreIcon />}</ArrowBox>
                  </OrderItemBox>
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
