import React, { Component } from "react";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBCard,
} from "mdbreact";
import "../assets/App.css";
import MainLogo from "../assets/BlueMainLogo.png";
import AutoFitImage from "react-image-autofit-frame";
import PageFooter from './footer';
class ClientDetail extends Component {
  state = {};
  CartHandler = () => {};
  render() {
    return (
      <div>
        <MDBCard>
          <MDBContainer className="SearchContailer">
            <MDBRow>
              <MDBCol start style={{ marginLeft: "4ch" }}>
                <AutoFitImage
                  frameWidth="100px"
                  frameHeight="100px"
                  imgSrc={MainLogo}
                />
              </MDBCol>
              <MDBCol md="8" className="spanBorder">
                <span className="input-group-text Span" id="basic-text1">
                  <input
                    className="SearchInput form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    frameWidth="auto"
                  />
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      All Catagories
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Coarts</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Kurta</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Paint</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Shirts</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Shawls</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  <MDBIcon className="cyan-text" icon="search" />
                </span>
              </MDBCol>
              <MDBCol end className="spanBorder">
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MDBIcon icon="shopping-cart" size="1x" />
                  </Badge>
                </IconButton>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCard>
        <PageFooter />
      </div>
    );
  }
}

export default ClientDetail;
