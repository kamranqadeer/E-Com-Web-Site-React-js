import React, { Component } from "react";
import axios from "axios";
//image paypal
import payPal from "../../assets/payPal.jpg";
//token check
import jwtDecode from "jwt-decode";
//using Typography
import Typography from "@material-ui/core/Typography";
//usnig Auto fill image
import AutoFitImage from "react-image-autofit-frame";
import MainLogo from "../../assets/BlueMainLogo.png";
//toast laibrary
import { toast } from "react-toastify";
//import inputs
import ImportInput from "./signUpInput.jsx";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBBtnGroup,
  MDBIcon,
  MDBAnimation
} from "mdbreact";
class ConfirmOrderModel extends Component {
  state = {
    clientToken: localStorage.userSignInToken,
    check: localStorage.check,
    decodeToken: "",
    formErrors: {},
    countryCode: "+92",
    email: "",
    name: "",
    contactNumber: "",
    address: "",
    totalAmount: "",
    productIds: "",
    quantity: "",
    loading: false,
    modal1: false
  };
  //TOGAL
  toggle = (totalAmount, productIds, quantity) => {
    this.state.totalAmount = totalAmount;
    this.state.productIds = productIds;
    this.state.quantity = quantity;
    if (this.state.totalAmount != "1") {
      let modalNumber = "modal" + 1;
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }
  };
  //Close
  close = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  //CONFIRM ORDER
  submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (
      !this.state.formErrors.email &&
      !this.state.formErrors.userName &&
      !this.state.formErrors.contactNumber &&
      !this.state.formErrors.address &&
      document.getElementById("invalidCheck").checked
    ) {
      this.setState({ loading: true });

      const creatOrder = {
        TotalAmount: this.state.totalAmount,
        ProductIds: this.state.productIds,
        Quantity: this.state.quantity,
        Name: this.state.name,
        ContactNumber: this.state.contactNumber,
        Address: this.state.address,
        Email: this.state.email,
        UserId: this.state.decodeToken.user_id
      };
      await axios
        .post("/newOrder", creatOrder)
        .then(res => {
          let modalNumber = "modal" + 1;
          this.setState({
            [modalNumber]: !this.state[modalNumber]
          });
          this.setState({ loading: false });
          toast.success("Order submit sucessfully");
        })
        .catch(err => {
          if (
            err.response &&
            err.response.status >= 400 &&
            err.response.status < 500
          ) {
            this.setState({ loading: false });

            toast.error("Wrong data");
          } else {
            this.setState({ loading: false });
            toast.error("Pleas check your newtork / Server error");
          }
        });
    } else {
      toast.error("Confirm your order");
    }
  };
  //form Validation
  formValidation = event => {
    const id = event.target.id;
    switch (id) {
      case "email": {
        this.setState({ [event.target.name]: event.target.value });
        event.target.style.borderBottomColor = "blue";
        if (event.target.value.match(/ /g, "")) {
          event.target.value = event.target.value.replace(/ /g, "");
        } else if (
          !event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        ) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.email = "Email is not valid:";
          event.target.value = event.target.value.replace(
            /[^a-zA-Z0-9\@\.]/g,
            ""
          );
        } else {
          event.target.className = "form-control is-valid";
          this.state.email = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }
      case "password": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.trim() == "") {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.payPalPassword = "Password Shound not empty:";
        } else if (event.target.value.match(/ /g, "")) {
          event.target.value = event.target.value.replace(/ /g, "");
        } else if (event.target.value.length < 10) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.payPalPassword = "Min dighits 10";
        } else {
          event.target.className = "form-control is-valid";
          this.state.formErrors = {};
        }
        break;
      }
      case "userName": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.match(/[^a-zA-Z ]/g, "")) {
          event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
        } else if (event.target.value.match(/  /g, "")) {
          event.target.value = event.target.value.replace(/  /g, "");
        } else if (event.target.value.length < 7) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.userName = "Min dighits 7";
        } else {
          event.target.className = "form-control is-valid";
          this.state.name = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }
      case "payPalId": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.trim() == "") {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.payPalId = "Must enter your Id";
        } else if (event.target.value.length < 6) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.payPalId = "Min dighits 5";
        } else if (event.target.value.match(" ")) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.payPalId = "Space is not allow";
        } else {
          event.target.className = "form-control is-valid";
          this.state.formErrors = {};
        }
        break;
      }
      case "contactNumber": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.match(/[^0-9/ /]/g, "")) {
          event.target.value = event.target.value.replace(/[^0-9/ /]/g, "");
        } else if (event.target.value.lastIndexOf("0") === 0) {
          event.target.value = event.target.value.replace(0, "");
        } else if (event.target.value.split(event.target.value, 1) === 0) {
          event.target.value = event.target.value.replace(0, "");
        } else if (event.target.value.match(/ /g, "")) {
          event.target.value = event.target.value.replace(/ /g, "");
        } else if (event.target.value.length < 10) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.contactNumber = "Min digits 10";
          this.state.discount = "";
        } else {
          event.target.className = "form-control is-valid";
          this.state.contactNumber = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }
      case "address": {
        this.setState({ [event.target.name]: event.target.value });
        if (
          event.target.value.match(/[^a-zA-Z-0-9 ][,#-\/\s\!\@\$.....]/g, "")
        ) {
          event.target.value = event.target.value.replace(
            /[^a-zA-Z-0-9 ][,#-\/\s\!\@\$.....]/g,
            ""
          );
        } else if (event.target.value.match(/  /g, "")) {
          event.target.value = event.target.value.replace(/  /g, "");
        } else if (event.target.value.length < 15) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.address = "Min dighits 15";
        } else {
          event.target.className = "form-control is-valid";
          this.state.address = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }
    }
  };
  componentDidMount() {
    if (this.state.clientToken) {
      this.state.decodeToken = jwtDecode(this.state.clientToken);
    }
  }
  render() {
    const { loading } = this.state;
    return (
      <MDBModal isOpen={this.state.modal1} toggle={this.toggle}>
        <MDBRow
          className="gray-text"
          style={{ paddingRight: "2ch", paddingLeft: "2ch", paddingTop: "2ch" }}
        >
          <MDBCol md="auto">
            <AutoFitImage
              frameWidth="100px"
              frameHeight="100px"
              imgSrc={MainLogo}
            />
          </MDBCol>
          <MDBCol>
            <Typography variant="h5">Darzi.com</Typography>
            <Typography variant="subtitle1" className="red-text">
              Total amount={this.state.totalAmount}
            </Typography>
            <Typography variant="caption" className="blue-text">
              Your all details is secure.Your order is save with order key so
              save your confirm order slip.
            </Typography>
          </MDBCol>
        </MDBRow>
        <MDBModalBody>
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
            style={{
              paddingRight: "3ch",
              paddingLeft: "1ch",
              marginBottom: "3ch"
            }}
          >
            {/* User name INPUT */}
            <ImportInput
              id="userName"
              type="text"
              lable="User name"
              onChange={this.formValidation}
              error={this.state.formErrors.userName}
              maxLength="15"
              icon="user-circle"
            />
            <br />
            {/* EMAIL INPUT */}
            <ImportInput
              id="email"
              type="text"
              lable="Your Email"
              onChange={this.formValidation}
              error={this.state.formErrors.email}
              maxLength="40"
              icon="envelope"
            />
            <br />

            {/* CONTECT NUMBER */}
            <MDBRow>
              <MDBCol md="1" style={{ paddingTop: "3ch" }}>
                <MDBIcon icon="phone" size="2x" />
              </MDBCol>
              <MDBCol md="11">
                <MDBRow>
                  <MDBCol md="auto">
                    <Typography variant="body1">
                      Contect number(instead){this.state.countryCode}
                    </Typography>
                  </MDBCol>
                  {this.state.formErrors.contactNumber && (
                    <MDBCol style={{ textAlign: "right" }}>
                      <MDBAnimation type="fadeInLeft" delay=".20s">
                        <Typography variant="caption" className="red-text">
                          {this.state.formErrors.contactNumber}
                          <div
                            class="spinner-grow text-danger spinner-grow-sm"
                            role="status"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        </Typography>
                      </MDBAnimation>
                    </MDBCol>
                  )}
                </MDBRow>
                <div className="input-group" style={{ marginLeft: "1ch" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="contactNumber">
                      {this.state.countryCode}
                    </span>
                  </div>
                  <input
                    onChange={this.formValidation}
                    type="text"
                    id="contactNumber"
                    className="form-control"
                    required
                    maxLength="10"
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <br />
            {/* Address */}
            <ImportInput
              id="address"
              type="text"
              lable="Your Address"
              onChange={this.formValidation}
              error={this.state.formErrors.address}
              maxLength="60"
              icon="globe-asia"
            />
            <br />
            {/*  Paypal user id */}
            <ImportInput
              id="paypalId"
              type="id"
              lable="Your Paypal id"
              onChange={this.formValidation}
              error={this.state.formErrors.payPalId}
              maxLength="15"
              icon="credit-card"
            />
            <br />
            {/* Paypal password */}
            <ImportInput
              id="password"
              type="password"
              lable="Your password"
              onChange={this.formValidation}
              error={this.state.formErrors.password}
              maxLength="20"
              icon="lock"
            />
            <br />
            <MDBRow
              className="custom-control custom-checkbox pl-3"
              style={{ marginLeft: "2ch" }}
            >
              <input
                className="custom-control-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
              <label className="custom-control-label" htmlFor="invalidCheck">
                Agree to terms and conditions (Delivery in 5 days)
                <MDBIcon
                  icon="truck"
                  htmlFor="invalidCheck"
                  style={{ marginLeft: "0.5ch" }}
                />
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </MDBRow>
            <br />
            <MDBBtnGroup className="align-center">
              <MDBBtn
                color="primary"
                onClick={this.close(1)}
                className="Border LargeButton"
              >
                Cancle
              </MDBBtn>
              <MDBBtn
                color="primary"
                type="submit"
                className="Border LargeButton"
              >
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    style={{ marginRight: "5px" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {loading && <span>In process...</span>}
                {!loading && <span>Confirm Order</span>}
              </MDBBtn>
            </MDBBtnGroup>
          </form>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

export default ConfirmOrderModel;
