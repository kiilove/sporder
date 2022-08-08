import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/orderList">
            <OrderList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
