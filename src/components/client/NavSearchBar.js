import React, { Component } from "react";
//toast laibrary
import { toast } from "react-toastify";
//axios laibary
import axios from "axios";
//Ui material links
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../assets/Logo.png";
import HeaderText from "../assets/headerText.png";
import { Badge } from "@material-ui/core";
import Cart from "@material-ui/icons/AddShoppingCart";
//nave image
import Boutqui from "../assets/Boutqui.jpg";
//usnig Auto fill image
import AutoFitImage from "react-image-autofit-frame";
import MainLogo from "../assets/mainLogo.png";
//react-bootstrap
import { Navbar, Nav } from "react-bootstrap";
//Typogrphy
import Typography from "@material-ui/core/Typography";
//token decoder
import jwtDecode from "jwt-decode";
//inputs
import ImportInput from "./PageComponents/signUpInput.jsx";
//window size check
import windowSize from "react-window-size";
//MDB
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBCardBody,
  MDBCardHeader,
  MDBAnimation,
  MDBCard,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBRow,
  MDBCol
} from "mdbreact";
import DropdownMenu from "react-bootstrap/DropdownMenu";
class SearchNav extends Component {
  state = {
    modal1: false,
    modal2: false,
    model3: false,
    model4: false,
    loading: false,
    show: "0",
    clientToken: localStorage.userSignInToken,
    AdminToken: localStorage.adminSignInToken,
    decodeToken: "",
    logInIcon: "user",
    CartNumer: "0",
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    contactNumber: "",
    address: "",
    error: "",
    signIncheck: "0",
    signUpCheck: "0",
    formErrors: {},
    LoginText: "LogIn",
    adminLoginText: "Login as a Darzi",
    loginHeader: true
  };
  //main toggel
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
    this.state.clientToken = localStorage.userSignInToken;
  };
  //login
  logInButtonSubmitHandler = async event => {
    if (!this.state.formErrors.email && !this.state.formErrors.password) {
      this.setState({ loading: true });
      event.preventDefault();

      if (this.state.loginHeader) {
        const userData = {
          email: this.state.email,
          password: this.state.password
        };
        axios
          .post("/logIn", userData)
          .then(res => {
            localStorage.setItem("userSignInToken", `Token ${res.data.token}`);
            localStorage.setItem("check", "1");
            this.state.logInIcon = "sign-out-alt";
            this.setState({ LoginText: "LogOut" });
            this.cartNumber();
            // clossing the dialog
            if (res) {
              let modalNumber = "modal" + 1;
              this.setState({
                [modalNumber]: !this.state[modalNumber]
              });
            }

            let modalNumber = "modal" + 2;
            this.setState({
              [modalNumber]: !this.state[modalNumber]
            });
            //
            this.setState({ loading: false });
          })
          .catch(err => {
            if (
              err.response &&
              err.response.status >= 400 &&
              err.response.status < 500
            ) {
              this.setState({ loading: false });
              toast.error("Invaled user");
            } else {
              this.setState({ loading: false });
              console.log(err);
              toast.error("Pleas check your newtork / Server error");
            }
          });
      } else {
        const AdminData = {
          Email: this.state.email,
          Password: this.state.password
        };
        axios
          .post("/adminLogIn", AdminData)
          .then(res => {
            localStorage.setItem("adminSignInToken", res.data);
            //closing loading button
            this.setState({ loading: false });
            // clossing the dialog

            let modalNumber = "modal" + 2;
            this.setState({
              [modalNumber]: !this.state[modalNumber]
            });
            //going to Darzi
            this.props.GoingAdmin();
          })
          .catch(err => {
            if (
              err.response &&
              err.response.status >= 400 &&
              err.response.status < 500
            ) {
              this.setState({ loading: false });
              toast.error("Invaled user");
            } else {
              this.setState({ loading: false });
              console.log(err);
              toast.error("Pleas check your newtork / Server error");
            }
          });
      }
    } else {
      toast.error("Please enter valide inputs");
    }
  };
  //signup
  signUpButtonSubmitHandler = async event => {
    if (this.state.loginHeader) {
      if (
        this.state.email == "" ||
        this.state.password == "" ||
        this.state.confirmPassword == "" ||
        this.state.userName == ""
      ) {
        toast.error("Pleas enter values");
      } else {
        this.setState({ loading: true });
        event.preventDefault();
        const signUpData = {
          email: this.state.email,
          handle: this.state.userName,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        };
        await axios
          .post("/signUp", signUpData)
          .then(res => {
            this.state.logInIcon = "sign-out-alt";
            this.setState({ LoginText: "LogOut" });
            localStorage.setItem("userSignInToken", `Token ${res.data.token}`);
            localStorage.setItem("check", "1");

            if (res) {
              let modalNumber = "modal" + 1;
              this.setState({
                [modalNumber]: !this.state[modalNumber]
              });
            }
            // clossing the dialog
            let modalNumber = "modal" + 3;
            this.setState({
              [modalNumber]: !this.state[modalNumber]
            });
            //
            this.setState({ loading: false });
          })
          .catch(err => {
            if (
              err.response &&
              err.response.status >= 400 &&
              err.response.status < 500
            ) {
              this.setState({ loading: false });
              if (err.response.data.email == "Email is already is use") {
                toast.error("Email is already taken");
                this.setState({ loading: false });
              } else {
                toast.error("User name is already taken");
                this.setState({ loading: false });
              }
            } else {
              this.setState({ loading: false });
              toast.error("Pleas check your newtork / Server error");
            }
          });
      }
    } else {
      if (
        this.state.email == "" ||
        this.state.password == "" ||
        this.state.confirmPassword == "" ||
        this.state.userName == "" ||
        this.state.address == "" ||
        this.state.contactNumber == ""
      ) {
        toast.error("Pleas enter values");
      } else {
        this.setState({ loading: true });
        event.preventDefault();
        const signUpData = {
          Email: this.state.email,
          Name: this.state.userName,
          Password: this.state.password,
          Address: this.state.address,
          ContactNumber: this.state.contactNumber,
          Status: "true"
        };
        await axios
          .post("/adminSignUp", signUpData)
          .then(res => {
            localStorage.setItem("adminSignInToken", res.data);
            //closing loading button
            this.setState({ loading: false });
            // clossing the dialog

            let modalNumber = "modal" + 3;
            this.setState({
              [modalNumber]: !this.state[modalNumber]
            });
            //going to Darzi
            this.props.GoingAdmin();
          })
          .catch(err => {
            if (
              err.response &&
              err.response.status >= 400 &&
              err.response.status < 500
            ) {
              this.setState({ loading: false });
              toast.error("This email alredy exist");
            } else {
              this.setState({ loading: false });
              console.log(err);
              toast.error("Pleas check your newtork / Server error");
            }
          });
      }
    }
  };
  //signup Dialog
  signUpDailogOpen = nr => () => {
    let modalNumber = "modal" + nr;
    this.state.formErrors = {};
    if (nr == "2") {
      let modalNumber2 = "modal" + ++nr;
      this.setState({
        [modalNumber2]: !this.state[modalNumber2]
      });
    }
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  //SignIn rout
  signInRout = () => {
    if (this.state.loginHeader) {
      this.setState({ loginHeader: true });
      if (this.state.clientToken) {
        this.state.decodeToken = jwtDecode(this.state.clientToken);
        if (!this.state.decodeToken.exp * 1000 < Date.now()) {
          let modalNumber = "modal" + 4;
          this.setState({
            [modalNumber]: !this.state[modalNumber]
          });
        } else {
          let modalNumber = "modal" + 2;
          this.setState({
            [modalNumber]: !this.state[modalNumber]
          });
        }
      } else {
        let modalNumber = "modal" + 2;
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      }
    } else {
      this.setState({ loginHeader: false });
      if (this.state.AdminToken) {
        this.props.GoingAdmin();
      } else {
        let modalNumber = "modal" + 2;
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      }
    }
  };
  //Log out
  logOut = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
    toast("Thank for using Darzi point.");
    window.localStorage.removeItem("userSignInToken");
    window.localStorage.removeItem("check");
    this.state.clientToken = localStorage.userSignInToken;
    this.state.logInIcon = "user";
    this.setState({ LoginText: "LogIn" });
    this.state.CartNumer = "0";
  };
  //cart number
  cartNumber = async () => {
    // Cart Count data
    const { data: cartData } = await axios.get("/getCart");
    if (this.state.clientToken) {
      this.state.decodeToken = jwtDecode(this.state.clientToken);
      this.state.logInIcon = "sign-out-alt";
      this.setState({ LoginText: "LogOut" });
    }
    cartData.map(data => {
      if (this.state.decodeToken.user_id == data.UserId) {
        ++this.state.CartNumer;
      }
    });
  };
  // show SignUppassword
  signUpShowPassword = () => {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    if (this.state.show == "0") {
      password.type = "text";
      confirmPassword.type = "text";
      this.state.show = "1";
    } else {
      password.type = "password";
      confirmPassword.type = "password";
      this.state.show = "0";
    }
  };
  // show SignInpassword
  signInShowPassword = () => {
    const password = document.getElementById("password");
    if (this.state.show == "0") {
      password.type = "text";
      this.state.show = "1";
    } else {
      password.type = "password";
      this.state.show = "0";
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
          this.state.formErrors.password = "Password Shound not empty:";
        } else if (event.target.value.match(/ /g, "")) {
          event.target.value = event.target.value.replace(/ /g, "");
        } else if (event.target.value.length < 8) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.password = "Min dighits 8";
        } else {
          event.target.className = "form-control is-valid";
          this.state.password = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }
      case "confirmPassword": {
        this.setState({ [event.target.name]: event.target.value });
        const pass = this.state.password;
        if (event.target.value.match(/ /g, "")) {
          event.target.value = event.target.value.replace(/ /g, "");
        } else if (event.target.value != pass) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.confirmPassword = "Password is not match";
        } else {
          event.target.className = "form-control is-valid";
          this.state.confirmPassword = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }

      case "userName": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.match(/[^a-zA-Z ]/g, "")) {
          event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
        } else if (event.target.value.match(/ /g, "")) {
          event.target.value = event.target.value.replace(/ /g, "");
        } else if (event.target.value.length < 7) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.userName = "Min dighits 7";
        } else {
          event.target.className = "form-control is-valid";
          this.state.userName = event.target.value;
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
          this.setState({ address: event.target.value });
          this.state.formErrors = {};
        }
        break;
      }
    }
  };
  //LoginButton Check
  logInButtonCheck = () => {
    // main conditions
    if (this.state.email == "" || this.state.password == "") {
      document.getElementById("logInButton").disabled = true;
    } else {
      document.getElementById("logInButton").disabled = false;
    }
  };
  //LoginButton Check
  signUpButtonCheck = () => {
    // main conditions
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.confirmPassword == "" ||
      this.state.userName == ""
    ) {
      document.getElementById("signUpButton").disabled = true;
    } else {
      document.getElementById("signUpButton").disabled = false;
    }
  };
  //Checking Token is avalble or not
  DarziPoint = () => {
    if (this.state.clientToken) {
      toast.success("Give your size");
    } else {
      toast.error("First Login as Darzi");
      let modalNumber = "modal" + 2;
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }
  };
  //onMouseEnter
  onMouseEnter = event => {
    event.target.onClick = true;
  };
  //onMouseMove1
  onMouseMove1 = () => {
    this.setState({ loginHeader: true });
  };
  //onMouseMove2
  onMouseMove2 = () => {
    this.setState({ loginHeader: false });
  };
  //mount method
  async componentDidMount() {
    // Cart Count data
    this.cartNumber();
    //  //checking Login
    //  this.logInButtonCheck();
    //  //checking Sign up
    //  this.signUpButtonCheck();
    if (this.state.AdminToken) {
      this.setState({ adminLoginText: "Go to Darzi admin point" });
    } else {
      this.setState({ adminLoginText: "Login as a Darzi" });
    }
    this.setState({ loginHeader: true });
  }
  render() {
    const { loading } = this.state;
    const NaveSearchText = this.props.NaveSearchText;
    const NaveSearch = this.props.NaveSearch;
    return (
      <MDBCard className={this.props.scroll ? "Fixed" : "NotFixed"}>
        {/* Logout Dailog */}
        <MDBModal
          isOpen={this.state.modal4}
          toggle={this.toggle(4)}
          side
          position="top-right"
        >
          <MDBModalHeader
            toggle={this.toggle(4)}
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
            <MDBBtn color="red" onClick={this.toggle(4)}>
              Close
            </MDBBtn>
            <MDBBtn color="red" onClick={this.logOut(4)}>
              Log out
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        {/* Go to darzi */}
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)}>
          <MDBModalHeader
            toggle={this.toggle(1)}
            style={{ backgroundColor: "blue" }}
          >
            <Typography variant="h4" className="white-text">
              <img src={Logo} style={{ height: "2ch", width: "2ch" }} />
              Darzi point
            </Typography>
          </MDBModalHeader>
          <MDBModalBody>
            <Typography variant="body1">
              You want to Go darzi point !
            </Typography>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary" onClick={this.toggle(1)}>
              Late
            </MDBBtn>
            <MDBBtn color="primary" href="/User3D">
              Yes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        {/* Login Dialog */}
        <MDBModal
          isOpen={this.state.modal2}
          toggle={this.toggle(2)}
          centered
          style={{ backgroundColor: "transparant" }}
        >
          <MDBModalHeader toggle={this.toggle(2)} />
          <MDBModalBody>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                {this.state.loginHeader ? (
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Login
                  </h3>
                ) : (
                  <h3 className="my-3">
                    <MDBIcon icon="gem" /> Login <br />
                    <Typography variant="body1" className="red-text">
                      Enter your id and password
                    </Typography>
                  </h3>
                )}
              </MDBCardHeader>
              <br />

              <div className="grey-text" style={{ marginTop: "1ch" }}>
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
                {/* PASSWORD INPUTE */}
                <ImportInput
                  id="password"
                  type="password"
                  lable="Password"
                  onChange={this.formValidation}
                  error={this.state.formErrors.password}
                  onClick={this.signInShowPassword}
                  maxLength="20"
                  icon="lock"
                />
              </div>
              <div className="text-center mt-4">
                <MDBBtn
                  color="light-blue"
                  type="submit"
                  className="mb-3"
                  onClick={this.logInButtonSubmitHandler}
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
                  {!loading && <span>Login</span>}
                </MDBBtn>
              </div>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>
                    <a onClick={this.signUpDailogOpen(2)}>
                      Not a member? Sign Up
                    </a>
                  </p>
                  <p>
                    <a className="red-text" href="#">
                      Forgot Password?
                    </a>
                  </p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* SignUp Dialog */}
        <MDBModal
          isOpen={this.state.modal3}
          toggle={this.toggle(3)}
          size={this.state.loginHeader ? "" : "lg"}
        >
          <MDBModalHeader toggle={this.toggle(3)} />
          <MDBModalBody>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                {this.state.loginHeader ? (
                  <h3 className="my-3">
                    <MDBIcon icon="user-plus" onClick={this.toggle(3)} /> Sign
                    Up:
                  </h3>
                ) : (
                  <h3 className="my-3">
                    <MDBIcon icon="gem" onClick={this.toggle(3)} /> Free Account{" "}
                    <br />
                    <Typography variant="caption" className="red-text">
                      Make your free account as a darzi.
                    </Typography>
                  </h3>
                )}
              </MDBCardHeader>
              <br />
              {this.state.loginHeader ? (
                <div className="grey-text">
                  {/* USER NAME */}
                  <ImportInput
                    id="userName"
                    type="text"
                    lable="User Name"
                    onChange={this.formValidation}
                    error={this.state.formErrors.userName}
                    icon="user"
                    maxLength="30"
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
                  {/* PASSWORD INPUTE */}
                  <ImportInput
                    id="password"
                    type="password"
                    lable="Password"
                    onChange={this.formValidation}
                    error={this.state.formErrors.password}
                    onClick={this.signUpShowPassword}
                    maxLength="20"
                    icon="lock"
                  />
                  <br />
                  {/* CONFIRM PASSWORD INPUT */}
                  <ImportInput
                    id="confirmPassword"
                    type="password"
                    lable="Retry-Pass"
                    onChange={this.formValidation}
                    error={this.state.formErrors.confirmPassword}
                    maxLength="20"
                    icon="exclamation-triangle"
                  />
                </div>
              ) : (
                <div className="grey-text">
                  <MDBRow>
                    <MDBCol>
                      {/* USER NAME */}
                      <ImportInput
                        id="userName"
                        type="text"
                        lable="User Name"
                        onChange={this.formValidation}
                        error={this.state.formErrors.userName}
                        icon="user"
                        maxLength="30"
                      />
                    </MDBCol>
                    <MDBCol>
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
                    </MDBCol>
                  </MDBRow>

                  <br />
                  <MDBRow>
                    <MDBCol>
                      {/* Address */}
                      <ImportInput
                        id="address"
                        type="text"
                        lable="Address"
                        onChange={this.formValidation}
                        error={this.state.formErrors.address}
                        maxLength="40"
                        icon="map-marker-alt"
                      />
                    </MDBCol>
                    <MDBCol>
                      {/* Contact number */}
                      <ImportInput
                        id="contactNumber"
                        type="text"
                        lable="Contact Number"
                        onChange={this.formValidation}
                        error={this.state.formErrors.contactNumber}
                        maxLength="12"
                        icon="phone"
                      />
                    </MDBCol>
                  </MDBRow>

                  <br />
                  <MDBRow>
                    <MDBCol>
                      {/* PASSWORD INPUTE */}
                      <ImportInput
                        id="password"
                        type="password"
                        lable="Password"
                        onChange={this.formValidation}
                        error={this.state.formErrors.password}
                        onClick={this.signUpShowPassword}
                        maxLength="20"
                        icon="lock"
                      />
                    </MDBCol>
                    <MDBCol>
                      {/* CONFIRM PASSWORD INPUT */}
                      <ImportInput
                        id="confirmPassword"
                        type="password"
                        lable="Retry-Pass"
                        onChange={this.formValidation}
                        error={this.state.formErrors.confirmPassword}
                        maxLength="20"
                        icon="exclamation-triangle"
                      />
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              <div className="text-center py-4 mt-3">
                <MDBBtn
                  color="light-blue"
                  className="mb-3"
                  id="signUpButton"
                  type="submit"
                  onClick={this.signUpButtonSubmitHandler}
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
              {/* </form> */}
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* <p>
          Screen width is: {this.props.windowWidth}
          <br />
          Screen height is: {this.props.windowHeight}
        </p> */}
        <Navbar
          expand="lg"
          className="NavBar"
          collapseOnSelect
          style={{
            height: this.props.windowWidth > 971 ? "10ch" : "auto"
          }}
        >
          <MDBContainer>
            <Navbar.Brand href="/">
              <img
                src={MainLogo}
                style={{
                  height: "8ch",
                  width: "15ch",
                  marginTop: "0.6ch"
                }}
              />
            </Navbar.Brand>
            <div style={{ display: `${NaveSearchText}`, width: "100%" }}>
              <img
                src={HeaderText}
                style={{
                  height: "15ch",
                  width: "50ch",
                  marginTop: "0.5ch"
                }}
                id="NaveText"
              />
            </div>
            {this.props.windowWidth > 975 && (
              <div
                className="input-group md-form form-sm form-1 pl-0"
                style={{ display: `${NaveSearch}` }}
              >
                <input
                  className="form-control my-0 py-1"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.props.SearchHandle}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text red " id="basic-text1">
                    <MDBIcon className="text-white" icon="search" />
                  </span>
                </div>
              </div>
            )}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <div className="SearchNavItems">
                  <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                    href="/Cart"
                  >
                    <Cart fontSize="large" />
                    <Badge
                      badgeContent={this.state.CartNumer}
                      color="error"
                      id="cartNumber"
                    >
                      <Typography
                        variant="caption"
                        style={{ marginTop: "1ch" }}
                      >
                        Cart
                      </Typography>
                    </Badge>
                  </IconButton>
                </div>
                <div className="SearchNavItems">
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={this.DarziPoint}
                    href={this.state.clientToken ? "/User3D" : ""}
                  >
                    <img
                      src={Logo}
                      style={{
                        height: "2ch",
                        width: "2.2ch",
                        marginRight: "0.5ch"
                      }}
                    />
                    <Typography variant="caption">Darzi point</Typography>
                  </IconButton>
                </div>
                <div className="dropdown">
                  <div className="dropbtn">
                    <MDBRow style={{ marginLeft: "0.5px" }}>
                      <MDBIcon
                        icon={this.state.logInIcon}
                        size="2x"
                        id="Login"
                        color="light"
                      />
                      <Typography
                        variant="caption"
                        style={{ marginLeft: "0.5ch", textAlign: "center" }}
                        className="gray-text"
                      >
                        Join us |
                        <a className="red-text">{this.state.LoginText}</a>
                        <br />
                        Darzi.com
                      </Typography>
                    </MDBRow>
                  </div>

                  <div className="dropdown-content">
                    <div
                      style={{
                        width: "15ch",
                        height: "1px",
                        backgroundColor: "black",
                        marginLeft: "16.5ch"
                      }}
                    />
                    <br />
                    <div
                      style={{
                        paddingLeft: "3ch",
                        paddingRight: "3ch",
                        textAlign: "left"
                      }}
                    >
                      {this.state.LoginText == "LogIn" && (
                        <Typography
                          variant="body1"
                          style={{ textAlign: "center", color: "gray" }}
                        >
                          Welcome to Darzi.com
                        </Typography>
                      )}
                      <Chip
                        icon={<MDBIcon icon={this.state.logInIcon} />}
                        label={this.state.LoginText}
                        clickable
                        color="secondary"
                        size="small"
                        style={{ width: "100%" }}
                        onClick={this.signInRout}
                        onMouseMove={this.onMouseMove1}
                      />
                    </div>
                    <hr />
                    <div
                      style={{
                        paddingLeft: "3ch",
                        paddingRight: "3ch",
                        textAlign: "left",
                        marginTop: "1ch"
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{ textAlign: "center", color: "gray" }}
                      >
                        Join us as a Darzi
                      </Typography>
                      <Chip
                        icon={<MDBIcon icon="gem" />}
                        label={this.state.adminLoginText}
                        clickable
                        color="secondary"
                        size="small"
                        style={{ width: "100%" }}
                        onClick={this.signInRout}
                        onMouseMove={this.onMouseMove2}
                      />
                      <Typography
                        variant="body2"
                        style={{
                          textAlign: "center",
                          color: "gray",
                          marginTop: "1ch"
                        }}
                      >
                        Free account for new customer. Make your own shop on
                        Darzi.com and upload new products.Contact us on <br />
                        <MDBIcon icon="envelope" />
                        <a className="red-text">kamran.qadeer.26@gmail.com</a>
                        <MDBIcon icon="phone" />
                        <a className="red-text">+923444200515</a>
                      </Typography>
                    </div>
                    <br />
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </MDBContainer>
        </Navbar>

        <MDBAnimation
          type="fadeIn"
          delay="0.5s"
          style={{
            display:
              this.props.scroll > 300 && this.props.windowWidth > 1094
                ? ""
                : "none"
          }}
        >
          <hr className="hr" />

          <Navbar
            expand="lg"
            style={{
              height: "4ch"
            }}
            className="NavBar"
          >
            <MDBContainer>
              <Navbar.Brand style={{ margin: "1.5ch" }}>
                <MDBDropdown>
                  <MDBDropdownToggle caret nav className="red-text">
                    Categories
                  </MDBDropdownToggle>
                  <MDBDropdownMenu basic>
                    <MDBDropdownItem>Action</MDBDropdownItem>
                    <MDBDropdownItem>Another Action</MDBDropdownItem>
                    <MDBDropdownItem>Something else here</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem>Separated link</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{ paddingLeft: "15ch" }}>
                  <Nav.Link href="#home">
                    <img
                      src={Logo}
                      style={{
                        height: "2ch",
                        width: "2ch",
                        marginRight: "1ch"
                      }}
                    />
                    Darzi point
                  </Nav.Link>
                  <div className="vl" />
                  <Nav.Link href="#home">
                    <MDBIcon
                      icon="gem"
                      className="red-text"
                      style={{ marginRight: "0.5ch" }}
                    />
                    All Collection
                  </Nav.Link>
                  <div className="vl" />
                  <Nav.Link href="#home">
                    <MDBIcon
                      icon="star-half-alt"
                      style={{ marginRight: "0.5ch" }}
                      className="yellow-text"
                    />
                    Brands
                  </Nav.Link>
                  <div className="vl" />
                  <Nav.Link href="#home">
                    <MDBIcon
                      icon="shuttle-van"
                      style={{ marginRight: "0.5ch" }}
                      className="blue-text"
                    />
                    One day
                  </Nav.Link>
                  <div className="vl" />
                  <Nav.Link href="#home">
                    <MDBIcon
                      icon="phone"
                      style={{ marginRight: "0.5ch" }}
                      className="green-text"
                    />
                    Contect us
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </MDBContainer>
          </Navbar>
        </MDBAnimation>
      </MDBCard>
    );
  }
}
export default windowSize(SearchNav);
