import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menus from "./pages/Menus";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

// import your route components too
const isLogin = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={isLogin ? <Home /> : <Navigate replace to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/order" element={<Order />} />
      <Route path="/orderlist" element={<OrderList />} />
      <Route path="/menus" element={<Menus />} />
    </Routes>
  </BrowserRouter>
);
