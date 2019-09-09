import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { passwordResetRequest } from "../../redux/actions/auth/passwordReset";

class ForgotPassword extends React.Component {
  state = {
    email: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
        isLoading: nextProps.isLoading
      });
    } else {
      const { history } = this.props;
      setTimeout(() => {
        history.push("/");
      }, 1000);
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
      email: this.state.email
    };

    this.props.passwordResetRequest(userData);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="flex-center margin-top">
        <div>
          <span className="title is-2">Password Reset</span>
          <div className="margin-top-bottom">
            <label htmlFor="email" className="subtitle is-6">Email</label>
            <br />
            <input
              type="email"
              name="email"
              className="input"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="margin-top-bottom">
            <button
              id="button"
              className="button is-black"
              type="submit"
            >
              Send Reset link
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ForgotPassword.propTypes = {
  passwordResetRequest: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

ForgotPassword.defaultProps = {
  error: "",
  message: ""
};

const mapStateToProps = state => {
  return {
    error: state.login.error,
    message: state.login.message
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { passwordResetRequest }
  )(ForgotPassword)
);
