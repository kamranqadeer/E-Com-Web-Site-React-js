import React from "react";
//Typogrphy
import loadingPage from "../../assets/loadingPage.gif";
import CartEmpty from "../../assets/cartIsEmpty.png";

//using Typography
import Typography from "@material-ui/core/Typography";
//MDB
import { MDBIcon, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
const Input = ({ check, decodeToken }) => {
  return (
    <MDBRow center>
      {!decodeToken && check && (
        <div style={{ height: "60ch" }}>
          <Typography
            variant="h6"
            className="red-text"
            style={{ marginLeft: "3.5ch", marginTop: "5ch" }}
          >
            Loading please wait ...
          </Typography>
          <img
            src={loadingPage}
            style={{ height: "10ch", width: "30ch", padding: "1ch" }}
          />
        </div>
      )}
      {!check && (
        <MDBAnimation type="fadeInLeft" delay=".5s">
          <div style={{ height: "60ch" }}>
            <img src={CartEmpty} style={{ height: "45ch", width: "60ch" }} />
            <br />
            <Typography variant="body1" className="red-text" href="/">
              <a
                href="/"
                className="blue-text"
                style={{ marginLeft: "0.5ch", marginRight: "0.5ch" }}
              >
                Don't miss out on great deals!
              </a>
              Start shopping or
              <a
                href="/"
                className="blue-text"
                style={{ marginLeft: "0.5ch", marginRight: "0.5ch" }}
              >
                log in
              </a>
              to view products added.
            </Typography>
          </div>
        </MDBAnimation>
      )}
    </MDBRow>
  );
};

export default Input;
