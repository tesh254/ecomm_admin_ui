import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import loginUser from "../../redux/actions/auth/login";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
        isLoading: nextProps.isLoading
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="flex-center margin-top">
        <div>
          <span className="title is-2">Log In</span>
          <div className="margin-top-bottom">
            <label htmlFor="email" className="subtitle is-6">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              className="input"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="john@something.som"
              required
            />
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="password" className="subtitle is-6">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              className="input"
              value={this.state.password}
              placeholder="************"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="margin-top-bottom">
            <button id="button" className="button is-black is-fullwidth" type="submit">
              Log In
            </button>
          </div>
          <div>
            <Link to="/forgot-password">Forgot your password?</Link>
            <br />
            <Link to="/signup">Want to create a new account, Sign up?</Link>
          </div>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

Login.defaultProps = {
  error: "",
  message: ""
};

const mapStateToProps = state => {
  return {
    error: state.login.error,
    message: state.login.message,
    isLoggedIn: state.login.isLoggedIn
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Login)
);
