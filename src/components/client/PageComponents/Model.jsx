import React, { Component } from "react";
//image paypal
import payPal from "../../assets/payPal.jpg";
//using Typography
import Typography from "@material-ui/core/Typography";
//usnig Auto fill image
import AutoFitImage from "react-image-autofit-frame";
import MainLogo from "../../assets/BlueMainLogo.png";
//import inputs
import ImportInput from "../PageComponents/signUpInput.jsx";
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

const Model = ({
  toggle,
  modal1,
  submit,
  formValidation,
  error,
  allDetails,
  contryCode,
  loading
}) => {
  return (
    <MDBModal isOpen={modal1} toggle={toggle}>
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
            {allDetails}
          </Typography>
          <Typography variant="caption" className="blue-text">
            Your all details is secure.Your order is save with order key so save
            your confirm order slip.
          </Typography>
        </MDBCol>
      </MDBRow>
      <MDBModalBody>
        <form
          className="needs-validation"
          onSubmit={submit}
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
            onChange={formValidation}
            error={error.userName}
            maxLength="15"
            icon="user-circle"
          />
          <br />
          {/* EMAIL INPUT */}
          <ImportInput
            id="email"
            type="text"
            lable="Your Email"
            onChange={formValidation}
            error={error.email}
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
                    Contect number(instead){contryCode}
                  </Typography>
                </MDBCol>
                {error.contactNumber && (
                  <MDBCol style={{ textAlign: "right" }}>
                    <MDBAnimation type="fadeInLeft" delay=".20s">
                      <Typography variant="caption" className="red-text">
                        {error.contactNumber}
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
              <div className="input-group" style={{marginLeft:"1ch"}}>
                <div className="input-group-prepend">
                  <span className="input-group-text" id="contactNumber">
                    {contryCode}
                  </span>
                </div>
                <input
                  onChange={formValidation}
                  type="number"
                  id="contactNumber"
                  className="form-control"
                  required
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
            onChange={formValidation}
            error={error.address}
            maxLength="60"
            icon="globe-asia"
          />
          <br />
          {/*  Paypal user id */}
          <ImportInput
            id="paypalId"
            type="id"
            lable="Your Paypal id"
            onChange={formValidation}
            error={error.payPalId}
            maxLength="15"
            icon="credit-card"
          />
          <br />
          {/* Paypal password */}
          <ImportInput
            id="password"
            type="password"
            lable="Your password"
            onChange={formValidation}
            error={error.password}
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
            <MDBBtn color="primary" onClick={toggle}>
              Cancle
            </MDBBtn>
            <MDBBtn color="primary" type="submit">
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
};

export default Model;
