import React, { Component } from "react";
import Navigation from "./navbar";
//toast laibrary
import { toast } from "react-toastify";
//axios laibary
import axios from "axios";
//picture loder
import pictureLoader from "../assets/pictureLoading.gif";
//all iconn
import DarziIcon from "../assets/DarziIcon.png";
import KurtaIcon from "../assets/KurtaIcon.png";
import WasqitIcon from "../assets/WasqitIcon.png";
import CoatIcon from "../assets/CoatPaintIcon.png";
import ShirtIcon from "../assets/ShirtIcon.png";
import ShawlsIcon from "../assets/ShawlIcon.png";
import Clothes from "../assets/UnstitchClothes.png";
import New from "../assets/Flash.png";
import Man from "../assets/Man.png";
import NewOffer from "../assets/NewOffer.png";
import SearchNav from "../client/NavSearchBar";
//token decoder
import jwtDecode from "jwt-decode";
//temp page
import Temp from "../client/temp";
//rating bootstrap
import StarRatings from "react-star-ratings";
//Ui material links
import GridList from "@material-ui/core/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

//using Typography
import Typography from "@material-ui/core/Typography";
//react-bootstrap
import { Card } from "react-bootstrap";

//MDB
import {
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCard,
  MDBAnimation,
  MDBModal,
  MDBModalBody,
  MDBBtn,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBIcon,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBBtnGroup,
  MDBCardTitle,
  MDBCardBody,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import TakingSize from "../assets/TakingSize.jpg";
import ClientFooter from "./footer";
class Home extends Component {
  state = {
    Products: [],
    model1: false,
    loading: false,
    DataLoading: true,
    DialogIImage: "",
    ProductTitle: "",
    ProductionBy: "",
    ProductAmount: "",
    ProductRating: "",
    clientToken: localStorage.userSignInToken,
    decodeToken: "",
    SearchData: [],
    loginDialogRef: "",
    ScrollingCheck: ""
  };
  //Main Dialogs togel
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  //Search handel
  SearchHandle = event => {
    let searchProducts = [];
    if (event.target.value === "") {
      this.state.Products = [];
      this.state.Products = this.state.SearchData;
      this.setState(this.state.Products);
      document.getElementById("Card1").style.display = "";
      document.getElementById("Card2").style.display = "";
      document.getElementById("Card3").style.display = "";
    } else {
      this.state.Products.map(data => {
        if (
          data.Category.toLowerCase().startsWith(
            event.target.value.toLowerCase()
          )
        ) {
          searchProducts.push(data);
        }
      });
      console.log(searchProducts);
      if (searchProducts) {
        this.state.Products = [];
        this.state.Products = searchProducts;
        this.setState(this.state.Products);
        document.getElementById("Card1").style.display = "none";
        document.getElementById("Card2").style.display = "none";
        document.getElementById("Card3").style.display = "none";
      } else {
        document.getElementById("Card1").style.display = "";
        document.getElementById("Card2").style.display = "";
        document.getElementById("Card3").style.display = "";
      }
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
        // this.child.signInRout();
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
  //onMouseEnter
  onMouseEnter = data => {
    const id = document.getElementById(`AniMation${data.ProductsId}`).id;
    this.state.Products.map(data1 => {
      if (id === `AniMation${data1.ProductsId}`) {
        document.getElementById(`AniMation${data.ProductsId}`).style.display =
          "";
        // document.getElementById(`Image${data.ProductsId}`).className =
        //   "ChangeImage";
      }
    });
  };
  //onMouseOut
  onMouseOut = data => {
    const id = document.getElementById(`AniMation${data.ProductsId}`).id;
    this.state.Products.map(data1 => {
      if (id === `AniMation${data1.ProductsId}`) {
        document.getElementById(`AniMation${data.ProductsId}`).style.display =
          "none";
        // document.getElementById(`Image${data.ProductsId}`).className =
        //   " img-thumbnail img-fluid Image";
      }
    });
  };
  //Main Data onClick
  mainDataOnClick = data => {
    localStorage.setItem("product", data.Category);
    this.props.history.push({
      pathname: "/searchProducts"
    });
  };
  //Go to flash deal
  goFlashDeal = data => {
    localStorage.setItem("product", "CoatPaint");
    this.props.history.push({
      pathname: "/searchProducts"
    });
  };
  //going Admin
  GoingAdmin = () => {
    this.props.history.push({
      pathname: "/AdminHome",
      data: "nothing"
    });
  };
  //MainDropDown
  MainDropDown = data => {
    switch (data.title) {
      case "Flash": {
        this.props.history.push({
          pathname: "/searchProducts"
        });
        localStorage.setItem("product", "CoatPaint");

        break;
      }
      case "New Style": {
        this.props.history.push({
          pathname: "/searchProducts"
        });
        localStorage.setItem("product", "CoatPaint");
        break;
      }
      case "Darzi": {
        this.props.history.push({
          pathname: "/"
        });
        break;
      }
      case "Kurta's": {
        this.props.history.push({
          pathname: "/searchProducts"
        });
        localStorage.setItem("product", "Kurta");
        break;
      }
      case "WaistCoat": {
        this.props.history.push({
          pathname: "/searchProducts"
        });
        localStorage.setItem("product", "Wasket");
        break;
      }
      case "Coat's": {
        this.props.history.push({
          pathname: "/searchProducts"
        });
        localStorage.setItem("product", "CoatPaint");
        break;
      }
      case "Shirt's": {
        this.props.history.push({
          pathname: "/searchProducts"
        });
        localStorage.setItem("product", "Shirts");
        break;
      }
      case "Shawls": {
        this.props.history.push({
          pathname: "/searchProducts"
        });
        localStorage.setItem("product", "Shawles");
        break;
      }
      case "Unstitch": {
        this.props.history.push({
          pathname: "/searchProducts"
        });
        localStorage.setItem("product", "UnstitchClothes");
        break;
      }
    }
  };
  //mount data
  async componentDidMount() {
    // checking the page is scrolled or not
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY;
      if (isTop >= 50) {
        this.setState({ ScrollingCheck: isTop });
      } else {
        this.setState({ ScrollingCheck: null });
      }
      // console.log(isTop);
    });
    var num = 0;
    //Main Product work
    const { data: Products } = await axios.get("/getProducts");
    //taking copy or orignal data
    this.state.SearchData = Products;
    //
    if (this.state.clientToken) {
      this.state.decodeToken = jwtDecode(this.state.clientToken);
    }
    this.setState({ Products });

    //check for data loded or not
    this.setState({ DataLoading: false });
    //set off button
    this.state.Products.map(data => {
      document.getElementById(`AniMation${data.ProductsId}`).style.display =
        "none";
    });
  }
  render() {
    const ShirtsData = [
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/kashmiri.jpg?alt=media",
        title: "Kashmiri",
        author: "Kashmiri",
        index: "1"
      },

      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/cotton.jpg?alt=media",
        title: "Corton",
        author: "Corton",
        index: "2"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Sharwan%20Style.jpg?alt=media",
        title: "Shafoon",
        author: "Shafoon",
        index: "3"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Sialk.jpg?alt=media",
        title: "Sialk",
        author: "Sialk",
        index: "4"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/khari.jpg?alt=media",
        title: "Khari",
        author: "Khari",
        index: "5"
      }
    ];
    const ImageLoading = [
      {
        ImageUrl: pictureLoader
      },
      {
        ImageUrl: pictureLoader
      },
      {
        ImageUrl: pictureLoader
      },
      {
        ImageUrl: pictureLoader
      },
      {
        ImageUrl: pictureLoader
      },
      {
        ImageUrl: pictureLoader
      },

      {
        ImageUrl: pictureLoader
      },
      {
        ImageUrl: pictureLoader
      },
      {
        ImageUrl: pictureLoader
      },
      {
        ImageUrl: pictureLoader
      }
    ];
    const slider = [
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/slide1.jpg?alt=media",
        title: "Kashmiri",
        author: "Kashmiri",
        index: "1"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/slide2.jpg?alt=media",
        title: "Kashmiri",
        author: "Kashmiri",
        index: "2"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/slide3.jpg?alt=media",
        title: "Kashmiri",
        author: "Kashmiri",
        index: "3"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/header.jpg?alt=media",
        title: "Kashmiri",
        author: "Kashmiri",
        index: "4"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/businessman-close-up-collar-2254123.jpg?alt=media",
        title: "Kashmiri",
        author: "Kashmiri",
        index: "5"
      }
    ];
    const KurtaDesignData = [
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/kashmiri.jpg?alt=media",
        title: "Kashmiri",
        author: "Kashmiri"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/cotton.jpg?alt=media",
        title: "Corton",
        author: "Corton"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Sharwan%20Style.jpg?alt=media",
        title: "Shafoon",
        author: "Shafoon"
      },
      {
        img:
          "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Sialk.jpg?alt=media",
        title: "Sialk",
        author: "Sialk"
      }
    ];
    const MainDropDown = [
      {
        src: New,
        title: "Flash"
      },
      {
        src: Man,
        title: "New Style"
      },
      {
        src: DarziIcon,
        title: "Darzi"
      },
      {
        src: KurtaIcon,
        title: "Kurta's"
      },
      {
        src: WasqitIcon,
        title: "WaistCoat"
      },
      {
        src: CoatIcon,
        title: "Coat's"
      },
      {
        src: ShirtIcon,
        title: "Shirt's"
      },
      {
        src: ShawlsIcon,
        title: "Shawls"
      },
      {
        src: Clothes,
        title: "Unstitch"
      }
    ];
    const NaveSearchText = "none";
    const NaveSearch = "";
    return (
      <div className="HomePage">
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
        {/* Nave Bar */}
        <Navigation />
        <hr className="hr" />
        {/* Search Nave bar */}
        <SearchNav
          SearchHandle={this.SearchHandle}
          NaveSearchText={NaveSearchText}
          NaveSearch={NaveSearch}
          ref={ref => (this.child = ref)}
          scroll={this.state.ScrollingCheck}
          GoingAdmin={this.GoingAdmin}
        />
        {/* Main Page Slide */}
        {/* Mian page */}
        <MDBRow center className="MainHomeRow" id="Card1">
          <MDBCol md="auto">
            <MDBAnimation type="fadeInLeft" delay=".5s">
              <MDBBtnGroup vertical>
                <MDBBtn
                  color="gray"
                  size="lg"
                  className="red-text"
                  icon="angle-double-right"
                >
                  See All category <MDBIcon icon="angle-double-right" />
                </MDBBtn>

                {MainDropDown.map(data => (
                  <MDBBtn
                    caret
                    color="white"
                    className="m-0 ListGroupItem"
                    onClick={this.MainDropDown.bind(this, data)}
                  >
                    <img
                      src={data.src}
                      style={{
                        height: "3ch",
                        width: "3ch",
                        marginRight: "0.5ch"
                      }}
                    />
                    {data.title}
                  </MDBBtn>
                ))}
              </MDBBtnGroup>
            </MDBAnimation>
          </MDBCol>
          <MDBCol md="6" id="col2">
            <MDBRow top>
              <MDBCarousel
                activeItem={1}
                length={5}
                showControls={true}
                showIndicators={false}
                className="z-depth-1"
              >
                <MDBCarouselInner>
                  {slider.map(data => (
                    <MDBCarouselItem itemId={data.index}>
                      <MDBView>
                        <MDBCardImage
                          className="d-block w-100"
                          src={data.img}
                          alt="First slide"
                          height="300ch"
                        />
                      </MDBView>
                    </MDBCarouselItem>
                  ))}
                </MDBCarouselInner>
              </MDBCarousel>
            </MDBRow>
            <MDBRow bottom style={{ marginTop: "0.5ch" }}>
              {this.state.DataLoading && (
                <GridList
                  style={{
                    flexWrap: "nowrap",
                    transform: "translateZ(0)"
                  }}
                  cols={5}
                >
                  {ImageLoading.map(data => (
                    <GridListTile key={data.ImageUrl}>
                      <img
                        src={data.ImageUrl}
                        className="Image img-thumbnail img-fluid"
                      />
                    </GridListTile>
                  ))}
                </GridList>
              )}
              {!this.state.DataLoading && (
                <GridList
                  style={{
                    flexWrap: "nowrap",
                    transform: "translateZ(0)"
                  }}
                  cols={5.5}
                >
                  {this.state.Products.map(data => (
                    <GridListTile key={data.ImageUrl}>
                      <Typography
                        style={{
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          overFlow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                        variant="button"
                        className="blue-text"
                      >
                        {data.Title}
                      </Typography>
                      <MDBView
                        waves
                        onMouseEnter={this.onMouseEnter.bind(this, data)}
                        onMouseOut={this.onMouseOut.bind(this, data)}
                        onClick={this.mainDataOnClick.bind(this, data)}
                      >
                        <img
                          src={data.ImageUrl}
                          className="Image img-thumbnail img-fluid"
                          id={`Image${data.ProductsId}`}
                        />
                        <MDBMask className="flex-center">
                          <MDBAnimation
                            delay="0.1s"
                            type="bounceIn"
                            id={`AniMation${data.ProductsId}`}
                          >
                            <MDBBtn color="danger" size="sm">
                              {data.Amount} Rs
                            </MDBBtn>
                          </MDBAnimation>
                        </MDBMask>
                      </MDBView>
                    </GridListTile>
                  ))}
                </GridList>
              )}
            </MDBRow>
          </MDBCol>
          <MDBCol md="2" id="col3">
            <MDBAnimation type="fadeInRight" delay=".5s">
              <Card className="tailorCard">
                <Card.Body>
                  <Card.Title>
                    <h3>Darzi point</h3>
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src={TakingSize}
                    height="auto"
                    width="auto"
                  />
                  <Card.Text className="textOverFlow">
                    <Typography variant="body1">
                      You want to check your clothes fitings than we strongly
                      advise you to take some time in order to measure yourself
                      usnig 3D model, or have someone else measure you up to
                      ensure you get the correct size.
                    </Typography>
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Link href="#">
                    <Typography variant="subtitle1" className="red-text">
                      Register now !
                    </Typography>
                  </Card.Link>
                </Card.Body>
              </Card>
            </MDBAnimation>
          </MDBCol>
        </MDBRow>

        {/* MAin Products */}
        <div
          style={{ marginRight: "14ch", marginLeft: "14ch", marginTop: "5ch" }}
          className="mt-5"
        >
          {/* Flas deals */}
          <MDBRow id="Card2">
            <MDBRow>
              <MDBAnimation
                type="swing"
                infinite
                style={{ paddingTop: "1ch", paddingLeft: "1ch" }}
              >
                <img src={New} style={{ height: "3ch", width: "3ch" }} />
              </MDBAnimation>
              <h1 className="ProductUperText">Flash Deal</h1>
              <h5
                className="red-text"
                style={{ marginTop: "1ch", marginLeft: "1ch" }}
              >
                00:00:00
              </h5>
            </MDBRow>

            <MDBAnimation type="fadeInLeft" delay=".5s">
              <MDBRow style={{ textAlign: "center", marginLeft: "1ch" }}>
                {ShirtsData.map(data => (
                  <div onClick={this.goFlashDeal.bind(this, data)}>
                    <Typography variant="h6" className="blue-text">
                      {data.title}
                    </Typography>
                    <MDBCardImage
                      src={data.img}
                      className="img-fluid z-depth-1 FlashDeal hoverable"
                      alt=""
                      id="setProductImage"
                    />
                  </div>
                ))}
              </MDBRow>
            </MDBAnimation>
          </MDBRow>

          {/* Catagory */}
          <h1 className="ProductUperText" style={{ marginTop: "2ch" }}>
            Categories
          </h1>
          <MDBRow
            id="Card3"
            style={{
              marginBottom: "4ch"
            }}
          >
            <MDBCol md="4">
              <MDBAnimation type="fadeInLeft" delay=".5s">
                <MDBCard className="grideShirts Catagories">
                  <MDBRow
                    style={{
                      alignSelf: "left",
                      marginLeft: "0.5ch",
                      marginTop: "0.5ch"
                    }}
                  >
                    <img
                      src={NewOffer}
                      style={{ height: "3ch", width: "3ch" }}
                    />

                    <Typography variant="h6" component="h2">
                      Kurta / Shirts
                    </Typography>
                  </MDBRow>
                  <GridList
                    cellHeight={160}
                    style={{ width: "auto", height: "auto", padding: "1ch" }}
                    cols={2}
                    color="white"
                    className="img-fluid hoverable"
                  >
                    {KurtaDesignData.map(tile => (
                      <MDBCard key={tile.img} cols={tile.cols || 1}>
                        <MDBCardImage src={tile.img} alt={tile.title} />
                        <GridListTileBar
                          title={tile.title}
                          subtitle={<span>by: {tile.author}</span>}
                          actionIcon={
                            <IconButton
                              aria-label={`info about ${tile.title}`}
                              className={"white-text"}
                            >
                              <InfoIcon />
                            </IconButton>
                          }
                        />
                      </MDBCard>
                    ))}
                  </GridList>
                </MDBCard>
              </MDBAnimation>
            </MDBCol>
            <MDBCol md="8">
              <MDBAnimation type="fadeInRight" delay=".5s">
                <MDBCard
                  className="grideShirts Catagories"
                  style={{ alignSelf: "center" }}
                >
                  <MDBRow
                    style={{
                      alignSelf: "left",
                      marginLeft: "0.5ch",
                      marginTop: "0.5ch"
                    }}
                  >
                    <img src={Man} style={{ height: "3ch", width: "3ch" }} />

                    <Typography variant="h6" component="h2">
                      Coat paint new styles
                    </Typography>
                  </MDBRow>
                  <GridList
                    cellHeight={160}
                    style={{ width: "auto", height: "auto", padding: "1ch" }}
                    cols={6}
                    color="white"
                    className="img-fluid hoverable"
                  >
                    {ShirtsData.map(tile => (
                      <MDBCard key={tile.img} cols={tile.cols || 2}>
                        <MDBCardImage src={tile.img} alt={tile.title} />
                        <GridListTileBar
                          title={tile.title}
                          subtitle={<span>by: {tile.author}</span>}
                          actionIcon={
                            <IconButton
                              aria-label={`info about ${tile.title}`}
                              className={"white-text"}
                            >
                              <InfoIcon />
                            </IconButton>
                          }
                        />
                      </MDBCard>
                    ))}
                  </GridList>
                </MDBCard>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>
          {/* Main products */}
          <h1 className="ProductUperText"> Only for You</h1>
          <MDBRow>
            {this.state.DataLoading
              ? ImageLoading.map(data => (
                  <MDBCardImage
                    src={data.ImageUrl}
                    className="img-fluid z-depth-1 MainProducts hoverable"
                    alt=""
                    id="setProductImage"
                  />
                ))
              : this.state.Products.map(data => (
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
                    <Typography
                      variant="subtitle1"
                      className="red-text"
                    >
                      GST :{parseInt(data.Amount)+parseInt(data.Amount)*(17/100)} Rs
                      
                    </Typography>
                  </div>
                ))}
          </MDBRow>
        </div>
        <ClientFooter />
      </div>
    );
  }
}
export default Home;
