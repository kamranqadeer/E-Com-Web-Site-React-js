import React, { Component } from "react";
import {
  MDBListGroupItem,
  MDBListGroup,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBContainer,
  MDBEdgeHeader
} from "mdbreact";
import NewProduct from "./NewProduct";
import AdminHeader from "./adminHeader";
import Orders from "./Orders";
import "../assets/App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import Customers from "./customers";
import AdminAccount from "./AdminAccount";
const routes = [
  {
    path: "/AdminHome",
    exact: true,
    sidebar: () => <div>Adminhome</div>,
    main: () => <AdminProducts />
  },
  {
    path: "/AdminHome/NewProduct",
    sidebar: () => <div>Products</div>,
    main: () => (
      <NewProduct
        ProductTitle="Add new product"
        Check="Upload"
        className="ChildContainer"
        Title=""
        Amount=""
        ProductionBy=""
        ImageUrl="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/noImage.png?alt=media"
        Discription=""
      />
    )
  },
  {
    path: "/AdminHome/Orders",
    sidebar: () => <div>Orders</div>,
    main: () => <Orders />
  },
  {
    path: "/AdminHome/Customers",
    sidebar: () => <div>Customers</div>,
    main: () => <Customers />
  },
  {
    path: "/AdminHome/AdminAccount",
    sidebar: () => <div>AdminAccount</div>,
    main: () => <AdminAccount />
  }
];
class AdminListGroup extends Component {
  state = {};
  //going Home
  GoingHome = () => {
    this.props.history.push({
      pathname: "/",
      data: "nothing"
    });
  };
  render() {
    return (
      <Router>
        <div>
          <AdminHeader GoingHome={this.GoingHome}/>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "5ch" }}>
              <MDBListGroup style={{ width: "18rem" }}>
                <h1
                  style={{
                    fontSize: "45px",
                    alignSelf: "center",
                    color: "#1A78C2"
                  }}
                >
                  MENU
                </h1>
                <MDBListGroupItem>
                  <h2 className="AdminMenuText">Products</h2>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <Link to="/AdminHome">All Products</Link>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <Link to="/AdminHome/NewProduct">New Products</Link>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <h3 className="AdminMenuText">List</h3>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <Link to="/AdminHome/Orders">Orders</Link>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <h4 className="AdminMenuText">Customers</h4>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <Link to="/AdminHome/Customers">UserAccounts</Link>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <h4 className="AdminMenuText">Admin</h4>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <Link to="/AdminHome/AdminAccount">UserAccounts</Link>
                </MDBListGroupItem>
              </MDBListGroup>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.sidebar}
                />
              ))}
            </div>

            <div style={{ flex: 1, padding: "10px" }}>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default AdminListGroup;
