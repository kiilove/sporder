import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderlist" element={<OrderList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
