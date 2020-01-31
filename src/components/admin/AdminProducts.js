import React, { Component } from "react";
import axios from "axios";
//import Model Discription
import NewProduct from "./NewProduct";
import {
  MDBModal,
  MDBModalHeader,
  MDBIcon,
  MDBBtnGroup,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBBtn,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBFormInline,
  MDBView,
  MDBInput,
  MDBModalFooter,
  MDBModalBody
} from "mdbreact";
//using Typography
import Typography from "@material-ui/core/Typography";
//rating bootstrap
import StarRatings from "react-star-ratings";
//alert
import { toast } from "react-toastify";
//Ui material links
import GridList from "@material-ui/core/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/DeleteOutlineRounded";
import { BrowserRouter as Router } from "react-router-dom";
class AdminProducts extends Component {
  state = {
    Products: [],
    model1: false,
    model2: false,
    loading: false,
    DailogImage: "",
    ProductTitle: "",
    ProductionBy: "",
    ProductAmount: "",
    ProductRating: "",
    ProductCategory: "",
    ProductSize: "",
    DeleteProduct: [],
    data:[]
  };
  //Main Dialogs togel
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  // Product dialog //All products
  AllProduct = data => {
    this.state.data = data;
    if (data != "") {
      let modalNumber = "modal" + 1;
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }
  };
  //Delete Dialog
  deleteDialog = data => {
    let modalNumber = "modal" + 2;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
    this.state.DeleteProduct = data;
  };
  //Delete Products
  DeleteProducts = async () => {
    this.setState({ loading: true });
    //geting Product id
    const id = this.state.DeleteProduct.ProductsId;

    //deleting form server
    await axios
      .delete(`/deleteProduct/${id}`)
      .then(res => {
        toast.success(res.data.message);
        //filter objects
        const Products = this.state.Products.filter(
          data => data.ProductsId !== id
        );
        this.setState({ Products });
        //clossing dialog
        let modalNumber = "modal" + 2;
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
        this.setState({ loading: false });
      })
      .catch(res => {
        toast.error("Network error");
        this.setState({ loading: false });
        //clossing dialog
        let modalNumber = "modal" + 2;
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      });
  };
  //Update Products
  UpdateProducts = async () => {};
  //main Mount methode
  async componentDidMount() {
    const { data: Products } = await axios.get("/getProducts");
    this.state.Products = Products;
    this.setState({ Products });
  }
  render() {
    const { loading } = this.state;

    return (
      <div className="ChildContainer">
        {/* Dialog model */}
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg">
          <NewProduct
            ProductTitle="Update product"
            Check="Update"
            Cancle={this.toggle(1)}
            Title={this.state.data.Title}
            Amount={this.state.data.Amount}
            ProductionBy={this.state.data.ProductionBy}
            ImageUrl={this.state.data.ImageUrl}
            Discription={this.state.data.Discription}
          />
        </MDBModal>
        {/* Delete dialog */}
        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
          <MDBModalHeader toggle={this.toggle(2)}>
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
              You want to delete this Product info !
            </Typography>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary" onClick={this.toggle(2)}>
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
        <MDBCol md="12">
          <MDBNavbar
            color="info-color"
            className="text-white darken-3"
            dark
            expand="md"
          >
            <MDBNavbarBrand>Filter Products</MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.handleTogglerClick} />
            <Router>
              <MDBCollapse isOpen={this.state.collapsed} navbar>
                <MDBNavbarNav right onClick={this.handleNavbarClick}>
                  <MDBFormInline className="md-form mr-auto m-0">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <MDBBtn
                      outline
                      color="white"
                      size="sm"
                      type="submit"
                      className="mr-auto"
                    >
                      Search
                    </MDBBtn>
                  </MDBFormInline>
                </MDBNavbarNav>
              </MDBCollapse>
            </Router>
          </MDBNavbar>
        </MDBCol>
        <MDBContainer style={{ marginTop: "5ch" }}>
          <GridList style={{ width: "auto", height: "auto" }} cols={4.2}>
            {this.state.Products.map(data => (
              <MDBCard style={{ margin: "0.5ch" }}>
                <MDBView onClick={this.AllProduct.bind(this, data)}>
                  <img
                    src={data.ImageUrl}
                    alt={data.Title}
                    id="setProductImage"
                    className="img-fluid hoverable"
                  />
                </MDBView>

                <GridListTileBar
                  title={data.Title}
                  subtitle={<span>Amount: {data.Amount}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${data.Title}`}
                      className={"white-text"}
                      onClick={this.deleteDialog.bind(this, data)}
                    >
                      <Delete />
                    </IconButton>
                  }
                />
              </MDBCard>
            ))}
          </GridList>
        </MDBContainer>
      </div>
    );
  }
}

export default AdminProducts;
