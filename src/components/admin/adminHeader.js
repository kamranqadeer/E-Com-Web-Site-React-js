import React, { Component } from "react";
//toast laibrary
import { toast } from "react-toastify";
//mui
import IconButton from "@material-ui/core/IconButton";
//main logo
import MainLogo from "../assets/mainLogo.png";

import {
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBModalHeader,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import "../assets/App.css";
import { Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Typography } from "@material-ui/core";
class AdminHome extends Component {
  state = { modal1: false };
  //main toggel
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
    this.state.clientToken = localStorage.userSignInToken;
  };
  //Log out
  logOut = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
    toast("Thank for using Darzi.com");
    window.localStorage.removeItem("adminSignInToken");
    this.props.GoingHome();
  };
  render() {
    return (
      <div>
        {/* Logout Dailog */}
        <MDBModal
          isOpen={this.state.modal1}
          toggle={this.toggle(1)}
          side
          position="top-right"
        >
          <MDBModalHeader
            toggle={this.toggle(1)}
            style={{ backgroundColor: "red" }}
          >
            <Typography variant="h4" className="white-text">
              <MDBIcon
                style={{ marginRight: "0.5ch" }}
                icon="exclamation-circle"
                className="white-text"
              />
              Logging out...
            </Typography>
          </MDBModalHeader>
          <MDBModalBody>
            <Typography variant="h6">You want to log out...</Typography>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="red" onClick={this.toggle(1)}>
              Close
            </MDBBtn>
            <MDBBtn color="red" onClick={this.logOut(1)}>
              Log out
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="/" style={{marginLeft:"9ch"}}>
            <img
              src={MainLogo}
              style={{
                height: "8ch",
                width: "15ch",
                marginTop: "0.6ch"
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
             <Typography variant="h4" className="blue-text">Welcom to Darzi point</Typography>
            </Nav>
            <Nav>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={this.toggle(1)}
                style={{ marginLeft: "0.5px", marginRight: "5ch" }}
              >
                <MDBRow>
                  <MDBIcon icon="sign-out-alt" size="2x" id="Login" />
                  <Typography
                    variant="caption"
                    style={{ marginLeft: "0.5ch", textAlign: "center" }}
                    className="gray-text"
                  >
                    Admin |<a className="red-text">LogOut</a>
                    <br />
                    Darzi.com
                  </Typography>
                </MDBRow>
              </IconButton>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AdminHome;
