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
  useEffect(() => {
    let resData = [];
    try {
      const fetchData = async () => {
        const query = await getDocs(collection(db, "popupOrders"));
        await Promise.all(
          query.forEach(async (doc) => {
            //console.log(doc.id);
            resData.push({ id: doc.id });
          })
        );
        return resData;
      };
      const tempData = fetchData();
      setFetchedData(tempData);
    } catch (error) {
      console.log(error);
    }

    console.log(fetchedData);
  }, []);

  return (
    <Container>
      <Wrapper>
        <ListContainer>
          {fetchedData.length > 0 &&
            fetchedData.map((item, idx) => (
              <div>
                <ListRow>{item.id}</ListRow>
              </div>
            ))}
        </ListContainer>
      </Wrapper>
    </Container>
  );
};

export default OrderList;
