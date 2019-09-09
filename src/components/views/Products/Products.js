import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { fetchProducts } from "../../../redux/actions/products";
import Product from "./Product";
import NoProduct from "./NoProducts";
import Loader from "../../commons/Loader";

class Products extends React.Component {
  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  render() {
    const { isLoading, products } = this.props;
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {products.length === 0 ? (
              <NoProduct />
            ) : (
              <div className="columns is-mobile is-multiline">
                {products.map(product => (
                  <Product product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    );
  }
}

Products.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array,
  isLoading: PropTypes.bool
};

Products.defaultProps = {
  products: [],
  isLoading: true
};

const mapStateToProps = state => ({
  products: state.products.products,
  isLoading: state.products.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchProducts }
  )(Products)
);
