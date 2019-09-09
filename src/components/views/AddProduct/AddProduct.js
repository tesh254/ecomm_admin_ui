import React from "react";
import { Icon } from "antd";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import imageUploader from "../../../helpers/imageUploader";
import { fetchCategories, addProduct } from "../../../redux/actions/products";

class AddProduct extends React.Component {
  state = {
    name: "",
    category: "",
    description: "",
    quantity: 0,
    amount: 0,
    uploading: false,
    images: [],
    uploading: false,
    categories: []
  };

  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  componentWillReceiveProps(props) {
    this.setState({
      categories: props.categories,
      isLoading: props.isLoading
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      category,
      description,
      quantity,
      amount,
      images
    } = this.state;

    const { addProduct } = this.props;

    const productData = {
      name,
      category,
      description,
      quantity,
      amount,
      images
    };

    addProduct(productData);
  };

  fileHandler = e => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      toast.error("Upload 4 images maximum");
    } else {
      const uploadedImages = [];
      this.setState({
        uploading: true
      });
      files.map(file => {
        imageUploader({
          image: file
        }).then(res => {
          uploadedImages.push(res.data.secure_url);
          this.setState({
            images: uploadedImages,
            uploading: false
          });
          axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwt_token"
          );
        });
      });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRemove = () => {};

  render() {
    const { images, uploading, categories, isLoading } = this.state;
    console.log(categories)

    return (
      <form onSubmit={this.handleSubmit} className="flex-center margin-top">
        <div>
          <span className="title is-2">Add Product</span>
          <div className="image-previews flex-center">
            {images.length === 0 ? (
              <span className="subtitle is-6">No images uploaded</span>
            ) : (
              <ul className="colums flex-center">
                {images.map(image => (
                  <figure className="image is-64x64">
                    <img src={image} alt="" onClick={this.handlRemove} />
                  </figure>
                ))}
              </ul>
            )}
          </div>
          <div className="margin-top-bottom">
            <div class="file has-name is-boxed is-centered">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  onChange={this.fileHandler}
                  name="resume"
                  multiple
                  required
                  style={{ width: "300px" }}
                />
                <span class="file-cta">
                  <span class="file-icon">
                    {uploading ? (
                      <Icon type="loading" />
                    ) : (
                      <Icon type="upload" />
                    )}
                  </span>
                  <span class="file-label">Upload Images</span>
                </span>
              </label>
            </div>
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="name" className="subtitle is-6">
              Product Name
            </label>
            <br />
            <input
              type="text"
              name="name"
              className="input"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="e.g. Yeezy Boosts"
              required
              style={{ width: "300px" }}
            />
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="name" className="subtitle is-6">
              Product Description
            </label>
            <br />
            <textarea
              type="text"
              name="description"
              className="textarea"
              value={this.state.description}
              onChange={this.onChange}
              placeholder="e.g. Best sneakers"
              required
              style={{ width: "300px" }}
            />
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="name" className="subtitle is-6">
              Product Category
            </label>
            <br />
            <input
              type="text"
              name="category"
              className="input"
              value={this.state.category}
              onChange={this.onChange}
              placeholder="e.g. Sneakers"
              list="categories"
              required
              style={{ width: "300px" }}
            />
            <datalist id="categories">
              {categories.map(category => (
                <option value={`${category.name}`}></option>
              ))}
            </datalist>
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="name" className="subtitle is-6">
              Product Quantity
            </label>
            <br />
            <input
              type="number"
              name="quantity"
              className="input"
              value={this.state.quantity}
              onChange={this.onChange}
              placeholder="e.g. 15"
              required
              style={{ width: "300px" }}
            />
          </div>
          <div className="margin-top-bottom">
            <label htmlFor="name" className="subtitle is-6">
              Product Price
            </label>
            <br />
            <input
              type="number"
              name="amount"
              className="input"
              value={this.state.amount}
              onChange={this.onChange}
              placeholder="e.g. 1500"
              required
              style={{ width: "300px" }}
            />
          </div>
          <div className="margin-top-bottom">
            {isLoading ? (
              <button
                id="button"
                style={{ width: "300px" }}
                className="button is-black is-fullwidth"
              >
                <Icon type="loading" />
              </button>
            ) : (
              <button
                id="button"
                className="button is-black is-fullwidth"
                type="submit"
                style={{ width: "300px" }}
              >
                <Icon type="plus" /> Add Product
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }
}

AddProduct.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  categories: PropTypes.array,
  isLoading: PropTypes.bool,
  product: PropTypes.object
};

AddProduct.defaultProps = {
  categories: [],
  isLoading: false,
  product: {}
};

const mapStateToProps = state => {
  return {
    categories: state.products.categories,
    isLoading: state.products.isLoading,
    product: state.products.product
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchCategories, addProduct }
  )(AddProduct)
);
