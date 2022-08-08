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
      console.log("주문목록 없음");
      setSumOrder([]);
    } else {
      console.log("주문목록이 있는 경우 진입");
      if (sumOrder.length <= 0) {
        console.log("최초 주문 추가");
        //새로운 주문 최초 추가
        setSumOrder([
          {
            sumCode: orderList[0].orderCode,
            sumTitle: orderList[0].orderTitle,
            sumCount: 1,
          },
        ]);
        //console.log(sumOrder);
      } else {
        console.log("두번째 주문부터 진입");
        //두번째 주문 부터 같은 항목인지 다른 항목인지 체크 시작

        if (
          //마지막 주문이 새로운 품목 주문
          sumOrder.filter(
            (filter) =>
              filter.sumCode === orderList[orderList.length - 1].orderCode
          ) <= 0
        ) {
          // 최초 품목 주문이기 때문에 수량 1로 할당 시킴
          setSumOrder([
            ...sumOrder,
            {
              sumCode: orderList[orderList.length - 1].orderCode,
              sumTitle: orderList[orderList.length - 1].orderTitle,
              sumCount: 1,
            },
          ]);
        } else {
          //기존에도 같은 품목이 있다면 숫자만 증가시킴

          //기존 배열 한번 복사 setState바로 적용시 불필요한 숫자가 뒤에 붙어서 분리시킴
          const prevSumOrder = [...sumOrder];

          //sumOrder 수량만 타겟화하여 수정함
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
                  주문일자
                </Typotext>
                <Typotext size={"20px"}>2022-08-16</Typotext>
              </OrderItemRow>
              <SummaryItemRow>
                <Typotext size={"20px"}>합계금액: </Typotext>
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
