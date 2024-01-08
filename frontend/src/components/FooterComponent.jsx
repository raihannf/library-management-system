import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import IPLLogoVertical from "../IPL Logo Vertical.svg";

class FooterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div className="d-flex h-1">
          <div
            className="flex-fill"
            style={{ backgroundColor: "#28B88A" }}
          ></div>
        </div>
        <section
          style={{ backgroundColor: "#0C4B86" }}
          className="d-flex flex-column flex-md-row justify-content-between px-11 py-5 py-xl-6 py-xxl-8"
        >
          <div>
            <a href="/inventories" className="navbar-brand">
              <img
                src={IPLLogoVertical}
                alt="IPL Logo"
                style={{ width: "150px" }}
              />
            </a>
          </div>
          <div className="d-flex flex-column justify-content-between align-items-md-start">
            <div className="d-flex flex-column align-items-md-start mt-8 mt-md-0">
              <p className="font-bold mb-2">Mari membaca di Isola Publib!</p>
              <p className="">
                {" "}
                Isola Publib, Kec. Sukasari, Kota Bandung, Jawa Barat
              </p>
            </div>
            <div className="mt-4 mt-md-0">
              <p>&copy; 2024. Made by Raihan for Promnet.</p>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default FooterComponent;
