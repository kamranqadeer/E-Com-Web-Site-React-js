import React, { Component } from "react";
import axios from "axios";
import Navigation from "./navbar";
import ClientFooter from "./footer";
//token check
import jwtDecode from "jwt-decode";
//toast laibrary
import { toast } from "react-toastify";
//Ui material links
import IconButton from "@material-ui/core/IconButton";
//using Typography
import Typography from "@material-ui/core/Typography";
//Nav bar
import SearchNav from "../client/NavSearchBar";
import LoadingPage from "./PageComponents/loadingPage.jsx";
//import Modal
import ConfirmOrderModel from "../client/PageComponents/ConfirmOrderModel.js";
// css
import "../assets/App.css";
//MDB
import {
  MDBCardImage,
  MDBIcon,
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBAnimation,
  MDBModal,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalBody
} from "mdbreact";
class Cart extends Component {
  state = {
    loading: false,
    modal1: false,
    cartData: [],
    Cart: [],
    number: 1,
    clientToken: localStorage.userSignInToken,
    check: localStorage.check,
    decodeToken: "",
    DeleteProductId: ""
  };
  //Main Dialogs togel
  toggle1 = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  //Delete Products
  DeleteProducts = async () => {
    this.setState({ loading: true });
    const cartData = this.state.cartData.filter(
      data => data.CartId !== this.state.DeleteProductId
    );
    this.setState({ cartData });
    //deleting form server
    axios
      .delete(`/removeCart/${this.state.DeleteProductId}`)
      .then(res => {
        this.setState({ loading: false });
        toast.success("Product remove from cart");
        let modalNumber = "modal" + 1;
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      })
      .catch(res => {
        this.setState({ loading: false });
        this.setState({ cartData: this.state.Cart });
        if (res.data >= 400 && res.data < 500) {
          toast.error("Some thing is wrong");
        } else {
          toast.error("Network prolem");
        }
      });
  };
  //Delete Products
  setDeleteProductId = id => {
    if (id != "") {
      let modalNumber = "modal" + 1;
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
      this.setState({ DeleteProductId: id });
    }
  };
  //Increment
  increment = data => {
    if (this.state.number < 12) {
      document.getElementById("subTotal").textContent = "0 Rs";
      document.getElementById("totalAmount").textContent = "0 Rs";
      document.getElementById("invalidCheck1").checked = false;
      this.state.cartData.map(data => {
        document.getElementById(data.CartId).checked = false;
      });
      document.getElementById(data.CartId + "count").textContent = ++this.state
        .number;
      if (this.state.number > 1) {
        document.getElementById(
          data.CartId + "amount"
        ).textContent = `${parseInt(
          data.Amount.split("/", 1) -
            parseInt(
              (data.Amount.split("/", 1) * parseInt(data.Discount)) / 100
            )
        ) +
          parseInt(
            document
              .getElementById(data.CartId + "amount")
              .textContent.split("/", 1)
          )} Rs`;
      }
    }
  };
  //decrement
  decrement = data => {
    if (this.state.number > 1) {
      document.getElementById("subTotal").textContent = "0 Rs";
      document.getElementById("totalAmount").textContent = "0 Rs";
      document.getElementById("invalidCheck1").checked = false;
      this.state.cartData.map(data => {
        document.getElementById(data.CartId).checked = false;
      });
      document.getElementById(data.CartId + "count").textContent = --this.state
        .number;
      if (this.state.number < 13) {
        document.getElementById(
          data.CartId + "amount"
        ).textContent = `${parseInt(
          document
            .getElementById(data.CartId + "amount")
            .textContent.split("/", 1)
        ) +
          parseInt(
            (data.Amount.split("/", 1) * parseInt(data.Discount)) / 100
          ) -
          parseInt(data.Amount.split("/", 1))} Rs`;
      }
    }
  };
  //Allcheck
  Allcheck = event => {
    if (event.target.checked) {
      var sum = 0;
      this.state.cartData.map(data => {
        document.getElementById(data.CartId).checked = true;
        sum += parseInt(
          document
            .getElementById(data.CartId + "amount")
            .textContent.split(" ", 1)
        );
      });
      document.getElementById("subTotal").textContent = sum + " Rs";
      document.getElementById("totalAmount").textContent = sum + 200 + " Rs";
    } else {
      this.state.cartData.map(data => {
        document.getElementById(data.CartId).checked = false;
        document.getElementById("subTotal").textContent = "0 Rs";
        document.getElementById("totalAmount").textContent = "0 Rs";
      });
    }
  };
  //starting all check
  startAllCheck = () => {
    var sum = 0;
    this.state.cartData.map(data => {
      document.getElementById(data.CartId).checked = true;
      sum += parseInt(
        document
          .getElementById(data.CartId + "amount")
          .textContent.split(" ", 1)
      );
    });
    document.getElementById("subTotal").textContent = sum + " Rs";
    document.getElementById("totalAmount").textContent = sum + 200 + " Rs";
  };
  //CheckBox
  CheckBox = data => {
    document.getElementById("invalidCheck1").checked = false;
    if (!document.getElementById(data.CartId).checked) {
      document.getElementById(data.CartId).checked = false;
      var amount =
        parseInt(
          document.getElementById("subTotal").textContent.split(" ", 1)
        ) -
        parseInt(
          document
            .getElementById(data.CartId + "amount")
            .textContent.split(" ", 1)
        );
      document.getElementById("subTotal").textContent = amount + " Rs";
      document.getElementById("totalAmount").textContent = amount + " Rs";
    } else {
      document.getElementById(data.CartId).checked = true;
      var amount =
        parseInt(
          document.getElementById("subTotal").textContent.split(" ", 1)
        ) +
        parseInt(
          document
            .getElementById(data.CartId + "amount")
            .textContent.split(" ", 1)
        );
      document.getElementById("subTotal").textContent = amount + " Rs";
      document.getElementById("totalAmount").textContent = amount + 200 + " Rs";
    }
  };
  //TOGAL
  toggle = () => {
    if (document.getElementById("totalAmount").textContent != "0 Rs") {
      var quantity = 0,
        productIds = "",
        totalAmount = document.getElementById("totalAmount").textContent;
      // get All products id or Quantity
      this.state.cartData.map(data => {
        if (document.getElementById(data.CartId).checked) {
          productIds = `${data.CartId} ${this.state.productIds}`;
          ++quantity;
        }
      });
      if (this.child) {
        this.child.toggle(totalAmount, productIds, quantity);
      }
    } else {
      toast.error("First select product");
    }
  };
  async componentDidMount() {
    this.state.data = this.props.location.data;
    if (this.state.clientToken) {
      this.state.decodeToken = jwtDecode(this.state.clientToken);
    }
    //setting specific data in array
    const { data: cartData } = await axios.get("/getCart");
    cartData.map(cart => {
      if (this.state.decodeToken.user_id == cart.UserId) {
        this.state.cartData.push(cart);
      }
    });
    this.setState(cartData);
    this.setState({ Cart: this.state.cartData });
    //check all
    this.startAllCheck();
  }
  render() {
    const { loading } = this.state;
    const NaveSearchText = "";
    const NaveSearch = "none";
    return (
      <div>
        {/* Delete dialog */}
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle1(1)}>
          <MDBModalHeader toggle={this.toggle1(1)}>
            <Typography variant="h4" className="red-text">
              <MDBIcon
                style={{ marginRight: "0.2ch" }}
                icon="exclamation-triangle"
                className="red-text"
              />
              Delete
            </Typography>
          </MDBModalHeader>
          <MDBModalBody>
            <Typography variant="body1">
              You want to delete this Product in cart!
            </Typography>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary" onClick={this.toggle1(1)}>
              Close
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={this.DeleteProducts}
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
              {!loading && <span>Delete</span>}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <Navigation />
        <hr className="hr" />
        {/* Nave bar */}
        <SearchNav NaveSearchText={NaveSearchText} NaveSearch={NaveSearch} />
        <LoadingPage
          decodeToken={this.state.decodeToken}
          check={this.state.check}
        />
        {/* Confirm Order Model */}
        <ConfirmOrderModel ref={ref => (this.child = ref)} />
        {this.state.decodeToken && (
          <MDBContainer style={{ marginTop: "2ch" }}>
            <MDBRow center>
              <MDBCol md="8" className="mb-3">
                <MDBAnimation type="fadeInLeft" delay="0.9s">
                  <MDBCard
                    style={{
                      height: "12ch",
                      width: "100%",
                      marginBottom: "2ch"
                    }}
                  >
                    <MDBContainer style={{ margin: "2.5ch" }}>
                      <Typography variant="h5" style={{ marginBottom: "1ch",marginLeft:"-0.4ch" }}>
                      Shopping cart
                      </Typography>
                      <div className="custom-control custom-checkbox pl-3">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck1"
                          onClick={this.Allcheck}
                          required
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="invalidCheck1"
                        >
                          Select all
                        </label>
                      </div>
                    </MDBContainer>
                  </MDBCard>
                  {this.state.cartData.map(tile => (
                    <MDBCard
                      style={{
                        padding: "4ch",
                        marginBottom: "1ch"
                      }}
                    >
                      <MDBRow center>
                        <MDBCol md="auto">
                          <div className="custom-control custom-checkbox pl-3">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              value=""
                              id={tile.CartId}
                              onClick={this.CheckBox.bind(this, tile)}
                              required
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={tile.CartId}
                            />
                          </div>
                        </MDBCol>
                        <MDBCol>
                          <MDBCardImage
                            src={tile.ImageUrl}
                            alt={tile.Title}
                            waves
                            style={{ height: "30ch", width: "20ch" }}
                          />
                        </MDBCol>
                        <MDBCol md="7">
                          <MDBRow height="5ch">
                            <MDBCol md="10">
                              <Typography variant="h5" className="blue-text">
                                {tile.Title}
                              </Typography>
                            </MDBCol>
                            <MDBCol md="2">
                              <IconButton
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={this.setDeleteProductId.bind(
                                  this,
                                  tile.CartId
                                )}
                              >
                                <MDBIcon
                                  icon="trash-alt"
                                  className="red-text"
                                />
                              </IconButton>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <Typography variant="h7">
                            {tile.Discription}
                          </Typography>
                          <MDBRow>
                            <MDBCol>
                              <Typography
                                variant="h5"
                                className="blue-text"
                                id={tile.CartId + "amount"}
                                style={{ marginTop: "0.5ch" }}
                              >
                                {parseInt(tile.Amount) -
                                  (parseInt(tile.Amount) *
                                    parseInt(tile.Discount)) /
                                    100}
                              </Typography>
                              <MDBRow start style={{ paddingLeft: "2ch" }}>
                                <Typography
                                  variant="body1"
                                  style={{
                                    textDecoration: "line-through",
                                    marginTop: "0.5ch"
                                  }}
                                >
                                  {tile.Amount}
                                </Typography>

                                <Typography
                                  variant="subtitle1"
                                  className="blue-text"
                                  style={{ margin: "0.3ch" }}
                                >
                                  {tile.Discount}% Discount
                                </Typography>
                              </MDBRow>
                              <MDBRow between style={{ paddingLeft: "2ch" }}>
                                <Typography variant="subtitle1">
                                  Size:{tile.Size}
                                </Typography>
                                <Typography variant="subtitle1">
                                  Style:{tile.Style}
                                </Typography>
                              </MDBRow>
                            </MDBCol>
                            <MDBCol md="auto">
                              <MDBRow>
                                <IconButton
                                  aria-label="show 17 new notifications"
                                  color="inherit"
                                  onClick={this.decrement.bind(this, tile)}
                                >
                                  <MDBIcon
                                    icon="minus-circle"
                                    className="black-text"
                                  />
                                </IconButton>
                                <Typography
                                  variant="body1"
                                  className="blue-text"
                                  style={{ alignSelf: "center" }}
                                  id={tile.CartId + "count"}
                                >
                                  1
                                </Typography>
                                <IconButton
                                  aria-label="show 17 new notifications"
                                  color="inherit"
                                  onClick={this.increment.bind(this, tile)}
                                >
                                  <MDBIcon
                                    icon="plus-circle"
                                    className="black-text"
                                  />
                                </IconButton>
                              </MDBRow>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <Typography
                            variant="body2"
                            href="#"
                            className="red-text"
                          >
                            Pakistan: 200 /-Rs via Darzi.com Standard Shipping
                            Estimated Delivery Time:21-39 Days
                          </Typography>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  ))}
                </MDBAnimation>
              </MDBCol>

              <MDBCol md="4">
                <MDBCard
                  style={{
                    height: "30ch",
                    width: "50ch",
                    padding: "2ch",
                    position: "fixed"
                  }}
                >
                  <MDBContainer style={{ margin: "2ch" }}>
                    <Typography variant="h4" style={{ marginBottom: "1ch" }}>
                      Order Summary
                    </Typography>
                    <MDBRow between>
                      <MDBCol>
                        <Typography variant="body">Sub-Total</Typography>
                      </MDBCol>
                      <MDBCol>
                        <Typography variant="body" id="subTotal">
                          0 Rs
                        </Typography>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow between>
                      <MDBCol>
                        <Typography variant="body">Delivery charges</Typography>
                      </MDBCol>
                      <MDBCol>
                        <Typography variant="body" id="diliveryCharges">
                          200 Rs
                        </Typography>
                      </MDBCol>
                    </MDBRow>
                    <div
                      style={{
                        height: "0.1ch",
                        width: "100%",
                        backgroundColor: "black"
                      }}
                    />
                    <MDBRow between style={{ marginTop: "2ch" }}>
                      <MDBCol>
                        <Typography variant="h6" className="red-text">
                          Total Amount
                        </Typography>
                      </MDBCol>
                      <MDBCol>
                        <Typography variant="body" id="totalAmount">
                          0 Rs
                        </Typography>
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn
                      color="primary"
                      onClick={this.toggle}
                      className="Border LargeButton"
                    >
                      Confirm order
                    </MDBBtn>
                  </MDBContainer>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
        <div style={{ marginBottom: "50ch" }} />
        <ClientFooter />
      </div>
    );
  }
}

export default Cart;
