import {
  blueGrey,
  deepOrange,
  grey,
  lightBlue,
  orange,
  teal,
} from "@mui/material/colors";
import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: ${teal[500]};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  color: ${grey[800]};
  margin-left: 30px;
  margin-right: 30px;
  &:hover {
    cursor: pointer;
    color: ${grey[900]};
  }
`;
const Header = () => {
  return (
    <Container>
      <Wrapper>
        <IconBox>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <HomeIcon style={{ fontSize: "30px" }} href="/" />
          </Link>
        </IconBox>
        <IconBox>
          <Link
            to="/orderlist"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuBookIcon style={{ fontSize: "30px" }} />
          </Link>
        </IconBox>
        <IconBox>
          <Link
            to="/order"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ReceiptLongIcon style={{ fontSize: "30px" }} />
          </Link>
        </IconBox>
      </Wrapper>
    </Container>
  );
};

export default Header;
