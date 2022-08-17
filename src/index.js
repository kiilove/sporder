import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

// import your route components too

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/orderlist" element={<OrderList />} />
    </Routes>
  </BrowserRouter>
);
