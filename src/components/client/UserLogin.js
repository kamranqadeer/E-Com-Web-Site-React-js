import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader
} from "mdbreact";
//Expected errors
// wo tumam errors jo n point sa response ma aty hain jasy ka invalid user respons 403 ya phir invalid data like 400 - client errors
//Unexpected errors
// network dow ? / server down ?/ db down? / ya phir koi bug ha ya koi issu ha
import NavigationBar from "./navbar";
import ClientFooter from "./footer";
import NavSearchBar from "./NavSearchBar";
import axios from "axios";
import clientValidator, { singIn } from "./clientValidator";
class UserLogin extends Component {
  state = {
    path: window.location.pathname,
    email: "",
    password: "",
    loading: false,
    errors: {},
    modal2: true
  };
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  emailHandelCange = event => {
    document.getElementById("email").style.borderBottomColor = "blue";
    if (!event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      document.getElementById("email").style.webkitTextFillColor = "red";
    } else {
      document.getElementById("email").style.webkitTextFillColor = "blue";
    }
    this.state.email = event.target.value;
  };
  passwordHandelChange = event => {
    document.getElementById("password").style.borderBottomColor = "blue";
    if (event.target.value.length < 6 || event.target.value.length > 11) {
      document.getElementById("password").style.webkitTextFillColor = "red";
    } else {
      document.getElementById("password").style.webkitTextFillColor = "blue";
    }
    this.state.password = event.target.value;
  };
  submitHandler = async event => {
    const check = singIn(this.state.email, this.state.password);
    if (check == 1) {
      this.setState({ loading: true });
      event.preventDefault();
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      axios
        .post("/logIn", userData)
        .then(res => {
          localStorage.setItem("userSignInToken", `Token ${res.data.token}`);
          this.props.history.push("/userHome");
          toast.success("Welcome to Darzi point");
        })
        .catch(err => {
          this.state.errors = err.response.data;
          if (
            err.response &&
            err.response.status >= 400 &&
            err.response.status < 500
          ) {
            this.setState({ loading: false });
            toast.error("Invaled user");
          } else toast.error("Pleas check your newtork / Server error");
        });
    } else {
      switch (check) {
        case "Email Should not be empty":
          document.getElementById("email").style.borderBottomColor = "red";
          document.getElementById("email").value = "";
          break;
        case "Password shuold not be empty":
          document.getElementById("password").style.borderBottomColor = "red";
          document.getElementById("password").value = "";

          break;
        case "Email and Password shuold not be empty":
          document.getElementById("email").style.borderBottomColor = "red";
          document.getElementById("password").style.borderBottomColor = "red";
          document.getElementById("email").value = "";
          document.getElementById("password").value = "";
          break;
        case "Password must be greater than 6 digite":
          document.getElementById("password").style.webkitTextFillColor = "red";
          break;
        case "Password must be less than 9 digite":
          break;
        case "Should be enter valid email":
          break;
      }
    }
  };
  render() {
    const { loading } = this.state;
    return (
      <div>
        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} centered>
          <MDBModalHeader toggle={this.toggle(2)} />
          <MDBModalBody>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" onClick={this.toggle(2)} /> Login:
                </h3>
              </MDBCardHeader>
              <form>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    id="email"
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.emailHandelCange}
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    id="password"
                    type="password"
                    validate
                    onChange={this.passwordHandelChange}
                  />
                </div>

                <div className="text-center mt-4">
                  <MDBBtn
                    color="light-blue"
                    className="mb-3"
                    onClick={this.submitHandler}
                    disabled={this.state.loading}
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
                    {loading && <span>Pleas wait...</span>}
                    {!loading && <span>Login</span>}> Login
                  </MDBBtn>
                </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  {/* <p>
                    <a onClick={this.signUpDailogOpen(2)}>
                      Not a member? Sign Up
                    </a>
                  </p>
                  <p>
                    <a className="red-text" href="#">
                      Forgot Password?
                    </a>
                  </p> */}
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default UserLogin;
