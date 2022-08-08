import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { dialogClasses } from "@mui/material";
import { async } from "@firebase/util";

const Container = styled.div`
  display: flex;
  width: "100%";
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: "100%";
`;

const ListRow = styled.div`
  display: flex;
`;

const ListItem = styled.div`
  display: flex;
`;

const OrderList = () => {
  const [initFetchData, setInitFetchData] = useState({});
  const [fetchedData, setFetchedData] = useState([]);
  const [resData, setResData] = useState([]);

  const getData = async () => {
    try {
      const res = await getDocs(collection(db, "popupOrders"));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    //console.log(resData);
  }, []);

  return (
    <Container>
      <Wrapper>
        <ListContainer></ListContainer>
      </Wrapper>
    </Container>
  );
};

export default OrderList;
