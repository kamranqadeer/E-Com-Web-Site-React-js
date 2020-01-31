import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
//using Typography
import Typography from "@material-ui/core/Typography";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon
} from "mdbreact";

class Nave extends Component {
  state = {
    modal12: false,
    data: [],
    scrolled: false
  };
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  Garments = () => {
    localStorage.setItem("product", "UnstitchClothes");
  };
  Brands = () => {
    localStorage.setItem("product", "ProductionBy");
  };
  render() {
    return (
      <div>
        {/* HELP MODEL */}
        <MDBModal
          isOpen={this.state.modal1}
          toggle={this.toggle(1)}
          backdrop={false}
        >
          <MDBModalHeader toggle={this.toggle(1)}>
            <Typography variant="h4">
              <MDBIcon
                icon="question-circle"
                style={{ marginRight: "0.5ch" }}
              />
              HELP
            </Typography>
          </MDBModalHeader>
          <MDBModalBody>
            <Typography variant="subtitle1">1-Introduction </Typography>
            <Typography variant="caption">
              This Introduction gives outline of Darzi.com. "Darzi.com" is the
              E-com website for online custom size and default size clothes. It
              is most advance web site which make your clothes based on your
              given custom size and selected design. Overview: It is an online
              platform that provides the opportunity to clients to make clothes
              based on him custom size and specific design. You can also order
              specific design clothes (default sizes like S,L,M,Xl,XXl). You are
              designer to make your clothes based on your style and design.
            </Typography>
            <br />
            <Typography variant="subtitle1">2-Darzi.com </Typography>
            <Typography variant="caption">
              . "Darzi.com" is the E-com website for online custom size and
              default size clothes. It is most advance web site which make your
              clothes based on your given custom size and selected design. You
              can also order specific design clothes (default sizes like
              S,L,M,Xl,XXl). You are designer to make your clothes based on your
              style and design.
            </Typography>
            <br />
          </MDBModalBody>
        </MDBModal>
        {/* NAVE BAR */}
        <Navbar
          className="NavBar"
          style={{
            height: "3ch"
          }}
        >
          <Navbar.Brand>
            <Typography variant="h6" className="blue-text">Darzi.com</Typography>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/searchProducts" onClick={this.Brands}>
                Brands
              </Nav.Link>
              <div className="vl" />
              <Nav.Link href="/searchProducts" onClick={this.Garments}>
                Garments
              </Nav.Link>
              <div className="vl" />
              <Nav.Link href="#" onClick={this.toggle(1)}>
                Help
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Nave;
