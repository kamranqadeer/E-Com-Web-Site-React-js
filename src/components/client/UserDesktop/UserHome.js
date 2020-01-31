import React from "react";
import "./assets/App.css";
import UserHeader from "./UserHeader";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBNavbar,
  MDBNavbarBrand,
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import User3D from "./User3D";
import UserAccount from "./UserAccount";
import UserCart from "./UserCart";
const routes = [
  {
    path: "/UserHome",
    exact: true,
    // sidebar: () => <div>3D Modeling</div>,
    main: () => <User3D />
  },
  {
    path: "/UserHome/UserAccount",
    // sidebar: () => <div>Account Detail</div>,
    main: () => <UserAccount />
  },
  {
    path: "/UserHome/UserCart",
    // sidebar: () => <div>Cart</div>,
    main: () => <UserCart />
  }
];
class UserHome extends React.Component {
  state = {};
  render() {
    return (
      <Route>
        <div id="apppage">
          <MDBView>
            <MDBMask className=" justify-content-center align-items-center gradient">
              <UserHeader />
              <MDBRow>
                <MDBCol md="auto">
                  <div>
                    <MDBListGroup
                      style={{ width: "15rem", backgroundColor: "transparent" }}
                    >
                      <MDBListGroupItem
                        style={{
                          backgroundColor: "transparent",
                          padding: "4ch"
                        }}
                      >
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/185165522598.jpg?alt=media"
                          className="img-fluid rounded-circle hoverable"
                        />
                      </MDBListGroupItem>
                      <MDBListGroupItem
                        style={{ backgroundColor: "transparent" }}
                      >
                        <h2
                          className="AdminMenuText"
                          className="UserGroupItemstext"
                        >
                          KAMRAN QADEER
                        </h2>
                      </MDBListGroupItem>
                      <MDBListGroupItem
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Link
                          to="/UserHome"
                          className="UserGroupItemstext"
                        >
                          3D Moddling
                        </Link>
                      </MDBListGroupItem>
                      <MDBListGroupItem
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Link
                          to="/UserHome/UserAccount"
                          className="UserGroupItemstext"
                        >
                          Account Details
                        </Link>
                      </MDBListGroupItem>
                      <MDBListGroupItem
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Link
                          to="/UserHome/UserCart"
                          className="UserGroupItemstext"
                        >
                          Cart
                        </Link>
                      </MDBListGroupItem>
                    </MDBListGroup>
                    {routes.map(route => (
                      <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        // component={route.sidebar}
                      />
                    ))}
                  </div>
                </MDBCol>
                <MDBCol>
                  <MDBAnimation type="fadeInLeft" delay=".5s">
                    <div className="white-text text-center text-md-left mt-xl-5 mb-5">
                      {/* <MDBAnimation type="fadeInLeft" delay=".3s">
                      <h1 className="h1-responsive font-weight-bold mt-sm-5">
                        Make purchases with our app
                      </h1>
                      <hr className="hr-light" />
                      <h6 className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Rem repellendus quasi fuga nesciunt dolorum nulla
                        magnam veniam sapiente, fugiat! Commodi sequi non animi
                        ea dolor molestiae iste.
                      </h6>
                      <MDBBtn color="white">Download</MDBBtn>
                      <MDBBtn outline color="white">
                        Learn More
                      </MDBBtn>
                    </MDBAnimation> */}

                      {routes.map(route => (
                        <Route
                          key={route.path}
                          path={route.path}
                          exact={route.exact}
                          component={route.main}
                        />
                      ))}
                    </div>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBMask>
          </MDBView>
        </div>
      </Route>
    );
  }
}

export default UserHome;
