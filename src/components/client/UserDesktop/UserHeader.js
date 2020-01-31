import React, { Component } from "react";
import "./assets/App.css";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBCol,
  MDBBtn,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBRow
} from "mdbreact";

class UserHome extends Component {
  state = {
    collapsed: false
  };
  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <MDBNavbar color="primary-color" dark expand="md" scrolling transparent>
        <MDBCol start>
          <MDBNavbarBrand>
            <MDBRow>
              <MDBCol>
                <img
                  src="./Logo.png"
                  className="img-fluid rounded-circle hoverable"
                  width="40ch"
                  height="30ch"
                />
              </MDBCol>
              <MDBCol>
                <strong className="white-text">Darzi at the door</strong>
              </MDBCol>
            </MDBRow>
          </MDBNavbarBrand>
        </MDBCol>
        <MDBCol md="auto">
          <MDBBtnGroup>
            <MDBBtn transparent>Help</MDBBtn>
            <MDBBtn transparent>Account</MDBBtn>
            <MDBBtn transparent>Sign Out</MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBNavbar>
    );
  }
}

export default UserHome;
