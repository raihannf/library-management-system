import React, { Component } from "react";
import IPLLogo from "../IPL Logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-dark bg-light">
            <div className="px-3">
              <a href="/inventories" className="navbar-brand">
                <img src={IPLLogo} alt="IPL Logo" style={{ width: "250px" }} />
              </a>
            </div>
          </nav>
        </header>
        <div className="d-flex flex-row h-1">
          <div
            className="flex-fill"
            style={{ backgroundColor: "#F99D22" }}
          ></div>
          <div
            className="flex-fill"
            style={{ backgroundColor: "#28B88A" }}
          ></div>
          <div
            className="flex-fill"
            style={{ backgroundColor: "#0C4B86" }}
          ></div>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
