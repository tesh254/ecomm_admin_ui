import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./static/css/bulma.css";
import "./App.css";
import 'antd/dist/antd.css';

import setAuthToken from "./helpers/setAuthToken";
import Nav from "./components/commons/Nav";
import store from "./redux/store";
import {
  setCurrentUser,
  logoutUser
} from "./redux/actions/auth/setCurrentUser";
import PrivateRoute from "./components/HOC/PrivateRouter";

import Login from "./components/containers/Login";
import SignUp from "./components/containers/Signup";
import VerifyView from "./components/views/Verify";
import EmailVerify from "./components/views/EmailVerify";
import ForgotPassword from "./components/views/ForgotPassword";
import PasswordReset from "./components/views/PasswordReset";
import Home from "./components/views/Home";
import Products from "./components/views/Products";
import AddProduct from "./components/views/AddProduct";
import Product from "./components/views/Product";
import EditProduct from "./components/views/EditProduct";

if (localStorage.getItem("jwt_token")) {
  try {
    // Set auth token header auth
    setAuthToken(localStorage.getItem("jwt_token"));
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.getItem("jwt_token"));
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Clear current Profile
      // store.dispatch(clearCurrentProfile());
      // Redirect to login
      window.location.href = "/login";
    }
  } catch (e) {
    console.log(e)
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <div
            className="App"
            data-theme={localStorage.getItem("theme") || "light"}
          >
            <Nav />
            <Switch>
              <PrivateRoute exact={true} path="/" component={Home} />
              <PrivateRoute exact={true} path="/products" component={Products} />
              <PrivateRoute exact={true} path="/add-product" component={AddProduct} />
              <PrivateRoute exact={true} path="/products/:product_id" component={Product} />
              <PrivateRoute exact={true} path="/products/edit/:product_id" component={EditProduct} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/verify" component={VerifyView} />
              <Route
                exact
                path="/email-verify/:token"
                component={EmailVerify}
              />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route
                exact
                path="/password-reset/:token"
                component={PasswordReset}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
