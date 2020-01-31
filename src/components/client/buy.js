import React, { Component } from "react";
import axios from "axios";
import Navigation from "./navbar";
import ClientFooter from "./footer";
//Loading page
import MoreProductLoading from "../assets/loadingPage.gif";
//Ui material links
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import GridList from "@material-ui/core/GridList";
//using Typography
import Typography from "@material-ui/core/Typography";
//Search nave
import SearchNav from "../client/NavSearchBar";
//import Modal
import ConfirmOrderModel from "../client/PageComponents/ConfirmOrderModel.js";
//token decoder
import jwtDecode from "jwt-decode";
//Toast
import { toast } from "react-toastify";
//Loading page
import LoadingPage from "./PageComponents/loadingPage.jsx";
// styles
import Actions, { setStyle } from "../Actions/Actions.js";
//react ui
import { Button } from "react-bootstrap";
//MDB
import {
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBRow,
  MDBCol,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBBtnGroup,
  MDBAnimation,
  MDBModal
} from "mdbreact";
class Buy extends Component {
  state = {
    loading: false,
    loadingPage: false,
    MainProduct: [],
    MainTempProduct: [],
    Size1: [],
    AllStyle: [],
    CategoryStyle: [],
    MoreProducts: [],
    ProductionBy: "",
    ImageUrl: "",
    number: 1,
    AmountTotal: "",
    clientToken: localStorage.userSignInToken,
    decodeToken: "",
    style: "",
    HideMe: false,
    Animation: true,
    ScrollingCheck: "",
    outline: true
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  addCartDialogButton = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  //Increment
  increment = () => {
    if (this.state.number < 5) {
      document.getElementById("count").textContent = ++this.state.number;
      document.getElementById("totalAmount").textContent =
        parseInt(document.getElementById("totalAmount").textContent) +
        parseInt(this.state.AmountTotal);
    }
  };
  //decrement
  decrement = () => {
    if (this.state.number > 1) {
      document.getElementById("count").textContent = --this.state.number;
      document.getElementById("totalAmount").textContent =
        parseInt(document.getElementById("totalAmount").textContent) -
        parseInt(this.state.AmountTotal);
    }
  };
  //onMouseEnter
  onMouseEnter = data => {
    //adding id on local data base
    localStorage.setItem("product",data.ProductsId);
    this.state.Size1 = [];
    document.getElementById("mainImage").src = data.ImageUrl;
    this.state.MainProduct = [];
    this.state.MainProduct = data;
    this.setState(this.state.MainProduct);
    this.Sizes();
    this.setState({ Animation: true });
    //Hide main product button
    document.getElementById("Button").style.display = "";
  };
  //handleMouseLeave
  OldProduct = () => {
    this.state.Size1 = [];
    // document.getElementById("Hang").type = "hinge";
    document.getElementById("mainImage").src = this.state.MainProduct.ImageUrl;
    this.state.MainProduct = [];
    this.state.MainProduct = this.state.MainTempProduct;
    this.setState(this.state.MainProduct);
    this.Sizes();
    this.setState({ Animation: false });
    //Hide main product button
    document.getElementById("Button").style.display = "none";
  };
  //SizeButton
  SizeButton = event => {
    this.state.Size1.map(data => {
      if (data.size == event.target.id) {
        document.getElementById(data.size).className =
          "SmallButton btn btn-info";
        document.getElementById("size").textContent = event.target.id;
      } else {
        document.getElementById(data.size).className =
          "SmallButton btn btn-outline-info";
      }
    });
  };
  //ConfirmOrder
  ConfirmOrderModel = () => {
    if (this.child && document.getElementById("size").textContent != "Size") {
      const totalAmount = document.getElementById("totalAmount").textContent;
      const id = localStorage.product;
      this.child.toggle(totalAmount, id, "1");
    } else {
      toast.error("First select size");
    }
  };
  // Product dialog //Add to cart
  addToCart = async () => {
    if (document.getElementById("size").textContent == "Select product size") {
      toast.error("Size is not selected");
    } else if (this.state.clientToken) {
      //Loading page
      this.setState({ loadingPage: true });
      //this is for button loading
      this.setState({ loading: true });

      if (!this.state.decodeToken.exp * 1000 < Date.now()) {
        // adding in cart
        const adminObject = {
          ProductId: localStorage.product,
          Category: this.state.MainProduct.Category,
          Title: this.state.MainProduct.Title,
          Amount: this.state.MainProduct.Amount,
          Size: document.getElementById("size").textContent,
          ProductionBy: this.state.MainProduct.ProductionBy,
          ImageUrl: this.state.MainProduct.ImageUrl,
          Rating: this.state.MainProduct.Rating,
          Discription: this.state.MainProduct.Discription,
          UserId: this.state.decodeToken.user_id,
          Discount: this.state.MainProduct.Discount,
          Style: this.state.style
        };
        const { data: CartData } = await axios.get(`getCart`);
        var check = 0;
        CartData.map(data => {
          if (
            data.ProductId == localStorage.product &&
            data.UserId == this.state.decodeToken.user_id
          ) {
            ++check;
          }
        });
        if (check == "0") {
           await axios
            .post("/addCart", adminObject)
            .then(r => {
              //off loading page
              this.setState({ loadingPage: false });
              this.setState({ loading: false });
              toast.success("Added in Cart");
            });
        } else {
          //off loading page
          this.setState({ loadingPage: false });
          toast.error("This product already added in cart");
          this.setState({ loading: false });
        }
      } else {
        //off loading page
        this.setState({ loadingPage: false });
        toast.error("For security you login again");
        this.setState({ loading: false });
      }
    } else {
      //off loading page
      this.setState({ loadingPage: false });
      toast.error("pleas login");
      this.setState({ loading: false });
    }
  };
  //Set Sizes
  Sizes = () => {
    const Size = this.state.MainProduct.Size.split("/", 5);
    for (var i = 0; i <= Size.length; i++) {
      if (Size[i] == 1) {
        this.state.Size1.push({ size: "S" });
      } else if (Size[i] == 2) {
        this.state.Size1.push({ size: "M" });
      } else if (Size[i] == 3) {
        this.state.Size1.push({ size: "L" });
      } else if (Size[i] == 4) {
        this.state.Size1.push({ size: "XL" });
      } else if (Size[i] == 5) {
        this.state.Size1.push({ size: "XXL" });
      }
    }
  };
  //Select style
  SelectStyle = event => {
    this.state.AllStyle.map(data => {
      if (`button_${data}` == event.target.id) {
        document.getElementById(`button_${data}`).className =
          "MediumButton btn btn-info Border";
        this.state.style = data;
        this.MoreProduct(data);
      } else {
        document.getElementById(`button_${data}`).className =
          "MediumButton btn btn-outline-info Border";
      }
    });
  };
  //More Catagory Products
  MoreProduct = async Style => {
    let ProductList = [];
    const { data: Products } = await axios.get("/getProducts");
    Products.map(data => {
      if (
        data.Category == this.state.MainProduct.Category &&
        data.Style == Style
      ) {
        ProductList.push(data);
      }
    });
    this.setState({ MoreProducts: ProductList });
  };
  //set Catagori Style
  CategoryStyle = async Category => {
    this.state.CategoryStyle = [];
    var i = 1;
    const { data: Products } = await axios.get("/getProducts");
    Products.map(data => {
      if (data.Category == Category) {
        this.state.CategoryStyle.push({
          ImageUrl: `${data.ImageUrl}`,
          index: i++
        });
      }
    });
    this.setState(this.state.CategoryStyle);
  };
  //MoreStyle
  MoreStyle = () => {
    if (this.state.HideMe) {
      this.setState({ HideMe: false });
      this.setState({ outline: true });
    } else {
      this.setState({ HideMe: true });
      this.setState({ outline: false });
    }
  };
  // SetMore Products
  SetMoreProduc = async (Style, Category) => {
    const { data: Products } = await axios.get("/getProducts").then();
    Products.map(data => {
      if (data.Category == Category && data.Style == Style) {
        this.state.MoreProducts.push(data);
      }
    });
    this.setState(this.state.MoreProducts);
  };
  //Mount method
  async componentDidMount() {
    //geting product is
    const id = localStorage.product;
    //Main Product work
    const { data: Product } = await axios.get(`getOneProducts/${id}`);
    this.state.MainProduct = Product;
    if (this.state.clientToken) {
      this.state.decodeToken = jwtDecode(this.state.clientToken);
    }
    this.Sizes();
    //set all Style
    setStyle(Product.Category).then(res => {
      this.setState((this.state.AllStyle = res));
    });
    //set Category style
    this.CategoryStyle(Product.Category);
    this.SetMoreProduc(Product.Style, Product.Category);
    this.setState(this.state.MainProduct);
    //set a temp product
    this.setState({ MainTempProduct: this.state.MainProduct });
    //set var with total
    this.state.AmountTotal = document.getElementById("totalAmount").textContent;
    //Hide main product button
    document.getElementById("Button").style.display = "none";
  }
  render() {
    const { loading } = this.state;
    const NaveSearchText = "";
    const NaveSearch = "none";
    const image = this.state.MainProduct.ImageUrl;
    return (
      <div
        style={{
          pointerEvents: this.state.loadingPage ? "none" : "",
          opacity: this.state.loadingPage ? "0.5" : ""
        }}
      >
        <Navigation />
        <hr className="hr" />
        {/* Nave bar */}
        <SearchNav NaveSearchText={NaveSearchText} NaveSearch={NaveSearch} />
        <hr className="hr" />
        {/* Confirm Order Model */}
        <ConfirmOrderModel ref={ref => (this.child = ref)} />
        {/* Loading Page */}
        <LoadingPage decodeToken={image} check="1" />
        {image && (
          <MDBAnimation type="fadeInLeft" delay=".10s">
            <MDBRow
              style={{
                marginTop: "5ch",
                marginRight: "10ch",
                marginLeft: "10ch"
              }}
            >
              <MDBCol md="9">
                <MDBRow>
                  <MDBCol md="4">
                    <MDBRow id="Button">
                      <MDBBtn
                        outline
                        color="info"
                        size="sm"
                        style={{ width: "100%" }}
                        onClick={this.OldProduct}
                      >
                        Main Product
                      </MDBBtn>
                    </MDBRow>

                    <MDBRow>
                      {this.state.Animation && (
                        <MDBAnimation type="zoomIn" delay=".5s">
                          <MDBCardImage
                            className="img-fluid"
                            src={this.state.ImageUrl}
                            waves
                            style={{ height: "40ch", width: "100%" }}
                            id="mainImage"
                          />
                        </MDBAnimation>
                      )}
                      {!this.state.Animation && (
                        <MDBAnimation type="flipInY" delay=".5s">
                          <MDBCardImage
                            className="img-fluid"
                            src={this.state.ImageUrl}
                            waves
                            style={{ height: "40ch", width: "100%" }}
                            id="mainImage"
                          />
                        </MDBAnimation>
                      )}
                    </MDBRow>
                    <MDBRow style={{ marginTop: "1ch" }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-around",
                          overflow: "hidden",
                          backgroundColor: "transparent"
                        }}
                      >
                        <GridList
                          style={{
                            flexWrap: "nowrap",
                            transform: "translateZ(0)"
                          }}
                          cols={7}
                        >
                          {this.state.MoreProducts.map(data => (
                            <GridListTile
                              key={data.ImageUrl}
                              style={{ height: "7ch" }}
                            >
                              <MDBView
                                waves
                                onMouseEnter={this.onMouseEnter.bind(
                                  this,
                                  data
                                )}
                              >
                                <img
                                  src={data.ImageUrl}
                                  style={{ height: "6ch" }}
                                />
                              </MDBView>
                            </GridListTile>
                          ))}
                        </GridList>
                      </div>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="7">
                    <Typography
                      variant="h5"
                      component="subtitle1"
                      className="blue-text"
                    >
                      {this.state.Title} ( {this.state.ProductionBy} )
                    </Typography>
                    <hr />
                    <MDBBtn
                      outline={this.state.outline}
                      onClick={this.MoreStyle}
                      color="info"
                      className="MediumButton Border"
                    >
                      More styles
                    </MDBBtn>
                    {this.state.HideMe && (
                      <MDBAnimation
                        type="fadeInRight"
                        delay=".10s"
                        style={{ marginTop: "1ch", marginLeft: "1.5ch" }}
                      >
                        <MDBRow>
                          {this.state.AllStyle.map(data => (
                            <MDBBtn
                              outline
                              onClick={this.SelectStyle}
                              id={`button_${data}`}
                              color="info"
                              className="MediumButton Border"
                            >
                              {data}
                            </MDBBtn>
                          ))}
                        </MDBRow>
                      </MDBAnimation>
                    )}
                    <hr />
                    <Typography variant="h6">
                      {this.state.Discription}
                    </Typography>
                    <hr />
                    <MDBRow>
                      <MDBCol>
                        <MDBRow style={{ paddingLeft: "1.5ch" }}>
                          <Typography
                            variant="h4"
                            className="blue-text"
                            id="totalAmount"
                          >
                            {parseInt(this.state.Amount) -
                              (parseInt(this.state.Amount) *
                                parseInt(this.state.Discount)) /
                                100}
                          </Typography>
                          Rs
                        </MDBRow>

                        <Typography
                          variant="subtitle1"
                          className="red-text"
                          style={{ textDecoration: "line-through" }}
                        >
                          {this.state.Amount} Rs
                        </Typography>
                        <Typography variant="subtitle1" className="red-text">
                          {this.state.Discount}% discounte
                        </Typography>
                      </MDBCol>
                      <MDBCol style={{ textAlign: "center" }}>
                        Quntity
                        <MDBRow center>
                          <IconButton
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={this.decrement}
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
                            id={"count"}
                          >
                            1
                          </Typography>
                          <IconButton
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={this.increment}
                          >
                            <MDBIcon
                              icon="plus-circle"
                              className="black-text"
                            />
                          </IconButton>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol end>
                        <MDBRow style={{ marginBottom: "0.5ch" }}>
                            <Typography
                              variant="subtitle"
                              className="red-text"
                              id="size"
                            >
                              Select product size
                            </Typography>
                        </MDBRow>
                        <MDBBtnGroup>
                          {this.state.Size1.map(data => (
                            <MDBBtn
                              outline
                              color="info"
                              className="SmallButton"
                              id={data.size}
                              onClick={this.SizeButton}
                            >
                              {data.size}
                            </MDBBtn>
                          ))}
                        </MDBBtnGroup>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow style={{ marginTop: "1.8ch", marginLeft: "0.4ch" }}>
                      <MDBBtnGroup center>
                        <MDBBtn
                          color="info"
                          onClick={this.ConfirmOrderModel}
                          outline
                          className="LargeButton Border"
                        >
                          Confirm order
                        </MDBBtn>
                        <MDBBtn
                          color="info"
                          onClick={this.addToCart}
                          outline
                          className="LargeButton Border"
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
                          {!loading && <span> Add to cart</span>}
                        </MDBBtn>
                        <MDBBtn
                          color="info"
                          outline
                          className="LargeButton Border"
                        >
                          Go to darzi
                        </MDBBtn>
                      </MDBBtnGroup>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md="3">
                <h3 className="blue-text ProductUperText">New styles</h3>
                {this.state.CategoryStyle.length && (
                  <MDBCarousel
                    activeItem={1}
                    length={this.state.CategoryStyle.length}
                    showControls={true}
                    showIndicators={true}
                    className="z-depth-1"
                  >
                    <MDBCarouselInner>
                      {this.state.CategoryStyle.map(data => (
                        <MDBCarouselItem itemId={data.index}>
                          <MDBView>
                            <MDBCardImage
                              style={{ width: "100%" }}
                              src={data.ImageUrl}
                              alt="First slide"
                              height="500ch"
                            />
                          </MDBView>
                        </MDBCarouselItem>
                      ))}
                    </MDBCarouselInner>
                  </MDBCarousel>
                )}
              </MDBCol>
            </MDBRow>
          </MDBAnimation>
        )}
        <ClientFooter />
      </div>
    );
  }
}

export default Buy;
