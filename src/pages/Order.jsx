import { faSlash } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Collapse, Stack, TextField } from "@mui/material";
import { blueGrey, grey, pink } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { menuItems } from "../data";
import { Textbox } from "../styles/Forms";
import { Typotext } from "../styles/Typotext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import Header from "../components/Header";
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
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
`;
const ContentWrapper = styled.div`
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

const OrderItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: "100%";
  max-height: "500px";
`;

const OrderItemRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  width: 100%;
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
  const [payType, setPayType] = useState("cash");
  const [payInfo, setPayInfo] = useState({});
  const [sumPrice, setSumPrice] = useState({});
  const [sumOrder, setSumOrder] = useState([]);
  const [expaned, setExpaned] = useState(true);
  const [makeSaveData, setMakeSaveData] = useState({});
  const [orderDate, setOrderDate] = useState(moment().format("YYYY-MM-DD"));
  const [orderTitleNumber, setOrderTitleNumber] = useState(0);

  const handleExpandClick = () => {
    setExpaned(!expaned);
  };

  const clearOrder = () => {
    setOrderList([]);
    setSumPrice(0);
    setSumOrder([]);
    setGetMoney(0);
    setPayType("cash");
    setPayInfo({});
  };

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

  //DB저장
  const handleSaveOrder = async (props) => {
    const res = await addDoc(collection(db, "popupOrders"), {
      orderTitleNumber: orderTitleNumber,
      orderDate: orderDate,
      orderSumPrice: sumPrice,
      orderSpecs: sumOrder,
      payType: payType,
      payInfo: payInfo,
    });

    console.log(res);
    clearOrder();
    fetchCount();
  };

  const fetchCount = async () => {
    const dateByCount = collection(db, "popupOrders");
    const q = query(dateByCount, where("orderDate", "==", orderDate));
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.data());
    //   console.log(doc.id);
    // });

    // console.log(querySnapshot.size);
    setOrderTitleNumber(querySnapshot.size + 1);
  };

  const handlesumPrice = () => {
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
            sumCost: orderList[0].orderPrice,
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
                sumCost: item.sumCost,
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
              sumCost: orderList[orderList.length - 1].orderPrice,
              sumCount: 1,
            },
          ]);
        }
      }
    }
  };

  useEffect(() => {
    handleSumOrder();
    handlesumPrice();
    console.log(typeof sumOrder);
  }, [orderList]);

  useEffect(() => {
    const prevSaveDate = { ...makeSaveData };
  }, [orderList]);

  useEffect(() => {
    console.log(orderDate);
    fetchCount();
  }, []);

  useEffect(() => {
    payType === "cash" &&
      setPayInfo({
        getMoney: getMoney,
        returnMoney: Number(getMoney) - Number(sumPrice),
      });
  }, [getMoney]);

  useEffect(() => {
    payType === "cash" && setExpaned(true);
  }, [payType]);

  return (
    <Container>
      <Wrapper>
        <Header />
        <ContentWrapper style={{ marginTop: "10px" }}>
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
                                style={{
                                  marginRight: "5px",
                                  fontWeight: "bold",
                                }}
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
                    주문번호
                  </Typotext>
                  <Typotext size={"20px"}>{orderTitleNumber}</Typotext>
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
                </OrderItemRow>

                <OrderItemContainer>
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
                              orderPrice: item.sumCost,
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
                </OrderItemContainer>
              </Stack>
              <Stack
                spacing={2}
                width={"100%"}
                style={{ justifyContent: "flex-start", marginTop: "20px" }}
              >
                <OrderItemRow
                  style={{
                    border: "none",
                    height: "55px",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    color="error"
                    style={{
                      height: "55px",
                      fontSize: "20px",
                    }}
                    onClick={() => {
                      clearOrder();
                    }}
                  >
                    주문초기화
                  </Button>
                </OrderItemRow>
                <OrderItemRow
                  style={{
                    border: "none",
                    height: "100%",
                    alignItems: "flex-start",
                    alignContent: "center",
                    width: "100%",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <OrderItemBox style={{ height: "100%", flex: 1 }}>
                    <FormControl disabled={sumPrice <= 0}>
                      <FormLabel id="paymentChoice">결제방식 선택</FormLabel>
                      <RadioGroup
                        aria-labelledby="paymentChoice"
                        defaultValue={payType}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          e.target.value === "cash"
                            ? setExpaned(true)
                            : setExpaned(false);
                          setPayType(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value="cash"
                          control={<Radio />}
                          checked={payType === "cash"}
                          label="현금결제"
                        />
                        <FormControlLabel
                          value="kakaoPay"
                          control={<Radio />}
                          checked={payType === "kakaoPay"}
                          label="카카오페이"
                        />
                        <FormControlLabel
                          value="banking"
                          control={<Radio />}
                          checked={payType === "banking"}
                          label="계좌이체"
                        />
                        <FormControlLabel
                          value="coupon"
                          control={<Radio />}
                          checked={payType === "coupon"}
                          label="쿠폰"
                        />
                        <FormControlLabel
                          value="promotion"
                          control={<Radio />}
                          checked={payType === "promotion"}
                          label="사은품으로 증정"
                        />
                      </RadioGroup>
                    </FormControl>
                  </OrderItemBox>
                  <OrderItemBox
                    style={{
                      height: "100%",
                      flex: 2,
                      boxSizing: "border-box",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        height: "100%",
                        marginTop: "40px",
                      }}
                    >
                      <Typotext
                        size="18px"
                        style={{
                          fontWeight: "bold",
                          width: "130px",
                          textAlign: "right",
                        }}
                      >
                        결제금액 :
                      </Typotext>
                      <Typotext
                        size="18px"
                        style={{ fontWeight: "bold", marginLeft: "30px" }}
                        disabled={sumPrice <= 0}
                      >
                        {Number(sumPrice).toLocaleString()}
                      </Typotext>
                    </Box>
                    <Collapse in={expaned} timeout="auto" unmountOnExit>
                      <div>
                        <Box
                          style={{
                            display: "flex",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: "100%",
                            marginTop: "20px",
                          }}
                        >
                          <Typotext
                            size="18px"
                            style={{
                              fontWeight: "bold",
                              width: "130px",
                              textAlign: "right",
                            }}
                          >
                            받은돈 :
                          </Typotext>

                          <TextField
                            size="small"
                            disabled={orderList.length <= 0}
                            style={{
                              fontWeight: "bold",
                              width: "100px",
                              marginLeft: "10px",
                            }}
                            sx={{ textAlign: "right" }}
                            value={Number(getMoney)}
                            onChange={(e) => {
                              setGetMoney(e.target.value);
                            }}
                          ></TextField>
                        </Box>
                        {orderList.length > 0 && (
                          <Box sx={{ marginTop: "10px" }}>
                            <Typotext
                              onClick={() => setGetMoney(Number(sumPrice))}
                              size="16px"
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            >
                              정액
                            </Typotext>
                            <Typotext
                              onClick={() =>
                                setGetMoney(Number(getMoney) + 50000)
                              }
                              size="16px"
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            >
                              +5만
                            </Typotext>
                            <Typotext
                              onClick={() =>
                                setGetMoney(Number(getMoney) + 10000)
                              }
                              size="16px"
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            >
                              +1만
                            </Typotext>
                            <Typotext
                              onClick={() =>
                                setGetMoney(Number(getMoney) + 5000)
                              }
                              size="16px"
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            >
                              +5천
                            </Typotext>
                            <Typotext
                              onClick={() =>
                                setGetMoney(Number(getMoney) + 1000)
                              }
                              size="16px"
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            >
                              +1천
                            </Typotext>
                            <Typotext
                              onClick={() =>
                                setGetMoney(Number(getMoney) + 500)
                              }
                              size="16px"
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            >
                              +5백
                            </Typotext>
                            <Typotext
                              onClick={() =>
                                setGetMoney(Number(getMoney) + 100)
                              }
                              size="16px"
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            >
                              +1백
                            </Typotext>
                            <Typotext
                              onClick={() => setGetMoney(0)}
                              size="16px"
                              style={{
                                cursor: "pointe0",
                              }}
                            >
                              0원
                            </Typotext>
                          </Box>
                        )}

                        <Box
                          style={{
                            display: "flex",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: "100%",
                            marginTop: "20px",
                          }}
                        >
                          <Typotext
                            size="18px"
                            style={{
                              fontWeight: "bold",
                              width: "130px",
                              textAlign: "right",
                            }}
                          >
                            거스름돈 :
                          </Typotext>
                          <Typotext
                            size="18px"
                            style={{ fontWeight: "bold", marginLeft: "30px" }}
                          >
                            {Number(getMoney - sumPrice).toLocaleString()}
                          </Typotext>
                        </Box>
                      </div>
                    </Collapse>
                  </OrderItemBox>
                </OrderItemRow>
                <OrderItemRow
                  style={{
                    border: "none",
                    height: "55px",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                  }}
                >
                  {payType === "cash" ? (
                    <Button
                      size="large"
                      variant="contained"
                      fullWidth
                      style={{
                        height: "55px",
                        fontSize: "20px",
                      }}
                      disabled={
                        sumPrice <= 0 || Number(sumPrice) - Number(getMoney) > 0
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleSaveOrder({
                          sumOrder: sumOrder,
                          orderList: orderList,
                        });
                      }}
                    >
                      주문완료
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      variant="contained"
                      fullWidth
                      style={{
                        height: "55px",
                        fontSize: "20px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSaveOrder({
                          sumOrder: sumOrder,
                          orderList: orderList,
                        });
                      }}
                    >
                      주문완료
                    </Button>
                  )}
                </OrderItemRow>
              </Stack>
            </OrderContentWrapper>
          </OrderContainer>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default Order;
