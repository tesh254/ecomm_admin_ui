import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import signupUser from "../../redux/actions/auth/signup";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    name: "",
    confirm: "",
    phoneNumber: "",
    checked: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
        isLoading: nextProps.isLoading
      });
    }
  }

  handleCheck = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      confirm: this.state.confirm,
      phoneNumber: this.state.phoneNumber,
      role: "Seller"
    };
    const { checked } = this.state;

    if (checked) {
      this.props.signupUser(userData);
      this.setState({ isLoading: false });
    } else {
      toast.error("Please accept the terms of service and privacy");
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="flex-center margin-top">
        <div>
          <span className="title is-2">Sign Up</span>
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
            <label htmlFor="name" className="subtitle is-6">
              Name
            </label>
            <br />
            <input
              type="text"
              name="name"
              className="input"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="phoneNumber" className="subtitle is-6">
              PhoneNumber
            </label>
            <br />
            <input
              type="text"
              name="phoneNumber"
              className="input"
              value={this.state.phoneNumber}
              onChange={this.onChange}
              placeholder="254712345678"
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
              onChange={this.onChange}
              placeholder="********"
              required
            />
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="confirm" className="subtitle is-6">
              Confirm Password
            </label>
            <br />
            <input
              type="password"
              name="confirm"
              className="input"
              value={this.state.confirm}
              onChange={this.onChange}
              placeholder="********"
              required
            />
          </div>
          <label className="checkbox">
            <input
              type="checkbox"
              onChange={this.handleCheck}
              defaultChecked={this.state.checked}
              className="checkbox"
            />
            <span>
              <Link to="/toc"> Accept terms of service and privacy</Link>
            </span>
          </label>
          <div className="margin-top-bottom">
            <button id="button" className="button is-black is-fullwidth" type="submit">
              Sign Up
            </button>
          </div>
          <div>
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </form>
    );
  }
}

SignUp.propTypes = {
  signupUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

SignUp.defaultProps = {
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
    { signupUser }
  )(SignUp)
);
