import React, { Component } from "react";
//lib for toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/client/home";
import Admin from "./components/admin/admin";
import UserLogin from "./components/client/UserLogin";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import UserSignUp from "./components/client/UserSignUp";
import AdminRegistration from "./components/admin/AdminRegist";
import AdminHome from "./components/admin/AdminHome";
import NewProduct from "./components/admin/NewProduct";
import Orders from "./components/admin/Orders";
import AdminAccount from "./components/admin/AdminAccount";
import UserHome from "./components/client/UserDesktop/UserHome";
import SearchProducts from './components/client/searchProducts';
import Cart from './components/client/Cart';
import Buy from "./components/client/buy"
import User3D from './components/client/User3D';
// redux
// import { Provider } from "react-redux";
// import store from "./redux/store";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/LogIn" component={UserLogin} />
            <Route path="/SignUp" component={UserSignUp} />
            <Route path="/admin" component={Admin} />
            <Route path="/AdminRegistration" component={AdminRegistration} />
            <Route path="/AdminHome" component={AdminHome} />
            <Route path="/NewProduct" component={NewProduct} />
            <Route path="/Orders" component={Orders} />
            <Route path="/AdminAccount" component={AdminAccount} />
            <Route path="/UserHome" component={UserHome} />
            <Route path="/searchProducts" component={SearchProducts} />
            <Route path="/Cart" component={Cart}/>   
            <Route path ="/Buy" component={Buy}/>     
            <Route path ="/User3D" component={User3D}/>            
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
