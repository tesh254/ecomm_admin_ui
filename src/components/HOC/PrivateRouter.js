import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

const checkJWT = token => {
  if (token !== undefined) {
    const decoded = jwt_decode(token);

    if (decoded.exp < Date.now() / 1000) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem("jwt_token") ||
      localStorage.getItem("jwt_token") === undefined ||
      checkJWT(localStorage.getItem("jwt_token")) === false ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.loginReducer
});

export default connect(mapStateToProps)(PrivateRoute);
