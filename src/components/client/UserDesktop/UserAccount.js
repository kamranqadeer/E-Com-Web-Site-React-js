import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";
import UserSize from "./UserSize"
import "./assets/App.css";
// date piker
import "moment/locale/fr.js"; // or 'rc-datepicker/node_modules/moment/locale/fr.js' if you don't have it in your node_modules folder
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
// table view

class UserAccount extends Component {
  state = {
    activeItem: "1",
    date: "2015-06-26"
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  getPickerValue = value => {
    console.log(value);
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  DateChange = (jsDate, dateString) => {};
  render() {
    
    return (
      <div className="ChildContainer">
        <p className="font-weight-bold">Account detail</p>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="font-weight-bold white-text "
        >
          <Tab
            eventKey="Account details"
            title="Account details"
            className="mx-auto float-none  z-depth-1 tab1css"
          >
            <MDBRow style={{ alignItems: "top", padding: "2ch" }}>
              <MDBCol>
                <form>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterNameEx"
                        className="white-text"
                      >
                        First name
                      </label>
                      <input
                        value={this.state.fname}
                        name="fname"
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control"
                        placeholder="First name"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterEmailEx2"
                        className="white-text"
                      >
                        Last name
                      </label>
                      <input
                        value={this.state.lname}
                        name="lname"
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterEmailEx2"
                        className="form-control"
                        placeholder="Last name"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterConfirmEx3"
                        className="white-text"
                      >
                        Age
                      </label>

                      <DatePickerInput
                        onChange={this.DateChange}
                        value={this.state.date}
                        className="my-custom-datepicker-component"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterConfirmEx3"
                        className="white-text"
                      >
                        Gender
                      </label>
                      <select className="browser-default custom-select">
                        <option value="Mail">Mail</option>
                        <option value="Femail">Femail</option>
                        <option value="non">Non</option>
                      </select>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterConfirmEx3"
                        className="white-text"
                      >
                        Email
                      </label>
                      <input
                        value={this.state.email}
                        onChange={this.changeHandler}
                        type="email"
                        id="defaultFormRegisterConfirmEx3"
                        className="form-control"
                        name="email"
                        placeholder="Your Email address"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterConfirmEx3"
                        className="white-text"
                      >
                        Contact (+92)
                      </label>
                      <input
                        value={this.state.contact}
                        onChange={this.changeHandler}
                        type="email"
                        id="defaultFormRegisterConfirmEx3"
                        className="form-control"
                        name="email"
                        placeholder="Your Contact number"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="white-text"
                      >
                        Address
                      </label>
                      <input
                        value={this.state.address}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="adress"
                        placeholder="adress"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="white-text"
                      >
                        City
                      </label>
                      <input
                        value={this.state.city}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="city"
                        placeholder="City"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="white-text"
                      >
                        State
                      </label>
                      <input
                        value={this.state.state}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="state"
                        placeholder="State"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="white-text"
                      >
                        Zip
                      </label>
                      <input
                        value={this.state.zip}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="zip"
                        placeholder="Zip"
                        required
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBCol md="4" className="mb-3">
                    <div className="custom-control custom-checkbox pl-3">
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="invalidCheck"
                      >
                        Agree to terms and conditions
                      </label>
                    </div>
                  </MDBCol>
                  <MDBBtn color="primary" type="Update">
                    Update
                  </MDBBtn>
                </form>
              </MDBCol>
              <MDBCol end>
                <img
                  src="https://mdbootstrap.com/img/Others/documentation/img%20(7)-mini.jpg"
                  className="img-fluid"
                  id="productImage"
                  alt=""
                  width="700px"
                  height="300px"
                />
              </MDBCol>
            </MDBRow>
          </Tab>
          <Tab eventKey="Size" title="Size">
            <UserSize/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default UserAccount;
