import {
  blueGrey,
  deepOrange,
  green,
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
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: ${green[500]};
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
  margin-left: 50px;
  margin-right: 50px;
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
            <HomeIcon style={{ fontSize: "40px", color: "white" }} href="/" />
          </Link>
        </IconBox>
        <IconBox>
          <Link
            to="/orderlist"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuBookIcon style={{ fontSize: "40px", color: "white" }} />
          </Link>
        </IconBox>
        <IconBox>
          <Link
            to="/order"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ReceiptLongIcon style={{ fontSize: "40px", color: "white" }} />
          </Link>
        </IconBox>
        <IconBox>
          <Link
            to="/report"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <AssessmentIcon style={{ fontSize: "40px", color: "white" }} />
          </Link>
        </IconBox>
        <IconBox>
          <Link
            to="/menus"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListOutlinedIcon style={{ fontSize: "40px", color: "white" }} />
          </Link>
        </IconBox>
      </Wrapper>
    </Container>
  );
};

export default Header;
