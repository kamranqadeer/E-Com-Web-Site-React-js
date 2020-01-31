import React, { Component } from "react";
import { toast } from "react-toastify";
//using Typography
import Typography from "@material-ui/core/Typography";
//Input filed
import ImportInput from "../client/PageComponents/signUpInput.jsx";
// axios
import axios from "axios";
//All Actions
import Actions, { setStyle } from "../Actions/Actions";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBView,
  MDBIcon,
  MDBAnimation,
  
} from "mdbreact";
class NewProduct extends Component {
  state = {
    formData: new FormData(),
    loading: false,
    allcheck: "0",
    discount: "",
    formErrors: {},
    Categories: "",
    ProductTitle: "",
    ProductAmount: "",
    Discount: "",
    ProductionBy: "",
    Discription: "",
    Sizes: "",
    ImageUrl: "",
    TotalAmount: "",
    Style: "nothing",
    AllStyle: [],
    Catagories: [],
    loadingPage: false,
  };
   
  //Upload pictur
  pictureSelectHandler = event => {
    const image = event.target.files[0];
    this.state.formData.append("image", image, image.name);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = e => {
      document.getElementById("productImage").src = e.target.result;
    };
  };
  //Button handle
  ButtonHandler = async event => {
    event.preventDefault();
    document.getElementById("validateForm").className += " was-validated";
    if (
      document.getElementById("invalidCheck").checked &&
      document.getElementById("PictureSelect").value != ""
    ) {
      this.setState({ loading: true });
      const adminObject = {
        Category: this.state.Categories,
        Title: this.state.ProductTitle,
        Amount: this.state.ProductAmount,
        Size: this.state.Sizes,
        ProductionBy: this.state.ProductionBy,
        ImageUrl: "",
        Rating: "1.5",
        Discription: this.state.Discription,
        UserId: "897498372",
        Status: "true",
        Style: this.state.Style,
        Discount: document.getElementById("discount").options[
          document.getElementById("discount").selectedIndex
        ].text
      };
      //uploading image
      await axios
        .post("/uploadProductImage", this.state.formData)
        .then(res => {
          adminObject.ImageUrl = res.data;
          //upload image info
          const { data: post } = axios
            .post("/creatNewProducts", adminObject)
            .then(res => {
              this.setState({ loading: false });
              toast.success("New Product is add");
            })
            .catch(err => {
              toast.error("Network issu");
              this.setState({ loading: false });
            });
        })
        .catch(err => {
          this.setState({ loading: false });
          toast.error("Networ issu");
          console.log(err);
        });
    } else {
      toast.error("Pleas select product picture");
    }
  };
  //Check all things
  ButtonCheck = () => {
    //check sizes
    this.state.Sizes = "";
    for (var i = 1; i <= 5; i++) {
      if (document.getElementById(i).checked) {
        this.state.Sizes += i + "/";
      }
    }
    // main conditions
    if (
      this.state.Categories == "" ||
      this.state.ProductTitle == "" ||
      this.state.ProductAmount == "" ||
      this.state.Sizes == "" ||
      this.state.ProductionBy == "" ||
      this.state.Discription == "" ||
      this.state.TotalAmount == "" ||
      this.state.formErrors.amount ||
      this.state.formErrors.category ||
      this.state.formErrors.title ||
      this.state.formErrors.productBy ||
      this.state.formErrors.discription
    ) {
      document.getElementById("submitButton").disabled = true;
    } else {
      document.getElementById("submitButton").disabled = false;
    }
  };
  //Upload image
  uploadImageHandler = () => {
    const fileInput = document.getElementById("PictureSelect");
    fileInput.click();
  };
  //All check
  allCheck = () => {
    if (this.state.allcheck == "0") {
      for (var i = 1; i <= 5; i++) {
        document.getElementById(i).checked = true;
      }
      this.state.allcheck = "1";
    } else {
      for (var i = 1; i <= 5; i++) {
        document.getElementById(i).checked = false;
      }
      this.state.allcheck = "0";
    }
    this.ButtonCheck();
  };
  //form Validation
  formValidation = event => {
    const id = event.target.id;
    switch (id) {
      case "style": {
        this.setState({ [event.target.name]: event.target.value });
        if (
          event.target.options[event.target.selectedIndex].text ==
          "Select style"
        ) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.style = "Style is no selected";
        } else {
          event.target.className = "form-control is-valid";
          this.state.Style =
            event.target.options[event.target.selectedIndex].text;
          this.state.formErrors = {};
          console.log(this.state.Style);
        }
        break;
      }
      case "category": {
        this.setState({ [event.target.name]: event.target.value });
        if (
          event.target.options[event.target.selectedIndex].text == "Categories"
        ) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.category = "Category is no selected";
          document.getElementById("style").disabled = true;
        } else {
          event.target.className = "form-control is-valid";
          this.state.Categories =
            event.target.options[event.target.selectedIndex].text;
          this.state.formErrors = {};
          this.state.AllStyle = [];
          //set all Style
          setStyle(event.target.options[event.target.selectedIndex].text).then(
            res => {
              document.getElementById("style").disabled = false;
              this.setState((this.state.AllStyle = res));
            }
          );
        }
        break;
      }
      case "discount": {
        this.setState({ [event.target.name]: event.target.value });
        const Discount = event.target.options[event.target.selectedIndex].text;
        this.state.TotalAmount =
          this.state.ProductAmount -
          (this.state.ProductAmount * Discount) / 100;
        document.getElementById("amount").value = this.state.TotalAmount;
        if (Discount != "0") {
          this.state.discount = `${(this.state.ProductAmount * Discount) /
            100}Rs`;
        } else {
          this.state.discount = "";
        }
        break;
      }
      case "title": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.match(/[^a-zA-Z ]/g, "")) {
          event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
        } else if (event.target.value.match(/  /g, "")) {
          event.target.value = event.target.value.replace(/  /g, "");
        } else if (event.target.value.length < 7) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.title = "Min digits 7";
        } else {
          event.target.className = "form-control is-valid";
          this.state.ProductTitle = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }
      case "amount": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.match(/[^0-9]/g, "")) {
          event.target.value = event.target.value.replace(/[^0-9]/g, "");
        } else if (event.target.value.lastIndexOf('0') === 0) {
          event.target.value = event.target.value.replace(0, "");
        } else if (event.target.value.match(/ /g, "")) {
          event.target.value = event.target.value.replace(/ /g, "");
        } else if (event.target.value.length < 4) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.amount = "Min digits 4";
          document.getElementById("discount").disabled = true;
          this.state.discount = "";
        } else {
          event.target.className = "form-control is-valid";
          this.state.ProductAmount = event.target.value;
          document.getElementById("discount").disabled = false;
          this.state.formErrors = {};
        }
        break;
      }
      case "productBy": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.match(/[^a-zA-Z ]/g, "")) {
          event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
        } else if (event.target.value.match(/  /g, "")) {
          event.target.value = event.target.value.replace(/  /g, "");
        } else if (event.target.value.length < 7) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.productBy = "Min digits 7";
        } else {
          event.target.className = "form-control is-valid";
          this.state.ProductionBy = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }
      case "discription": {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.match(/[^a-zA-Z ]/g, "")) {
          event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
        } else if (event.target.value.match(/  /g, "")) {
          event.target.value = event.target.value.replace(/  /g, "");
        } else if (event.target.value.length < 80) {
          event.target.className = "form-control is-invalid";
          this.state.formErrors.discription = "Min digits 80";
        } else {
          event.target.className = "form-control is-valid";
          this.state.Discription = event.target.value;
          this.state.formErrors = {};
        }
        break;
      }
    }
    this.ButtonCheck();
  };
  //Check onClick
  CheckHandel = () => {
    this.ButtonCheck();
  };
  //Did mount method
  async componentDidMount() {
    const { data: Categories } = await axios.get("/getAllCategories");
    if (this.props.Title != "") {
      document.getElementById("amount").value = this.props.Amount;
      document.getElementById("title").value = this.props.Title;
      document.getElementById("productBy").value = this.props.ProductionBy;
      document.getElementById("discription").value = this.props.Discription;
      document.getElementById("productImage").src = this.props.ImageUrl;
    }
    this.state.Catagories = Categories;
    this.setState(this.state.Catagories);
    if (this.state.Categories) {
      document.getElementById("submitButton").disabled = true;
      document.getElementById("style").disabled = true;
    }
  }
  render() {
    const Size = [
      { size: "S", id: "1" },
      { size: "L", id: "2" },
      { size: "M", id: "3" },
      { size: "XL", id: "4" },
      { size: "XXL", id: "5" }
    ];
    const Discount = [
      { Discount: "0" },
      { Discount: "10" },
      { Discount: "20" },
      { Discount: "25" },
      { Discount: "40" },
      { Discount: "45" },
      { Discount: "50" },
      { Discount: "70" },
      { Discount: "75" }
    ];
    const { loading } = this.state;
    const Check = this.props.Check;
    const ProductTitle = this.props.ProductTitle;
    const className = this.props.className;
    return (
      <div className={className}>
        <MDBRow>
          <MDBCol className="mx-auto float-none white z-depth-1 py-2 px-2">
            <MDBCardBody>
              <MDBCardTitle>{ProductTitle}</MDBCardTitle>
              <MDBRow>
                <MDBCol>
                  {this.state.formErrors.category && (
                    <MDBCol style={{ textAlign: "right" }}>
                      <MDBAnimation type="fadeInLeft" delay=".20s">
                        <Typography variant="caption" className="red-text">
                          {this.state.formErrors.category}
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
                  <MDBRow>
                    <MDBCol md="auto">
                      <MDBIcon icon="th-list" size="2x" />
                    </MDBCol>
                    <MDBCol style={{ paddingLeft: "3.3ch" }}>
                      <select
                        className="browser-default custom-select"
                        id="category"
                        onChange={this.formValidation}
                      >
                        <option value="1">Categories</option>
                        {this.state.Catagories.map(data => (
                          <option>{data.CategoriesId}</option>
                        ))}
                      </select>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol>
                  {this.state.formErrors.style && (
                    <MDBCol style={{ textAlign: "right" }}>
                      <MDBAnimation type="fadeInLeft" delay=".20s">
                        <Typography variant="caption" className="red-text">
                          {this.state.formErrors.style}
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
                  <MDBRow>
                    <MDBCol md="auto">
                      <MDBIcon icon="tshirt" size="2x" />
                    </MDBCol>
                    <MDBCol style={{ paddingLeft: "3.3ch" }}>
                      <select
                        className="browser-default custom-select"
                        id="style"
                        onChange={this.formValidation}
                      >
                        <option value="1">Select style</option>
                        {this.state.AllStyle.map(data => (
                          <option value={data}>{data}</option>
                        ))}
                      </select>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>

              <br />

              <MDBRow>
                <MDBCol md="7" style={{ marginTop: "1ch" }}>
                  <form
                    className="needs-validation"
                    noValidate
                    id="validateForm"
                  >
                    {/* PRODUCT TITLE */}
                    <ImportInput
                      id="title"
                      type="text"
                      lable="Product Title"
                      onChange={this.formValidation}
                      error={this.state.formErrors.title}
                      icon="heading"
                      maxLength="20"
                    />
                    <br />
                    {/* PRODUCT Amount */}
                    <MDBRow start>
                      <MDBCol md="1" style={{ paddingTop: "3ch" }}>
                        <MDBIcon icon="gem" size="2x" />
                      </MDBCol>
                      <MDBCol md="7" style={{ paddingLeft: "2.6ch" }}>
                        <MDBRow>
                          <MDBCol>
                            <Typography variant="body1">Amount</Typography>
                          </MDBCol>
                          {this.state.formErrors.amount && (
                            <MDBCol style={{ textAlign: "right" }}>
                              <MDBAnimation type="fadeInLeft" delay=".20s">
                                <Typography
                                  variant="caption"
                                  className="red-text"
                                >
                                  {this.state.formErrors.amount}
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
                        <div className="input-group">
                          <input
                            onChange={this.formValidation}
                            type="text"
                            maxLength="6"
                            id="amount"
                            className="form-control"
                            required
                          />
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="amount">
                              Rs
                            </span>
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol md="4" className="blue-text">
                        <MDBRow>
                          <MDBCol md="auto">Off</MDBCol>
                          <MDBCol>
                            {this.state.discount != "" && (
                              <MDBCol style={{ textAlign: "right" }}>
                                <MDBAnimation type="fadeInLeft" delay=".20s">
                                  <Typography variant="caption">
                                    {this.state.discount}
                                  </Typography>
                                </MDBAnimation>
                              </MDBCol>
                            )}
                          </MDBCol>
                        </MDBRow>

                        <div className="input-group">
                          <select
                            className="browser-default custom-select"
                            id="discount"
                            onChange={this.formValidation}
                            disabled
                          >
                            {Discount.map(data => (
                              <option>{data.Discount}</option>
                            ))}
                          </select>
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="amount">
                              %
                            </span>
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <br />
                    {/* PRODUCTION BY */}
                    <ImportInput
                      id="productBy"
                      type="text"
                      lable="Production By"
                      onChange={this.formValidation}
                      error={this.state.formErrors.productBy}
                      icon="fingerprint"
                      maxLength="15"
                    />
                    <br />

                    {/* Discription */}
                    <ImportInput
                      id="discription"
                      type="text"
                      lable="Discription"
                      onChange={this.formValidation}
                      error={this.state.formErrors.discription}
                      icon="text-width"
                      maxLength="150"
                    />
                    <br />
                    <MDBRow>
                      <MDBCol md="auto">
                        <Typography
                          variant="h6"
                          className="blue-text"
                          style={{ marginRight: "5ch" }}
                        >
                          <a onClick={this.allCheck}>All sizes</a>
                        </Typography>
                      </MDBCol>
                      <MDBCol>
                        <MDBRow>
                          {Size.map(data => (
                            <div
                              className="custom-control custom-checkbox pl-3"
                              style={{ marginRight: "1.5ch" }}
                            >
                              <input
                                className="custom-control-input"
                                type="checkbox"
                                id={data.id}
                                required
                                onClick={this.CheckHandel}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={data.id}
                                onClick={this.CheckHandel}
                              >
                                {data.size}
                              </label>
                            </div>
                          ))}
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBRow
                      className="custom-control custom-checkbox pl-3"
                      style={{ marginLeft: "1ch" }}
                    >
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
                        Allow Supper adim to check and block your product.
                        <MDBIcon
                          icon="check-double"
                          htmlFor="invalidCheck"
                          style={{ marginLeft: "0.5ch" }}
                        />
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </MDBRow>

                    <MDBRow>
                      {Check == "Update" && (
                        <MDBBtn color="info" onClick={this.props.Cancle}>
                          Cancle
                        </MDBBtn>
                      )}
                      <MDBBtn
                        color="info"
                        type="submit"
                        className="text-xs-left"
                        onClick={this.ButtonHandler}
                        id="submitButton"
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
                        {!loading && <span>{Check}</span>}
                      </MDBBtn>
                    </MDBRow>
                  </form>
                </MDBCol>
                <MDBCol md="5">
                  <div className="custom-file">
                    <MDBInput
                      type="file"
                      id="PictureSelect"
                      hidden="true"
                      onChange={this.pictureSelectHandler}
                    />
                  </div>
                  <MDBView waves onClick={this.uploadImageHandler}>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/noImage.png?alt=media"
                      className="img-fluid"
                      id="productImage"
                      alt=""
                      style={{ width: "100%", height: "40ch" }}
                    />
                  </MDBView>
                </MDBCol>
              </MDBRow>
              <Typography variant="caption">
                Admin can access darzi.com
              </Typography>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default NewProduct;
