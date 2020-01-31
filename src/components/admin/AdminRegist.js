import React, { Component } from "react";
import {
  MDBFreeBird,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBContainer,
  MDBEdgeHeader
} from "mdbreact";
import MainLogo from "../assets/mainLogo.png";
import axios from "axios";
class AdminRegistration extends Component {
  state = {};

  handleAdd = async () => {
    const adminObject = {
      email: "nasir@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      handle: "nasir"
    };
    const { data: post } = await axios.post("/signUp", adminObject);
    console.log(post);
    console.log(this.state.email + "=email");
  };
  render() {
    return (
      <MDBContainer className="mt-3">
        <MDBEdgeHeader color="info-color-dark">
          <MDBRow className="AdminLoginHeader">
            <MDBCol xs="1">
              <img src={MainLogo} className="AdminHeaderLogo" />
            </MDBCol>
            <MDBCol xs="8">
              <h1 className="htag">Admin Registration</h1>
              <p class="text-muted">
                Enter some detail's for admin registration{" "}
              </p>
            </MDBCol>
          </MDBRow>
        </MDBEdgeHeader>
        <MDBFreeBird>
          <MDBRow>
            <MDBCol
              md="8"
              lg="7"
              className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <MDBCardBody>
                <MDBCardTitle>Rigester your self </MDBCardTitle>
                <form>
                  <MDBRow>
                    <MDBCol>
                      <MDBInput
                        label="Your name"
                        group
                        type="text"
                        icon="user"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        label="Last name"
                        group
                        type="text"
                        icon="user-friends"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBInput
                    label="Your email"
                    group
                    type="email"
                    icon="envelope"
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validat
                  />
                  <MDBInput
                    label="Confirm password"
                    icon="key"
                    group
                    type="password"
                    validat
                  />
                  <MDBCol>
                    <MDBRow>
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
                        <div className="invalid-feedback">
                          You must agree before submitting.
                        </div>
                      </div>
                    </MDBRow>
                    <MDBRow>
                      <MDBBtn
                        color="light-blue"
                        className="text-xs-left"
                        onClick={this.handleAdd}
                      >
                        Register
                      </MDBBtn>
                    </MDBRow>
                  </MDBCol>
                </form>
                <div className="my-2">
                  <p style={{ fontWeight: "300", fontSize: "0.75rem" }}>
                    Admin can access darzi.com{" "}
                  </p>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBFreeBird>
      </MDBContainer>
    );
  }
}

export default AdminRegistration;
