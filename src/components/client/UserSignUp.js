import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import NavigationBar from "./navbar";
import ClientFooter from "./footer";
import NavSearchBar from "./NavSearchBar";
import clientValidator, { singUp } from "./clientValidator";
class UserLogIn extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    loading: false
  };
  userNameHandler = event => {
    document.getElementById("userName").style.borderBottomColor = "blue";
    if (event.target.value.length < 5 || event.target.value.length >= 16) {
      document.getElementById("userName").style.webkitTextFillColor = "red";
    } else {
      document.getElementById("userName").style.webkitTextFillColor = "blue";
    }
    this.state.handle = event.target.value;
  };
  emailHandler = event => {
    document.getElementById("email").style.borderBottomColor = "blue";
    if (!event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      document.getElementById("email").style.webkitTextFillColor = "red";
    } else {
      document.getElementById("email").style.webkitTextFillColor = "blue";
    }
    this.state.email = event.target.value;
  };
  passwordHandler = event => {
    document.getElementById("password").style.borderBottomColor = "blue";
    if (event.target.value.length < 5 || event.target.value.length > 21) {
      document.getElementById("password").style.webkitTextFillColor = "red";
    } else {
      document.getElementById("password").style.webkitTextFillColor = "blue";
    }
    this.state.password = event.target.value;
  };
  confirmPassword = event => {
    document.getElementById("confirmPassword").style.borderBottomColor = "blue";
    if (event.target.value != document.getElementById("password").value) {
      document.getElementById("confirmPassword").style.webkitTextFillColor =
        "red";
    } else {
      document.getElementById("confirmPassword").style.webkitTextFillColor =
        "blue";
    }
    this.state.confirmPassword = event.target.value;
  };
  submitHandler = async (event) => {
    const check = singUp(
      this.state.email,
      this.state.password,
      this.state.confirmPassword,
      this.state.handle
    );
    if (check == 1) {
      this.setState({ loading: true });
      event.preventDefault();
      const signUpData = {
        email: this.state.email,
        handle: this.state.handle,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
        await axios
        .post("/signUp", signUpData)
        .then(res => {
          console.log(res.data);
          localStorage.setItem('userSignUpToken' , `Token ${res.data.token}`);
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
            toast.error("This eamil or password already registed");
          } else {
            toast.error("Pleas check your newtork / Server error");
            this.setState({ loading: false });
          }
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
        case "Password should be between 5-15 digits":
          document.getElementById("password").style.webkitTextFillColor = "red";
          break;
        case "User Name should be between 5-15 digits":
          document.getElementById("userName").style.webkitTextFillColor = "red";
          break;
        case "Confirm Password is not match":
          document.getElementById("confirmPassword").style.webkitTextFillColor =
            "red";
          break;
      }
    }
  };
  render() {
    const { loading } = this.state;
    return (
      <div>
        <NavigationBar />
        <NavSearchBar />
        <MDBContainer>
          <MDBCard className="LogInPage">
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Registration:
                </h3>
              </MDBCardHeader>
              <form>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    id="userName"
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.userNameHandler}
                  />
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    id="email"
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.emailHandler}
                  />

                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    id="password"
                    type="password"
                    validate
                    onChange={this.passwordHandler}
                  />
                  <MDBInput
                    label="Confirm your password"
                    icon="exclamation-triangle"
                    group
                    id="confirmPassword"
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.confirmPassword}
                  />
                </div>
                <div className="text-center mt-4">
                  <MDBBtn
                    color="light-blue"
                    className="mb-3"
                    id="submit"
                    onClick={this.submitHandler}
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
                    {loading && <span>Confirm email...</span>}
                    {!loading && <span>Register</span>}
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <ClientFooter />
      </div>
    );
  }
}

export default UserLogIn;
