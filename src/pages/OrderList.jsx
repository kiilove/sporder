import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { TextField } from "@mui/material";
import { Typotext } from "../styles/Typotext";
import { blueGrey, grey } from "@mui/material/colors";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../components/Header";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
`;

const ListRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListTh = styled.span`
  display: flex;
  justify-content: center;
  font-family: "Noto Sans KR";
  text-align: center;
  color: ${blueGrey[900]};
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid ${grey[300]};
`;

const ListTd = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: "Noto Sans KR";
  text-align: center;
  color: ${blueGrey[700]};
  font-size: 14px;
`;

const ListTs = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: "Noto Sans KR";
  color: ${blueGrey[700]};
  font-size: 13px;
`;

const OrderList = () => {
  const [initFetchData, setInitFetchData] = useState({});
  const [resSumPrice, setResSumPrice] = useState(0);
  const [resData, setResData] = useState([]);
  const [dueDate, setDueDate] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });
  const [orders, setOrders] = useState({});

  const today = moment().format("YYYY-MM-DD");
  const groupBy = (input, key) => {
    return input.reduce((acc, currentValue) => {
      let groupKey = currentValue[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(currentValue);
      return acc;
    }, {});
  };

  const fetchData = async (props) => {
    let list = [];
    let ordersArr = [];
    try {
      const q = query(
        collection(db, "popupOrders"),
        where("orderDate", ">=", dueDate.startDate),
        where("orderDate", "<=", dueDate.endDate),
        orderBy("orderDate"),
        orderBy("orderTitleNumber")
      );
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setResData(list);

      const sumPrice = list.reduce((sum, item) => sum + item.orderSumPrice, 0);
      const sumOrders = list.map((item, idx) => {
        ordersArr.push(item.orderSpecs);
      });
      setResSumPrice(sumPrice);
      setOrders(ordersArr);

      console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [dueDate]);

  return (
    <Container>
      <Wrapper>
        <Header />
        <ListContainer>
          <ListRow style={{ marginTop: "30px" }}>
            <Typotext size="25px" style={{ fontWeight: "bolder" }}>
              주문목록
            </Typotext>
          </ListRow>
          <ListRow style={{ height: "150px" }}>
            <ListItem style={{ marginLeft: "20px", marginRight: "20px" }}>
              <TextField
                id="startDate"
                label="시작일자"
                type="date"
                defaultValue={today}
                value={dueDate.startDate}
                onChange={(e) => {
                  setDueDate({ ...dueDate, startDate: e.target.value });
                }}
                sx={{ width: 150 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </ListItem>
            <ListItem style={{ marginLeft: "20px", marginRight: "20px" }}>
              <TextField
                id="endDate"
                label="종료일자"
                type="date"
                defaultValue={today}
                value={dueDate.endDate}
                sx={{ width: 150 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </ListItem>
          </ListRow>
          <ListRow
            style={{
              height: "50px",
              width: "70%",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <ListTh style={{ width: "15%", height: "30px" }}></ListTh>
            <ListTh style={{ width: "15%", height: "30px" }}></ListTh>
            <ListTh style={{ width: "40%", height: "30px" }}></ListTh>
            <ListTh style={{ width: "15%", height: "30px" }}>합계</ListTh>
            <ListTh style={{ width: "15%", height: "30px" }}>
              {Number(resSumPrice).toLocaleString()}
            </ListTh>
          </ListRow>
          <ListRow
            style={{
              height: "50px",
              width: "70%",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <ListTh style={{ width: "15%" }}>일자</ListTh>
            <ListTh style={{ width: "15%" }}>번호</ListTh>
            <ListTh style={{ width: "40%" }}>내용</ListTh>
            <ListTh style={{ width: "15%" }}>금액</ListTh>
            <ListTh style={{ width: "15%" }}>결제방법</ListTh>
          </ListRow>
          {resData.map((item, idx) => (
            <ListRow
              style={{
                width: "70%",
                padding: "20px",
                boxSizing: "border-box",
              }}
            >
              <Accordion
                style={{
                  boxShadow: "none",
                  borderBottom: `1px solid ${grey[300]}`,
                  width: "100%",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <ListTd style={{ width: "15%" }}>{item.orderDate}</ListTd>
                  <ListTd style={{ width: "15%" }}>
                    {item.orderTitleNumber}
                  </ListTd>
                  <ListTd
                    style={{
                      width: "40%",
                      justifyContent: "flex-start",
                      marginLeft: "50px",
                    }}
                  >
                    {item.orderSpecs[0].sumTitle}
                  </ListTd>
                  <ListTd
                    style={{
                      width: "20%",
                      justifyContent: "flex-end",
                      marginRight: "100px",
                    }}
                  >
                    {Number(item.orderSumPrice).toLocaleString()}
                  </ListTd>
                  <ListTd style={{ width: "10%" }}>{item.payType}</ListTd>
                </AccordionSummary>
                <AccordionDetails>
                  {item.orderSpecs.map((sItem, sIdx) => (
                    <>
                      <ListRow
                        style={{
                          backgroundColor: grey[100],
                          height: "30px",
                          padding: "20px",
                          boxSizing: "border-box",
                        }}
                      >
                        <ListTs style={{ width: "15%" }}></ListTs>
                        <ListTs style={{ width: "15%" }}></ListTs>
                        <ListTs
                          style={{
                            width: "40%",
                            justifyContent: "flex-start",
                            marginLeft: "20px",
                          }}
                        >
                          {sIdx + 1}.
                          <div
                            style={{ marginLeft: "10px", marginRight: "5px" }}
                          >
                            {sItem.sumTitle}
                          </div>
                          ({sItem.sumCount})
                        </ListTs>
                        <ListTs style={{ width: "15%" }}></ListTs>
                        <ListTs style={{ width: "15%" }}></ListTs>
                      </ListRow>
                    </>
                  ))}
                  <ListRow>
                    <ListTs>
                      결제금액 : {Number(item.orderSumPrice).toLocaleString()}
                    </ListTs>
                    {item.payType === "cash" && (
                      <>
                        <ListTs>
                          받은돈 :{" "}
                          {Number(item.payInfo.getMoney).toLocaleString()}
                        </ListTs>
                        <ListTs>
                          거스름돈 :{" "}
                          {Number(item.payInfo.returnMoney).toLocaleString()}
                        </ListTs>
                      </>
                    )}
                  </ListRow>
                </AccordionDetails>
              </Accordion>
            </ListRow>
          ))}
        </ListContainer>
      </Wrapper>
    </Container>
  );
};

export default OrderList;
