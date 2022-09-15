import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

const App = () => {
  return <div className="App">{<Home />}</div>;
};

export default App;
