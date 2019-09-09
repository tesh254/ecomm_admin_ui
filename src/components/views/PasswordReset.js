import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { handlePasswordReset } from "../../redux/actions/auth/passwordReset";

class PasswordReset extends React.Component {
  state = {
    password: "",
    confirm: "",
    isLoading: false
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
        history.push("/login");
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
    const { match, handlePasswordReset } = this.props;
    const userData = {
      password: this.state.password,
      confirm: this.state.confirm
    };
    handlePasswordReset(match.params.token, userData);
    this.setState({
      isLoading: false
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="flex-center margin-top">
        <div>
          <span className="title is-2">Password Reset</span>
          <div className="margin-top-bottom">
            <label htmlFor="password" className="subtitle is-6">
              New Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              className="input"
            />
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="confirm">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirm"
              className="input"
              value={this.state.confirm}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="margin-top-bottom">
            <button id="button" className="button is-black" type="submit">
              Update Password
            </button>
          </div>
        </div>
      </form>
    );
  }
}

PasswordReset.propTypes = {
  handlePasswordReset: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

PasswordReset.defaultProps = {
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
    { handlePasswordReset }
  )(PasswordReset)
);
