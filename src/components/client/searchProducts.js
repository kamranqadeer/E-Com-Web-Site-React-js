import React, { Component } from "react";
import axios from "axios";
import Navigation from "./navbar";
import ClientFooter from "./footer";
//Ui material links
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import GridList from "@material-ui/core/GridList";
//using Typography
import Typography from "@material-ui/core/Typography";
//token decoder
import jwtDecode from "jwt-decode";
//Nave
import SearchNav from "../client/NavSearchBar";
//rating bootstrap
import StarRatings from "react-star-ratings";
//toast laibrary
import { toast } from "react-toastify";
//loading page
import LoadingPage from "./PageComponents/loadingPage.jsx";
//MDB
import {
  MDBCardImage,
  MDBIcon,
  MDBContainer,
  MDBModal,
  MDBBtnGroup,
  MDBBtn,
  MDBModalFooter,
  MDBView,
  MDBModalBody,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBAnimation,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCardBody
} from "mdbreact";

class SearchProducts extends Component {
  state = {
    Products: [],
    data: [],
    productName: localStorage.product,
    clientToken: localStorage.userSignInToken,
    decodeToken: "",
    SearchData: [],
    DialogIImage: "",
    ProductTitle: "",
    ProductionBy: "",
    ProductAmount: "",
    ProductRating: "",
    loading: false
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
  async componentDidMount() {
    if (this.state.clientToken) {
      this.state.decodeToken = jwtDecode(this.state.clientToken);
    }
    const { data: Products } = await axios.get("/getProducts");
    Products.map(data => {
      if (data.Category == this.state.productName) {
        this.state.Products.push(data);
      } else if (data.ProductionBy == this.state.productName) {
        this.state.Products.push(data);
      }
    });
    this.setState(this.state.Products);
    this.setState({ SearchData: Products });
  }
  //Search handel
  SearchHandle = event => {
    let searchProducts = [];
    if (event.target.value === "") {
      this.state.Products = [];
      this.state.Products = this.state.SearchData;
      this.setState(this.state.Products);
    } else {
      this.state.Products.map(data => {
        if (
          data.Title.toLowerCase().startsWith(event.target.value.toLowerCase())
        ) {
          searchProducts.push(data);
        }
      });
      if (searchProducts) {
        this.state.Products = [];
        this.state.Products = searchProducts;
        this.setState(this.state.Products);
      } else {
      }
    }
  };
  // Product dialog //All products
  AllProduct = data => {
    this.state.data = data;
    if (data != "") {
      this.state.DialogIImage = data.ImageUrl;
      this.state.ProductTitle = data.Title;
      this.state.ProductAmount = data.Amount;
      this.state.ProductionBy = data.ProductionBy;
      this.state.ProductRating = data.ProductRating;
      let modalNumber = "modal" + 1;
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }
  };
  // Product dialog //Go to darzi
  goToDarzi = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  // Product dialog //Add r=to buy
  addToBuy = nr => () => {
    if (this.state.clientToken) {
      this.props.history.push({
        pathname: "/Buy",
        data: this.state.data
      });
      localStorage.setItem("product", this.state.data.ProductsId);
    } else {
      toast.error("pleas login");
      if (nr == "2") {
        let modalNumber2 = "modal" + ++nr;
        this.setState({
          [modalNumber2]: !this.state[modalNumber2]
        });
      }
      let modalNumber = "modal" + nr;
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
      //Open login dialog
      if (this.child) {
        this.child.signInRout();
      }
    }
  };
  render() {
    const NaveSearchText = "";
    const NaveSearch = "none";
    const { loading } = this.state;
    return (
      <div>
        <Navigation />
        <hr className="hr" />
        {/* Dialog model */}
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBCard>
            <MDBRow style={{ margin: "1ch" }}>
              <MDBCol>
                <Typography variant="h5" className="blue-text">
                  {this.state.ProductionBy} ( {this.state.ProductTitle} )
                </Typography>
                <MDBRow between>
                  <MDBCol>
                    <Typography variant="body1" className="red-text">
                      {this.state.ProductAmount} only
                    </Typography>
                  </MDBCol>
                  <MDBCol>
                    <StarRatings
                      rating={2.403}
                      starRatedColor="red"
                      starDimension="20px"
                      starSpacing="5px"
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md="auto">
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={this.toggle(1)}
                >
                  <MDBIcon icon="times-circle" size="1.3x" />
                </IconButton>
              </MDBCol>
            </MDBRow>
          </MDBCard>
          <MDBModalBody>
            <MDBCardImage
              src={this.state.DialogIImage}
              className="img-fluid"
              id="productsDialod"
              style={{ height: "40ch", width: "70ch" }}
            />
          </MDBModalBody>
          <MDBBtnGroup style={{ margin: "1ch", padding: "1ch" }}>
            <MDBBtn color="primary" onClick={this.addToBuy(1)}>
              Buy now
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.goToDarzi(1)}>
              Darzi point
            </MDBBtn>
          </MDBBtnGroup>
        </MDBModal>
        <SearchNav
          SearchHandle={this.SearchHandle}
          NaveSearchText={NaveSearchText}
          NaveSearch={NaveSearch}
        />
        <MDBEdgeHeader className="searchProduct">
          <MDBContainer>
            <h1 className="white-text ProductUperText ">
              Hi ... Welcome to Darzi.com
            </h1>
            <Typography variant="h4" className="white-text">
              Enjoy special prices & get discount
            </Typography>
            <MDBRow center style={{ marginTop: "2ch" }} className="white-text">
              <Typography variant="body2" style={{ marginRight: "1ch" }}>
                <MDBIcon
                  className="yellow-text"
                  icon="dollar-sign"
                  style={{ marginRight: "0.5ch" }}
                  size="2x"
                />
                Money back Guarantee
              </Typography>
              <Typography variant="body2" style={{ marginRight: "1ch" }}>
                <MDBIcon
                  className="yellow-text"
                  icon="chalkboard"
                  style={{ marginRight: "0.5ch" }}
                  size="2x"
                />
                Easy to use
              </Typography>
              <Typography variant="body2" style={{ marginRight: "1ch" }}>
                <MDBIcon
                  className="yellow-text"
                  icon="shuttle-van"
                  style={{ marginRight: "0.5ch" }}
                  size="2x"
                />
                Home Delivery
              </Typography>
            </MDBRow>
          </MDBContainer>
        </MDBEdgeHeader>

        <LoadingPage
          decodeToken={this.state.SearchData == "" ? null : "kk"}
          check={1}
        />
          {this.state.SearchData && (
            <MDBFreeBird>
            <MDBRow style={{marginLeft:"2ch"}}>
            {this.state.Products.map(data => (
              <div
                style={{ marginBottom: "2ch", textAlign: "center" }}
                onClick={this.AllProduct.bind(this, data)}
              >
                <Typography
                  variant="subtitle1"
                  className="blue-text"
                  style={{ marginBottom: "-0.8ch" }}
                >
                  {data.Title}
                </Typography>
                <MDBCardImage
                  src={data.ImageUrl}
                  className="img-fluid z-depth-1 MainProducts hoverable"
                  alt=""
                  id="setProductImage"
                />
                <Typography
                  variant="h5"
                  className="blue-text"
                  id="totalAmount"
                  style={{ marginTop: "-0.5ch" }}
                >
                  {parseInt(data.Amount) -
                    (parseInt(data.Amount) * parseInt(data.Discount)) / 100}
                  Rs
                </Typography>
                <Typography
                  variant="subtitle1"
                  className="red-text"
                  style={{ textDecoration: "line-through" }}
                >
                  {data.Amount} Rs
                </Typography>
              </div>
            ))}
          </MDBRow>
            </MDBFreeBird>
          )}

        <ClientFooter />
      </div>
    );
  }
}

export default SearchProducts;
