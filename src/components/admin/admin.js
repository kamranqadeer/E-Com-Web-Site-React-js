import React, { Component } from 'react';
import { MDBCard, MDBIcon, MDBModalFooter, MDBInput, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBContainer, MDBEdgeHeader, Row, MDBFreeBird } from "mdbreact";
import MainLogo from '../assets/mainLogo.png';
class admin extends Component {
    state = {
    }
    render() {
        return (
            <MDBContainer>
                <MDBEdgeHeader color="info-color-dark">
                    <MDBRow className="AdminLoginHeader">
                        <MDBCol xs="1">
                            <img src={MainLogo} className="AdminHeaderLogo" />
                        </MDBCol>
                        <MDBCol xs="8">
                            <h1 className="htag">Admin Login</h1>
                            <p class="text-muted">
                                Admin (access/update/add/delete) </p>
                        </MDBCol>
                    </MDBRow>
                </MDBEdgeHeader>
                <MDBFreeBird>
                    <MDBRow>
                        <MDBCol md="8" lg="7" className="mx-auto float-none ">
                            <MDBCard>
                                <MDBCardBody className="mx-4">
                                    <div className="text-center">
                                        <h3 className="dark-grey-text mb-5">
                                            <strong>Sign in</strong>
                                        </h3>
                                    </div>
                                    <MDBInput
                                        label="Your email"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        label="Your password"
                                        group
                                        type="password"
                                        validate
                                        containerClass="mb-0"
                                    />
                                    <p className="font-small blue-text d-flex justify-content-end pb-3">
                                        Forgot
                <a href="#!" className="blue-text ml-1">

                                            Password?
                </a>
                                    </p>
                                    <div className="text-center mb-3">
                                        <MDBBtn 
                                            href="./AdminHome"
                                            type="button"
                                            color="light-blue" 
                                            className="btn-block z-depth-1a"
                                        >
                                            Sign in
                                   </MDBBtn>
                                    </div>
                                    <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                                        or Sign in with:
                                    </p>
                                    <div className="row my-3 d-flex justify-content-center">
                                        <MDBBtn
                                            type="button"
                                            color="white"
                                            rounded
                                            className="mr-md-3 z-depth-1a"
                                        >
                                            <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
                                        </MDBBtn>
                                        <MDBBtn
                                            type="button"
                                            color="white"
                                            rounded
                                            className="mr-md-3 z-depth-1a"
                                        >
                                            <MDBIcon fab icon="twitter" className="blue-text" />
                                        </MDBBtn>
                                        <MDBBtn
                                            type="button"
                                            color="white"
                                            rounded
                                            className="z-depth-1a"
                                        >
                                            <MDBIcon fab icon="google-plus-g" className="blue-text" />
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                                <MDBModalFooter className="mx-5 pt-3 mb-1">
                                    <p className="font-small grey-text d-flex justify-content-end">
                                        Not a member?
                                      <a href="/AdminRegistration" className="blue-text ml-1">

                                            Sign Up
                                       </a>
                                    </p>
                                </MDBModalFooter>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBFreeBird>
            </MDBContainer>
        );

    }
}

export default admin;