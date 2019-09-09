import React from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import StockStatus from "../../commons/StockStatus";
const Product = ({ product }) => (
  <Link to={`/products/${product._id}`} className="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
      <div className="card">
        <div className="card-image">
          <figure className="image is-3by2">
            <img src={product.images[1]} alt={product.name} />
          </figure>
        </div>
        <div className="card-content">
          <div className="media-content">
            <p className="title is-5">{product.name}</p>
            <p className="subtitile is-6">{product.description}</p>
          </div>
          <div className="media-content">
            <p className="subtitle is-5">
              {" "}
              <span className="has-text-left">
                Qty <b>{product.quantity}</b>
              </span>{" "}
              <span className="has-text-right">
                {" "}
                Ksh. <b>{product.amount}</b>
              </span>
            </p>
            <p className="subtitle is-5"></p>
          </div>
          <StockStatus quantity={product.quantity} />
        </div>
      </div>
  </Link>
);

export default Product;
