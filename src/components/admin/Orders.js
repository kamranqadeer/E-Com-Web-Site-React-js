import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
//react-bootstrap
import { Table } from "react-bootstrap";
import axios from "axios";
import {
  MDBCol,
  MDBFormInline,
  MDBBtn,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbar,
  MDBCollapse,
  MDBNavbarNav,
  MDBRow,
  MDBIcon
} from "mdbreact";
class Order extends Component {
  state = {
    collapsed: false,
    Orders: []
  };
  async componentDidMount() {
    const { data: Orders } = await axios.get("/getOrders");
    this.setState({ Orders });
    this.setState({ Orders: Orders });
    console.log(Orders);
  }
  handleDelete = post => {
    console.log("Delete", post);
  };
  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleNavbarClick = () => {
    this.setState({
      collapsed: false
    });
  };

  render() {
    return (
      <div className="ChildContainer">
        <MDBCol md="12">
          <MDBNavbar
            color="info-color"
            className="text-white darken-3"
            dark
            expand="md"
          >
            <MDBNavbarBrand>Filter Products</MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.handleTogglerClick} />
            <Router>
              <MDBCollapse isOpen={this.state.collapsed} navbar>
                <MDBNavbarNav right onClick={this.handleNavbarClick}>
                  <MDBFormInline className="md-form mr-auto m-0">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <MDBBtn
                      outline
                      color="white"
                      size="sm"
                      type="submit"
                      className="mr-auto"
                    >
                      Search
                    </MDBBtn>
                  </MDBFormInline>
                </MDBNavbarNav>
              </MDBCollapse>
            </Router>
          </MDBNavbar>
        </MDBCol>
        <div style={{ margin: "1.5ch" }}>
          <MDBRow>
            <MDBCol>
              <p className="font-weight-lighter">
                Orders can be filtered by: surname, email address or
                postcode/zipcode
              </p>
            </MDBCol>
            <MDBCol>
              <select className="browser-default custom-select">
                <option>Status</option>
                <option value="1">Completed</option>
                <option value="1">Paid</option>
                <option value="1">Created</option>
                <option value="1">Decliend</option>
                <option value="1">Shiped</option>
                <option value="1">Pending</option>
              </select>
            </MDBCol>
          </MDBRow>
        </div>

        <div
          className="border"
          style={{ marginLeft: "1.5ch", marginRight: "1.5ch" }}
        >
          <h1 style={{ marginTop: "1ch", fontSize: "20px", marginLeft: "1ch" }}>
            Recent orders
          </h1>
        </div>
        <div
          className="border"
          style={{ marginLeft: "1.5ch", marginRight: "1.5ch" }}
        >
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Product Id</th>
                <th>Total Amount</th>
                <th>Address</th>
                <th>Confirm Order</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Orders.map(data => (
                <tr>
                  <td>{data.Quantity}</td>
                  <td>{data.ProductIds}</td>
                  <td>{data.TotalAmount}</td>
                  <td>{data.Address}</td>
                  <td>
                    <MDBIcon
                      icon="check-square"
                      className="white-text"
                      size="lg"
                    />
                  </td>
                  <td>
                    <MDBIcon
                      icon="trash-alt"
                      className="red-text"
                      size="lg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Order;
