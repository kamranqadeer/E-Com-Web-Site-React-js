import React, { Component } from "react";
import SearchNav from "../client/NavSearchBar";
//using Typography
import Typography from "@material-ui/core/Typography";
//all icons
import Collar from "../assets/Collar.png";
import Shoulders from "../assets/Shoulders.png";
import Arm from "../assets/Arm.png";
import Cuff from "../assets/Cuff.png";
import Chest from "../assets/Chest.png";
import Wast from "../assets/Wast.png";
import Pant from "../assets/Pant.png";
import Height from "../assets/Height.png";
import UpperBody from "../assets/UpperBody.png";
//css
import "../assets/App.css"
//MDB
import {
  MDBCardImage,
  MDBCardBody,
  MDBIcon,
  MDBModal,
  MDBListGroup,
  MDBListGroupItem,
  MDBModalHeader,
  MDBBtn,
  MDBModalBody,
  MDBRow,
  MDBCol
} from "mdbreact";
class User3D extends Component {
  state = {
    modal1: false,
    modal2: false,
    model3: false,
    model4: false,
    model5: false,
    model6: false,
    model7: false,
    model8: false,
    model9: false,
    CollarWidth: [],
    CollarLenght: [],
    ShoulderBackWast: [],
    ShoulderLenght: [],
    ShoulderCrossBack: [],
    ChestUper: [],
    ChestLower: [],
    ChestWeidth: [],
    SleeveLenght: [],
    SleeveCurvLenght: [],
    SleeveWidth: [],
    SleeveCuffLenght: [],
    SleeveCuffWidth: [],
    BodyLenght: [],
    BodyVest: [],
    Waist: [],
    WaistPreferredSize: [],
    WaistSeat: [],
    WaistCrotch: [],
    LegsLength: [],
    LegsThigh: [],
    LegsKnee: [],
    LegsCuffCircumferenc: [],
    UserHeight: [],
    SizeImage: ""
  };
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  CollarSelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/CollarWidth.png?alt=media";
        break;
      }
      case "2": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Neck.PNG?alt=media";
        break;
      }
    }
  };
  ShoulderSelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/ShoulderBack.PNG?alt=media";
        break;
      }
      case "2": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/ShoulderFront.png?alt=media";
        break;
      }
      case "3": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/ShoulderCrossBack.png?alt=media";
        break;
      }
    }
  };
  SleevesSelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/LeftSleeves.PNG?alt=media";
        break;
      }
      case "2": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/CurvSleeve.png?alt=media";
        break;
      }
      case "3": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/BaiSep.PNG?alt=media";
        break;
      }
    }
  };
  SleevesCuffSelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Wrist.PNG?alt=media";
        break;
      }
      case "2": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/CuffWeidth.png?alt=media";
        break;
      }
    }
  };
  UpperBodySelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/BodyUpper.PNG?alt=media";
        break;
      }
      case "2": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/FullVest.PNG?alt=media";
        break;
      }
    }
  };
  ChestSelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/FrontChest.PNG?alt=media";
        break;
      }
      case "2": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/MidalChest.PNG?alt=media";
        break;
      }
      case "3": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/BackChest.PNG?alt=media";
        break;
      }
    }
  };
  WaistSelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Wast.PNG?alt=media";
        break;
      }
      case "2": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/PreferedWaist.PNG?alt=media";
        break;
      }
      case "3": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Seat.PNG?alt=media";
        break;
      }
      case "4": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Croact.PNG?alt=media";
        break;
      }
    }
  };
  LegsSelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Leangth.PNG?alt=media";
        break;
      }
      case "2": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Thigh.PNG?alt=media";
        break;
      }
      case "3": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Knee.PNG?alt=media";
        break;
      }
      case "4": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/CuffSercum.PNG?alt=media";
        break;
      }
    }
  };
  HeightSelectImage = event => {
    switch (event.target.id) {
      case "1": {
        document.getElementById("img").src =
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Height.png?alt=media";
        break;
      }
    }
  };
  async componentDidMount() {
    var height = "";
    for (var i = 1; i <= 96; i++) {
      for (var j = 0.5; j <= 2.54; j = j + 0.5) {
        if (i <= 4) {
          this.state.CollarWidth.push(i + "/" + j + "  inch");
          this.state.LegsCuffCircumferenc.push(i + "/" + j + "  inch");
          this.state.SleeveCuffWidth.push(i + "/" + j + "  inch");
        }
        if (i <= 20) {
          this.state.CollarLenght.push(i + "/" + j + "  inch");
          this.state.WaistSeat.push(i + "/" + j + "  inch");
        }
        if (i <= 12) {
          this.state.SleeveCuffLenght.push(i + "/" + j + "  inch");
          this.state.WaistCrotch.push(i + "/" + j + "  inch");
          this.state.LegsKnee.push(i + "/" + j + "  inch");
        }
        if (i <= 30) {
          this.state.ShoulderLenght.push(i + "/" + j + "  inch");
          this.state.SleeveWidth.push(i + "/" + j + "  inch");
          this.state.LegsThigh.push(i + "/" + j + "  inch");
        }
        if (i <= 40) {
          this.state.ShoulderCrossBack.push(i + "/" + j + "  inch");
          this.state.SleeveLenght.push(i + "/" + j + "  inch");
          this.state.WaistPreferredSize.push(i + "/" + j + "  inch");
          this.state.BodyVest.push(i + "/" + j + "  inch");
        }
        if (i <= 10) {
          this.state.ShoulderBackWast.push(i + "/" + j + "  inch");
        }
        if (i <= 45) {
          this.state.ChestUper.push(i + "/" + j + "  inch");
          this.state.SleeveCurvLenght.push(i + "/" + j + "  inch");
          this.state.Waist.push(i + "/" + j + "  inch");
          this.state.BodyLenght.push(i + "/" + j + "  inch");
        }
        if (i <= 50) {
          this.state.ChestLower.push(i + "/" + j + "  inch");
          this.state.LegsLength.push(i + "/" + j + "  inch");
        }
        if (i <= 20) {
          this.state.ChestWeidth.push(i + "/" + j + "  inch");
        }
        if (i > 36) {
          height = i / 12;
          this.state.UserHeight.push(height.toFixed(2) + "feet");
        }
      }
    }
  }

  render() {
    const NaveSearchText = "";
    const NaveSearch = "none";
    return (
      <div className="User3DModelMainPage">
        {/* Collor Dialog */}
        <MDBModal
          isOpen={this.state.modal1}
          toggle={this.toggle(1)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(1)}>
            Pleas give your Collar size
          </MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/CollarWidth.png?alt=media"
                    className="img-fluid center"
                    alt=""
                    id="img"
                    style={{ width: "100%", height: "40ch" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.CollarSelectImage}
                    id="1"
                  >
                    <option>Ban weidth</option>
                    {this.state.CollarWidth.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.CollarSelectImage}
                    id="2"
                  >
                    <option>Ban Lenght</option>
                    {this.state.CollarLenght.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(1)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Shounlders */}
        <MDBModal
          isOpen={this.state.modal2}
          toggle={this.toggle(2)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(2)}>
            <Typography variant="h5">Shoulder size</Typography>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/ShoulderBack.PNG?alt=media"
                    className="img-fluid"
                    alt=""
                    id="img"
                    style={{ width: "100%", height: "40ch" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.ShoulderSelectImage}
                    id="1"
                  >
                    <option>Back waist</option>
                    {this.state.ShoulderBackWast.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.ShoulderSelectImage}
                    id="2"
                  >
                    <option>Length</option>
                    {this.state.ShoulderLenght.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.ShoulderSelectImage}
                    id="3"
                  >
                    <option>Cross back</option>
                    {this.state.ShoulderCrossBack.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(2)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Sleeves */}
        <MDBModal
          isOpen={this.state.modal3}
          toggle={this.toggle(3)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(3)}> Sleeves Size</MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/LeftSleeves.PNG?alt=media"
                    className="img-fluid"
                    alt=""
                    id="img"
                    style={{ height: "40ch", width: "100%" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.SleevesSelectImage}
                    id="1"
                  >
                    <option>Length</option>
                    {this.state.SleeveLenght.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.SleevesSelectImage}
                    id="2"
                  >
                    <option>Curve length</option>
                    {this.state.SleeveCurvLenght.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.SleevesSelectImage}
                    id="3"
                  >
                    <option>Uper weidth (bai+tri)</option>
                    {this.state.SleeveWidth.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(3)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Sleeve Cuff */}
        <MDBModal
          isOpen={this.state.modal4}
          toggle={this.toggle(4)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(4)}>
            Sleeves cuff size
          </MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Wrist.PNG?alt=media"
                    className="img-fluid"
                    alt=""
                    id="img"
                    style={{ height: "40ch", width: "100%" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.SleevesCuffSelectImage}
                    id="1"
                  >
                    <option>Cuff length</option>
                    {this.state.SleeveCuffLenght.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.SleevesCuffSelectImage}
                    id="2"
                  >
                    <option>Cuff weidth</option>
                    {this.state.SleeveCuffWidth.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(4)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Upper Body */}
        <MDBModal
          isOpen={this.state.modal5}
          toggle={this.toggle(5)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(5)}>Upper Body</MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/BodyUpper.PNG?alt=media"
                    className="img-fluid"
                    alt=""
                    id="img"
                    style={{ height: "40ch", width: "100%" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.UpperBodySelectImage}
                    id="1"
                  >
                    <option>Length</option>
                    {this.state.BodyLenght.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.UpperBodySelectImage}
                    id="2"
                  >
                    <option>Vest</option>
                    {this.state.BodyVest.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(5)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Chest */}
        <MDBModal
          isOpen={this.state.modal6}
          toggle={this.toggle(6)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(6)}> Chest Size</MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/FrontChest.PNG?alt=media"
                    className="img-fluid"
                    alt=""
                    id="img"
                    style={{ height: "30ch", weidth: "100%" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.ChestSelectImage}
                    id="1"
                  >
                    <option>Upper chest</option>
                    {this.state.ChestUper.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.ChestSelectImage}
                    id="2"
                  >
                    <option>Lower chest</option>
                    {this.state.ChestLower.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.ChestSelectImage}
                    id="3"
                  >
                    <option>Chest weidth</option>
                    {this.state.ChestWeidth.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(6)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Wast */}
        <MDBModal
          isOpen={this.state.modal7}
          toggle={this.toggle(7)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(7)}>
            <Typography variant="h5">Waist size</Typography>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Wast.PNG?alt=media"
                    className="img-fluid"
                    alt=""
                    id="img"
                    style={{ height: "40ch", width: "100%" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.WaistSelectImage}
                    id="1"
                  >
                    <option>Waist</option>
                    {this.state.Waist.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.WaistSelectImage}
                    id="2"
                  >
                    <option>Preferred waist</option>
                    {this.state.WaistPreferredSize.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.WaistSelectImage}
                    id="3"
                  >
                    <option>Seat</option>
                    {this.state.WaistSeat.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.WaistSelectImage}
                    id="4"
                  >
                    <option>Croatch</option>
                    {this.state.WaistCrotch.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(7)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Legs */}
        <MDBModal
          isOpen={this.state.modal8}
          toggle={this.toggle(8)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(8)}>
            <Typography variant="h5">Legs size</Typography>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Leangth.PNG?alt=media"
                    className="img-fluid"
                    alt=""
                    id="img"
                    style={{ height: "40ch", width: "100%" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.LegsSelectImage}
                    id="1"
                  >
                    <option>Length</option>
                    {this.state.LegsLength.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.LegsSelectImage}
                    id="2"
                  >
                    <option>Thigh</option>
                    {this.state.LegsThigh.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.LegsSelectImage}
                    id="3"
                  >
                    <option>Knee</option>
                    {this.state.LegsKnee.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <select
                    className="browser-default custom-select"
                    style={{ marginTop: "1ch" }}
                    onMouseMove={this.LegsSelectImage}
                    id="4"
                  >
                    <option>Cuff circumference</option>
                    {this.state.LegsCuffCircumferenc.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(8)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Height */}
        <MDBModal
          isOpen={this.state.modal9}
          toggle={this.toggle(9)}
          centered
          size="lg"
        >
          <MDBModalHeader toggle={this.toggle(9)}>
            <Typography variant="h5">Your height</Typography>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="8">
                  <MDBCardImage
                    src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Height.png?alt=media"
                    className="img-fluid"
                    alt=""
                    id="img"
                    style={{ height: "40ch", width: "100%" }}
                  />
                </MDBCol>
                <MDBCol md="4" style={{ textAlign: "center" }}>
                  <select
                    className="browser-default custom-select"
                    onMouseMove={this.HeightSelectImage}
                    id="1"
                  >
                    <option>Your height</option>
                    {this.state.UserHeight.map(data => (
                      <option>{data}</option>
                    ))}
                  </select>
                  <MDBBtn
                    color="info"
                    style={{ marginTop: "20ch" }}
                    onClick={this.toggle(9)}
                  >
                    Done
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBModalBody>
        </MDBModal>
        {/* Nave Bar */}
        <SearchNav NaveSearchText={NaveSearchText} NaveSearch={NaveSearch} transparant={true} />
        <MDBRow style={{ margin: "2ch", backgroun: "transparant" }}>
          <MDBCol md="auto">
            <MDBListGroup style={{ width: "auto" }}>
              <MDBListGroupItem>
                <MDBIcon icon="bars" fixed style={{ marginRight: "1ch" }} />
                All sizes
              </MDBListGroupItem>
              <MDBListGroupItem
                className="img-fluid hoverable"
                href="#"
                onClick={this.toggle(1)}
              >
                <img
                  src={Collar}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Collar size
              </MDBListGroupItem>
              <MDBListGroupItem
                href="#"
                className="img-fluid hoverable"
                onClick={this.toggle(2)}
              >
                <img
                  src={Shoulders}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Shoulder size
              </MDBListGroupItem>
              <MDBListGroupItem
                href="#"
                className="img-fluid hoverable"
                onClick={this.toggle(3)}
              >
                <img
                  src={Arm}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Sleeve size
              </MDBListGroupItem>
              <MDBListGroupItem
                href="#"
                className="img-fluid hoverable"
                onClick={this.toggle(4)}
              >
                <img
                  src={Cuff}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Sleeve cuff size
              </MDBListGroupItem>
              <MDBListGroupItem
                href="#"
                className="img-fluid hoverable"
                onClick={this.toggle(5)}
              >
                <img
                  src={UpperBody}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Upper Body
              </MDBListGroupItem>
              <MDBListGroupItem
                href="#"
                className="img-fluid hoverable"
                onClick={this.toggle(6)}
              >
                <img
                  src={Chest}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Chest size
              </MDBListGroupItem>
              <MDBListGroupItem
                href="#"
                className="img-fluid hoverable"
                onClick={this.toggle(7)}
              >
                <img
                  src={Wast}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Waist size
              </MDBListGroupItem>
              <MDBListGroupItem
                href="#"
                className="img-fluid hoverable"
                onClick={this.toggle(8)}
              >
                <img
                  src={Pant}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Legs size
              </MDBListGroupItem>
              <MDBListGroupItem
                href="#"
                className="img-fluid hoverable"
                onClick={this.toggle(9)}
              >
                <img
                  src={Height}
                  style={{ height: "3ch", width: "3ch", marginRight: "1ch" }}
                />
                Height
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default User3D;
