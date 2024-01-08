import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListInventoryComponent from "./components/ListInventoryComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateInventoryComponent from "./components/CreateInventoryComponent";
import ViewInventoryComponent from "./components/ViewInventoryComponent";
import ScrollToTop from "./scrollToTop";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container-fluid">
          <ScrollToTop />
          <Switch>
            <Route path="/" exact component={ListInventoryComponent}></Route>
            <Route path="/inventory" component={ListInventoryComponent}></Route>
            <Route
              path="/add-inventory/:id"
              component={CreateInventoryComponent}
            ></Route>
            <Route
              path="/view-inventory/:id"
              component={ViewInventoryComponent}
            ></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
