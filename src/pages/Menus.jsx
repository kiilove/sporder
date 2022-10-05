import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { db } from "../firebase";

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
  width: 100%;
  height: 100% auto;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`;

const NewItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 10px;
  padding: 10px;
`;

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 10px;
  padding: 10px; ;
`;

const MenuItemRow = styled.div`
  display: flex;
  width: 60%;
  height: 150px;
  padding: 10px;
`;

const MenuItemCell = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  padding: 2px;
  justify-content: center;
`;

const Menus = () => {
  const [newItem, setNewItem] = useState({});

  const handleSaveNewItem = async () => {
    const res = await addDoc(collection(db, "menus"), { ...newItem });

    console.log(res);
  };

  const handleNewItem = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    console.log(newItem);
  };
  return (
    <Container>
      <Wrapper>
        <Header />
        <ContentWrapper style={{ marginTop: "10px" }}>
          <MenuContainer>
            <NewItemContainer>
              <TextField
                id="itemTitle"
                name="itemTitle"
                placeholder="품명"
                onChange={(e) => {
                  handleNewItem(e);
                }}
              />
              <FormControl
                sx={{ minWidth: 120 }}
                onChange={(e) => {
                  handleNewItem(e);
                }}
              >
                <InputLabel id="itemType">타입</InputLabel>
                <Select
                  labelId="itemType"
                  id="itemTypeSelect"
                  name="itemType"
                  onChange={(e) => {
                    handleNewItem(e);
                  }}
                >
                  <MenuItem value="핫">핫</MenuItem>
                  <MenuItem value="아이스">아이스</MenuItem>
                  <MenuItem value="단일">단일</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="itemSize">사이즈</InputLabel>
                <Select
                  labelId="itemSize"
                  id="itemSizeSelect"
                  name="itemSize"
                  onChange={(e) => {
                    handleNewItem(e);
                  }}
                >
                  <MenuItem value="보통">보통</MenuItem>
                  <MenuItem value="큼">큼</MenuItem>
                  <MenuItem value="더큼">더큼</MenuItem>
                  <MenuItem value="단일">단일</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="itemPrice"
                name="itemPrice"
                placeholder="가격"
                onChange={(e) => {
                  handleNewItem(e);
                }}
              />
              <Button
                size="large"
                variant="contained"
                disableElevation
                sx={{ height: "54px", width: "130px" }}
                onClick={() => handleSaveNewItem()}
              >
                추가
              </Button>
            </NewItemContainer>

            <Divider />
            <MenuItemContainer>
              <MenuItemRow>
                <MenuItemCell>품명</MenuItemCell>
                <MenuItemCell>타입</MenuItemCell>
                <MenuItemCell>사이즈</MenuItemCell>
                <MenuItemCell>가격</MenuItemCell>
                <MenuItemCell>기능</MenuItemCell>
              </MenuItemRow>
            </MenuItemContainer>
          </MenuContainer>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default Menus;
