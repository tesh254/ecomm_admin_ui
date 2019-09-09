import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import verifyUser from "../../redux/actions/auth/verify";

class EmailVerify extends React.Component {
  state = {
    token: ""
  };

  componentDidMount() {
    const { verifyUser, match } = this.props;
    verifyUser(match.params.token)
  }

  render() {
    return (
      <div className="flex-center margin-top">
        <div className="subtitle is-6">
            <span>
                If a green toast message appeared, Congrats
                your account has been verified 🎉🥳🥂.
                <br/>
                Go ahead and login to your account
            </span>
          <div>
            <Link to="/login">
              <button className="button is-black is-fullwidth">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

EmailVerify.propTypes = {
  verifyUser: PropTypes.func.isRequired
};

EmailVerify.defaultProps = {};

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
    { verifyUser }
  )(EmailVerify)
);
