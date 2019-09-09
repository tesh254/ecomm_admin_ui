import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Modal } from "antd";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import Loader from "../../commons/Loader";
import { fetchProduct, deleteProduct } from "../../../redux/actions/products";

class Product extends React.Component {
  state = {
    product: {},
    isLoading: true,
    visible: false
  };

  componentDidMount() {
    const { fetchProduct, match } = this.props;

    fetchProduct(match.params.product_id);
  }

  componentWillReceiveProps(props) {
    this.setState({
      product: props.product,
      isLoading: props.isLoading
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    const { match, deleteProduct } = this.props;
    deleteProduct(match.params.product_id);
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { product, isLoading } = this.state;
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="columns">
            <ProductImages {...product} />
            <ProductInfo {...product} handleDelete={this.showModal} />
            <Modal
              title="Confirm Delete"
              visible={this.state.visible}
              onOk={this.handleOk}
              okType="danger"
              onCancel={this.handleCancel}
            >
              <p>Are sure you want to delete this product?</p>
            </Modal>
          </div>
        )}
      </section>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object,
  fetchProduct: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  deleteProduct: PropTypes.func.isRequired
};

Product.defaultProps = {
  product: {},
  isLoading: true
};

const mapStateToProps = state => ({
  product: state.products.product,
  isLoading: state.products.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchProduct, deleteProduct }
  )(Product)
);
