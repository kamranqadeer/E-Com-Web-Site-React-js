import React, { Component } from "react";
import Logo from "./assets/Logo.png";
import "./assets/App.css";

import { MDBContainer, MDBAnimation } from "mdbreact";
class User3D extends Component {
  state = {};
  render() {
    return (
      <MDBContainer>
          <img
            src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
            alt=""
            className="img-fluid"
          />
      </MDBContainer>
    );
  }
}

export default User3D;
