import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBFormInline,
  MDBBtn
} from "mdbreact";
class Customers extends Component {
  state = {
    Customers: []
  };
  async componentDidMount() {
    const { data: Customers } = await axios.get("/getAllAdmins");
    this.setState({ Customers });
    this.setState({ Customers: Customers });
    console.log(Customers);
  }
  render() {
    return (
      <div className="ChildContainer">
        <MDBRow>
          <MDBCol xs="auto">
            <h1 className="AdminMenuText">All Customers Details</h1>
          </MDBCol>
          <MDBCol>
            <MDBFormInline className="md-form mr-auto m-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <MDBBtn color="light-blue" className="text-xs-left" href="#">
                Search
              </MDBBtn>
            </MDBFormInline>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Created At</th>
                <th>Status</th>
              </tr>
              {this.state.Customers.map(data => (
                <tr>
                  <td>{data.Name}</td>
                  <td>{data.Address}</td>
                  <td>{data.Email}</td>
                  <td>{data.ContactNumber}</td>
                  <td>{data.CreatedAt}</td>
                  <td>{data.Status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </MDBRow>
      </div>
    );
  }
}

export default Customers;
