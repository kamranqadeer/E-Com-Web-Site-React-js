import React from "react";
//Typogrphy
import Typography from "@material-ui/core/Typography";
//MDB
import { MDBIcon, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
const Input = ({
  type,
  id,
  lable,
  onChange,
  onClick,
  error,
  maxLength,
  icon
}) => {
  return (
    <MDBRow>
      <MDBCol md="1" style={{ paddingTop: "3ch" }}>
        <MDBIcon icon={icon} size="2x" onClick={onClick} />
      </MDBCol>
      <MDBCol md="11">
        <MDBRow>
          <MDBCol md="auto">
            <Typography variant="body1" style={{marginLeft:"1ch"}}>{lable}</Typography>
          </MDBCol>
          {error && (
            <MDBCol style={{ textAlign: "right" }}>
              <MDBAnimation type="fadeInLeft" delay=".20s">
                <Typography variant="caption" className="red-text">
                  {error}
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

        <input
          onChange={onChange}
          type={type}
          id={id}
          className="form-control"
          required
          maxLength={maxLength}
          style={{marginLeft:"1ch"}}
        />
      </MDBCol>
    </MDBRow>
  );
};

export default Input;
